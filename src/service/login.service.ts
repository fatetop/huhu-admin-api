import { Provide, Inject } from '@midwayjs/decorator';

import { BaseService } from '../core/base_service';
import { TokenService } from './token.service';
import { getUserRealToken } from '../utils';
import { ManageUserService } from './manage_user.service';
import { ManageUserEntity } from '@/entity_admin';

@Provide()
export class LoginService extends BaseService {
  @Inject()
  tokenService: TokenService;

  @Inject()
  manageUserService: ManageUserService;

  async byAcc(account: string, password: string, code: string) {
    this.verifyCode(account, code);
    const manageUser = await this.manageUserService.getManageUserByAccount(account);
    this.verifyPassword(manageUser, password);
    return await this.userLogin(manageUser);
  }

  private verifyCode(account: string, code: string) {
    code;
  }

  private verifyPassword(manageUser: ManageUserEntity, password: string) {
    if (manageUser.password !== password) {
      this.fail(this.APP_ERROR_TYPES.ACCOUNT_PASSWORD_ERROR);
    }
  }

  private async userLogin(manageUser: ManageUserEntity) {
    const { id: uid, account, nickname } = manageUser;
    await this.logout(account);
    const token = await this.tokenService.setToken(account, uid, nickname);
    return { uid, nickname, token };
  }

  async logout(account?: string) {
    const user = this.getUserTokenInfo();
    const acc = (user && user.account) ?? account;
    const preKey = getUserRealToken(acc).replace(/_\d{13}_\d{4}$/, '_');
    const keysArr = await this.redisService.keys(`${preKey}*`);
    if (keysArr.length > 0) {
      // 不允许多端登陆
      await this.redisService.delByList(keysArr);
    }
  }
}
