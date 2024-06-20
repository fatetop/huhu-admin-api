import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { RechargeOrderEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class RechargeOrderModel extends BaseModel<RechargeOrderEntity> {
  @InjectEntityModel(RechargeOrderEntity)
  repo: Repository<RechargeOrderEntity>;
}
