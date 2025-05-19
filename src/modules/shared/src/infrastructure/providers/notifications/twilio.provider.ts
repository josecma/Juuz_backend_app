import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Twilio } from "twilio";
import INotificationProvider from "../../../domain/infrastructure/i.notification.provider";

@Injectable()
export default class TwilioProvider implements INotificationProvider {

    private client: Twilio;
    private from: string;
    private accountSID: string;
    private authToken: string;
    private readonly logger = new Logger(TwilioProvider.name);

    public constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {

        this.accountSID = this.configService.get("TWILIO_ACCOUNT_SID");
        this.authToken = this.configService.get("TWILIO_AUTH_TOKEN");
        this.from = this.configService.get("TWILIO_PHONE_NUMBER");
        this.connect();

    };

    public async send(params: { to: string; message: string; }): Promise<void> {

        const { to, message } = params;

        try {

            const response = await this.client.messages.create({
                body: message,
                from: this.from,
                to,
            });

            console.log(`sms sent successfully: ${response.sid}`);

        } catch (error) {

            this.logger.error(`error sending sms to ${to}:`, error);

            throw new Error(`error sending sms to ${to}: ${error.message}`);

        };

    };

    private connect() {

        if (this.client) return;

        try {

            const missingKeys: string[] = [];

            if (!this.accountSID) missingKeys.push("TWILIO_ACCOUNT_SID");
            if (!this.authToken) missingKeys.push("TWILIO_AUTH_TOKEN");
            if (!this.from) missingKeys.push("TWILIO_PHONE_NUMBER");

            if (missingKeys.length > 0) {

                throw new Error(`missing twilio credentials: ${missingKeys.join(", ")}`);

            };

            this.client = new Twilio(this.accountSID, this.authToken);

        } catch (error) {

            this.logger.error("error at connect to twilio:", error);

            throw new Error(`error at connect to twilio: ${error}`);

        };

    };

};