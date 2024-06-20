import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Entity('vip_type', { schema: 'big_school' })
export class VipTypeEntity extends BaseEntity {
  @Column('varchar', {
    name: 'vip_type_name',
    comment: 'VIP类型名称',
    length: 50,
  })
  vipTypeName: string;

  @Column('tinyint', { name: 'vip_type', comment: 'vip类型', unsigned: true })
  vipType: number;

  @Column('int', {
    name: 'vip_base_growth_value',
    comment: 'vip基础成长值(每天)',
    unsigned: true,
  })
  vipBaseGrowthValue: number;

  @Column('int', {
    name: 'vip_buy_growth_value',
    comment: 'vip初始增加成长值',
    unsigned: true,
  })
  vipBuyGrowthValue: number;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    comment: '1显示 0隐藏',
    unsigned: true,
    default: () => "'1'",
  })
  status: number | null;
}
