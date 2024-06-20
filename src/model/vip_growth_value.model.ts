import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { VipGrowthValueEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class VipGrowthValueModel extends BaseModel<VipGrowthValueEntity> {
  @InjectEntityModel(VipGrowthValueEntity)
  repo: Repository<VipGrowthValueEntity>;
}
