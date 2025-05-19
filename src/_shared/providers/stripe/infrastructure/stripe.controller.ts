import {
  Controller,
  Post,
  Req,
  RawBodyRequest,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { StripeService } from '../application/stripe.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Public()
  @HttpCode(200)
  @Post('webhook')
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string
  ): Promise<void> {
    await this.stripeService.webhook(req, signature);
  }
  @Public()
  @HttpCode(200)
  @Post()
  async zx() {
    // return (await this.stripeService.createStripePaymentUrl('1', 200)).url;
  }
}
