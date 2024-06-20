import { Column, Index, Entity } from 'typeorm';
import { BaseEntity, dateTransformer } from '../core/base_entity';

@Index('idx_phone_code', ['phone', 'code'], {})
@Entity('sms_code', { schema: 'big_school' })
export class SmsCodeEntity extends BaseEntity {
  @Column('varchar', { name: 'phone', comment: '手机号码', length: 11 })
  phone: string;

  @Column('varchar', { name: 'code', comment: '微信昵称', length: 50 })
  code: string;

  @Column('tinyint', {
    name: 'status',
    comment: '使用 1使用 0未使用',
    width: 1,
  })
  status: number;

  @Column('datetime', { name: 'expire_time', transformer: dateTransformer })
  expireTime: Date;
}
