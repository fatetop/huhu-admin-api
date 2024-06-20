import { Column, Index, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('uni_account', ['account'], { unique: true })
@Entity('manage_user', { schema: 'big_school_admin' })
export class ManageUserEntity extends BaseEntity {
  @Column('varchar', {
    name: 'nickname',
    nullable: true,
    comment: '昵称',
    length: 50,
  })
  nickname: string | null;

  @Column('varchar', {
    name: 'account',
    nullable: true,
    unique: true,
    comment: '账号',
    length: 50,
  })
  account: string | null;

  @Column('varchar', { name: 'password', comment: '密码', length: 32 })
  password: string;

  @Column('varchar', { name: 'salt', comment: '密码盐', length: 10 })
  salt: string;

  @Column('varchar', {
    name: 'avatar',
    nullable: true,
    comment: '头像地址',
    length: 100,
    default: () => "'https://oss.fatetop.com/avatar/def.jpg'",
  })
  avatar: string | null;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    comment: '>0可用',
    unsigned: true,
    default: () => "'5'",
  })
  status: number | null;
}
