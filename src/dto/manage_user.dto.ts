import { ApiProperty } from '@midwayjs/swagger';

import { BaseResponse } from '../core/base_dto';

class ManageUserinfoRespDataDto {
  @ApiProperty({ type: 'number', example: 1, description: '用户id', required: true })
  uid: number;

  @ApiProperty({ type: 'string', example: 'lt', description: '账号', required: true })
  account: string;

  @ApiProperty({ type: 'string', example: '用户_147624', description: '昵称', required: true })
  name: string;

  @ApiProperty({ type: 'string', example: 'https://ssss.com/aaaa.png', description: '头像', required: true, nullable: true })
  avatar: string;
}

export class ManageUserinfoRespDto extends BaseResponse<ManageUserinfoRespDataDto> {
  @ApiProperty({ type: ManageUserinfoRespDataDto, description: 'data', required: true })
  data: ManageUserinfoRespDataDto;
}
