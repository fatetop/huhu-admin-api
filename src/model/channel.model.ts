import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ChannelEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class ChannelModel extends BaseModel<ChannelEntity> {
  @InjectEntityModel(ChannelEntity)
  repo: Repository<ChannelEntity>;
}
