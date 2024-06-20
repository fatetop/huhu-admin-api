import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserRechargeOrderEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class UserRechargeOrderModel extends BaseModel<UserRechargeOrderEntity> {
  @InjectEntityModel(UserRechargeOrderEntity)
  repo: Repository<UserRechargeOrderEntity>;
}
