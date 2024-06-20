import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export const RuleIntAllowNull = RuleType.number().integer().optional().allow(null, '');
export const RuleIntRequired = RuleType.number().integer().required();
export const RuleStringArrayOptional = RuleType.array().optional().allow(null).items(RuleType.string());
export const RuleStringOptional = RuleType.string().optional().allow(null, '');
export const RuleStringRequired = RuleType.string().required();
export const RuleDateOptional = RuleType.date().optional().allow(null, '');
export const RuleDateRequired = RuleType.date().required();

export abstract class BaseResponse<T> {
  @ApiProperty({ type: 'number', example: 0, description: 'code', required: true })
  code: number;

  @ApiProperty({ type: 'string', example: 'success', description: 'msg', required: true })
  msg: string;

  @ApiProperty({ type: 'object', example: {}, description: 'response data' })
  abstract data: T;
}

export abstract class PageData {
  @ApiProperty({ type: 'number', example: 1, description: 'page', default: 1 })
  @Rule(RuleIntAllowNull.min(1).default(1))
  page: number;

  @ApiProperty({ type: 'number', example: 10, description: 'pageSize', default: 10 })
  @Rule(RuleIntAllowNull.min(1).default(10))
  pageSize: number;
}

export abstract class PageDataResponse<T> {
  @ApiProperty({ type: 'number', example: 1, description: 'currentPage', required: true })
  currentPage: number;

  @ApiProperty({ type: 'number', example: 10, description: 'pageSize', required: true })
  pageSize: number;

  @ApiProperty({ type: 'number', example: 12, description: 'count', required: true })
  count: number;

  @ApiProperty({ type: 'number', example: 2, description: 'totalPages', required: true })
  totalPages: number;

  @ApiProperty({ type: 'array', example: [], description: 'page data list', required: true })
  abstract records: T[];
}

export abstract class BetweenTime {
  @ApiProperty({ type: 'string', default: null, example: '2022-11-29 20:59:46' })
  @Rule(RuleDateOptional)
  startTime: string;

  @ApiProperty({ type: 'string', default: null, example: '2022-11-29 20:59:46' })
  @Rule(RuleDateOptional)
  endTime: string;
}

export abstract class PageBetweenTimeData extends BetweenTime {
  @ApiProperty({ type: 'number', example: 1, description: 'page', default: 1 })
  @Rule(RuleIntAllowNull.min(1).default(1))
  page: number;

  @ApiProperty({ type: 'number', example: 10, description: 'pageSize', default: 10 })
  @Rule(RuleIntAllowNull.min(1).default(10))
  pageSize: number;
}
