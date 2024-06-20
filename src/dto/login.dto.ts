import { ApiProperty } from '@midwayjs/swagger';
import { Rule } from '@midwayjs/validate';

import { BaseResponse, RuleStringRequired } from '../core/base_dto';

export class UserAccLoginDto {
  @ApiProperty({ type: 'string', example: '15267036818', description: '账号', required: true })
  @Rule(RuleStringRequired)
  account: string;

  @ApiProperty({ type: 'string', example: '12345678', description: '密码', required: true })
  @Rule(RuleStringRequired)
  password: string;

  @ApiProperty({ type: 'string', example: '1234', description: '滑动验证码', required: true })
  @Rule(RuleStringRequired)
  code: string;
}

export class UserPhoneLoginRespData {
  @ApiProperty({ type: 'number', example: 1, description: 'uid', required: true })
  uid: number;

  @ApiProperty({ type: 'string', example: '用户_129044', description: 'nickname', required: true })
  nickname: string;

  @ApiProperty({
    type: 'string',
    example: 'ZFhObGNsODBYMk13TjJKallUTTVNemxrTUdVMFpqbGtNemd6WlRnM1pUazFNVFJrWkRKbQ==',
    description: 'Authorization Bearer token',
    required: true,
  })
  token: string;
}

export class UserPhoneLoginRespDto extends BaseResponse<UserPhoneLoginRespData> {
  @ApiProperty({ type: UserPhoneLoginRespData, description: 'data' })
  data: UserPhoneLoginRespData;
}
