import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Entity('vip_price', { schema: 'big_school' })
export class VipPriceEntity extends BaseEntity {
  @Column('varchar', {
    name: 'vip_price_name',
    comment: 'VIP价格名称',
    length: 50,
  })
  vipPriceName: string;

  @Column('int', { name: 'days', comment: '多少天过期', unsigned: true })
  days: number;

  @Column('tinyint', { name: 'vip_type', comment: 'vip类型', unsigned: true })
  vipType: number;

  @Column('int', { name: 'price', comment: '价格', unsigned: true })
  price: number;

  @Column('int', {
    name: 'sale',
    nullable: true,
    comment: '折扣价格',
    unsigned: true,
  })
  sale: number | null;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    comment: '1显示 0隐藏',
    unsigned: true,
    default: () => "'1'",
  })
  status: number | null;
}
