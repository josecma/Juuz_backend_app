import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

@Injectable()
export default class FCMAdapter {

    private readonly logger = new Logger(FCMAdapter.name);
    private readonly projectId: string;
    private readonly clientEmail: string;
    private readonly privateKey: string;
    private messaging: admin.messaging.Messaging;

    public constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {

        this.projectId = this.configService.get<string>("FIREBASE_PROJECT_ID");
        this.clientEmail = this.configService.get("FIREBASE_CLIENT_EMAIL");
        this.privateKey = this.configService.get("FIREBASE_PRIVATE_KEY")?.replace(/\\n/g, "\n");

        this.connect();

    };

    public async sendNotification(
        params: {
            userToken: string,
            title: string,
            body: string,
            data?: Record<string, string>,
        }
    ) {

        const {
            userToken,
            title,
            body,
            data,
        } = params;

        try {

            const message: admin.messaging.Message = {
                notification: { title, body },
                token: userToken,
                data,
            };

            const res = await this.messaging.send(message);

            this.logger.log(`notification sent successfully, message id: ${res}`);

            return res;

        } catch (error) {

            this.logger.error("error sending notification FCM:", error);

            return false;

        };

    };


    private connect() {

        if (this.messaging) return;

        try {

            const missingKeys: string[] = [];

            if (!this.projectId) missingKeys.push("FIREBASE_PROJECT_ID");
            if (!this.clientEmail) missingKeys.push("FIREBASE_CLIENT_EMAIL");
            if (!this.privateKey) missingKeys.push("FIREBASE_PRIVATE_KEY");

            if (missingKeys.length > 0) {

                throw new Error(`missing FCM credentials: ${missingKeys.join(", ")}`);

            };

            const serviceAccount: ServiceAccount = {

                projectId: this.projectId,
                clientEmail: this.clientEmail,
                privateKey: this.privateKey,

            };

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });

            this.messaging = admin.messaging();

            this.logger.log('successfully connected to FCM');

        } catch (error) {

            this.logger.error('failed to connect to FCM', error.stack);

            throw new Error(`FCM connection error: ${error.message}`);

        };

    };

};