import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { RechargeTypeEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class RechargeTypeModel extends BaseModel<RechargeTypeEntity> {
  @InjectEntityModel(RechargeTypeEntity)
  repo: Repository<RechargeTypeEntity>;
}
