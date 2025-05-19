import DomainException from "./domain.exception";

export default class NotFoundDomainException extends DomainException {

    name: string;
    source: string;

    constructor(
        params: {
            name?: string;
            message: string;
            source: string;
        },
    ) {

        const { name = "Not Found Domain Exception", message, source } = params;

        super(
            {
                name,
                message,
                source,
            }
        );

    };

};