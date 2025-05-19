import { Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Module({
    providers: [
        {
            provide: PrismaClient,
            useFactory: () => {
                if (!DatabaseModule.client) DatabaseModule.client = new PrismaClient();
                return DatabaseModule.client;
            },
        },
    ],
    exports: [PrismaClient],
})
export default class DatabaseModule implements OnModuleInit, OnModuleDestroy {

    private static client: PrismaClient;

    async onModuleInit() {
        if (!DatabaseModule.client) {
            DatabaseModule.client = new PrismaClient();
        };
        await DatabaseModule.client.$connect();
    };

    async onModuleDestroy() {
        if (DatabaseModule.client) {
            await DatabaseModule.client.$disconnect();
        };
    };

};