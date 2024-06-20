import { Provide, Inject } from '@midwayjs/decorator';

import { BaseService } from '../core/base_service';
import { RechargeOrderModel } from '../model';
import { FindManyWhere } from '@/core/base_model';
import { RechargeOrderEntity } from '@/entity';
import { RECHARGE_ORDER_STATUS } from '@/common/constant';
import { Between } from 'typeorm';

@Provide()
export class RechargeService extends BaseService {
  @Inject()
  private rechargeOrderModel: RechargeOrderModel;

  async userRechargeLogs(
    page: number,
    pageSize: number,
    startTime?: string,
    endTime?: string,
    uid?: number,
    rechargeMethodCode?: string,
    sysTradeNo?: string,
    tradeNo?: string
  ) {
    const condition: FindManyWhere<RechargeOrderEntity> = {
      status: RECHARGE_ORDER_STATUS.SUCCESS,
    };
    if (startTime && endTime) {
      condition.createTime = Between(new Date(startTime), new Date(endTime));
    }
    if (uid) condition.uid = uid;
    if (rechargeMethodCode) condition.rechargeMethodCode = rechargeMethodCode;
    if (sysTradeNo) condition.sysTradeNo = sysTradeNo;
    if (tradeNo) condition.tradeNo = tradeNo;

    const logs = await this.rechargeOrderModel.getPageList(page, pageSize, condition, {
      select: ['uid', 'rechargeMethodCode', 'rechargeMoney', 'rechargeFree', 'rechargeName', 'sysTradeNo', 'tradeNo', 'createTime', 'updateTime'],
      order: { updateTime: 'DESC' },
    });
    return logs;
  }
}
