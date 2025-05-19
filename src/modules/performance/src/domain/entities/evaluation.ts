import Base from "src/modules/shared/src/domain/base";
import { EvaluationJSON } from "../types";
import { Score } from "./score";

export default class Evaluation extends Base {
    private _role: string;
    private _scores: Array<Score>;

    public constructor(params: {
        id?: string;
        role: string;
        scores: Array<Score>;
    }) {
        const { id, role, scores } = params;

        super({ id });

        this.role = role;
        this._scores = scores;
    }

    public get role(): string {
        return this._role;
    }

    public get scores(): Array<Score> {
        return this._scores;
    }

    public set role(value: string) {
        if (!value.trim()) throw new Error("role is required in Evaluation");
        this._role = value;
    };

    public toJSON(): EvaluationJSON {
        return {
            id: this.id,
            role: this._role,
            scores: this._scores.map(score => score.toJSON()),
        };
    };
};