import * as dotenv from 'dotenv';
// load .env file in process.cwd
dotenv.config();

import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as oss from '@midwayjs/oss';
import * as upload from '@midwayjs/upload';
import * as axios from '@midwayjs/axios';
import { join } from 'path';
import { NotFoundFilter } from './filter/notfound.filter';
import { AccessLogMiddleware } from './middleware/access_log.middleware';
import { FormatMiddleware } from './middleware/format_response.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';

import * as redis from '@midwayjs/redis';
import * as orm from '@midwayjs/typeorm';
import * as swagger from '@midwayjs/swagger';

@Configuration({
  imports: [
    koa,
    validate,
    redis,
    orm,
    {
      component: swagger,
      enabledEnvironment: [process.env.SWAGGER_ENABLE_ENV],
    },
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    oss,
    upload,
    axios,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    this.loggerInfo();
    // add middleware
    this.app.useMiddleware([AccessLogMiddleware, FormatMiddleware, AuthMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter]);
  }

  loggerInfo() {
    console.log('[ Midway ] process.env.NODE_ENV', `\x1b[36m${process.env.NODE_ENV}\x1b[0m`);
    console.log('[ Midway ] Swagger UI HTML', `\x1b[36mhttp://127.0.0.1:${process.env.KOA_PORT}/swagger-ui/index.html\x1b[0m`);
    console.log('[ Midway ] Swagger UI JSON', `\x1b[36mhttp://127.0.0.1:${process.env.KOA_PORT}/swagger-ui/index.json\x1b[0m`);
  }
}
