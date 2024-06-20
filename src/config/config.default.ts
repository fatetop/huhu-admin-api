import { MidwayConfig } from '@midwayjs/core';
import { renderSwaggerUIDist } from '@midwayjs/swagger';
import { uploadWhiteList } from '@midwayjs/upload';
import { tmpdir } from 'os';
import path from 'path';

const RedisConfig = {
  keyPrefix: process.env.REDIS_CLIENT_PREFIX,
  port: Number(process.env.REDIS_CLIENT_PORT || 6379),
  host: process.env.REDIS_CLIENT_HOST,
  password: process.env.REDIS_CLIENT_PASSWORD || '',
  db: Number(process.env.REDIS_CLIENT_DB || 12),
};

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1704274296545_7352',
  koa: {
    port: Number(process.env.KOA_PORT) ?? 10888,
    globalPrefix: '/api',
  },

  midwayLogger: {
    default: {
      dir: process.env.LOGGER_PATH ?? '/app/logs',
      maxSize: '100m',
      // maxFiles: '3d',
    },
    clients: {
      coreLogger: {
        level: 'info',
        consoleLevel: 'warn',
      },
      appLogger: {
        level: 'info',
        consoleLevel: 'warn',
      },
    },
  },

  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        synchronize: false,
        entities: ['**/entity/*.entity{.ts,.js}'],
        timezone: '+08:00',
        logging: process.env.ORM_LOG === '1' ? true : false,
        dateStrings: true,
        supportBigNumbers: true,
        bigNumberStrings: false,
        host: process.env.ORM_HOST,
        port: Number(process.env.ORM_PORT),
        username: process.env.ORM_USERNAME,
        password: process.env.ORM_PASSWORD,
        database: process.env.ORM_DATABASE,
      },
      admin: {
        type: 'mysql',
        synchronize: false,
        entities: ['**/entity_admin/*.entity{.ts,.js}'],
        timezone: '+08:00',
        logging: process.env.ORM_ADMIN_LOG === '1' ? true : false,
        dateStrings: true,
        supportBigNumbers: true,
        bigNumberStrings: false,
        host: process.env.ORM_ADMIN_HOST,
        port: Number(process.env.ORM_ADMIN_PORT),
        username: process.env.ORM_ADMIN_USERNAME,
        password: process.env.ORM_ADMIN_PASSWORD,
        database: process.env.ORM_ADMIN_DATABASE,
      },
    },
  },

  redis: {
    client: RedisConfig,
  },

  swagger: {
    title: 'Big School',
    description: 'Big School server',
    version: '1.0.0',
    tags: [],
    tagSortable: true,
    swaggerUIRender: renderSwaggerUIDist,
    auth: {
      authType: 'bearer',
      name: 'Authorization',
    },
  },

  oss: {
    // normal oss bucket
    client: {
      accessKeyId: process.env.OSS_ID,
      accessKeySecret: process.env.OSS_SECRET,
      bucket: process.env.OSS_BUCKET,
      endpoint: process.env.OSS_ENDPOINT,
      timeout: '60s',
      region: process.env.OSS_REGION,
      cname: true,
    },
  },

  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '3mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: ['.jpg', '.jpeg', '.png', '.gif'] || uploadWhiteList.filter(ext => ext !== '.pdf'),
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: path.join(tmpdir(), 'midway-upload-files'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 1 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
    // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
    match: /\/api\/upload\/.*?/,
    // 仅允许下面这些文件类型可以上传
    mimeTypeWhiteList: {
      '.jpg': 'image/jpeg',
      // 也可以设置多个 MIME type，比如下面的允许 .jpeg 后缀的文件是 jpg 或者是 png 两种类型
      '.jpeg': ['image/jpeg', 'image/png'],
      // 其他类型
      '.gif': 'image/gif',
      '.png': 'image/png',
      // '.bmp': 'image/bmp',
      // '.wbmp': 'image/vnd.wap.wbmp',
      // '.webp': 'image/webp',
    },
  },

  snowflake: {
    client: {
      dataCenterId: Number(process.env.SNOWFLAKE_DATA_CENTER_ID ?? 1),
      workerId: Number(process.env.SNOWFLAKE_WORKER_ID ?? 1),
      epoch: process.env.SNOWFLAKE_EPOCH ?? '2014-01-01',
    },
  },

  redLock: {
    client: {
      driftFactor: Number(process.env.RED_LOCK_DRIFT_FACTOR ?? 0.01), // 定时器漂移因子
      retryCount: Number(process.env.RED_LOCK_RETRY_COUNT ?? 10), // 重试次数
      retryDelay: Number(process.env.RED_LOCK_RETRY_DELAY ?? 200), // 重试延迟 200, // 重试延迟
      retryJitter: Number(process.env.RED_LOCK_RETRY_JITTER ?? 200), // 重试延迟的随机抖动
    },
  },

  userConfig: {
    testApi: false,
  },
} as MidwayConfig;
