import { Column, Index, Entity } from 'typeorm';
import { BaseEntity, dateTransformer } from '../core/base_entity';

@Index('idx_uid', ['uid'], { unique: true })
@Index('idx_user_info_channel', ['registerChannelId'], {})
@Index('idx_user_info_channel_2', ['loginChannelId'], {})
@Entity('user_info', { schema: 'big_school' })
export class UserInfoEntity extends BaseEntity {
  @Column('int', {
    name: 'uid',
    unique: true,
    comment: '用户id',
    unsigned: true,
  })
  uid: number;

  @Column('int', {
    name: 'register_channel_id',
    nullable: true,
    comment: '注册渠道id',
    unsigned: true,
  })
  registerChannelId?: number | null;

  @Column('varchar', {
    name: 'register_channel_name',
    nullable: true,
    comment: '注册渠道名',
    length: 50,
  })
  registerChannelName?: string | null;

  @Column('int', {
    name: 'login_channel_id',
    nullable: true,
    comment: '登陆渠道id',
    unsigned: true,
  })
  loginChannelId?: number | null;

  @Column('varchar', {
    name: 'login_channel_name',
    nullable: true,
    comment: '登陆渠道名',
    length: 50,
  })
  loginChannelName?: string | null;

  @Column('datetime', { name: 'login_time', nullable: true, comment: '登录时间', transformer: dateTransformer })
  loginTime?: Date;

  @Column('int', {
    name: 'integral',
    nullable: true,
    comment: '用户积分',
    default: () => "'0'",
  })
  integral?: number | null;

  @Column('varchar', {
    name: 'invite_code',
    nullable: true,
    comment: '邀请码',
    length: 10,
  })
  inviteCode?: string | null;
}
