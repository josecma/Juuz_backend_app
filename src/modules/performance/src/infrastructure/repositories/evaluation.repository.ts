import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import Evaluation from "../../domain/entities/evaluation";
import EvaluationMapper from "../mappers/evaluation.mapper";

@Injectable({})
export default class EvaluationRepository {
    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async save(
        params: {
            criterionSetId: string;
            evaluatedId: string;
            evaluatorId: string;
            evaluation: Evaluation;
        }
    ): Promise<Evaluation> {

        const { criterionSetId, evaluatedId, evaluatorId, evaluation } = params;

        const { role, scores } = evaluation.toJSON();

        try {

            const res = await this.client.$transaction(async (tx) => {
                const evaluation = await tx.evaluation.create(
                    {
                        data: {
                            criterionSetId: Number(criterionSetId),
                            evaluatedId: Number(evaluatedId),
                            evaluatorId: Number(evaluatorId),
                            role,
                        }
                    }
                );

                await tx.score.createMany(
                    {
                        data: scores.map((score) => {

                            const { value, comment, id } = score;

                            return {
                                evaluationId: evaluation.id,
                                value,
                                comment,
                                criterionId: Number(id)
                            }
                        }),
                    }
                );

                return tx.evaluation.findUnique(
                    {
                        where: {
                            id: evaluation.id,
                        },
                        include: {
                            scores: {
                                include: {
                                    criterion: true,
                                }
                            },
                        }
                    }
                );
            });

            return EvaluationMapper.to({ orm: res });

        } catch (error) {

            throw error;

        };

    };

};