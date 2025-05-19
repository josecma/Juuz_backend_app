import { CategoryJSON } from "src/modules/shared/src/domain/shared";
import Base from "./base";

export default class Category extends Base {

    private name: string;

    public constructor(params: { id: string; name: string; }) {

        const { id, name } = params;

        super({ id });

        this.setName = name;

    };

    public get getName(): string {
        return this.name;
    };

    public set setName(v: string) {
        this.name = v;
    };

    public toJSON(): CategoryJSON {

        return {
            id: this.id,
            name: this.name,
        };

    };

};