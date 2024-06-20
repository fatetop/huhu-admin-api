import fs from 'fs';
import crypto, { BinaryToTextEncoding } from 'crypto';
import _ from 'lodash';
import BigNumber from 'bignumber.js';

import { SMS_CONFIG, LOGIN_TOKEN_CONFIG, REDIS_KEY } from '../common/constant';
import Time, { TIME_FORMAT } from './time';
import { VipGrowthValueEntity } from '../entity';

/**
 * 检查提供的值是否为空或只包含空格。
 * @param all - 任意类型的值，将被检查是否为空或只包含空格。
 * @returns 返回一个布尔值，表示提供的值是否为空或只包含空格。
 */
export function isEmpty(all: any) {
  // 使用lodash的isEmpty方法和正则表达式联合检查字符串是否为空或只包含空格
  return _.isEmpty(all);
}

/**
 * 分页配置
 * @param page
 * @param pageSize
 * @returns
 */
export function pageConfig(page = 1, pageSize = 10) {
  page = Number(page);
  page = isNaN(page) ? 1 : page;
  page = page < 1 ? 1 : page;
  let limit = Number(pageSize);
  limit = isNaN(limit) ? 10 : limit;
  limit = limit < 1 ? 10 : limit;
  const offset = page * limit - limit;
  return { skip: offset, take: limit };
}

/**
 * 分页数据
 * @param data
 * @param page
 * @param pageSize
 * @param count
 * @returns
 */
export function basePageData<T>(data: T[] = [], page = 1, pageSize = 10, count: number) {
  const pageData = {
    currentPage: Number(page),
    pageSize: Number(pageSize),
    count: Number(count),
    totalPages: Math.ceil(count / pageSize),
    records: data,
  };
  return pageData;
}

/**
 * 创建昵称
 * @return  昵称
 */
export const createNickname = () => `用户_${getRandomByNumber(6)}`;

/**
 * 获取指定位数的随机数字字符串
 * @param num 指定位数 默认值是4
 * @return 数字字符串
 */
export const getRandomByNumber = (num = 4) => {
  if (num < 1) return '';
  return Math.floor(Math.random() * 10 ** (num - 1) + 10 ** (num - 1)).toString();
};

/**
 * 四舍五入保留指定位数的数字
 * @param  num 数字
 * @param isNeedAccurate 需不需要精确
 * @param  prefix 保留几位小数
 * @return  保留小数位后的数
 */
export const transferNumber = (num: number, isNeedAccurate = false, prefix = 0) => {
  if (num == null || num === undefined) {
    return 0;
  }
  if (!isNeedAccurate) {
    return Number(num.toFixed(prefix));
  }
  const base = 10 ** prefix;
  return Math.round(num * base) / base;
};

/**
 * 获取短信验证码的过期时间
 * 该函数没有参数。
 * @returns  返回一个Date对象，表示短信验证码的过期时间。
 */
export const getSmsCodeExpireTime = () => new Date(new Time().add(SMS_CONFIG.SMS_CODE_EXPIRE_M, TIME_FORMAT.DATE, 'minutes'));

/**
 * 计算文件的哈希值
 * @param filePath 文件路径
 * @param algorithm 哈希算法，默认为sha256
 * @returns  返回一个Promise对象，resolve时返回一个字符串，表示文件的哈希值。
 */
export const calculateFileHash = (filePath: string, algorithm = 'sha256') => {
  return new Promise<string>((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(hash);
    readStream.on('error', reject);
    readStream.on('end', readStream.close);
    hash.on('finish', () => {
      const digest = hash.digest('hex');
      resolve(digest);
    });
  });
};

/**
 * 获取用户真实登录token
 * @param phone
 * @returns
 */
export function getUserRealToken(phone: string) {
  const nonce = getRandomByNumber();
  const key = `${REDIS_KEY.USER_LOGIN}${phone}_${new Date().getTime()}_${nonce}`;
  return key;
}

/**
 * 获取加密后的登录token
 * @param str
 * @returns
 */
export function getEncryptLoginToken(str: string) {
  const { ALGORITHM, KEY, IV, INPUT_ENCODING, OUTPUT_ENCODING } = LOGIN_TOKEN_CONFIG;
  const encryptStr = encrypt(str, ALGORITHM, KEY, IV, INPUT_ENCODING, OUTPUT_ENCODING);
  return Buffer.from(encryptStr).toString(OUTPUT_ENCODING);
}

/**
 * 获取解密后的登录redis key
 * @param str
 * @returns
 */
export function getDecryptLoginToken(str: string) {
  const { ALGORITHM, KEY, IV, INPUT_ENCODING, OUTPUT_ENCODING } = LOGIN_TOKEN_CONFIG;
  const decryptStr = Buffer.from(str, OUTPUT_ENCODING).toString(INPUT_ENCODING);
  return decrypt(decryptStr, ALGORITHM, KEY, IV, OUTPUT_ENCODING, INPUT_ENCODING);
}

