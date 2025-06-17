import { Inject, Injectable, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { UserRoleEnum } from "src/modules/user/src/domain/enums/user.role.enum";
import { toCamelCase } from "src/utils/to.camel.case";
import OrderItemMapper from "../mappers/order.item.mapper";
import OrderMapper from "../mappers/order.mapper";

@Injectable({})
export default class OrderReadRepository {

    private readonly logger = new Logger(OrderReadRepository.name);

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

    public async findUserOrders(
        params: {
            userId: string,
            role: 'CARRIER' | 'SHIPPER',
            status: string,
            page?: number,
            perPage?: number,
        }
    ) {
        const {
            userId,
            role,
            status,
            page = 1,
            perPage = 10,
        } = params;

        const offset = (page - 1) * perPage;

        const whereCondition =
            role === 'SHIPPER'
                ? Prisma.sql`o.owner_id = ${userId}`
                : Prisma.sql`o.driver_id = ${userId}`;

        const whereStatusCondition = status
            ? Prisma.sql`AND o.status::text = ${status}`
            : Prisma.empty;

        try {

            const result = await this.client.$queryRaw`
            
            WITH filtered_orders AS (
                SELECT o.id
                FROM "Order" as o
                LEFT JOIN "Point" as dep ON o.departure_id = dep.id 
                WHERE ${whereCondition} 
                    AND dep.coords IS NOT NULL
                    ${whereStatusCondition}
            ),
            total_count AS (
                SELECT COUNT(*) as count FROM filtered_orders
            ),
            paginated_data AS (
                SELECT 
                    o.*, 
                    COALESCE(json_agg(DISTINCT vo.*) FILTER (WHERE vo.id IS NOT NULL), '[]') AS vehicles, 
                    COALESCE(json_agg(DISTINCT n.*) FILTER (WHERE n.id IS NOT NULL), '[]') AS negotiations,
                    COALESCE(json_agg(DISTINCT jsonb_build_object('id', ph.id, 'name', ph.name, 'url', null)) 
                            FILTER (WHERE ph.id IS NOT NULL), '[]') AS photos,
                    to_jsonb(dep.*) as departure,
                    to_jsonb(dest.*) as destination,
                    to_jsonb(u.*) as user,
                    to_jsonb(c.*) as company
                FROM "Order" as o 
                LEFT JOIN "companies" as c ON c.id = o.company_id
                LEFT JOIN (SELECT 
                                v.*,
                                to_jsonb(m.*) as model,
                                to_jsonb(b.*) as brand 
                                FROM "VehicleOrder" as v
                                LEFT JOIN "vehicle_make_models" as m ON m.id = v.make_id
                                LEFT JOIN "vehicle_makes" as b ON m.brand_id = b.id
                                GROUP BY v.id, m.id, b.id) as vo ON o.id = vo.order_id
                            LEFT JOIN "Negotiation" as n ON o.id = n.order_id
                            LEFT JOIN "Point" as dep ON o.departure_id = dep.id 
                            LEFT JOIN "Point" as dest ON o.destination_id= dest.id
                            LEFT JOIN "Photo" as ph ON o.id=ph.order_id
                            LEFT JOIN "users" as u ON o.user_id=u.id
                            WHERE o.id IN (SELECT id FROM filtered_orders)
                            ${whereStatusCondition}
                            GROUP BY o.id, dep.id, dest.id, u.id, c.id
                            ORDER BY 
                                CASE 
                                    WHEN ${status} = 'IN_TRANSIT' THEN
                                        CASE o.sub_status  
                                            WHEN 'PICKUP' THEN 1 
                                            WHEN 'STARTED' THEN 2  
                                            WHEN 'ASSIGNED' THEN 3 
                                            ELSE 4 
                                        END
                                    ELSE 0
                                END ASC,
                                o.created_at DESC
                            LIMIT ${perPage} OFFSET ${offset}
            )
            SELECT 
                json_agg(pd) as data,
                (SELECT count FROM total_count)::integer as total_count
            FROM paginated_data pd;
        `;

            const totalResults = result[0].total_count;
            const totalPages = Math.ceil(totalResults / perPage);

            return {
                data: toCamelCase(result[0].data),
                pageInfo: {
                    currentPage: page,
                    totalPages,
                    totalResults,
                },
            };

        } catch (error) {

            throw error;

        };

    };

    public async findOneById(
        orderId: string
    ) {

        try {

            const findUniqueResponse = await this.client.order.findUnique(
                {
                    where: {
                        id: orderId,
                    },
                    include: {
                        departure1: true,
                        destination1: true,
                    }
                }
            );

            return findUniqueResponse ? OrderMapper.to(findUniqueResponse) : null;

        } catch (error) {

            throw error;

        };

    };

    public async findCompanyOrders(
        companyId: string
    ) {

        try {

            const companyOrders = await this.client.order.findMany(
                {
                    where: {
                        companyId,
                    },
                    include: {
                        departure1: true,
                        destination1: true,
                    }
                }
            );

            return companyOrders;

        } catch (error) {

            this.logger.error(
                {
                    source: `${OrderReadRepository.name}.findCompanyOrders`,
                    message: `err finding company orders: ${error.message}`
                }
            );

        };

    };

};
