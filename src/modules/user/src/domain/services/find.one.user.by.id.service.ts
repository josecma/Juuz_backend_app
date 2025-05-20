import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
import UserRepository from "../../infrastructure/repositories/user.write.repository";
import UserReadRepository from "../../infrastructure/repositories/user.read.repository";

@Injectable()
export default class FindOneUserByIdService {

    public constructor(
        @Inject(UserReadRepository)
        private readonly userReadRepository: UserReadRepository,
    ) { };

    public async find(params: { id: string; }) {

        const { id } = params;

        try {

            if (!id) {

                throw new BadRequestDomainException(
                    {
                        source: `${FindOneUserByIdService.name}`,
                        message: "user id is required",
                    }
                );

            };

            const user = await this.userReadRepository.findOneById(id);

            if (!user) {

                throw new NotFoundException(`user with id:${id} does not exists`);

            };

            return user;

        } catch (error) {

            throw error;

        };

    };

};