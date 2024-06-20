import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserEmploymentOrderEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class UserEmploymentOrderModel extends BaseModel<UserEmploymentOrderEntity> {
  @InjectEntityModel(UserEmploymentOrderEntity)
  repo: Repository<UserEmploymentOrderEntity>;
}
