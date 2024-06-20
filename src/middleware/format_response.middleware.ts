import { IMiddleware, HttpStatus } from '@midwayjs/core';
import { Middleware, App } from '@midwayjs/decorator';
import { NextFunction, Context, Application } from '@midwayjs/koa';
import * as stream from 'stream';
import { SysError } from '../error/sys.error';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  @App()
  app: Application;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        const data = await next();
        if (data instanceof stream.Readable || Buffer.isBuffer(data)) {
          return;
        }

        return {
          code: 0,
          msg: 'success',
          data: data ?? {},
        };
      } catch (err) {
        ctx.app.emit('error', err, ctx);
        this.errorHandler(ctx, err);
      }
    };
  }

  private errorHandler(ctx: Context, err: SysError) {
    const sysErr = err;
    const [message, messageStatus] = sysErr.message.split(' &>');
    const code: number | string = /^VALIDATE/.test(sysErr?.code?.toString())
      ? HttpStatus.UNPROCESSABLE_ENTITY
      : sysErr?.code || parseInt(messageStatus) || HttpStatus.INTERNAL_SERVER_ERROR;
    const status = sysErr.status || parseInt(messageStatus) || HttpStatus.INTERNAL_SERVER_ERROR;
    ctx._internalError = sysErr;
    const error = status === HttpStatus.INTERNAL_SERVER_ERROR && this.app.getEnv() === 'production' ? 'Internal Server Error' : message;

    ctx.body = {
      code: Number(code),
      msg: error,
      data: {},
    };
    ctx.status = status;
  }

  static getName(): string {
    return 'format';
  }
}
