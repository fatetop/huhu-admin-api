import { Provide, Inject } from '@midwayjs/decorator';

import { BaseService } from '../core/base_service';
import { UserModel } from '@/model';

@Provide()
export class UserService extends BaseService {
  @Inject()
  private userModel: UserModel;

  async userList(page = 1, pageSize = 10, startTime?: string, endTime?: string, uid?: number, phone?: string, bid?: string) {
    const data = await this.userModel.userList(page, pageSize, startTime, endTime, uid, phone, bid);
    return data;
  }
}
