export type CategoryORM = {
    id: number;
    name: string;
    path: string;
    categories: Array<CategoryORM>;
};
