import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

import { AuthService } from '../service/auth.service';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // auth
      const authService = await ctx.requestContext.getAsync(AuthService);
      const userInfo = await authService.validToken();
      ctx.state.userInfo = userInfo;
      await next();
    };
  }

  ignore(ctx: Context): boolean {
    const regExp = /\/swagger-u.*/u;
    const apiRegExp = /\/api\/(login|sms|home)/u;
    return regExp.test(ctx.path) || apiRegExp.test(ctx.path);
  }

  static getName(): string {
    return 'auth';
  }
}
