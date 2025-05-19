import { Injectable } from "@nestjs/common";
import IEmailProvider from "../../../domain/infrastructure/i.email.provider";
import NodeMailerProvider from "./nodemailer.provider";

@Injectable()
export default class EmailProvider {

    private provider: IEmailProvider;

    public constructor(provider: IEmailProvider) {

        this.provider = provider;

    };

    public async send(params: { to: string[]; subject: string; text: string }): Promise<void> {

        await this.provider.send(params);

    };

    public setProvider(provider: IEmailProvider): void {

        this.provider = provider;

    };

};