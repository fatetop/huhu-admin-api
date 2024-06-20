// SnowflakeService.ts
import { Provide, Singleton, Inject, Init, MidwayCommonError } from '@midwayjs/core';
import Snowflake from 'snowflake-id';
import { SnowflakeServiceFactory } from '../factory/snowflake.factory.service';

@Provide()
@Singleton()
export class SnowflakeService {
  @Inject()
  private serviceFactory: SnowflakeServiceFactory;

  // 这个属性用于保存实际的实例
  private instance: Snowflake;

  @Init()
  protected async init() {
    // 在初始化阶段，从工厂拿到默认实例
    this.instance = this.serviceFactory.get(this.serviceFactory.getDefaultClientName() || 'default');
    if (!this.instance) {
      throw new MidwayCommonError('http client default instance not found.');
    }
  }

  /**
   * 生成雪花ID
   */
  public generateUniqueId(): string {
    return this.instance.generate().toString();
  }
}
