import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { RoleType } from "src/modules/shared/src/domain/enums/role.type";

@Injectable({})
export default class FindLastReviewRepository {
    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async find(
        params: {
            limit: number;
            role: RoleType;
        }
    ) {

        const { limit, role } = params;

        try {

            const result: {
                data: {
                    id: number;
                    evaluator: {
                        id: number;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    role: RoleType;
                    avg: number;
                    createdAt: Date;
                }
            }[] = await this.client.$queryRaw`
                SELECT 
                    json_build_object(
                        'id', e.id,
                        'evaluator', json_build_object(
                            'id', u.id,
                            'firstName', u."firstName",
                            'lastName', u."lastName"
                        ),
                        'role', e.role,
                        'avg', AVG(s."value")::numeric(10,2),
                        'createdAt', e.created_at
                    ) AS data
                FROM
                    evaluations AS e
                    JOIN "User" AS u ON e."evaluator_Id" = u.id
                    JOIN scores AS s ON s."evaluation_Id" = e.id
                    JOIN criteria AS c ON s."criterion_Id" = c.id
                WHERE 
                    e.role = ${role}::text
                GROUP BY 
                    e.id, u.id, e.role, e.created_at
                ORDER BY 
                    e.created_at DESC 
                LIMIT ${limit};`;

            return result.map((e) => e.data);

        } catch (error) {

            throw error;

        };

    };
}