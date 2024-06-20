import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Entity('broadcast', { schema: 'big_school' })
export class BroadcastEntity extends BaseEntity {
  @Column('varchar', {
    name: 'content',
    comment: '广播内容',
    length: 255,
  })
  content: string;

  @Column('varchar', {
    name: 'jump_url',
    nullable: true,
    comment: '点击跳转链接',
    length: 255,
  })
  jumpUrl: string | null;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    comment: '1显示 0隐藏',
    unsigned: true,
    default: () => "'1'",
  })
  status: number | null;

  @Column('int', {
    name: 'sort',
    nullable: true,
    comment: '排序',
    unsigned: true,
    default: () => "'0'",
  })
  sort?: number | null;
}
