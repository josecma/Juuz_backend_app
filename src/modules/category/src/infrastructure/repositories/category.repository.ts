import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import CategoryRepositoryContract from "../../domain/contracts/repositories/category.repository.contract";
import Category from "../../domain/entities/category";

@Injectable({})
export default class CategoryRepository implements CategoryRepositoryContract {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async find(params: { id: string; }) {

        const { id } = params;

        try {

            const categories = await this.client.category.findMany({

            });

        } catch (error) {

        };

    };

    public async findOneBy(
        params: {
            depth?: number;
            findOneByObj: Partial<{
                id: string;
                name: string;
            }>;
        }
    ) {

        const { findOneByObj, depth = 0 } = params;

        const { id, name } = findOneByObj;

        try {

            const category = await this.client.category.findUnique({
                where: {
                    id: id as unknown as number,
                },
            });

            const path = category.path;

            const categoryTree = await this.client.$queryRaw`
                    SELECT c.id, c.name, c.path, 
                    COALESCE(
                    json_agg(DISTINCT subc)
                    ) AS categories
                    FROM categories as c 
                    JOIN categories as subc ON subc.category_id = c.id
                    WHERE subc.path LIKE ${path}'%'
                    AND (LENGTH(subc.path) - LENGTH(REPLACE(subc.path, '/', ''))) 
                    <= 
                    (LENGTH('${path}') - LENGTH(REPLACE('${path}', '/', ''))) + ${depth} 
                    GROUP BY c.id, c.name, c.path;`;

            return categoryTree ?? null;

        } catch (error) {

            throw error;

        };

    };

    public async save(params: {
        categoryId?: string;
        newCategory: Category;
    }) {

        const { categoryId, newCategory } = params;

        const { name } = newCategory.toJSON();

        try {

            let newPath = '/';

            await this.client.$transaction(async (tx) => {

                if (categoryId) {

                    const parentCategory = await tx.category.findUnique({
                        where: {
                            id: categoryId as unknown as number,
                        },
                    });

                    newPath = `${parentCategory.path.endsWith('/') ? parentCategory.path : `${parentCategory.path}/`}`;

                };

                const newCategory = await tx.category.create({
                    data: {
                        name: name,
                        path: '',
                    },
                });

                tx.category.update({
                    where: {
                        id: newCategory.id,
                    },
                    data: {
                        path: `${newPath}${newCategory.id}`,
                    },
                });

            });

        } catch (error) {

            throw error;

        };

    };

};