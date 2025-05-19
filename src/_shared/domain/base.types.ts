import { BaseError } from './error/base.error';

export interface BaseResponse<T = any, E = BaseError> {
  statusCode: number;
  data: T;
  error: E | string;
}

export interface ListResponse<T, E = BaseError> extends BaseResponse<T, E> {
  count: number;
}
