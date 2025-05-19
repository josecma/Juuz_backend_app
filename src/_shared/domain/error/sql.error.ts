import { BaseError } from './base.error';

export class SqlError extends BaseError {
  public readonly sqlCode: string;

  constructor(
    name: string,
    isOperational = false,
    description = 'SQL DB Error',
    sqlCode: string,
  ) {
    super(name, isOperational, description);
    this.sqlCode = sqlCode;
  }
}
