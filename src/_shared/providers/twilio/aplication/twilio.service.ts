import PQueue from 'p-queue';
import pRetry from 'p-retry';
import { Twilio } from 'twilio';
('twilio');
import { Injectable, Logger } from '@nestjs/common';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';
import TwilioClient from 'twilio/lib/rest/Twilio';

@Injectable()
export default class TwilioService {
  client: TwilioClient;

  logger = new Logger(TwilioService.name);

  private queue = new PQueue({ concurrency: 1 });

  constructor() {
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    if (!twilioAccountSid || !twilioAuthToken) {
      throw new Error('Twilio account SID/auth token not found');
    }
    this.client = new Twilio(twilioAccountSid, twilioAuthToken);
  }

  private async sendSms(options: MessageListInstanceCreateOptions) {
    return this.client.messages
      .create(options)
      .then((message) => console.log(message));
  }

  send(options: MessageListInstanceCreateOptions) {
    return this.queue.add(() =>
      pRetry(() => this.sendSms(options), {
        onFailedAttempt: (error: { retriesLeft: any }) => {
          this.logger.debug(
            `SMS to ${options.to} failed, retrying (${error.retriesLeft} attempts left)`,
            error,
          );
        },
        retries: 3,
      }),
    );
  }
}
