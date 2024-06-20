import { T_AppErrorType } from './error_msg.error';

export class SysError extends Error {
  code: number;
  errors: any[] | undefined;
  details?: unknown;
  status: number;

  constructor(appErrorType: T_AppErrorType, errors?: any[], status?: number) {
    const [message, code, httpStatus] = appErrorType;
    super(message + ` &>${code || ''}`);
    this.code = code;
    this.errors = errors;
    this.status = status || httpStatus || 400;
  }
}
