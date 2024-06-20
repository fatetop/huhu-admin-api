import { Init, Inject, MidwayCommonError, Provide, Singleton } from '@midwayjs/core';
import Redlock, { ExecutionResult, Lock, Settings } from 'redlock';

import { REDIS_EXPIRE } from '@/common/constant';
import { RedisLockServiceFactory } from '../factory/redis_lock.factory.service';

@Provide()
@Singleton()
export class RedisLockService {
  @Inject()
  private serviceFactory: RedisLockServiceFactory;

  // 这个属性用于保存实际的实例
  private instance: Redlock;

  @Init()
  protected async init() {
    // 在初始化阶段，从工厂拿到默认实例
    this.instance = this.serviceFactory.get(this.serviceFactory.getDefaultClientName() || 'default');
    if (!this.instance) {
      throw new MidwayCommonError('http client default instance not found.');
    }
  }

  private async acquireLock(resources: string[], duration: number = REDIS_EXPIRE.SORT_EXPIRE, settings?: Partial<Settings>): Promise<Lock> {
    return await this.instance.acquire(resources, duration * 1000, settings);
  }

  private async releaseLock(lock: Lock, settings?: Partial<Settings>): Promise<ExecutionResult> {
    return await this.instance.release(lock, settings);
  }

  private async extendLock(lock: Lock, duration: number = REDIS_EXPIRE.SORT_EXPIRE, settings?: Partial<Settings>): Promise<Lock> {
    return await this.instance.extend(lock, duration * 1000, settings);
  }

  async lockProcess<T>(
    run: () => Promise<T>,
    resources: string[],
    duration: number = REDIS_EXPIRE.SORT_EXPIRE,
    isNeedExtend = false,
    settings?: Partial<Settings>
  ) {
    let lock: Lock;
    try {
      lock = await this.acquireLock(resources, duration, settings);
      if (isNeedExtend) {
        lock = await this.extendLock(lock, duration, settings);
      }
      return await run();
    } finally {
      if (lock) {
        await this.releaseLock(lock, settings);
      }
    }
  }
}
