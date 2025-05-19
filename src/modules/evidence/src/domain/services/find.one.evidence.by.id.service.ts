import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import RequiredParamException from "src/modules/shared/src/domain/exceptions/required.param.exception";
import EvidenceRepository from "../../infrastructure/evidence.repository";
import EvidenceRepositoryContract from "../contracts/repositories/evidence.repository.contract";

@Injectable({})
export default class FindOneEvidenceByIdService {

    public constructor(
        @Inject(EvidenceRepository)
        private readonly evidenceRepository: EvidenceRepositoryContract,
    ) { };

    public async find(
        params: {
            id: string;
        }
    ) {

        const { id } = params;

        try {


            if (!id) {

                throw new RequiredParamException(
                    {
                        name: `${FindOneEvidenceByIdService.name}Err`,
                        requiredParams: ["id"],
                    }
                );

            };

            const evidence = await this.evidenceRepository.findOneBy({ id });

            if (!evidence) {

                throw new NotFoundException(`evidence with id:${id} does not exists`);

            };

            return evidence;

        } catch (error) {

            if (error instanceof NotFoundException) {

                throw error;

            };

            throw new InternalServerErrorException(error);

        };

    };

};