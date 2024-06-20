import crypto from 'crypto';

export const REDIS_EXPIRE = {
  DEFAULT: 1 * 60 * 60,
  LONG_EXPIRE: 2 * 24 * 60 * 60,
  SORT_EXPIRE: 5,
  USER_LOGIN: 7 * 24 * 60 * 60,
  WE_CHAT: {
    MINS_ACCESS_TOKEN: 3 * 60, // 2小时 - 3 分钟 刷新
  },
};

export const REDIS_KEY = {
  USER_LOGIN: 'user_login:',
  LOCK: {
    SNOWFLAKE: 'lock:snowflake',
    EMPLOYMENT_PARTICIPATE: 'lock:participate:',
  },
};

export const CONFIG_MODE_KEY = {
  EMPLOYMENT_DELAY_LIMIT_TIME: { MODE: 'employment', KEY: 'delay_limit_time' },
};

export const REDIS_SUCCESS_MSG = 'OK';

export const REDIS_QUEUE = {};

export enum DATA_SOURCE_NAME {
  DEFAULT = 'default',
  ADMIN = 'admin',
}

export const ASPECT = {
  EMPLOYMENT_PUBLISH: 'publish',
  WE_CHAT_INVOKE: 'getInvokeResp',
};

export const LOGIN_TOKEN_CONFIG = {
  ALGORITHM: 'aes-128-cbc',
  KEY: 'asjosad21bkj1223',
  IV: 'nasjnj12312kasnk',
  INPUT_ENCODING: 'utf8' as crypto.Encoding,
  OUTPUT_ENCODING: 'base64' as crypto.Encoding,
};

export const DEFAULT_CHANNEL_NO = 'huhu';

export const SMS_CONFIG = {
  SMS_UN_USED_HOURS: 3, // 3小时内有多少未使用的验证码
  SMS_UN_USED_COUNT: 3, // 限制多少小时有多少未使用的验证码
  SMS_CODE_EXPIRE_M: 5, // 验证码过期时间
  SMS_CODE_LENGTH: 4, // 验证码长度
};

export enum EXPECTED {
  FAIL,
  SUCCESS,
}

export enum SMS_CODE_STATUS {
  UNUSED,
  USED,
}

export enum CHANNEL_STATUS {
  DISABLE,
  ENABLE,
}

export enum BANNER_STATUS {
  HIDE,
  SHOW,
}

export enum BROADCAST_STATUS {
  HIDE,
  SHOW,
}

export enum VIP_GROwTH_LEVEL_STATUS {
  DISABLE,
  ENABLE,
}

export enum VIP_TYPE_STATUS {
  DISABLE,
  ENABLE,
}

export enum RECHARGE_TYPE_STATUS {
  DISABLE,
  ENABLE,
}

export enum RECHARGE_METHOD_STATUS {
  DISABLE,
  ENABLE,
}

export enum RECHARGE_ORDER_STATUS {
  FAIL,
  ING,
  SUCCESS,
}

export enum IS_HOT {
  NO,
  YES,
}

export const VIP_CONFIG = {
  START_LEVEL: 0,
  START_GROWTH_VALUE: 0,
  START_TYPE: null,
  START_NAME: null,
  START_EXPIRE_TIME: null,
};

export enum PAY_METHOD {
  WX_APPLETS = 'WX_APPLETS',
  WX_H5 = 'WX_H5',
  WX_INNER_H5 = 'WX_INNER_H5',
  WX = 'WX',
  ALIPAY = 'ALIPAY',
}

export enum PARTICIPANTS_TYPE {
  SINGLE = 1, // 单人
  MORE,
}

export enum EMPLOYMENT_ORDER_TIME_TYPE {
  LIMITED_TIME = 1, // 限时任务
  LONG,
}

export enum EMPLOYMENT_ORDER_STATUS {
  CAN_PARTICIPATE = 1, // 可参与
  FULL_PEOPLE, // 满员
  ING, // 进行中
  CANCEL, // 取消任务
  FINAL = 9, // 已完成
}

export enum BALANCE_CHANGE_TYPE {
  ADD = 1,
  MINUS,
}

// 来源 1 充值 2 提现 3 赠送 4 发布任务扣除 5 取消发布任务退回 6 任务报酬 7 任务人数不足退回
export enum BALANCE_CHANGE_SOURCE {
  DEPOSIT = 1, // 充值
  WITHDRAW, // 提现
  GIVE, // 赠送
  POST_TASK_DEDUCTION, // 发布任务扣除
  POST_TASK_CANCEL_RETURN, // 取消发布任务退回
  TASK_REWARD, // 任务报酬
  TASK_PEOPLE_NOT_ENOUGH_RETURN, // 任务人数不足退回
}

export enum EMPLOYMENT_VERIFY_DETAIL_ACTION {
  PARTICIPATE = 'PARTICIPATE',
  START = 'START',
  FINIAL = 'FINIAL',
  CANCEL = 'CANCEL', // 取消任务
  CANCEL_PARTICIPATE = 'CANCEL_PARTICIPATE', // 取消参与者参与
  DO_CANCEL_PARTICIPATE = 'DO_CANCEL_PARTICIPATE', // 参与者主动取消参与
}

// 0被发起人取消 1参与 2主动取消 9完成
export enum USER_EMPLOYMENT_ORDER_STATUS {
  PASSIVE_CANCEL = 0, // 0被发起人取消
  ING, // 参与
  DO_CANCEL, // 主动取消
  FINAL = 9, // 完成
}

export const ZERO_WALLET = {
  MONEY: 0,
  FREE: 0,
  TASK: 0,
};

export enum BALANCE_SORT {
  USE = 'USE', // 使用钱包扣除顺序
  BACK = 'BACK', // 退回钱包顺序
}

export enum CONFIG_STATUS {
  DISABLE,
  ENABLE,
}

export enum BINDING_OTHER {
  WECHAT = 'wechat',
  ALIPAY = 'alipay',
}

export enum PLATFORM {
  WECHAT = 'wechat',
}
