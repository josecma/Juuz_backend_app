import { Request } from 'express';
import { Payload } from './interface/payload.interface';

export class RequestUserId extends Request {
  user: Payload;
}