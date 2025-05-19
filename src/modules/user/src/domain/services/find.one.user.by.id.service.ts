import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import BadRequestDomainException from "src/modules/shared/src/domain/exceptions/bad.request.domain.exception";
import UserRepository from "../../infrastructure/repositories/user.repository";

@Injectable()
export default class FindOneUserByIdService {

    public constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
    ) { };

    public async find(params: { id: string; }) {

        const { id } = params;

        try {

            if (!id || Number(id) <= 0) {

                throw new BadRequestDomainException(
                    {
                        source: `${FindOneUserByIdService.name}`,
                        message: "user id is required",
                    }
                );

            };

            const user = await this.userRepository.findOneBy({ id });

            if (!user) {

                throw new NotFoundException(`user with id:${id} does not exists`);

            };

            return user;

        } catch (error) {

            throw error;

        };

    };

};