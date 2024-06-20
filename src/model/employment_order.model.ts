import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { EmploymentOrderEntity } from '../entity';
import { Repository } from 'typeorm';

import { BaseModel } from '../core/base_model';

@Provide()
export class EmploymentOrderModel extends BaseModel<EmploymentOrderEntity> {
  @InjectEntityModel(EmploymentOrderEntity)
  repo: Repository<EmploymentOrderEntity>;
}
