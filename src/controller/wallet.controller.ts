import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

import { BaseController } from '../core/base_controller';
import { WalletDto } from '../dto';
import { WalletService } from '../service/wallet.service';

@ApiSecurity('Authorization')
@ApiTags('wallet')
@Controller('/wallet')
export class WalletController extends BaseController {
  @Inject()
  private walletService: WalletService;

  @ApiOperation({ summary: '用户钱包余额变动记录' })
  @ApiResponse({ status: 200, description: 'Success', type: WalletDto.UserWalletBalanceChangeLogsRespDto })
  @Get('/change_logs')
  @Validate({ locale: 'zh_CN' })
  async getUserWalletBalanceChangeLogs(@Query() query: WalletDto.UserWalletBalanceChangeLogsReqDto) {
    const { page, pageSize, startTime, endTime, uid, type, source } = query;
    return await this.walletService.getUserWalletBalanceChangeLogs(page, pageSize, startTime, endTime, uid, type, source);
  }
}
