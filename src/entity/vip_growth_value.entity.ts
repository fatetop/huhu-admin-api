import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Entity('vip_growth_value', { schema: 'big_school' })
export class VipGrowthValueEntity extends BaseEntity {
  @Column('int', {
    name: 'growth_value',
    comment: '成长值',
    unsigned: true,
    default: () => "'0'",
  })
  growthValue: number;

  @Column('tinyint', {
    name: 'vip_level',
    comment: 'vip等级',
    unsigned: true,
    default: () => "'0'",
  })
  vipLevel: number;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    comment: '1显示 0隐藏',
    unsigned: true,
    default: () => "'1'",
  })
  status: number | null;
}
