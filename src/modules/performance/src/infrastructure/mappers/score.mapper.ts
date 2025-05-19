import { Prisma } from "@prisma/client";
import { Score } from "../../domain/entities/score";

export default class ScoreMapper {

    static to(
        params: {
            orm: Prisma.ScoreGetPayload<{
                include: {
                    criterion: true,
                }
            }>
        }
    ): Score {

        const { orm } = params;

        const { id, criterion, value, comment } = orm;

        const { name } = criterion;

        return new Score({
            id: id.toString(),
            name,
            value,
            comment,
        });

    };

};
