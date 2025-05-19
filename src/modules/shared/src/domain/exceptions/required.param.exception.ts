export default class RequiredParamException extends Error {

    name: string;

    public constructor(
        params: {
            name: string;
            requiredParams: string[];
        }
    ) {

        const { name, requiredParams } = params;

        super(`params ${requiredParams.join(",")} are required.`);

        this.name = name;

    };

};