export enum INVOKE_ACTION {
  CODE_2_SESSION = 'code2session',
  CHECK_SESSION_KEY = 'checkSessionKey',
  GET_USER_PHONE = 'getUserPhoneNumber',
}

export interface IInvokeCode2Session {
  action: 'code2session';
  code: string;
}

export interface ICheckSessionKey {
  action: 'checkSessionKey';
  openid: string;
  sessionKey: string;
}

export interface IGetUserPhoneNumber {
  action: 'getUserPhoneNumber';
  code: string;
  openid?: string;
}

export type IWeChatInvoke = IInvokeCode2Session | ICheckSessionKey | IGetUserPhoneNumber;

export interface IBaseResp {
  errcode: number; //	错误码
  errmsg: string; // 错误信息
}

export interface IRespGetAccessToken {
  access_token: string; // 获取到的凭证
  expires_in: number; // 凭证有效时间，单位：秒。目前是7200秒之内的值。
}

export interface IRespCode2session extends IBaseResp {
  session_key: string; //	会话密钥
  unionid: string; //	用户在开放平台的唯一标识符，若当前小程序已绑定到微信开放平台账号下会返回，详见 UnionID 机制说明。
  openid: string; // 用户唯一标识
}

export interface IRespCheckSessionKey extends IBaseResp {
  errcode: number; //	错误码
}

export interface IRespGetUserPhoneNumber extends IBaseResp {
  phone_info: {
    phoneNumber: string; //	用户绑定的手机号（国外手机号会有区号）
    purePhoneNumber: string; //	没有区号的手机号
    countryCode: string; //	区号
    //数据水印
    watermark: {
      timestamp: number; //	用户获取手机号操作的时间戳
      appid: string; //	小程序 appid
    };
  };
}
