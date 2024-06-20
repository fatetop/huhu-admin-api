import { BaseResponse, PageBetweenTimeData, PageDataResponse, RuleIntAllowNull } from '@/core/base_dto';
import { ApiProperty } from '@midwayjs/swagger';
import { Rule } from '@midwayjs/validate';

export class UserWalletBalanceChangeLogsReqDto extends PageBetweenTimeData {
  @ApiProperty({ type: 'number', example: 1, description: '用户id', required: true })
  @Rule(RuleIntAllowNull)
  uid: number;

  @ApiProperty({ type: 'number', example: 1, description: '类型 1 添加 2 减少', nullable: true })
  @Rule(RuleIntAllowNull.valid(1, 2))
  type: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: '来源 1 充值 2 提现 3 赠送 4 发布任务扣除 5 取消发布任务退回 6 任务报酬 7 任务人数不足退回',
    nullable: true,
  })
  @Rule(RuleIntAllowNull.valid(1, 2, 3, 4, 5, 6))
  source: number;
}

class UserWalletBalanceChangeLogsDataItemDto {
  @ApiProperty({ type: 'number', example: 1, description: '记录id', required: true })
  id: number;

  @ApiProperty({ type: 'number', example: 1, description: '用户id', required: true })
  uid: number;

  @ApiProperty({ type: 'string', example: '2024-05-23 14:59:52', description: '时间', required: true })
  createTime: string;

  @ApiProperty({ type: 'number', example: 1000, description: '真实充值', required: true })
  money: number;

  @ApiProperty({ type: 'number', example: 1000, description: '赠送', required: true })
  free: number;

  @ApiProperty({ type: 'number', example: 1000, description: '任务', required: true })
  task: number;

  @ApiProperty({ type: 'number', example: 1, description: '类型 1 添加 2 减少', nullable: true })
  type: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: '来源 1 充值 2 提现 3 赠送 4 发布任务扣除 5 取消发布任务退回 6 任务报酬 7 任务人数不足退回',
    nullable: true,
  })
  source: number;
}

class UserWalletBalanceChangeLogsDataDto extends PageDataResponse<UserWalletBalanceChangeLogsDataItemDto> {
  @ApiProperty({ type: [UserWalletBalanceChangeLogsDataItemDto], description: '分页数据', required: true })
  records: UserWalletBalanceChangeLogsDataItemDto[];
}

export class UserWalletBalanceChangeLogsRespDto extends BaseResponse<UserWalletBalanceChangeLogsDataDto> {
  @ApiProperty({ type: UserWalletBalanceChangeLogsDataDto, description: 'data', required: true })
  data: UserWalletBalanceChangeLogsDataDto;
}
