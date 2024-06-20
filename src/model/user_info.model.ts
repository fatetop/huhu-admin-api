import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserInfoEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class UserInfoModel extends BaseModel<UserInfoEntity> {
  @InjectEntityModel(UserInfoEntity)
  repo: Repository<UserInfoEntity>;
}
