import Category from "../../entities/category";

export default interface FindOneCategoryByServiceContract {
    find(
        params: Partial<{
            id: string;
            name: string;
        }>,
    ): Promise<Category>;
};