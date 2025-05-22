import { Injectable } from "@nestjs/common";
import CreateUserUseCase from "src/modules/user/src/application/useCases/create.user.use.case";

@Injectable()
export default class CreateUserAdapter {

    public constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ) { };

    public async create(
        params: {
            identities: Array<{
                type: string,
                value: string,
            }>,
        }
    ) {

        const {
            identities,
        } = params;

        try {

            const user = await this.createUserUseCase.execute(
                {
                    identities,
                }
            );

            return Object.assign(
                {},
                {
                    id: user.user.id,
                    firstName: user.user.firstName,
                    lastName: user.user.lastName,
                },
                {
                    emails: user.emails,
                }
            );

        } catch (error) {

            throw error;

        };

    };

};