import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export default class CreateCompanyUseCase {

    private readonly logger = new Logger(CreateCompanyUseCase.name);

    public constructor(

    ) { };

    public async execute(
        params: {
            userId: string,
            company: {
                name: string,
                usdot: string,
            },
        }
    ) {

        try {

        } catch (error) {

            this.logger.error(
                {
                    source: `${CreateCompanyUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};