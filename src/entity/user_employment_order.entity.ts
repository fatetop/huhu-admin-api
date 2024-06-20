import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('idx_uid', ['uid'], {})
@Index('idx_order_id', ['orderId'], {})
@Index('uni_uid_trade_no', ['uid', 'tradeNo'], { unique: true })
@Entity('user_employment_order', { schema: 'big_school' })
export class UserEmploymentOrderEntity extends BaseEntity {
  @Column('int', { name: 'uid', comment: '用户id 参与者', unsigned: true })
  uid: number;

  @Column('int', { name: 'order_id', comment: '订单id', unsigned: true })
  orderId: number;

  @Column('varchar', { name: 'trade_no', comment: '订单号', length: 60 })
  tradeNo: string;

  @Column('int', { name: 'money', comment: '订单价格', unsigned: true })
  money: number;

  @Column('int', { name: 'receive_money', comment: '收到价格', unsigned: true })
  receiveMoney: number;

  @Column('tinyint', {
    name: 'status',
    comment: '0被发起人取消 1参与 2主动取消 9完成',
    unsigned: true,
    default: () => "'1'",
  })
  status: number;
}
