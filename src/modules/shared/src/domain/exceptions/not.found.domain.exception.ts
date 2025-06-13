
export default class NotFoundDomainException {

    public name: string;
    public message: string;

    constructor(
        params: {
            name?: string;
            message?: string;
        },
    ) {

        const {
            name = "NOT FOUND DOMAIN EXCEPTION",
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