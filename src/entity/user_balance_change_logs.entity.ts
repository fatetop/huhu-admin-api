import { Column, Index, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('idx_uid', ['uid'], {})
@Entity('user_balance_change_logs', { schema: 'big_school' })
export class UserBalanceChangeLogsEntity extends BaseEntity {
  @Column('int', { name: 'uid', comment: '用户id 参与者', unsigned: true })
  uid: number;

  @Column('tinyint', {
    name: 'type',
    comment: '类型 1 增加 2 减少',
    unsigned: true,
  })
  type: number;

  @Column('tinyint', {
    name: 'source',
    comment: '来源 1 充值 2 提现 3 赠送 4 发布任务扣除 5 取消发布任务退回 6 任务报酬 7 任务人数不足退回',
    unsigned: true,
  })
  source: number;

  @Column('int', { name: 'money', unsigned: true, default: () => "'0'" })
  money: number;

  @Column('int', { name: 'free', unsigned: true, default: () => "'0'" })
  free: number;

  @Column('int', { name: 'task', unsigned: true, default: () => "'0'" })
  task: number;
}
