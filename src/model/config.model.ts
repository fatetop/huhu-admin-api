import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ConfigEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class ConfigModel extends BaseModel<ConfigEntity> {
  @InjectEntityModel(ConfigEntity)
  repo: Repository<ConfigEntity>;
}
