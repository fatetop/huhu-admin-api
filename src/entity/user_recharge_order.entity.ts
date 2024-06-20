import { Column, Index, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('idx_uid', ['uid'], {})
@Entity('user_recharge_order', { schema: 'big_school' })
export class UserRechargeOrderEntity extends BaseEntity {
  @Column('int', { name: 'uid', comment: '用户id', unsigned: true })
  uid: number;

  @Column('int', {
    name: 'recharge_type_id',
    comment: '充值类型id',
    unsigned: true,
  })
  rechargeTypeId: number;

  @Column('int', {
    name: 'recharge_method_id',
    comment: '充值方法id',
    unsigned: true,
  })
  rechargeMethodId: number;

  @Column('varchar', {
    name: 'recharge_method_code',
    comment: '充值code',
    length: 20,
  })
  rechargeMethodCode: string;

  @Column('int', {
    name: 'recharge_money',
    comment: '充值金额',
    unsigned: true,
  })
  rechargeMoney: number;

  @Column('int', {
    name: 'recharge_free',
    comment: '充值赠送金额',
    unsigned: true,
    default: () => "'0'",
  })
  rechargeFree: number;

  @Column('varchar', {
    name: 'recharge_name',
    comment: '充值提示名称',
    length: 50,
  })
  rechargeName: string;

  @Column('varchar', {
    name: 'sys_trade_no',
    comment: '系统订单号',
    length: 60,
  })
  sysTradeNo: string;
}
