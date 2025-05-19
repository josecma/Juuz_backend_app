import { Prisma } from "@prisma/client";
import CriterionSet from "../../domain/entities/criterion.set";
import SetCriteriaMapper from "./set.criteria.mapper";
let num = 1;
export default class CriterionSetMapper {
    static to(
        params: {
            orm: Prisma.CriterionSetGetPayload<{
                include: {
                    criteria: {
                        include: {
                            criterion: true
                        }
                    }
                }
            }>
        }
    ): CriterionSet {

        const { orm } = params;

        const { id, criteria, name, description, version } = orm;

        return new CriterionSet(
            {
                id: id.toString(),
                name,
                description,
                criteria: criteria.map((e) => SetCriteriaMapper.to({ orm: e })),
                version,
            }
        );

    };

};