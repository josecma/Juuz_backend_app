import { Injectable, Logger } from "@nestjs/common";
import IEventHandler from "src/modules/shared/src/application/contracts/i.event.handler";
import FileDeletedEvent from "../../domain/events/file.deleted.event";
import S3Adapter from "../../infrastructure/adapters/s3.adapter";

@Injectable({})
export default class FileDeletedHandler implements IEventHandler<FileDeletedEvent> {

    private readonly logger = new Logger(FileDeletedHandler.name);

    public constructor(
        private readonly s3Adapter: S3Adapter,
    ) { }

    public async handle(
        event: FileDeletedEvent
    ): Promise<void> {

        const {
            fileKeys
        } = event;

        try {

            await this.s3Adapter.deleteFiles(fileKeys);

        } catch (error) {

            this.logger.error(
                {
                    source: `${FileDeletedHandler.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};
