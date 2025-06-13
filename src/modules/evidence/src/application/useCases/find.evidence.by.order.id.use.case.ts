import { Inject, Injectable } from "@nestjs/common";
import S3Adapter from "src/modules/shared/src/infrastructure/adapters/s3.adapter";
import FindEvidenceByOrderIdService from "../../domain/services/find.evidence.by.order.id.service";

@Injectable({})
export default class FindEvidenceByOrderIdUseCase {

    public constructor(
        @Inject(FindEvidenceByOrderIdService)
        private readonly findEvidenceByOrderIdService: FindEvidenceByOrderIdService,
        private readonly s3Adapter: S3Adapter,
    ) { };

    public async execute(
        params: {
            pagination?: {
                page: number;
                limit: number;
            };
            userId: string;
            orderId: string;
        }
    ) {

        const { pagination, userId, orderId } = params;

        try {

            const evidences = await this.findEvidenceByOrderIdService.find(
                {
                    pagination,
                    orderId,
                    userId,
                }
            );

            const evidenceWithFiles = await Promise.all(

                evidences.map(

                    async (e) => {

                        const { files, ...evidenceRest } = e;

                        return {
                            ...evidenceRest,
                            files: await Promise.all(

                                files.map(

                                    async (e) => {

                                        const { id, key } = e;

                                        return {
                                            id,
                                            url: (await this.s3Adapter.getFileUrl({ key })).signedUrl,
                                        };

                                    }
                                )
                            )
                        };
                    }
                )
            );

            return evidenceWithFiles;

        } catch (error) {

            throw error;

        };

    };

};