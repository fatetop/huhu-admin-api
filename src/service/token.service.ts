import { Provide } from '@midwayjs/decorator';

import { BaseService } from '../core/base_service';
import { REDIS_EXPIRE, REDIS_SUCCESS_MSG } from '../common/constant';
import { IResponse } from '../interface';
import { getEncryptLoginToken, getUserRealToken, isEmpty } from '../utils';

@Provide()
export class TokenService extends BaseService {
  async setToken(account: string, uid: number, nickname: string) {
    const key = getUserRealToken(account);
    const setRes = await this.redisService.setValue(key, { account, uid, nickname }, REDIS_EXPIRE.USER_LOGIN);
    if (setRes !== REDIS_SUCCESS_MSG) {
      this.fail(this.APP_ERROR_TYPES.LOGIN_ERROR);
    }
    return getEncryptLoginToken(key);
  }

  async expireToken(token: string) {
    const { tokenData, cacheName } = await this.getTokenData(token);
    if (isEmpty(tokenData)) {
      this.fail(this.APP_ERROR_TYPES.TOKEN_INVALID_ERROR);
    }
    await this.redisService.expire(cacheName, REDIS_EXPIRE.USER_LOGIN);
    return tokenData;
  }

  private async getTokenData(token: string) {
    const cacheName = token;
    const tokenData: IResponse.IUser.ITokenInfo = await this.redisService.getValue(cacheName);
    return { tokenData, cacheName };
  }
}
