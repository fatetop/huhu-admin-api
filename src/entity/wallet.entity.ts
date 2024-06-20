import { Column, Index, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('uni_uid', ['uid'], { unique: true })
@Entity('wallet', { schema: 'big_school' })
export class WalletEntity extends BaseEntity {
  @Column('int', { name: 'uid', comment: '用户id', unsigned: true })
  uid: number;

  @Column('int', { name: 'money', unsigned: true, default: () => "'0'" })
  money?: number;

  @Column('int', { name: 'free', unsigned: true, default: () => "'0'" })
  free?: number;

  @Column('int', { name: 'task', unsigned: true, default: () => "'0'" })
  task?: number;
}
