import { Provide, Inject } from '@midwayjs/decorator';

import { BaseService } from '../core/base_service';
import { ManageUserService } from './manage_user.service';
import { getDecryptLoginToken } from '../utils';

@Provide()
export class AuthService extends BaseService {
  @Inject()
  private manageUserService: ManageUserService;

  async validToken() {
    const auth = this.ctx.headers['authorization'] as string;
    if (!auth || !/^Bearer$/i.test(auth.split(' ')?.[0]) || !auth.split(' ')?.[1]) {
      this.fail(this.APP_ERROR_TYPES.TOKEN_INVALID_ERROR);
    }
    try {
      const token = getDecryptLoginToken(auth.split(' ')[1]);
      const userInfo = await this.manageUserService.tokenInfo(token);
      return userInfo;
    } catch (err) {
      this.fail(this.APP_ERROR_TYPES.TOKEN_INVALID_ERROR);
    }
  }
}
