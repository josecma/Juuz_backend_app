
export default class BusinessStakeholder {

    readonly type: string;

    public constructor(
        params: {
            type: string,
        }
    ) {

        const {
            type
        } = params;

        this.type = type;

    };

};