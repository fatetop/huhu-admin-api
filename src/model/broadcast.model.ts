import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { BroadcastEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class BroadcastModel extends BaseModel<BroadcastEntity> {
  @InjectEntityModel(BroadcastEntity)
  repo: Repository<BroadcastEntity>;
}
