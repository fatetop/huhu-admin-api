import { Inject, Controller, Post, File } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

import { BaseController } from '../core/base_controller';
import { UploadOssService } from '../service/common/oss.service';
import { UploadDto } from '../dto';
import { IUpload } from '../interface';

@ApiSecurity('Authorization')
@ApiTags('upload')
@Controller('/upload')
export class UploadController extends BaseController {
  @Inject()
  private uploadOssService: UploadOssService;

  @ApiOperation({ summary: '图片上传', description: '限制单文件，最大3MB，只支持png/jpg/jpeg/gif纯图片，可执行文件改后缀无效' })
  @ApiResponse({ status: 200, description: 'Success', type: UploadDto.UploadFileRespDto })
  @Post('/file')
  @Validate({ locale: 'zh_CN' })
  async uploadFile(@File() file: IUpload.IUploadFile) {
    return await this.uploadOssService.uploadFile(file);
  }
}
