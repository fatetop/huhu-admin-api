import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserVipEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class UserVipModel extends BaseModel<UserVipEntity> {
  @InjectEntityModel(UserVipEntity)
  repo: Repository<UserVipEntity>;
}
