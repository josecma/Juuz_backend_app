import Base from "src/modules/shared/src/domain/base";
import { ScoreJSON } from "../types";

export class Score extends Base {

    private _name: string;
    private _value: number;
    private _comment?: string;

    public constructor(
        params: {
            id?: string;
            name: string;
            value: number;
            comment?: string;
        }
    ) {
        const { id, name, value, comment } = params;

        super({ id });

        this.name = name;
        this.value = value;
        this._comment = comment;
    }

    get name(): string {
        return this._name;
    }

    get value(): number {
        return this._value;
    }

    get comment(): string | undefined {
        return this._comment;
    }

    set name(newName: string) {
        if (!newName.trim()) throw new Error("name cannot be empty");
        this._name = newName;
    }

    set value(newValue: number) {
        if (newValue < 1 || newValue > 100) {
            throw new Error("value must be between 1 and 100");
        }
        this._value = newValue;
    }

    set comment(newComment: string | undefined) {
        this._comment = newComment;
    }

    public toJSON(): ScoreJSON {
        return {
            id: this.id,
            name: this._name,
            value: this._value,
            comment: this._comment,
        };
    }
}