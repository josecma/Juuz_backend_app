import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { Inject, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import IEmailProvider from "../../../domain/infrastructure/i.email.provider";

export default class SESProvider implements IEmailProvider {

    private sESClient: SESClient;
    private readonly logger = new Logger(SESProvider.name);
    private readonly region: string;
    private readonly accessKeyId: string;
    private readonly secretAccessKey: string;
    private readonly sourceEmail: string;

    public constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {
        this.region = this.configService.get<string>("AWS_REGION") ?? "us-east-1";
        this.accessKeyId = this.configService.get("AWS_ACCESS_KEY_ID");
        this.secretAccessKey = this.configService.get("AWS_SECRET_ACCESS_KEY");
        this.sourceEmail = this.configService.get("AWS_VERIFIED_EMAIL")
        this.connect();
    };

    public async send(params: { to: string[]; subject: string; text: string }): Promise<void> {

        const { to, subject, text } = params;

        try {

            const sendEmailCommand = new SendEmailCommand({
                Source: this.sourceEmail,
                Destination: {
                    ToAddresses: to,
                },
                Message: {
                    Subject: {
                        Data: subject,
                    },
                    Body: {
                        Text: {
                            Data: text,
                        },
                        Html: {
                            Data: `<p>${text}</p>`
                        },
                    },
                },
            });

            await this.sESClient.send(sendEmailCommand);

        } catch (error) {

            this.logger.error(`error sending email to ${to}:`, error);

            throw new Error(`error sending email to ${to}: ${error.message}`);

        };

    };

    private connect() {

        if (this.sESClient) return;

        try {

            const missingKeys: string[] = [];

            if (!this.sourceEmail) missingKeys.push("AWS_VERIFIED_EMAIL");
            if (!this.accessKeyId) missingKeys.push("AWS_ACCESS_KEY_ID");
            if (!this.secretAccessKey) missingKeys.push("AWS_SECRET_ACCESS_KEY");
            if (!this.region) missingKeys.push("AWS_REGION");

            if (missingKeys.length > 0) {

                throw new Error(`missing AWS credentials: ${missingKeys.join(", ")}`);

            };

            this.sESClient = new SESClient({
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
