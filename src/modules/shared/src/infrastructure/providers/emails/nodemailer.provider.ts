import { Inject, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import IEmailProvider from "../../../domain/infrastructure/i.email.provider";

export default class NodeMailerProvider implements IEmailProvider {

    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(NodeMailerProvider.name);
    private readonly host: string;
    private readonly user: string;
    private readonly password: string;
    private readonly source: string;
    private readonly port: number;

    public constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {
        this.host = this.configService.get<string>("EMAIL_HOST");
        this.user = this.configService.get("EMAIL_HOST_USER");
        this.source = this.configService.get("DEFAULT_FROM_EMAIL");
        this.port = this.configService.get("EMAIL_PORT");
        this.password = this.configService.get("EMAIL_HOST_PASSWORD");
        this.connect();
    };

    public async send(params: { to: string[]; subject: string; text: string }): Promise<void> {

        const { to, subject, text } = params;

        try {

            await this.transporter.sendMail({
                from: this.source,
                to: to,
                subject: subject,
                text: text,
                html: "<p>Hola, esto es una prueba.</p>",
            });

        } catch (error) {

            this.logger.error(`error sending email to ${to}:`, error);

            throw new Error(`error sending email to ${to}: ${error.message}`);

        };

    };

    private connect() {

        if (this.transporter) return;

        try {

            const missingKeys: string[] = [];

            if (!this.source) missingKeys.push("DEFAULT_FROM_EMAIL");
            if (!this.host) missingKeys.push("EMAIL_HOST");
            if (!this.user) missingKeys.push("EMAIL_HOST_USER");
            if (!this.port) missingKeys.push("EMAIL_PORT");
            if (!this.password) missingKeys.push("EMAIL_HOST_PASSWORD");

            if (missingKeys.length > 0) {

                throw new Error(`missing nodemailer credentials: ${missingKeys.join(", ")}`);

            };

            this.transporter = nodemailer.createTransport({
                host: this.host,
                port: this.port,
                secure: false,
                auth: {
                    user: this.user,
                    pass: this.password,
                },
            });

        } catch (error) {

            this.logger.error("error at connect to nodemailer:", error);

            throw new Error(`error at connect to nodemailer: ${error}`);

        };

    };
};
