import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

import { BaseController } from '../core/base_controller';
import { UserService } from '../service/user.service';
import { UserDto } from '@/dto';

@ApiSecurity('Authorization')
@ApiTags('user')
@Controller('/user')
export class UserController extends BaseController {
  @Inject()
  private userService: UserService;

  @ApiOperation({ summary: '用户列表' })
  @ApiResponse({ status: 200, description: 'Success', type: UserDto.UserListRespDto })
  @Get('/')
  @Validate({ locale: 'zh_CN' })
  async getUserList(@Query() query: UserDto.UserListReqDto) {
    const { page, pageSize, startTime, endTime, uid, phone, bid } = query;
    return await this.userService.userList(page, pageSize, startTime, endTime, uid, phone, bid);
  }
}
