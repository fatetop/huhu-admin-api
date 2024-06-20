export interface ITokenInfo {
  account: string;
  uid: number;
  nickname: string;
}

export interface IUserTokenInfo extends ITokenInfo {
  token: string;
}

export interface IUserVip {
  level: number;
  growthValue: number;
  vipType: null | number;
  vipName: null | string;
  expireTime: null | Date;
}
