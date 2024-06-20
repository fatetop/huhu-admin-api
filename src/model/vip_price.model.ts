import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { VipPriceEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class VipPriceModel extends BaseModel<VipPriceEntity> {
  @InjectEntityModel(VipPriceEntity)
  repo: Repository<VipPriceEntity>;
}
