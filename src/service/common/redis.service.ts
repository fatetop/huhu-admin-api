import { Provide, Inject, Config } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';

import * as _ from 'lodash';

@Provide()
export default class Redis {
  @Inject()
  redisService: RedisService;

  @Config('redis.client.keyPrefix')
  keyPrefix: string;

  /**
   * set redis value
   * @param key
   * @param value
   * @param expireTime
   */
  async setValue(key: string, value: any, expireTime?: number): Promise<'OK'> {
    if (_.isObject(value)) {
      value = JSON.stringify(value);
    }
    if (!expireTime) {
      return await this.redisService.set(key, value);
    }
    return await this.redisService.set(key, value, 'EX', expireTime);
  }

  /**
   * set nx redis value
   * @param key
   * @param value
   * @param expireTime
   */
  async setNxValue(key: string, value: string, expireTime?: number): Promise<'OK'> {
    if (!expireTime) {
      return await this.redisService.set(key, value, 'NX');
    }
    return await this.redisService.set(key, value, 'EX', expireTime, 'NX');
  }

  /**
   * get value
   * @param key
   * @returns
   */
  async getValue(key: string): Promise<any> {
    const data = await this.redisService.get(key);
    try {
      if (!data) {
        return null;
      }
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  /**
   * delete value
   * @param key
   * @returns
   */
  async delValue(key: string): Promise<number> {
    return await this.redisService.del(key.replace(this.keyPrefix, ''));
  }

  /**
   * delete values
   * @param keys
   * @returns
   */
  async delByList(keys: string[]): Promise<boolean> {
    const queue = keys.map(key => this.delValue(key));
    const res = await Promise.all(queue);
    return res.every(item => item === 1);
  }

  async keys(key: string): Promise<string[]> {
    return await this.redisService.keys(this.keyPrefix + key);
  }

  async expire(key: string, expireTime?: number): Promise<number> {
    return await this.redisService.expire(key, expireTime);
  }

  /**
   * Hash Set
   * @param {string} keyName
   * @param {string} key
   * @param {string} value
   */
  async hashSet(keyName: string, key: string, value: string): Promise<number> {
    return await this.redisService.hset(keyName, { [key]: value });
  }

  /**
   * Hash GetAll
   * @param {string} keyName keyName
   */
  async hashGetAll(keyName: string): Promise<{ [key: string]: string }> {
    return await this.redisService.hgetall(keyName);
  }

  /**
   * Hash Delete
   * @param {string} keyName keyName
   * @param {string} key key
   */
  async hashDel(keyName: string, key: string): Promise<number> {
    return await this.redisService.hdel(keyName, key);
  }

  /**
   * List lpush
   * @param key
   * @param value
   */
  async lpush(key: string, value: string): Promise<number> {
    return await this.redisService.lpush(key, value);
  }

  /**
   * List rpoplpush
   * @param key
   * @param destination
   */
  async rpoplpush(key: string, destination: string): Promise<string> {
    return await this.redisService.rpoplpush(key, destination);
  }

  /**
   * List lpop
   * @param key
   */
  async lpop(key: string): Promise<string> {
    return await this.redisService.lpop(key);
  }

  /**
   * List llen
   * @param key
   */
  async llen(key: string): Promise<number> {
    return await this.redisService.llen(key);
  }

  /**
   * List lpop
   * @param key
   */
  async rpop(key: string): Promise<string> {
    return await this.redisService.rpop(key);
  }

  /**
   * incr
   * @param key
   */
  async incr(key: string): Promise<number> {
    return await this.redisService.incr(key);
  }

  /**
   * decr
   * @param key
   */
  async decr(key: string): Promise<number> {
    return await this.redisService.decr(key);
  }
}
