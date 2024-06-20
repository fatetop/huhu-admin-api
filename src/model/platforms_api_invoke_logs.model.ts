import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { PlatformsApiInvokeLogsEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class PlatformsApiInvokeLogsModel extends BaseModel<PlatformsApiInvokeLogsEntity> {
  @InjectEntityModel(PlatformsApiInvokeLogsEntity)
  repo: Repository<PlatformsApiInvokeLogsEntity>;
}
