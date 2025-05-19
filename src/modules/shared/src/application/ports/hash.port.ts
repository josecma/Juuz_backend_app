export default interface HashPort {

    hash(
        data: string,
        saltRounds?: number,
    ): Promise<string>;

    compare(
        data: string,
        encrypted: string,
    ): Promise<boolean>;

};