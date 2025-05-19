export default class DomainException extends Error {

    name: string;
    source: string;
    errorStack: Array<Record<string, any>>;

    constructor(
        params: {
            name: string;
            message: string;
            source: string;
        },
    ) {

        const {
            name,
            message,
            source,
        } = params;

        super(message);

        this.name = name;
        this.source = source;
        this.errorStack = [];

    };

    public addErr(
        params: Record<string, any>,
    ) {

        const {
            errObj,
        } = params;

        this.errorStack.push(errObj);

    };

    public toJSON() {
        return {
            name: this.name,
            source: this.source,
            message: this.message,
            errorStack: this.errorStack,
        };
    };

};