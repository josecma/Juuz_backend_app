import { BaseJSON } from "../shared";

export default abstract class Base {
    id?: string;

    protected constructor(
        params:
            {
                id?: string;
            }
    ) {

        const {
            id } = params;

        this.id = id;

    };

    abstract toJSON<J extends BaseJSON>(): J;

};