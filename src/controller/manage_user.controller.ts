import { Inject, Controller, Get } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

import { BaseController } from '../core/base_controller';
import { ManageUserDto } from '../dto';
import { ManageUserService } from '../service/manage_user.service';

@ApiSecurity('Authorization')
@ApiTags('manageUser')
@Controller('/manage_user')
export class ManageUserController extends BaseController {
  @Inject()
  private manageUserService: ManageUserService;

  @ApiOperation({ summary: '用户信息' })
  @ApiResponse({ status: 200, description: 'Success', type: ManageUserDto.ManageUserinfoRespDto })
  @Get('/')
  @Validate({ locale: 'zh_CN' })
  async getUser() {
    return await this.manageUserService.getManageUserInfo();
  }
}
