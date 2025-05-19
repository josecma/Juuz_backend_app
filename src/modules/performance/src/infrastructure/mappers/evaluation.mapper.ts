import { Prisma } from "@prisma/client";
import Evaluation from "../../domain/entities/evaluation";
import ScoreMapper from "./score.mapper";

export default class EvaluationMapper {

    static to(
        params: {
            orm: Prisma.EvaluationGetPayload<{
                include: {
                    scores: {
                        include: {
                            criterion: true,
                        }
                    }
                }
            }>
        }
    ): Evaluation {

        const { orm } = params;

        const { scores, role, id, } = orm;

        return new Evaluation(
            {
                id: id.toString(),
                role,
                scores: scores.map((score) => ScoreMapper.to({ orm: score })),
            }
        );

    };

};
