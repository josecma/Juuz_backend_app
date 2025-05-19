import { Module } from '@nestjs/common';
import TwilioService from './aplication/twilio.service.js';

@Module({
  providers: [TwilioService],
  exports: [TwilioService],
})
export class TwilioModule {}
