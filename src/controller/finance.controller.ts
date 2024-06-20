import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

import { BaseController } from '../core/base_controller';
import { RechargeDto } from '@/dto';
import { RechargeService } from '@/service/recharge.service';

@ApiSecurity('Authorization')
@ApiTags('finance')
@Controller('/finance')
export class FinanceController extends BaseController {
  @Inject()
  private rechargeService: RechargeService;

  @ApiOperation({ summary: '用户充值记录' })
  @ApiResponse({ status: 200, description: 'Success', type: RechargeDto.UserRechargeLogsRespDto })
  @Get('/recharge_logs')
  @Validate({ locale: 'zh_CN' })
  async getUserRechargeLogs(@Query() query: RechargeDto.RechargeLogsReqDto) {
    const { page, pageSize, startTime, endTime, uid, rechargeMethodCode, sysTradeNo, tradeNo } = query;
    return await this.rechargeService.userRechargeLogs(page, pageSize, startTime, endTime, uid, rechargeMethodCode, sysTradeNo, tradeNo);
  }
}
