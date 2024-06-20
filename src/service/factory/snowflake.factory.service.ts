import { IConfig } from '@/interface';
import { ServiceFactory, Provide, Singleton, Config, Init } from '@midwayjs/core';
import Snowflake from 'snowflake-id';

@Provide()
@Singleton()
export class SnowflakeServiceFactory extends ServiceFactory<Snowflake> {
  @Config('snowflake')
  snowflakeConfig: IConfig.ISnowflakeConfig;

  @Init()
  async init() {
    await this.initClients(this.snowflakeConfig);
  }

  protected createClient(config: IConfig.ISnowflakeConfigClient): Snowflake {
    // 创建实例
    return new Snowflake({
      // 可选配置，默认时间是 Twitter Snowflake 的开始时间（2014-01-01）
      epoch: Date.parse(config.epoch),
      // 数据中心ID，默认范围0-31，可根据实际机器分布情况调整
      datacenterId: config.dataCenterId,
      // 机器ID，默认范围0-31，每个数据中心内应该是唯一的
      workerId: config.workerId,
    });
  }

  getName() {
    return 'snowflake';
  }
}
