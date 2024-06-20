import { App, Inject } from '@midwayjs/decorator';
import { Context, Application } from '@midwayjs/koa';
import { ILogger } from '@midwayjs/logger';

export abstract class BaseController {
  @App()
  protected app: Application;

  @Inject()
  protected ctx: Context;

  @Inject()
  protected logger: ILogger;
}
