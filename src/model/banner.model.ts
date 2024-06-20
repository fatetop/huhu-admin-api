import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { BannerEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class BannerModel extends BaseModel<BannerEntity> {
  @InjectEntityModel(BannerEntity)
  repo: Repository<BannerEntity>;
}
