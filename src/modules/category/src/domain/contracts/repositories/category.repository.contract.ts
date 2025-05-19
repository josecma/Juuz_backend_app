import Category from "../../entities/category";

export default interface CategoryRepositoryContract {

    findOneBy(
        params: {
            depth?: number;
            findOneByObj: Partial<{
                id: string;
                name: string;
            }>;
        }
    ): Promise<any>;

    save(
        params: {
            categoryId?: string;
            newCategory: Category;
        }
    ): Promise<void>;

};