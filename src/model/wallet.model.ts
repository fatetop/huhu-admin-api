import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { WalletEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class WalletModel extends BaseModel<WalletEntity> {
  @InjectEntityModel(WalletEntity)
  repo: Repository<WalletEntity>;
}
