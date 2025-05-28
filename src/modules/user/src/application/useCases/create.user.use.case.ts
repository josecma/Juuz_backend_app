import { Injectable, Logger } from "@nestjs/common";
import User from "../../domain/entities/user";
import { IdentityEnum } from "../../domain/enums/identity.enum";
import CreateUserService from "../../domain/services/create.user.service";
import Credential from "../../domain/valueObjects/credential";
import Email from "../../domain/valueObjects/email";

@Injectable({})
export default class CreateUserUseCase {

    private readonly logger = new Logger(CreateUserUseCase.name);

    public constructor(
        private readonly createUserService: CreateUserService,
    ) { };

    public async execute(
        params: {
            user?: {
                firstName?: string,
                lastName?: string,
            },
            credential?: string,
            identities: Array<{
                type: string,
                value: string,
            }>,
        }
    ) {

        const {
            user,
            credential,
            identities,
        } = params;

        try {

            const newUser = new User(
                {
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    verified: false,
                }
            );

            let newCredential: Credential;

            if (credential) {

                newCredential = new Credential(credential);

            };

            let emails: Array<Email> = [];

            identities.map(
                (identity) => {

                    const {
                        type,
                        value,
                    } = identity;

                    if (type === IdentityEnum.EMAIL) {

                        const newEmail = new Email(value);

                        const exist = emails.find(
                            (email) => email.equals(newEmail)
                        );

                        if (!exist) {

                            emails.push(newEmail);

                        };

                    };

                }
            );

            const createdUser = await this.createUserService.create({
                user: newUser,
                credential: newCredential,
                emails,
            });

            return createdUser;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CreateUserUseCase.name}`,
                    message: error.message,
                }
            );

            throw error;

        };

    };

};