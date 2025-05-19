import { Processor } from "@nestjs/bullmq";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Processor('requests')
@Injectable({})
export default class OutboxRequestProcessor {

    private readonly logger = new Logger(OutboxRequestProcessor.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async process() { };

};