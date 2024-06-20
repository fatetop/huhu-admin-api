import {
  EntityTarget,
  FindOptionsWhere,
  QueryRunner,
  Repository,
  FindManyOptions,
  FindOneOptions,
  UpdateResult,
  DeleteResult,
  SaveOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { pageConfig, basePageData } from '../utils';

export type FindIdWhere<T> = string | string[] | number | number[] | Date | Date[] | FindOptionsWhere<T>;
export type FindManyWhere<T> = FindOptionsWhere<T>[] | FindOptionsWhere<T>;

export enum STEP_DB {
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
}

export abstract class BaseModel<T> {
  protected repo: Repository<T>;

  async save(params: T, entity?: EntityTarget<T>, queryRunner?: QueryRunner): Promise<T> {
    if (queryRunner) {
      return queryRunner.manager.save(entity, params);
    }
    const res = await this.repo.save(params);
    return res;
  }

  async batchSave(entities: T[], queryRunner?: QueryRunner): Promise<T[]> {
    if (queryRunner) {
      return queryRunner.manager.save(entities);
    }
    return this.repo.save(entities);
  }

  async update(where: FindIdWhere<T>, params: QueryDeepPartialEntity<T>, entity?: EntityTarget<T>, queryRunner?: QueryRunner): Promise<UpdateResult> {
    if (queryRunner) {
      return queryRunner.manager.update(entity, where, params);
    }
    const res = await this.repo.update(where, params);
    return res;
  }

  async getList(where: FindManyWhere<T> = {}, options: FindManyOptions<T> = {}, entity?: EntityTarget<T>, queryRunner?: QueryRunner): Promise<T[]> {
    if (queryRunner) {
      return queryRunner.manager.find(entity, { where, ...options });
    }
    return await this.repo.find({ where, ...options });
  }

  async getListAndCount(
    where: FindManyWhere<T> = {},
    options: FindManyOptions<T> = {}
  ): Promise<{
    list: T[];
    count: number;
  }> {
    const [list, count] = await this.repo.findAndCount({ where, ...options });
    return { list, count };
  }

  async getPageList(page = 1, pageSize = 10, where: FindManyWhere<T> = {}, options: FindManyOptions<T> = {}) {
    const { take, skip } = pageConfig(page, pageSize);
    const { list, count } = await this.getListAndCount(where, { ...options, take, skip });
    return basePageData(list, page, pageSize, count);
  }

  async getOne(where: FindManyWhere<T> = {}, options: FindOneOptions<T> = {}, entity?: EntityTarget<T>, queryRunner?: QueryRunner): Promise<T> {
    if (queryRunner) {
      return queryRunner.manager.findOne(entity, { where, ...options });
    }
    return await this.repo.findOne({ where, ...options });
  }

  async count(where: FindManyWhere<T> = {}, options: FindManyOptions<T> = {}, entity?: EntityTarget<T>, queryRunner?: QueryRunner): Promise<number> {
    if (queryRunner) {
      return queryRunner.manager.count(entity, { where, ...options });
    }
    return await this.repo.count({ where, ...options });
  }

  async softRemove(entity: T, options?: SaveOptions, queryRunner?: QueryRunner): Promise<T> {
    if (queryRunner) {
      return queryRunner.manager.softRemove(entity, options);
    }
    return this.repo.softRemove(entity, options);
  }

  async remove(where: FindIdWhere<T> = {}, entity?: EntityTarget<T>, queryRunner?: QueryRunner): Promise<DeleteResult> {
    if (queryRunner) {
      return queryRunner.manager.delete(entity, where);
    }
    return this.repo.delete(where);
  }

  async stepField(
    where: FindOptionsWhere<T>,
    field: string,
    step: string | number = 1,
    func: STEP_DB = STEP_DB.INCREMENT,
    entity?: EntityTarget<T>,
    queryRunner?: QueryRunner
  ) {
    if (queryRunner) {
      return await queryRunner.manager[func](entity, where, field, step);
    }
    const res = await this.repo[func](where, field, step);
    return res;
  }

  createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
    return this.repo.createQueryBuilder(alias, queryRunner);
  }
}
