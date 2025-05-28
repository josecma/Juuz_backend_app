import { BaseJSON } from "src/modules/shared/src/domain/shared";

export type CriterionJSON = BaseJSON & {
    name: string;
    description?: string;
    max: number;
}

export type CriterionSetJSON = BaseJSON & {
    name: string;
    description?: string;
    criteria: Array<[number, CriterionJSON]>;
    version: number;
};

export type ScoreJSON = BaseJSON & {
    name: string;
    value: number;
    comment?: string;
};

export type EvaluationJSON = BaseJSON & {
    role: string;
    scores: Array<ScoreJSON>;
};

export type CriterionWithoutIdJSON = Omit<CriterionJSON, "id">;

export type UserEvaluation = {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    evaluation: {
        avg: number;
        criteria: Array<{
            name: string;
            avg: number;
        }>;
    };
}