import { Prisma } from "@prisma/client";
import Criterion from "../../domain/entities/criterion";

export default class CriterionMapper {
    static to(
        params: {
            orm: Prisma.CriterionGetPayload<{}>
        }
    ): Criterion {

        const { orm } = params;

        const { id, ...criterionRes } = orm;

        return new Criterion(
            {
                id: id.toString(),
                ...criterionRes
            }
        );

    };

};