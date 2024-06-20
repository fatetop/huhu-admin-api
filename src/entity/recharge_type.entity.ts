import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Entity('recharge_type', { schema: 'big_school' })
export class RechargeTypeEntity extends BaseEntity {
  @Column('varchar', {
    name: 'recharge_name',
    nullable: true,
    comment: '充值名称',
    length: 50,
  })
  rechargeName?: string;

  @Column('int', {
    name: 'money',
    comment: '充值金额',
    unsigned: true,
    default: () => "'0'",
  })
  money: number;

  @Column('int', {
    name: 'free',
    comment: '赠送金额',
    unsigned: true,
    default: () => "'0'",
  })
  free: number;

  @Column('tinyint', {
    name: 'is_hot',
    nullable: true,
    comment: '1热门 0普通',
    unsigned: true,
    default: () => "'0'",
  })
  isHot?: number;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    comment: '1显示 0隐藏',
    unsigned: true,
    default: () => "'1'",
  })
  status?: number;
}
