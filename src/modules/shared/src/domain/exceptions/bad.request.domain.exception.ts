import DomainException from "./domain.exception";

export default class BadRequestDomainException extends DomainException {

    constructor(
        params: {
            name?: string;
            message?: string;
            source: string;
        },
    ) {

        const {
            name = "Bad Request Domain Exception",
            message,
            source,
        } = params;

        super(
            {
                name,
                message,
                source,
            }
        );

    };

};