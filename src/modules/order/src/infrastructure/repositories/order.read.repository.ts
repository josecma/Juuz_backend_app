import { Inject, Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { UserRoleEnum } from "src/modules/user/src/domain/enums/user.role.enum";

@Injectable({})
export default class OrderReadRepository {

    public constructor(
        @Inject(PrismaClient)
        private readonly client: PrismaClient,
    ) { };

    public async groupAndCountStatesByUserId(
        params: {
            userRole: UserRoleEnum;
            userId: string;
        }
    ) {

        const { userRole, userId } = params;

        const whereCondition =
            userRole === UserRoleEnum.SHIPPER
                ? Prisma.sql`o.owner_id = ${userId}::numeric`
                : Prisma.sql`o.driver_id = ${userId}::numeric`;

        try {

            const result: {
                data: {
                    status: string;
                    ids: Array<string>;
                    counter: number;
                }
            }[] = await this.client.$queryRaw`
                          WITH data AS(
                                SELECT
                                o.status AS order_status,
                                COALESCE(json_agg(o.id)) as order_ids,
                                count(o.status) as counter
                                FROM "Order" as o
                                WHERE ${whereCondition}
                                GROUP BY o.status
                            ) SELECT
                            json_build_object(
                                'status', data.order_status,
                                'ids', data.order_ids,
                                'counter', data.counter
                            ) AS data
                                FROM data
                                ;
                        `;

            return result.map((e) => e.data);

        } catch (error) {

            throw error;

        };

    };

    public async groupAndCountStatesByCompanyId(
        params: {
            companyId: string;
        }
    ) {

        const { companyId } = params;

        try {

            const result: {
                data: {
                    status: string;
                    ids: Array<string>;
                    counter: number;
                }
            }[] = await this.client.$queryRaw`
                          WITH data AS(
                                SELECT
                                o.status AS order_status,
                                COALESCE(json_agg(o.id)) as order_ids,
                                count(o.status) as counter
                                FROM "Order" as o
                                WHERE o.company_id = ${companyId}::numeric
                                GROUP BY o.status
                            ) SELECT
                            json_build_object(
                                'status', data.order_status,
                                'ids', data.order_ids,
                                'counter', data.counter
                            ) AS data
                                FROM data
                                ;
                        `;

            return result.map((e) => e.data);

        } catch (error) {

            throw error;

        };

    };

};
