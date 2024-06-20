import { Column, Index, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('idx_uid', ['uid'], {})
@Entity('recharge_order', { schema: 'big_school' })
export class RechargeOrderEntity extends BaseEntity {
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

  @Column('varchar', { name: 'nonce', comment: 'nonce', length: 10 })
  nonce: string;

  @Column('varchar', {
    name: 'trade_no',
    nullable: true,
    comment: '三方订单号 回调',
    length: 60,
  })
  tradeNo?: string | null;

  @Column('tinyint', {
    name: 'status',
    comment: '1进行中 2 成功',
    unsigned: true,
    default: () => "'1'",
  })
  status?: number;
}
