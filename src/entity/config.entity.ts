import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('idx_mode_key_status', ['mode', 'key', 'status'], {})
@Entity('config', { schema: 'big_school' })
export class ConfigEntity extends BaseEntity {
  @Column('varchar', { name: 'mode', comment: '模块', length: 50 })
  mode: string;

  @Column('varchar', { name: 'key', comment: '键', length: 50 })
  key: string;

  @Column('varchar', { name: 'value', comment: '值', length: 50 })
  value: string;

  @Column('varchar', { name: 'note', comment: '备注', length: 50 })
  note: string;

  @Column('tinyint', {
    name: 'status',
    comment: '1 可用 0 不可用',
    unsigned: true,
    default: () => "'1'",
  })
  status: number;
}
