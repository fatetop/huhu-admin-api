import { Column, Index, Entity } from 'typeorm';
import { BaseEntity, dateTransformer } from '../core/base_entity';

@Index('uni_uid', ['uid'], { unique: true })
@Entity('user_vip', { schema: 'big_school' })
export class UserVipEntity extends BaseEntity {
  @Column('int', {
    name: 'uid',
    unique: true,
    comment: '用户id',
    unsigned: true,
  })
  uid: number;

  @Column('tinyint', { name: 'vip_type', comment: 'vip类型', unsigned: true })
  vipType: number;

  @Column('int', {
    name: 'growth_value',
    comment: '成长值',
    unsigned: true,
    default: () => "'0'",
  })
  growthValue: number;

  @Column('datetime', { name: 'expire_time', transformer: dateTransformer })
  expireTime: Date;
}
