import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export default class CategoryRepository {

    public constructor(
        @Inject()
        private readonly prisma: PrismaClient,
    ) { };

    public async findOneBy(params: { id: string; }) {

        const { id } = params;

        try {

            const object = await this.prisma.category.findUnique({
                where: {
                    id: id
                },
            });

            return object;

        } catch (error) {

            console.error(error);

            throw error;

        };

    };

    public async save(params: { parentId?: string; name: string; }) {

        const { parentId, name } = params;

        try {

            const parentCategory = parentId ? await this.findOneBy({ id: parentId }) : null;

            const newCategory = await this.prisma.category.create({
                data: {
                    name: name,
                    categoryId: parentCategory?.id,
                    path: parentCategory ? `${parentCategory.path}/${Date.now()}` : `${Date.now()}`,
                }
            });

            return newCategory;

        } catch (error) {

            console.error(error);

            throw error;

        };

    };

    public async get(params: { id?: string; maxDepth?: number; }) {

        const { id, maxDepth } = params;

        try {

            const categories = await this.prisma.category.findMany({
                where: { id: id },
            });

            return categories;

        } catch (error) {

            console.error(error);
            throw error;

        };

    };

};
