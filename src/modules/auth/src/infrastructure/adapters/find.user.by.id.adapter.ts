import { Injectable } from "@nestjs/common";
import FindUserByIdUseCase from "src/modules/user/src/application/useCases/find.user.by.id.use.case";

@Injectable({})
export default class FindUserByIdAdapter {

    public constructor(
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
    ) { };

    public async find(
        userId: string
    ) {

        try {

            const user = await this.findUserByIdUseCase.execute(
                {
                    userId: userId,
                    include: {
                        otpSecret: true,
                        emails: true,
                    },
                }
            );

            return user;

        } catch (error) {

            throw error;

        };

    };

};