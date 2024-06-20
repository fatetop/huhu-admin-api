import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserWeChatEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class UserWeChatModel extends BaseModel<UserWeChatEntity> {
  @InjectEntityModel(UserWeChatEntity)
  repo: Repository<UserWeChatEntity>;
}
