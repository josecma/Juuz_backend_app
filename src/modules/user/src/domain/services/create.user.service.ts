import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { BcryptAdapter } from "../../infrastructure/adapters/bcrypt.adapter";
import UserIdentityReadRepository from "../../infrastructure/repositories/user.identity.read.repository";
import UserWriteRepository from "../../infrastructure/repositories/user.write.repository";
import User from "../entities/user";
import Credential from "../valueObjects/credential";
import Email from "../valueObjects/email";

@Injectable()
export default class CreateUserService {

    private readonly logger = new Logger(CreateUserService.name);

    public constructor(
        private readonly userWriteRepository: UserWriteRepository,
        private readonly userIdentityReadRepository: UserIdentityReadRepository,
        private readonly bcryptAdapter: BcryptAdapter,
    ) { };

    public async create(
        params: {
            user: User,
            credential?: Credential,
            emails: Array<Email>,
        }
    ) {

        const {
            user,
            credential,
            emails,
        } = params;

        try {

            const emailSet = await this.userIdentityReadRepository.findEmailSet(emails);

            if (emailSet.length > 0) {

                throw new ConflictException('email already exists');

            };

            const savedUser = await this.userWriteRepository.save(
                {
                    user,
                    credential: credential
                        ?
                        await this.bcryptAdapter.hash(credential.value)
                        :
                        undefined,
                    emails,
                }
            );

            return savedUser;

        } catch (error) {

            this.logger.error(
                {
                    source: `${CreateUserService.name}`,
                    message: `${error.message}`,
                }
            );

            throw error;

        };

    };

};