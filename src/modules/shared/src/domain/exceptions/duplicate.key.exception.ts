export default class DuplicateKeyException extends Error {
    public constructor(
        params: {
            entityName: string;
            keyName: string;
            keyValue: string;
        }
    ) {

        const { entityName, keyName, keyValue } = params;

        super(`the ${entityName} with ${keyName}: ${keyValue} already exists`);

    };

};