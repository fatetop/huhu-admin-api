import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { RechargeMethodEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class RechargeMethodModel extends BaseModel<RechargeMethodEntity> {
  @InjectEntityModel(RechargeMethodEntity)
  repo: Repository<RechargeMethodEntity>;
}
