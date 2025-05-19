import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { RoleType } from "src/modules/shared/src/domain/enums/role.type";

@Injectable()
export default class AverageEvaluationByRoleRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async find(
        params: {
            role: RoleType;
            userId: string;
        }
    ) {

        const { role, userId } = params;

        try {

            const result: {
                data: {
                    evaluated: {
                        id: number;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    role: RoleType;
                    avg: number;
                }
            }[] = await this.client.$queryRaw`
                                    SELECT 
                                        json_build_object(
                                            'evaluated', json_build_object(
                                                'id', u.id,
                                                'firstName', u."firstName",
                                                'lastName', u."lastName"
                                            ),
                                            'role', e.role,
                                            'avg', AVG(s."value")::numeric(10,2)
                                        ) AS data
                                    FROM
                                        evaluations AS e
                                        JOIN "User" AS u ON e."evaluated_Id" = u.id
                                        JOIN scores AS s ON s."evaluation_Id" = e.id
                                        JOIN criteria AS c ON s."criterion_Id" = c.id
                                    WHERE 
                                        e.role = ${role}::text
                                        AND
                                        u.id = ${userId}::numeric
                                    GROUP BY 
                                        u.id, e.role;

                                `;

            return result[0].data;

        } catch (error) {

            throw error;

        };

    };

};