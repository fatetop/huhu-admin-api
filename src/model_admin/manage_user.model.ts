import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ManageUserEntity } from '../entity_admin';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class ManageUserModel extends BaseModel<ManageUserEntity> {
  @InjectEntityModel(ManageUserEntity)
  repo: Repository<ManageUserEntity>;
}
