import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, DeleteDateColumn } from 'typeorm';
import Time from '../utils/time';

export const dateTransformer = {
  from: (value: Date | number) => {
    return new Time(typeof value === 'number' ? value : value.getTime()).getTime();
  },
  to: (value: Date | number) => value,
};

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id?: number;

  @CreateDateColumn({
    type: 'datetime',
    name: 'create_time',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: dateTransformer,
  })
  createTime?: Date | null;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_time',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: dateTransformer,
  })
  updateTime?: Date | null;

  @VersionColumn({
    type: 'int',
    name: 'version',
    nullable: true,
    comment: '本条记录操作的最新版本号',
    default: () => 0,
  })
  version?: number | null;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'delete_time',
    nullable: true,
  })
  deleteTime?: Date | null;
}
