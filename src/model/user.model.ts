import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserEntity, UserInfoEntity, WalletEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';
import { basePageData, pageConfig } from '@/utils';

@Provide()
export class UserModel extends BaseModel<UserEntity> {
  @InjectEntityModel(UserEntity)
  repo: Repository<UserEntity>;

  async userList(page: number, pageSize: number, startTime?: string, endTime?: string, uid?: number, phone?: string, bid?: string) {
    const { take, skip } = pageConfig(page, pageSize);
    const sql = this.createQueryBuilder('u')
      .leftJoinAndSelect(WalletEntity, 'w', 'w.uid = u.id')
      .leftJoinAndSelect(UserInfoEntity, 'i', 'i.uid = u.id')
      .select(
        'u.id uid,u.phone,u.nickname,u.avatar,u.create_time createTime,u.bid,u.status,u.binding_other bindingOther,w.money,w.free,w.task,i.register_channel_name registerChannelName,i.login_channel_name loginChannelName,i.login_time loginTime,i.integral,i.invite_code inviteCode'
      )
      .orderBy('u.create_time', 'DESC')
      .offset(skip)
      .limit(take);
    if (startTime && endTime) {
      sql.andWhere('u.create_time between :startTime and :endTime ', { startTime, endTime });
    }
    if (uid) {
      sql.andWhere('u.id = :uid', { uid });
    }
    if (phone) {
      sql.andWhere('u.phone = :phone', { phone });
    }
    if (bid) {
      sql.andWhere('u.bid = :bid', { bid });
    }
    const [count, list] = await Promise.all([sql.getCount(), sql.getRawMany()]);
    return basePageData(list, page, pageSize, count);
  }
}
