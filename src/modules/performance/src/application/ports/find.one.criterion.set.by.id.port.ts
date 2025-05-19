import CriterionSet from "../../domain/entities/criterion.set";

export default interface FindOneCriterionSetByIdPort {
    find(
        params: {
            criterionSetId: string;
        }
    ): Promise<CriterionSet | null>;
};