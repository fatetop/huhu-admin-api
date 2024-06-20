import { OSSService, OSS } from '@midwayjs/oss';
import { Provide, Inject } from '@midwayjs/decorator';

import { BaseService } from '../../core/base_service';
import { calculateFileHash } from '../../utils';
import { IUpload } from '../../interface';

@Provide()
export class UploadOssService extends BaseService {
  @Inject()
  ossService: OSSService;

  async upload(files: IUpload.IUploadFile[]) {
    const queue: Promise<{ url: string }>[] = [];
    files.map(file => queue.push(this.uploadFile(file)));
    const res = await Promise.all(queue);
    return res;
  }

  async uploadFile(file: IUpload.IUploadFile) {
    const hash = await calculateFileHash(file.data, 'md5').catch(error => console.error('Error calculating hash:', error));
    if (!hash) {
      this.fail(this.APP_ERROR_TYPES.UPDATE_ERROR);
    }
    const ext = `.${file.mimeType.split('/')[1]}`;
    const name = '/' + hash + ext;
    const url = await this.saveFileGetUrl(name, file.data);
    return { url };
  }

  private async saveFileGetUrl(name: string, file: any, options?: OSS.PutObjectOptions) {
    const result = await this.ossService.put(name, file, options);
    return result.url;
  }
}
