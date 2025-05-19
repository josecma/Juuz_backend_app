import { Inject, Injectable } from "@nestjs/common";
import CategoryRepository from "../infrastructure/category.repository";

@Injectable()
export default class CreateCategoryService {

    public constructor(
        @Inject()
        private readonly categoryRepository: CategoryRepository,
    ) { };

    public async execute(params: { parentId?: string; name: string; }) {

        const { parentId, name } = params;

        try {

            const obj = await this.categoryRepository.save(params);

        } catch (error) {

            console.error(error);
            throw error;

        };

    };

};