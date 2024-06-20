import { ApiProperty } from '@midwayjs/swagger';
import { Rule } from '@midwayjs/validate';

import { BaseResponse, RuleStringRequired } from '../core/base_dto';

class UploadFileRespDataDto {
  @ApiProperty({ type: 'string', example: 'https://xxxx.png', description: 'image url', required: true })
  @Rule(RuleStringRequired)
  url: string;
}

export class UploadFileRespDto extends BaseResponse<UploadFileRespDataDto> {
  @ApiProperty({ type: UploadFileRespDataDto, description: 'data', required: true })
  data: UploadFileRespDataDto;
}
