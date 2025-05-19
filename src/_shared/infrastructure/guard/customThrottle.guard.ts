import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';

@Injectable()
export class CustomThrottleGuard extends ThrottlerGuard {
  protected async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail
  ): Promise<void> {
    const request = context.switchToHttp().getRequest();

    const matchSubscribeDriver = request.url.match(
      /\/point_shippers\/subscribe_driver\/(\d+)/
    );

    if (matchSubscribeDriver) {
      throw new HttpException(
        'Too many requests, the subscribe method is accessed once every 2 minutes.',
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    const matchPointDrivers = request.url.match(/\/point_drivers\/(\d+)/);
    if (matchPointDrivers) {
      throw new HttpException(
        'Too many requests, method point_drivers is accessed once every 10 seconds.',
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    return super.throwThrottlingException(context, throttlerLimitDetail);
  }
}
