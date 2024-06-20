import { IConfig } from '@/interface';
import { ServiceFactory, Provide, Singleton, Config, Init } from '@midwayjs/core';
import Redlock from 'redlock';
import ioRedis from 'ioredis';

@Provide()
@Singleton()
export class RedisLockServiceFactory extends ServiceFactory<Redlock> {
  @Config('redLock')
  redLockConfig: IConfig.IRedLockConfig;

  @Config('redis')
  redisConfig: IConfig.IRedisConfig;

  @Init()
  async init() {
    await this.initClients({ client: { ...this.redLockConfig.client, ...this.redisConfig.client } });
  }

  protected createClient(config: IConfig.IRedLockConfigClient & IConfig.IRedisConfigClient): Redlock {
    // 创建 Redlock 实例，传递一个 Redis 客户端数组，通常使用多个Redis实例来增强可用性
    const client = new ioRedis({
      keyPrefix: config.keyPrefix,
      port: config.port,
      host: config.host,
      password: config.password,
      db: config.db,
    });
    // 创建实例
    return new Redlock([client], {
      driftFactor: config.driftFactor,
      retryCount: config.retryCount,
      retryDelay: config.retryDelay,
      retryJitter: config.retryJitter,
    });
  }

  getName() {
    return 'redlock';
  }
}
