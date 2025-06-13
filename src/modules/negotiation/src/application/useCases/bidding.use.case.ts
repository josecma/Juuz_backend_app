import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export default class BiddingUseCase {

    private readonly logger = new Logger(BiddingUseCase.name);

    public constructor() { };

    public async execute(
        params: {
            offer: {
                type: string,

            },
            userId: string,
        },
    ) {

        try {

        } catch (error) {

            this.logger.error(
                {
                    source: `${BiddingUseCase.name}`,
                    message: error.message,
                }
            );

        };

    };

};