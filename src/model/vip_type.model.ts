import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { VipTypeEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class VipTypeModel extends BaseModel<VipTypeEntity> {
  @InjectEntityModel(VipTypeEntity)
  repo: Repository<VipTypeEntity>;
}
