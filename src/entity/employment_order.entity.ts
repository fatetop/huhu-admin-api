import { Column, Entity, Index } from 'typeorm';
import { BaseEntity, dateTransformer } from '../core/base_entity';

@Index('idx_uid', ['uid'], {})
@Index('uni_trade_no', ['tradeNo'], { unique: true })
@Entity('employment_order', { schema: 'big_school' })
export class EmploymentOrderEntity extends BaseEntity {
  @Column('int', { name: 'uid', comment: '用户id 发起人', unsigned: true })
  uid: number;

  @Column('varchar', { name: 'trade_no', comment: '订单号', length: 60 })
  tradeNo: string;

  @Column('tinyint', {
    name: 'time_type',
    comment: '订单时间类型 1 限时 2 长期',
    unsigned: true,
  })
  timeType: number;

  @Column('tinyint', {
    name: 'participants_type',
    comment: '订单参与类型 1 单人 2 多人',
    unsigned: true,
  })
  participantsType: number;

  @Column('tinyint', {
    name: 'status',
    comment: '1可参与 2已满员 3进行中 4取消 9已完成',
    unsigned: true,
    default: () => "'1'",
  })
  status?: number;

  @Column('varchar', { name: 'title', comment: '标题', length: 40 })
  title: string;

  @Column('text', { name: 'content', comment: '内容' })
  content: string;

  @Column('int', { name: 'money', comment: '价格', unsigned: true })
  money: number;

  @Column('int', {
    name: 'participants_num',
    comment: '可参与人数',
    unsigned: true,
    default: () => "'1'",
  })
  participantsNum: number;

  @Column('datetime', {
    name: 'expire_time',
    nullable: true,
    comment: '到期时间',
    transformer: dateTransformer,
  })
  expireTime?: Date | null;

  @Column('int', { name: 'used_money', comment: '使用的money', unsigned: true })
  usedMoney: number;

  @Column('int', { name: 'used_free', comment: '使用的free', unsigned: true })
  usedFree: number;

  @Column('int', { name: 'used_task', comment: '使用的task', unsigned: true })
  usedTask: number;
}
