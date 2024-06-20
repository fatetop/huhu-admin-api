import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { SmsCodeEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class SmsCodeModel extends BaseModel<SmsCodeEntity> {
  @InjectEntityModel(SmsCodeEntity)
  repo: Repository<SmsCodeEntity>;
}
