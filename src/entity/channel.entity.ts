import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../core/base_entity';

@Index('uni_channel_no', ['channelNo'], { unique: true })
@Entity('channel', { schema: 'big_school' })
export class ChannelEntity extends BaseEntity {
  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment: '渠道名 创建后不允许更新',
    length: 50,
  })
  name: string | null;

  @Column('varchar', {
    name: 'channel_no',
    nullable: true,
    unique: true,
    comment: '渠道号',
    length: 50,
  })
  channelNo: string | null;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    comment: '1上架 0下架',
    unsigned: true,
    default: () => "'1'",
  })
  status: number | null;
}
