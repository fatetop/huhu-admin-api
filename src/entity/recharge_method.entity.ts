import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Entity('recharge_method', { schema: 'big_school' })
export class RechargeMethodEntity extends BaseEntity {
  @Column('varchar', { name: 'method_name', comment: '充值名称', length: 50 })
  methodName: string;

  @Column('varchar', { name: 'code', comment: '充值code', length: 20 })
  code: string;

  @Column('tinyint', {
    name: 'status',
    comment: '1显示 0隐藏',
    unsigned: true,
    default: () => "'1'",
  })
  status: number;
}
