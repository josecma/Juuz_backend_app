export default class Base {
    id?: string;

    protected constructor(params: { id?: string; }) {

        const { id } = params;

        this.id = id;

    };

};