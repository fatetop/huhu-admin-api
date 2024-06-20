export interface IUserConfig {
  testApi: boolean;
  weChat: {
    encrypt: {
      privateKey: string;
    };
    signature: {
      privateKey: string;
    };
    certificate: string;
    appid: string;
    secret: string;
  };
}

export interface ISnowflakeConfigClient {
  dataCenterId: number;
  workerId: number;
  epoch: string;
}

export interface ISnowflakeConfig {
  client: ISnowflakeConfigClient;
}

export interface ISnowflakeConfigClient {
  dataCenterId: number;
  workerId: number;
  epoch: string;
}

export interface IRedLockConfigClient {
  driftFactor: number;
  retryCount: number;
  retryDelay: number;
  retryJitter: number;
}

export interface IRedLockConfig {
  client: IRedLockConfigClient;
}

export interface IRedisConfigClient {
  keyPrefix: string;
  port: number;
  host: string;
  password: string;
  db: number;
}

export interface IRedisConfig {
  client: IRedisConfigClient;
}
