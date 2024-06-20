import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserBalanceChangeLogsEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class UserBalanceChangeLogsModel extends BaseModel<UserBalanceChangeLogsEntity> {
  @InjectEntityModel(UserBalanceChangeLogsEntity)
  repo: Repository<UserBalanceChangeLogsEntity>;
}
