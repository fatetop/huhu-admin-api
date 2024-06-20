import { SysError } from '../error/sys.error';
import { APP_ERROR_TYPES, T_AppErrorType, ErrorMapped, K_AppErrorType } from '../error/error_msg.error';

export abstract class BaseAspect {
  protected APP_ERROR_TYPES: ErrorMapped<K_AppErrorType> = APP_ERROR_TYPES;
  protected fail(errInfo: T_AppErrorType): never {
    throw new SysError(errInfo);
  }
}
