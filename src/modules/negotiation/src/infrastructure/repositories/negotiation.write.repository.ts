import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export default class NegotiationWriteRepository {

    private readonly logger = new Logger(NegotiationWriteRepository.name);

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async saveBusiness(
        params: {
            status: string,
            objects: Array<
                {
                    id: string,
                    type: string,
                    name: string,
                }
            >,
            stakeholders: Array<
                {
                    id: string,
                    role: string,
                    type: string,
                }
            >,
        }
    ) {

        const {
            stakeholders,
            status,
            objects,
        } = params;

        try {

            await this.client.$transaction(

                async (tx) => {

                    const savedBusiness = await tx.business.create(
                        {
                            data: {
                                status,
                            }
                        }
                    );

                    await tx.businessObject.createMany(
                        {
                            data: objects.map(

                                o => {

                                    const { id, type, name } = o;

                                    return {
                                        objectId: id,
                                        type,
                                        businessId: savedBusiness.id,
                                        details: {
                                            name
                                        }
                                    };

                                }

                            ),

                        }

                    );

                    await tx.businessStakeholder.createMany(
                        {
                            data: stakeholders.map(

                                s => {

                                    const { role, id, type } = s;

                                    return {
                                        role,
                                        type,
                                        businessId: savedBusiness.id,
                                        details: {
                                            id,
                                        }
                                    };

                                }

                            )
                        }
                    );

                }

            );

        } catch (error) {

            this.logger.error(
                {
                    source: `${NegotiationWriteRepository.name}`,
                    message: error.message,
                }
            );

        };

    };

};