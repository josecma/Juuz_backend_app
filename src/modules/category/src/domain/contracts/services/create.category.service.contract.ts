
export default interface CreateCategoryServiceContract {
    create(
        params: {
            categoryId?: string;
            categoryProperties: {
                name: string;
            };
        },
    ): Promise<void>;
};