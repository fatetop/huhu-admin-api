import { Provide, Inject } from '@midwayjs/decorator';

import { BaseService } from '../core/base_service';
import { UserBalanceChangeLogsModel } from '../model';
import { UserBalanceChangeLogsEntity } from '@/entity';
import { Between, FindManyOptions } from 'typeorm';
import { FindManyWhere } from '@/core/base_model';

@Provide()
export class WalletService extends BaseService {
  @Inject()
  private userBalanceChangeLogsModel: UserBalanceChangeLogsModel;

  async getUserWalletBalanceChangeLogs(
    page: number,
    pageSize: number,
    startTime?: string,
    endTime?: string,
    uid?: number,
    type?: number,
    source?: number
  ) {
    const condition: FindManyWhere<UserBalanceChangeLogsEntity> = {};
    if (startTime && endTime) {
      condition.createTime = Between(new Date(startTime), new Date(endTime));
    }
    if (uid) condition.uid = uid;
    if (type) condition.type = type;
    if (source) condition.source = source;
    const options: FindManyOptions<UserBalanceChangeLogsEntity> = {
      select: ['id', 'uid', 'createTime', 'type', 'source', 'money', 'free', 'task'],
      order: { createTime: 'DESC' },
    };
    const logs = await this.userBalanceChangeLogsModel.getPageList(page, pageSize, condition, options);
    return logs;
  }
}
