import { Inject, Controller, Post, Body, Put } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

import { BaseController } from '../core/base_controller';
import { LoginService } from '../service/login.service';
import { BaseDto, LoginDto } from '../dto';

@ApiTags('login')
@Controller('/login')
export class LoginController extends BaseController {
  @Inject()
  private loginService: LoginService;

  @ApiOperation({ summary: '账号密码登陆' })
  @ApiResponse({ status: 200, description: 'Success', type: LoginDto.UserPhoneLoginRespDto })
  @Post('/by_acc')
  @Validate({ locale: 'zh_CN' })
  async byAcc(@Body() body: LoginDto.UserAccLoginDto) {
    const { account, password, code } = body;
    return await this.loginService.byAcc(account, password, code);
  }

  @ApiOperation({ summary: '退出登陆' })
  @ApiResponse({ status: 200, description: 'Success', type: BaseDto.BaseResponse })
  @Put('/logout')
  @Validate({ locale: 'zh_CN' })
  async logout() {
    return await this.loginService.logout();
  }
}
