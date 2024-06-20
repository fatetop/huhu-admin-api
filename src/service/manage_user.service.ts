import { Provide, Inject } from '@midwayjs/decorator';

import { BaseService } from '../core/base_service';
import { TokenService } from './token.service';
import { ManageUserModel } from '@/model_admin';

@Provide()
export class ManageUserService extends BaseService {
  @Inject()
  private tokenService: TokenService;

  @Inject()
  private manageUserModel: ManageUserModel;

  async getManageUserByAccount(account: string) {
    const manageUser = await this.manageUserModel.getOne({ account });
    if (!manageUser) {
      this.fail(this.APP_ERROR_TYPES.ACCOUNT_PASSWORD_ERROR);
    }
    return manageUser;
  }

  async tokenInfo(token: string) {
    const tokenInfo = await this.tokenService.expireToken(token);
    return { ...tokenInfo, token };
  }

  async getManageUserInfo() {
    const { uid, account, nickname } = this.getUserTokenInfo();
    const user = await this.getManageUserByAccount(account);
    return {
      uid,
      account,
      name: nickname,
      avatar: user.avatar,
    };
  }
}
