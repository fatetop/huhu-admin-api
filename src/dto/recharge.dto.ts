import { ApiProperty } from '@midwayjs/swagger';

import { BaseResponse, PageBetweenTimeData, PageDataResponse, RuleIntAllowNull, RuleStringOptional } from '../core/base_dto';
import { Rule } from '@midwayjs/validate';

class UserRechargeLogsItemDto {
  @ApiProperty({ type: 'number', example: 1, description: '用户id', required: true })
  uid: number;

  @ApiProperty({ type: 'string', example: 'ALIPAY', description: '充值方式Code', required: true })
  rechargeMethodCode: string;

  @ApiProperty({ type: 'number', example: 648, description: '充值金额', required: true })
  rechargeMoney: number;

  @ApiProperty({ type: 'number', example: 30, description: '充值赠送金额', required: true })
  rechargeFree: number;

  @ApiProperty({ type: 'string', example: '', description: '充值文案', required: true })
  rechargeName: string;

  @ApiProperty({ type: 'string', example: '7198600002921304064', description: '系统订单号', required: true })
  sysTradeNo: string;

  @ApiProperty({ type: 'string', example: '7198600002921304064', description: '三方商户订单号', required: true })
  tradeNo: string;

  @ApiProperty({ type: 'string', example: '2024-05-23 14:59:52', description: '充值时间', required: true })
  createTime: string;

  @ApiProperty({ type: 'string', example: '2024-05-23 14:59:52', description: '充值确认时间', required: true })
  updateTime: string;
}

class UserRechargeLogsDataDto extends PageDataResponse<UserRechargeLogsItemDto> {
  @ApiProperty({ type: [UserRechargeLogsItemDto], description: '分页数据', required: true })
  records: UserRechargeLogsItemDto[];
}

export class UserRechargeLogsRespDto extends BaseResponse<UserRechargeLogsDataDto> {
  @ApiProperty({ type: UserRechargeLogsDataDto, description: 'data', required: true })
  data: UserRechargeLogsDataDto;
}

export class RechargeLogsReqDto extends PageBetweenTimeData {
  @ApiProperty({ type: 'number', example: 1, description: '用户id', required: false })
  @Rule(RuleIntAllowNull)
  uid: number;

  @ApiProperty({ type: 'string', example: 'WX', description: '充值方式', required: false })
  @Rule(RuleStringOptional)
  rechargeMethodCode: string;

  @ApiProperty({ type: 'string', example: '12asidjn09120123sad', description: '系统订单号', required: false })
  @Rule(RuleStringOptional)
  sysTradeNo: string;

  @ApiProperty({ type: 'string', example: '12asidjn09120123sad', description: '三方商户订单号', required: false })
  @Rule(RuleStringOptional)
  tradeNo: string;
}
