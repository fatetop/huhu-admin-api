import { Column, Index, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('uni_phone', ['phone'], { unique: true })
@Index('uni_bid', ['bid'], { unique: true })
@Entity('user', { schema: 'big_school' })
export class UserEntity extends BaseEntity {
  @Column('varchar', {
    name: 'nickname',
    nullable: true,
    comment: '昵称',
    length: 50,
  })
  nickname?: string | null;

  @Column('varchar', {
    name: 'phone',
    unique: true,
    comment: '手机号码',
    length: 50,
  })
  phone: string;

  @Column('varchar', {
    name: 'country_code',
    nullable: true,
    comment: '区号',
    length: 50,
  })
  countryCode?: string;

  @Column('varchar', {
    name: 'pure_phone',
    nullable: true,
    comment: '没有区号的手机号',
    length: 50,
  })
  purePhone?: string;

  @Column('varchar', {
    name: 'bid',
    unique: true,
    comment: 'bid',
    length: 50,
  })
  bid: string;

  @Column('varchar', {
    name: 'avatar',
    nullable: true,
    comment: '头像地址',
    length: 100,
  })
  avatar?: string | null;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    comment: '1可用',
    unsigned: true,
    default: () => "'1'",
  })
  status?: number | null;

  @Column('varchar', {
    name: 'binding_other',
    nullable: true,
    comment: '绑定其他账号 wechat,alipay,....',
    length: 50,
  })
  bindingOther?: string | null;
}
