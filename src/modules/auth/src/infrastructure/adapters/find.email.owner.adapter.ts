import { Injectable } from "@nestjs/common";
import FindUserByIdUseCase from "src/modules/user/src/application/useCases/find.user.by.id.use.case";
import { IdentityEnum } from "src/modules/user/src/domain/enums/identity.enum";
import UserIdentityReadRepository from "src/modules/user/src/infrastructure/repositories/user.identity.read.repository";

@Injectable({})
export default class FindEmailOwnerAdapter {

    public constructor(
        private readonly userIdentityReadRepository: UserIdentityReadRepository,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
    ) { };

    public async find(
        email: string
    ) {

        try {

            const identity = await this.userIdentityReadRepository.findOneBy(
                {
                    type: IdentityEnum.EMAIL,
                    value: email,
                }
            );

            if (!identity) {

                return null;

            };

            const owner = await this.findUserByIdUseCase.execute(
                {
                    userId: identity.userId,
                    include: {
                        otpSecret: true,
                        company: true,
                    }
                }
            );

            return Object.assign(
                {},
                {
                    id: owner.user.id,
                    firstName: owner.user.firstName,
                    lastName: owner.user.lastName,
                    otpSecret: owner.otpSecret,
                    company: owner.company,
                }
            );

        } catch (error) {

            throw error;

        };

    };

};