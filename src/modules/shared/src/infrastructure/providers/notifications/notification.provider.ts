import { Injectable } from "@nestjs/common";
import INotificationProvider from "../../../domain/infrastructure/i.notification.provider";

@Injectable()
export default class NotificationProvider {

    private provider: INotificationProvider;

    public constructor(provider: INotificationProvider) {

        this.provider = provider;

    };

    public async send(params: { to: string; message: string; }): Promise<void> {

        await this.provider.send(params);

    };

    public setProvider(provider: INotificationProvider): void {

        this.provider = provider;

    };

};