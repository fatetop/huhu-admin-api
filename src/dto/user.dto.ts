import { ApiProperty } from '@midwayjs/swagger';

import { BaseResponse, PageBetweenTimeData, PageDataResponse, RuleIntAllowNull, RuleStringOptional } from '../core/base_dto';
import { Rule } from '@midwayjs/validate';

class UserListItemDto {
  @ApiProperty({ type: 'number', example: 1, description: '用户id', required: true })
  uid: number;

  @ApiProperty({ type: 'string', example: 'lt', description: '手机号', required: true })
  phone: string;

  @ApiProperty({ type: 'string', example: '用户_147624', description: '昵称', required: true })
  nickname: string;

  @ApiProperty({ type: 'string', example: 'https://ssss.com/aaaa.png', description: '头像', required: true, nullable: true })
  avatar: string;

  @ApiProperty({ type: 'string', example: '7198600002921304064', description: 'bid app内唯一id', required: true })
  bid: string;

  @ApiProperty({ type: 'string', example: 'wechat', description: '绑定其他账号 wechat,alipay,....', required: true, nullable: true })
  bindingOther: string;

  @ApiProperty({ type: 'string', example: '2024-05-23 14:59:52', description: '注册时间', required: true })
  createTime: string;

  @ApiProperty({ type: 'number', example: 1, description: '状态', required: true })
  status: number;

  @ApiProperty({ type: 'number', example: 1000, description: '真实充值', required: true })
  money: number;

  @ApiProperty({ type: 'number', example: 1000, description: '赠送', required: true })
  free: number;

  @ApiProperty({ type: 'number', example: 1000, description: '任务', required: true })
  task: number;

  @ApiProperty({ type: 'string', example: 'huhu', description: '注册渠道名', required: true })
  registerChannelName: string;

  @ApiProperty({ type: 'string', example: 'huhu', description: '登陆渠道名', required: true })
  loginChannelName: string;

  @ApiProperty({ type: 'string', example: '2024-05-23 14:59:52', description: '登录时间', required: true })
  loginTime: string;

  @ApiProperty({ type: 'number', example: 1000, description: '积分', required: true })
  integral: number;

  @ApiProperty({ type: 'string', example: 'DZUFQQQ', description: '邀请码', required: true })
  inviteCode: string;
}

class UserListDataDto extends PageDataResponse<UserListItemDto> {
  @ApiProperty({ type: 'number', example: 1, description: '用户id', required: true })
  records: UserListItemDto[];
}

export class UserListRespDto extends BaseResponse<UserListDataDto> {
  @ApiProperty({ type: UserListDataDto, description: 'data', required: true })
  data: UserListDataDto;
}

export class UserListReqDto extends PageBetweenTimeData {
  @ApiProperty({ type: 'number', example: 1, description: '用户id', required: false })
  @Rule(RuleIntAllowNull)
  uid: number;

  @ApiProperty({ type: 'string', example: '15267036818', description: '手机号', required: false })
  @Rule(RuleStringOptional)
  phone?: string;

  @ApiProperty({ type: 'string', example: '7198600002921304064', description: 'bid app内唯一id', required: false })
  @Rule(RuleStringOptional)
  bid?: string;
}
