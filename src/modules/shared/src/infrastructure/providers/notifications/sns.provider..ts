import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import INotificationProvider from "../../../domain/infrastructure/i.notification.provider";

@Injectable()
export default class SNSProvider implements INotificationProvider {

    private sNSClient: SNSClient;
    private readonly logger = new Logger(SNSProvider.name);
    private readonly region: string;
    private readonly accessKeyId: string;
    private readonly secretAccessKey: string;
    private readonly senderId: string;

    public constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {

        this.region = this.configService.get<string>("AWS_REGION") ?? "us-east-1";
        this.accessKeyId = this.configService.get("AWS_ACCESS_KEY_ID");
        this.secretAccessKey = this.configService.get("AWS_SECRET_ACCESS_KEY");
        this.senderId = this.configService.get<string>("AWS_SNS_SENDER_ID");
        this.connect();

    };

    public async send(params: { to: string, message: string }): Promise<void> {

        const { to, message } = params;

        try {

            const publishCommand = new PublishCommand({
                Message: message,
                PhoneNumber: to,
                MessageAttributes: {
                    // "AWS.SNS.SMS.SenderID": {
                    //     DataType: "String",
                    //     StringValue: this.senderId,
                    // },
                    "AWS.SNS.SMS.SMSType": {
                        DataType: "String",
                        StringValue: "Transactional",
                    },
                },
            });

            await this.sNSClient.send(publishCommand);

        } catch (error) {

            this.logger.error(`error sending sms to ${to}:`, error);

            throw new Error(`error sending sms to ${to}: ${error.message}`);

        };

    };

    private connect() {

        if (this.sNSClient) return;

        try {

            const missingKeys: string[] = [];

            //if (!this.senderId) missingKeys.push("AWS_SNS_SENDER_ID");
            if (!this.accessKeyId) missingKeys.push("AWS_ACCESS_KEY_ID");
            if (!this.secretAccessKey) missingKeys.push("AWS_SECRET_ACCESS_KEY");
            if (!this.region) missingKeys.push("AWS_REGION");

            if (missingKeys.length > 0) {

                throw new Error(`missing AWS credentials: ${missingKeys.join(", ")}`);

            };

            this.sNSClient = new SNSClient({
                region: this.region,
                credentials: {
                    accessKeyId: this.accessKeyId,
                    secretAccessKey: this.secretAccessKey,
                },
            });

        } catch (error) {

            this.logger.error("error at connect to AWS:", error);

            throw new Error(`error at connect to AWS: ${error}`);

        };

    };

};