/**
 * 加密
 * @param text
 * @param algorithm
 * @param key
 * @param iv
 * @param inputEncoding
 * @param outputEncoding
 * @returns
 */
export function encrypt(
  text: string,
  algorithm: string,
  key: crypto.CipherKey,
  iv: crypto.BinaryLike = null,
  inputEncoding: crypto.Encoding = 'utf8',
  outputEncoding: crypto.Encoding = 'base64'
) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, inputEncoding, outputEncoding);
  encrypted += cipher.final(outputEncoding);
  return encrypted;
}

/**
 * 解密
 * @param text
 * @param algorithm
 * @param key
 * @param iv
 * @param inputEncoding
 * @param outputEncoding
 * @returns
 */
export function decrypt(
  text: string,
  algorithm: string,
  key: crypto.CipherKey,
  iv: crypto.BinaryLike = null,
  inputEncoding: crypto.Encoding = 'base64',
  outputEncoding: crypto.Encoding = 'utf8'
) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, inputEncoding, outputEncoding);
  decrypted += decipher.final(outputEncoding);
  return decrypted;
}

export function encryptHmac(
  text: string,
  algorithm: string,
  key: crypto.BinaryLike | crypto.KeyObject,
  outputEncoding: BinaryToTextEncoding = 'hex'
) {
  const hash = crypto.createHmac(algorithm, key);
  hash.update(text);
  return hash.digest(outputEncoding);
}

/**
 * 获取会员等级
 * @param vipGrowthValue
 * @param growthValue
 */
export function getVipLevel(vipGrowthValue: VipGrowthValueEntity[], growthValue: number) {
  return vipGrowthValue?.find((item, index) =>
    growthValue >= item.growthValue && vipGrowthValue?.[index + 1]?.growthValue ? growthValue < vipGrowthValue[index + 1].growthValue : true
  )?.vipLevel;
}

/**
 * 函数bigAdd用于将多个大数（BigNumber）相加。
 * @param args 大数数组，可以接收多个大数参数。
 * @returns 返回相加结果的字符串表示，使用10进制。
 */
export function bigAdd(...args: BigNumber.Value[]) {
  let res = new BigNumber(0);
  for (const arg of args) {
    const a = new BigNumber(arg);
    res = a.plus(res);
  }
  return res.toString(10);
}

/**
 * 函数bigMinus用于执行多个BigNumber对象的减法运算。
 * @param args 多个BigNumber类型的值，表示要进行减法运算的数值序列。
 * @returns 返回减法运算结果的字符串表示，结果为10进制。
 */
export function bigMinus(...args: BigNumber.Value[]) {
  let res = new BigNumber(args.shift());
  for (const arg of args) {
    res = res.minus(arg);
  }
  return res.toString(10);
}

/**
 * 将多个大数字相乘。
 * @param args - 大数字数组，可以接收多个参数，每个参数表示一个大数字。
 * @returns 返回相乘结果的大数字字符串表示。
 */
export function bigMultiply(...args: BigNumber.Value[]) {
  let res = new BigNumber(1);
  for (const arg of args) {
    const a = new BigNumber(arg);
    res = a.multipliedBy(res);
  }
  return res.toString(10);
}

/**
 * 这个函数用于计算两个大数的除法运算。
 * @param numA 被除数，可以是任意大小的数字或字符串。
 * @param numB 除数，同样可以是任意大小的数字或字符串。
 * @returns 返回两个数相除的结果，以字符串形式呈现。如果除数为0、'0'、null或undefined，则返回'0'。
 */
export function bigDiv(numA: BigNumber.Value, numB: BigNumber.Value): string {
  const INVALID_DIVISOR = [0, '0', null, undefined];
  if (INVALID_DIVISOR.includes(numB as any)) {
    return '0';
  }
  try {
    const a = new BigNumber(numA);
    const b = new BigNumber(numB);
    const res = a.dividedBy(b);
    return res.toString(10);
  } catch (error) {
    return '0';
  }
}

/**
 * a < b true
 * @param numberA
 * @param numberB
 * @returns
 */
export function bigLt(numberA: BigNumber.Value, numberB: BigNumber.Value) {
  return new BigNumber(numberA).lt(numberB);
}

/**
 * 检查一个数是否可以被另一个数整除，即判断除法的结果是否有余数。
 * @param dividend 被除数
 * @param divisor 除数，必须不为零
 * @returns 如果被除数可以被除数整除，则返回true；否则返回false。
 */
export function isDivisibleWithoutRemainder(dividend: number, divisor: number) {
  // 首先，确保除数不为0以避免除以零错误
  if (divisor === 0) {
    throw new Error('Divisor cannot be zero');
  }

  // 使用Math.floor向下取整，然后与除法结果比较
  return Math.floor(+bigDiv(dividend, divisor)) === +bigDiv(dividend, divisor);
}
