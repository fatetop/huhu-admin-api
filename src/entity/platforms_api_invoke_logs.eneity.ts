import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('idx_platform_action', ['platform', 'action'], {})
@Entity('platforms_api_invoke_logs', { schema: 'big_school' })
export class PlatformsApiInvokeLogsEntity extends BaseEntity {
  @Column('varchar', { name: 'platform', comment: '平台', length: 50 })
  platform: string;

  @Column('varchar', { name: 'action', comment: '调用接口', length: 50 })
  action: string;

  @Column('json', { name: 'params', comment: '入参' })
  params: object;

  @Column('json', { name: 'returns', comment: '返回值' })
  returns: object;

  @Column('varchar', { name: 'err_code', comment: '返回错误码', length: 10 })
  errCode: string;

  @Column('varchar', { name: 'err_msg', comment: '返回错误信息', length: 200 })
  errMsg: string;

  @Column('decimal', {
    name: 'invoke_fee',
    comment: '调用费用',
    unsigned: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  invokeFee: number;

  @Column('varchar', { name: 'note', comment: '备注', length: 255 })
  note: string;
}
