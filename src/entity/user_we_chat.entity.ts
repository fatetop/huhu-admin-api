import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('uni_openid', ['openid'], { unique: true })
@Index('uni_uid', ['uid'], { unique: true })
@Entity('user_we_chat', { schema: 'big_school' })
export class UserWeChatEntity extends BaseEntity {
  @Column('int', {
    name: 'uid',
    unique: true,
    comment: '用户id',
    unsigned: true,
  })
  uid: number;

  @Column('varchar', {
    name: 'nickname',
    nullable: true,
    comment: '微信昵称',
    length: 50,
  })
  nickname?: string | null;

  @Column('varchar', {
    name: 'openid',
    unique: true,
    comment: '微信openID',
    length: 60,
  })
  openid?: string;

  @Column('varchar', {
    name: 'unionid',
    nullable: true,
    comment: '微信unionID',
    length: 60,
  })
  unionid?: string | null;

  @Column('varchar', {
    name: 'session_key',
    nullable: true,
    comment: '微信用户调用开发能力凭证 存在有效期 失效重新登陆',
    length: 255,
  })
  sessionKey?: string | null;

  @Column('varchar', {
    name: 'avatar',
    nullable: true,
    comment: '头像地址',
    length: 100,
  })
  avatar?: string | null;

  @Column('varchar', {
    name: 'country',
    nullable: true,
    comment: '国家',
    length: 30,
  })
  country?: string | null;

  @Column('tinyint', {
    name: 'sex',
    nullable: true,
    comment: '性别 1女 2男',
    width: 1,
  })
  sex?: boolean | null;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    comment: '手机号码',
    length: 50,
  })
  phone?: string | null;

  @Column('varchar', {
    name: 'country_code',
    nullable: true,
    comment: '区号',
    length: 50,
  })
  countryCode?: string | null;

  @Column('varchar', {
    name: 'pure_phone',
    nullable: true,
    comment: '没有区号的手机号',
    length: 50,
  })
  purePhone?: string | null;
}
