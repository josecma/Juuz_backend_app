import Base from "src/modules/shared/src/domain/base";
import { CriterionJSON } from "../types";

export default class Criterion extends Base {
    private _name: string;
    private _description?: string;
    private _max: number;

    public constructor(params: {
        id?: string;
        name: string;
        description?: string;
        max?: number;
    }) {
        const { id, name, description, max } = params;
        super({ id });
        this.name = name;
        this._description = description;
        this._max = max ?? 100;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string | undefined {
        return this._description;
    }

    public get max(): number {
        return this._max;
    }

    public set name(value: string) {
        if (!value) throw new Error(`name is required in Criterion`);
        this._name = value;
    }

    public set description(value: string) {
        this._description = value;
    }

    public set max(value: number) {
        this._max = value;
    }

    public toJSON(): CriterionJSON {
        return {
            id: this.id,
            name: this._name,
            description: this._description,
            max: this._max,
        };
    }
}