import { HttpStatus } from '@midwayjs/core';

export type K_AppErrorType =
  | 'FORBIDDEN'
  | 'SYSTEM_ERROR'
  | 'UPDATE_ERROR'
  | 'DELETE_ERROR'
  | 'ACCOUNT_PASSWORD_ERROR'
  | 'LOGIN_ERROR'
  | 'TOKEN_INVALID_ERROR'
  | 'CHANNEL_DISABLE'
  | 'DATA_CACHE_ERROR'
  | 'UPLOAD_FAIL'
  | 'SNOWFLAKE_GENERATE_ERROR'
  | 'PARAMS_ERROR';

export type T_AppErrorType = [errorMessage: string, errorCode: number, httpStatus?: HttpStatus];

export type ErrorMapped<T extends string | number | symbol> = {
  [K in T]: T_AppErrorType;
};

export const APP_ERROR_TYPES: ErrorMapped<K_AppErrorType> = {
  FORBIDDEN: ['Forbidden', HttpStatus.FORBIDDEN],
  SYSTEM_ERROR: ['系统错误', 1000, HttpStatus.OK],
  UPDATE_ERROR: ['更新失败', 1001, HttpStatus.OK],
  DELETE_ERROR: ['删除失败', 1002, HttpStatus.OK],
  ACCOUNT_PASSWORD_ERROR: ['账号或密码错误请重试', 2002, HttpStatus.OK],
  LOGIN_ERROR: ['登录错误，请重试！', 2003, HttpStatus.OK],
  TOKEN_INVALID_ERROR: ['登录已失效，请先登录！', 2004, HttpStatus.UNAUTHORIZED],
  CHANNEL_DISABLE: ['该渠道已禁用，请重新选择渠道！', 2006, HttpStatus.OK],
  DATA_CACHE_ERROR: ['数据缓存获取失败', 2007, HttpStatus.OK],
  UPLOAD_FAIL: ['上传失败', 2008, HttpStatus.OK],
  SNOWFLAKE_GENERATE_ERROR: ['雪花id生成失败', 2009, HttpStatus.OK],
  PARAMS_ERROR: ['参数不正确', 2013, HttpStatus.UNPROCESSABLE_ENTITY],
};
