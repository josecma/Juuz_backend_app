import Base from "src/modules/shared/src/domain/base";
import { CriterionSetJSON } from "../types";
import Criterion from "./criterion";

export default class CriterionSet extends Base {
    private _name: string;
    private _description?: string;
    private _criteria: Array<[number, Criterion]>;
    private _version: number;

    public constructor(params: {
        id?: string;
        name: string;
        description?: string;
        criteria?: Array<[number, Criterion]>;
        version: number;
    }) {

        const { id, name, description, criteria, version } = params;

        super({ id });

        this.name = name.toUpperCase();
        this._description = description;
        this._criteria = criteria ?? [];
        this._version = version;

    };

    public get name(): string {
        return this._name;
    }

    public get version(): number {
        return this._version;
    }

    public get description(): string | undefined {
        return this._description;
    }

    public get criteria(): Array<[number, Criterion]> {
        return this._criteria;
    }

    public set name(value: string) {
        if (!value) throw new Error(`name is required in CriterionSet`);
        this._name = value;
    }

    public set description(value: string | undefined) {
        this._description = value;
    }

    public set criteria(value: Array<[number, Criterion]>) {
        this._criteria = value ?? [];
    }

    public set version(value: number) {
        this._version = value;
    }

    public toJSON(): CriterionSetJSON {
        return {
            id: this.id,
            name: this._name,
            description: this._description,
            criteria: this._criteria.map(([order, criterion]) => [
                order,
                criterion.toJSON()
            ]),
            version: this._version,
        };
    };

};