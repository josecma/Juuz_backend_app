import { HttpStatusCode } from '../enum';
import { BaseError } from './base.error';

export class HttpError extends BaseError {
  public readonly httpCode: HttpStatusCode;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    isOperational: boolean,
    description: string,
  ) {
    super(name, isOperational, description);
    this.httpCode = httpCode;
  }
}
