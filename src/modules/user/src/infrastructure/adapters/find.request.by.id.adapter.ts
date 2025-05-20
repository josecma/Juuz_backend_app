import { Inject, Injectable } from "@nestjs/common";
import RequestReadRepository from "src/modules/shared/src/infrastructure/repositories/request.read.repository";

@Injectable()
export default class FindRequestByIdAdapter {

    public constructor(
        @Inject(RequestReadRepository)
        private readonly requestReadRepository: RequestReadRepository,
    ) { };

    public async find(
        requestId: string
    ): Promise<any> {

        try {

            const request = await this.requestReadRepository.findOneById(
                requestId,
            );

            return request;

        } catch (error) {

            throw error;

        };

    };

};