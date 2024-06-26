import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import * as stream from 'stream';

@Middleware()
export class AccessLogMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const requestBody = ctx.request.method === 'GET' ? ctx.request.query : ctx.request.body || {};
      ctx.logger.info('requestQuery %j', requestBody);
      await next();
      const { body } = ctx;
      if (!(body instanceof stream.Readable) && !Buffer.isBuffer(body)) {
        ctx.logger.info('responseBody %j', body);
      }
    };
  }

  ignore(ctx: Context): boolean {
    const regExp = /\/swagger-u.*/u;
    return regExp.test(ctx.path);
  }

  static getName(): string {
    return 'accessLog';
  }
}
