import { Prisma } from "@prisma/client";
import Criterion from "../../domain/entities/criterion";
import CriterionMapper from "./criterion.mapper";

export default class SetCriteriaMapper {

    static to(
        params: {
            orm: Prisma.CriterionMembershipGetPayload<{
                include: {
                    criterion: true
                }
            }>
        }
    ): [number, Criterion] {

        const { orm } = params;

        const { order, criterion } = orm;

        return [order, CriterionMapper.to({ orm: criterion })]

    };

};
