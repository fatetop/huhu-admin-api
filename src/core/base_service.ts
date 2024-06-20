import { DeleteResult, ObjectLiteral, QueryRunner, UpdateResult } from 'typeorm';
import { App, Inject, Config } from '@midwayjs/decorator';
import { Context, Application } from '@midwayjs/koa';
import { TypeORMDataSourceManager } from '@midwayjs/typeorm';
import { ILogger } from '@midwayjs/logger';

import { SysError } from '../error/sys.error';
import { APP_ERROR_TYPES, T_AppErrorType, ErrorMapped, K_AppErrorType } from '../error/error_msg.error';

import Redis from '../service/common/redis.service';
import { IConfig, IResponse } from '../interface';
import { DATA_SOURCE_NAME, REDIS_EXPIRE, REDIS_SUCCESS_MSG } from '../common/constant';

export abstract class BaseService {
  @Config('userConfig')
  protected userConfig: IConfig.IUserConfig;

  @App()
  protected app: Application;

  @Inject()
  protected ctx: Context;

  @Inject()
  protected logger: ILogger;

  @Inject()
  protected dataSourceManager: TypeORMDataSourceManager;

  @Inject()
  protected redisService: Redis;

  protected APP_ERROR_TYPES: ErrorMapped<K_AppErrorType> = APP_ERROR_TYPES;

  protected getIp(): string {
    const ip = ((this.ctx.header['x-forwarded-for'] as string) ?? (this.ctx.header['x-real-ip'] as string) ?? this.ctx.ip)
      ?.split(',')
      ?.filter(v => v && v !== 'unknown')[0]
      ?.trim();
    return ip.indexOf('::ffff:') !== -1 ? ip.substr(7) : ip;
  }

  protected fail(errInfo: T_AppErrorType): never {
    throw new SysError(errInfo);
  }

  protected async runTransaction<T>(
    transaction: (queryRunner: QueryRunner) => Promise<T>,
    dataSourceName: DATA_SOURCE_NAME = DATA_SOURCE_NAME.DEFAULT,
    onError?: (err?: Error) => Promise<void> | void
  ) {
    const dataSource = this.dataSourceManager.getDataSource(dataSourceName);
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await transaction(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await onError?.(err);
      this?.ctx?.logger?.error(err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  protected async mustCreate<Entity extends ObjectLiteral>(
    filed: keyof Entity,
    createAction: () => Promise<Entity>,
    errInfo: T_AppErrorType = APP_ERROR_TYPES.SYSTEM_ERROR
  ): Promise<Entity> {
    const entityData = await createAction();
    if (!entityData?.[filed]) this.fail(errInfo);
    return entityData;
  }

  protected async mustUpdate(expected: number, updateAction: () => Promise<UpdateResult>, errInfo: T_AppErrorType = APP_ERROR_TYPES.UPDATE_ERROR) {
    const { affected } = await updateAction();
    if (expected !== affected) this.fail(errInfo);
  }

  protected async mustUpdates(
    expected: number | number[],
    updateActions: (() => Promise<UpdateResult>)[],
    errInfo: T_AppErrorType = APP_ERROR_TYPES.UPDATE_ERROR
  ) {
    const { isArray } = Array;
    if (isArray(expected) && expected.length !== updateActions.length) this.fail(errInfo);
    await Promise.all(
      updateActions.map((updateAction, index) => this.mustUpdate(isArray(expected) ? expected[index] : expected, updateAction, errInfo))
    );
  }

  protected async mustDelete(expected: number, deleteAction: () => Promise<DeleteResult>, errInfo: T_AppErrorType = APP_ERROR_TYPES.DELETE_ERROR) {
    const { affected } = await deleteAction();
    if (expected !== affected) this.fail(errInfo);
  }

  protected async getOrSetCache<T>(key: string, getData: () => Promise<T>, expireTime?: number): Promise<T> {
    const value = await this.redisService.getValue(key);
    if (value) return value;
    const data = await getData();
    const setRes = await this.redisService.setValue(key, data, data ? expireTime : REDIS_EXPIRE.SORT_EXPIRE);
    if (setRes !== REDIS_SUCCESS_MSG) this.fail(this.APP_ERROR_TYPES.DATA_CACHE_ERROR);
    return data;
  }

  protected getUserTokenInfo() {
    const userTokenInfo = this.ctx.state.userInfo as IResponse.IUser.IUserTokenInfo;
    return userTokenInfo;
  }
}
