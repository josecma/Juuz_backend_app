export class BaseError extends Error {
  public readonly name: string;
  public readonly isOperational: boolean; // True when the error is not due to programming errors

  constructor(name: string, isOperational: boolean, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }

  public stringify(): string {
    return JSON.stringify(this);
  }
}
