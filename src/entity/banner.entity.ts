import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Entity('banner', { schema: 'big_school' })
export class BannerEntity extends BaseEntity {
  @Column('varchar', {
    name: 'title',
    nullable: true,
    comment: 'banner标题',
    length: 255,
  })
  title: string | null;

  @Column('varchar', { name: 'img_url', comment: '图片链接', length: 255 })
  imgUrl: string;

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
  sort: number | null;
}
