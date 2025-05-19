export default interface FindCompanyByOwnerIdPort {
    find(
        ownerId: String,
    ): Promise<any>;
};