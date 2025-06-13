import { Inject, Injectable } from "@nestjs/common";
import { RoleType } from "src/modules/shared/src/domain/enums/role.type";
import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
import NotFoundDomainException from "src/modules/shared/src/domain/exceptions/not.found.domain.exception";
import FindOneCriterionSetByIdAdapter from "../../infrastructure/adapters/find.one.criterion.set.by.id.adapter";
import DefaultCriterionSetRepository from "../../infrastructure/repositories/default.criterion.set.repository";
import FindOneCriterionSetByIdPort from "../ports/find.one.criterion.set.by.id.port";
import { UserRoleEnum } from "src/modules/user/src/domain/enums/user.role.enum";

@Injectable({})
export default class DefaultCriterionSetUseCase {

    public constructor(
        @Inject(FindOneCriterionSetByIdAdapter)
        private readonly findOneCriterionSetByIdAdapter: FindOneCriterionSetByIdPort,
        @Inject(DefaultCriterionSetRepository)
        private readonly defaultCriterionSetRepository: DefaultCriterionSetRepository,
    ) { };

    public async execute(
        params: {
            criterionSetId: string;
            userRole: UserRoleEnum;
        }
    ) {

        const { criterionSetId, userRole } = params;

        try {

            if (!criterionSetId) {
                throw new BadRequestDomainException(
                    {
                        message: "criterion set id is required",
                        source: `${DefaultCriterionSetUseCase.name}`
                    }
                );
            };

            if (!userRole) {
                throw new BadRequestDomainException(
                    {
                        message: "user role is required",
                        source: `${DefaultCriterionSetUseCase.name}`
                    }
                );
            };

            const criterionSet = await this.findOneCriterionSetByIdAdapter.find(
                {
                    criterionSetId
                }
            );

            if (!criterionSet) {
                throw new NotFoundDomainException(
                    {
                        message: `criterion set with id:${criterionSetId} not found`,
                    }
                );
            };

            const defaultCriterionSet = await this.defaultCriterionSetRepository.set(
                {
                    criterionSetId,
                    userRole,
                }
            );

            return defaultCriterionSet;

        } catch (error) {

            throw error;

        };

    };

};