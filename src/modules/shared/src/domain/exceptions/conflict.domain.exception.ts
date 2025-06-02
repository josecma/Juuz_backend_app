
export default class ConflictDomainException {

    public name: string;
    public message: string;

    constructor(
        params: {
            name?: string;
            message?: string;
        },
    ) {

        const {
            name = "CONFLICT DOMAIN EXCEPTION",
            message,
        } = params;

        this.name = name;
        this.message = message;

    };

    public toJSON() {

        return {
            name: this.name,
            message: this.message,
        }

    };

};