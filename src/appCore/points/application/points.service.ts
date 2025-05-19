import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, TypePointEnum, Point } from '@prisma/client';
import { PointDto, UpdatePointDto } from '../domain/point.dtos';
import { PaginationPointDto } from '../domain/pagination-point.dto';
import { PaginationOrderAroundDto } from 'src/appCore/orders/domain/pagination-order-around.dto';
import { PaginatedResponse } from 'src/_shared/domain/dtos/paginationResponse.dto';
import { OrderEntity } from 'src/appCore/orders/domain/order.entity';
import { PointEntity } from '../domain/point.entity';
import { Order } from '../domain/types';
import { S3Service } from 'src/s3/aplication/s3.service';
import { toCamelCase } from '../../../utils/to.camel.case';

@Injectable()
export class PointsService {
  constructor(private prisma: PrismaService, private readonly s3Service: S3Service) { }

  async create(
    data: PointDto,
    ownerId: number,
    typePoint?: TypePointEnum,
    isActive: boolean = true // Default value if not provided
  ) {
    const query = `
    INSERT INTO "Point" (
      "coords", "order_id", "driver_id", "created_at", "updated_at", "created_by", "updated_by", "deleted_at", "deleted_by", "version", 
      "owner_id", "company_id", "point_name", "longitude", "latitude", "user_id", "address", "city", "state", "type", "is_active"
    )
    VALUES (
      ST_SetSRID(ST_MakePoint(\$2, \$1), 4326),
      \$3,
      \$4,
      NOW(),
      NOW(),
      \$5,
      \$6,
      \$7,
      \$8,
      \$9,
      \$10,
      \$11,
      \$12,
      \$13,
      \$14,
      \$15,
      \$16,
      \$17,
      \$18,
      \$19::public."TypePointEnum",
      \$20  -- is_active
    )
    RETURNING id;
    `;

    const result = await this.prisma.$queryRawUnsafe(
      query,
      // coords
      data.coords.latitude, // \$1
      data.coords.longitude, // \$2
      // orderId
      null, // \$3
      // driverId
      data.driverId, // \$4
      // created_by, updated_by
      ownerId, // \$5
      null, // \$6
      // deleted_at, deleted_by
      null, // \$7
      null, // \$8
      // version
      1, // \$9
      // owner_id
      ownerId, // \$10
      // company_id
      null, // \$11
      data.pointName, // \$12
      // coords
      data.coords.longitude, // \$13
      data.coords.latitude, // \$14
      ownerId, // \$15
      data.address, // \$16
      data.city, // \$17
      data.state, // \$18
      typePoint + '', // \$19
      isActive // \$20
    );

    const newPointId = result[0].id;
    return newPointId;
  }
  async findOnePointByUserId(user_id: number): Promise<Point | null> {
    try {
      const point_by_user_id = await this.prisma.point.findFirst({ where: { userId: user_id } });
      return point_by_user_id;
    } catch (error) {
      console.error(error);

      throw error;
    };
  };

  async findAll(pagination: PaginationPointDto) {
    const offset = pagination.page * pagination.perPage;
    return await this.prisma.$queryRaw<any[]>`
      SELECT 
      id, 
      ARRAY[ST_X(coords), ST_Y(coords)] as coords,
      order_id,
      longitude,
      latitude,
      driver_id,
      created_at,
      updated_at,
      created_by,
      updated_by,
      deleted_at,
      deleted_by,
      owner_id,
      company_id, 
      point_name
      FROM "Point"
      ORDER BY id
      LIMIT ${pagination.perPage} OFFSET ${offset};
    `;
  }

  async findOne(id: number) {
    const point = await this.prisma.$queryRaw<any>`
    SELECT 
    id, 
    ARRAY[ST_X(coords), ST_Y(coords)] as coords,
    point_name,
    longitude,
    address,
    city,
    state,
    latitude,
    order_id,
    driver_id,
    created_at,
    updated_at,
    created_by,
    updated_by,
    deleted_at,
    deleted_by,
    owner_id,
    company_id,
    is_active
    FROM "Point"
    WHERE id = ${id}
    ORDER BY id;
  `;
    if (!point) {
      throw new NotFoundException(`Point with ID ${id} not found.`);
    }
    return point;
  }

  async findOneUserId(userId: number) {
    const point = await this.prisma.$queryRaw<any>`
    SELECT 
    id, 
    ARRAY[ST_X(coords), ST_Y(coords)] as coords,
    point_name,
    longitude,
    address,
    city,
    state,
    latitude,
    order_id,
    driver_id,
    created_at,
    updated_at,
    created_by,
    updated_by,
    deleted_at,
    deleted_by,
    owner_id,
    company_id,
    is_active
    FROM "Point"
    WHERE user_id = ${userId}
    ORDER BY id;
  `;
    if (!point) {
      throw new NotFoundException(`Point with ID ${userId} not found.`);
    }
    return point;
  }

  async updateUserId(userId: number, updateData: UpdatePointDto) {
    // await this.findOne(id);
    try {
      const fieldsToUpdate = [];
      const sqlParams = [];
      let sqlQuery = 'UPDATE "Point" SET ';

      if (updateData.coords) {
        fieldsToUpdate.push(
          '"coords" = ST_SetSRID(ST_MakePoint($2, $1), 4326)'
        );
        sqlParams.push(updateData.coords.latitude, updateData.coords.longitude);
        fieldsToUpdate.push('"longitude" = $' + (sqlParams.length + 2));
        fieldsToUpdate.push('"latitude" = $' + (sqlParams.length + 1));
        sqlParams.push(updateData.coords.latitude, updateData.coords.longitude);
      }
      if (updateData.orderId !== undefined) {
        fieldsToUpdate.push('"order_id" = $' + (sqlParams.length + 1));
        sqlParams.push(updateData.orderId);
      }
      if (updateData.driverId !== undefined) {
        fieldsToUpdate.push('"driver_id" = $' + (sqlParams.length + 1));
        sqlParams.push(updateData.driverId);
      }
      // Forming the full SQL query
      sqlQuery +=
        fieldsToUpdate.join(', ') +
        ' WHERE "user_id" = $' +
        (sqlParams.length + 1);
      sqlParams.push(userId);

      // Running the query
      // if (fieldsToUpdate.length > 0)
      // Ensure there is something to update
      await this.prisma.$executeRawUnsafe(sqlQuery, ...sqlParams);
      return await this.findOneUserId(userId);
    } catch (e) {
      this.managerError(e);
    }
  }

  async updatePoint(
    pointId: number,
    updateData: UpdatePointDto,
    isActive?: boolean
  ) {
    let updatedRows;
    try {
      const fieldsToUpdate = [];
      const sqlParams = [];
      let paramIndex = 1;
      let sqlQuery = 'UPDATE "Point" SET ';

      // Actualizar coordenadas
      if (updateData.coords) {
        fieldsToUpdate.push(
          `"coords" = ST_SetSRID(ST_MakePoint(${updateData.coords.longitude}, ${updateData.coords.latitude}), 4326)`
        );
      }

      // Actualizar longitud y latitud
      if (updateData.coords?.longitude !== undefined) {
        fieldsToUpdate.push('"longitude" = $' + paramIndex++);
        sqlParams.push(updateData.coords.longitude);
      }
      if (updateData.coords?.latitude !== undefined) {
        fieldsToUpdate.push('"latitude" = $' + paramIndex++);
        sqlParams.push(updateData.coords.latitude);
      }

      // Actualizar otros campos
      if (updateData.orderId !== undefined) {
        fieldsToUpdate.push('"order_id" = $' + paramIndex++);
        sqlParams.push(updateData.orderId);
      }
      if (updateData.driverId !== undefined) {
        fieldsToUpdate.push('"driver_id" = $' + paramIndex++);
        sqlParams.push(updateData.driverId);
      }
      if (updateData.address !== undefined) {
        fieldsToUpdate.push('"address" = $' + paramIndex++);
        sqlParams.push(updateData.address);
      }
      if (updateData.city !== undefined) {
        fieldsToUpdate.push('"city" = $' + paramIndex++);
        sqlParams.push(updateData.city);
      }
      if (updateData.state !== undefined) {
        fieldsToUpdate.push('"state" = $' + paramIndex++);
        sqlParams.push(updateData.state);
      }
      if (updateData.pointName !== undefined) {
        fieldsToUpdate.push('"point_name" = $' + paramIndex++);
        sqlParams.push(updateData.pointName);
      }

      // Cláusula WHERE
      let where = ' WHERE "id" = $' + paramIndex++;
      sqlParams.push(pointId);

      if (isActive !== undefined) {
        where += ' AND "is_active" = $' + paramIndex++ + '::boolean';
        sqlParams.push(isActive);
      }

      sqlQuery += fieldsToUpdate.join(', ') + where;

      updatedRows = await this.prisma.$executeRawUnsafe(sqlQuery, ...sqlParams);
    } catch (e) {
      console.error('Error updating point:', e);
      this.managerError(e);
    }

    if (updatedRows === 0) {
      throw new BadRequestException(
        'The point is not active or that point is not associated with the user'
      );
    }

    return { message: 'ok' };
  }

  async updatePointWihtUser(
    userId: number,
    updateData: UpdatePointDto,
    isActive?: boolean
  ) {
    let updatedRows;
    try {
      const fieldsToUpdate = [];
      const sqlParams = [];
      let paramIndex = 1;
      let sqlQuery = 'UPDATE "Point" SET ';

      // Actualizar coordenadas
      if (updateData.coords) {
        fieldsToUpdate.push(
          `"coords" = ST_SetSRID(ST_MakePoint(${updateData.coords.longitude}, ${updateData.coords.latitude}), 4326)`
        );
      }

      // Actualizar longitud y latitud
      if (updateData.coords?.longitude !== undefined) {
        fieldsToUpdate.push('"longitude" = $' + paramIndex++);
        sqlParams.push(updateData.coords.longitude);
      }
      if (updateData.coords?.latitude !== undefined) {
        fieldsToUpdate.push('"latitude" = $' + paramIndex++);
        sqlParams.push(updateData.coords.latitude);
      }

      // Actualizar otros campos
      if (updateData.orderId !== undefined) {
        fieldsToUpdate.push('"order_id" = $' + paramIndex++);
        sqlParams.push(updateData.orderId);
      }
      if (updateData.driverId !== undefined) {
        fieldsToUpdate.push('"driver_id" = $' + paramIndex++);
        sqlParams.push(updateData.driverId);
      }
      if (updateData.address !== undefined) {
        fieldsToUpdate.push('"address" = $' + paramIndex++);
        sqlParams.push(updateData.address);
      }
      if (updateData.city !== undefined) {
        fieldsToUpdate.push('"city" = $' + paramIndex++);
        sqlParams.push(updateData.city);
      }
      if (updateData.state !== undefined) {
        fieldsToUpdate.push('"state" = $' + paramIndex++);
        sqlParams.push(updateData.state);
      }
      if (updateData.pointName !== undefined) {
        fieldsToUpdate.push('"point_name" = $' + paramIndex++);
        sqlParams.push(updateData.pointName);
      }

      // Cláusula WHERE
      let where = ' WHERE "user_id" = $' + paramIndex++;
      sqlParams.push(userId);

      where += ' AND "type" = CAST($' + paramIndex++ + ' AS "TypePointEnum")';
      sqlParams.push(TypePointEnum.VEHICLE);

      if (isActive !== undefined) {
        where += ' AND "is_active" = $' + paramIndex++ + '::boolean';
        sqlParams.push(isActive);
      }

      sqlQuery += fieldsToUpdate.join(', ') + where;

      updatedRows = await this.prisma.$executeRawUnsafe(sqlQuery, ...sqlParams);
    } catch (e) {
      console.error('Error updating point:', e);
      this.managerError(e);
    }

    if (updatedRows === 0) {
      throw new BadRequestException(
        'The point is not active or that point is not associated with the user'
      );
    }

    return { message: 'ok' };
  }

  async delete(data: Prisma.PointDeleteArgs) {
    return this.prisma.point.delete(data);
  }

  async findPointsWithinDistance(
    latitude: number,
    longitude: number,
    radiusInMilles: number,
    isActive?: boolean
  ): Promise<any[]> {
    isActive = isActive !== undefined ? isActive : true;
    const query = `
      SELECT
         u.*
      FROM 
          "Point" AS p
      JOIN 
          "Driver" AS d ON p.driver_id = d.id
      JOIN 
          "User" AS u ON d.user_id = u.id
      JOIN 
          "AblyChannel" AS a ON d.user_id = a.id
      WHERE 
          ST_DWithin(
            p.coords,
            ST_SetSRID(ST_MakePoint(\$1, \$2), 4326),
              \$3
          )
          AND p.driver_id IS NOT NULL
          AND p.is_active = \$4
    `;

    const places: any[] = await this.prisma.$queryRawUnsafe(
      query,
      longitude,
      latitude,
      radiusInMilles, // convert to milles
      isActive // Pass the isActive parameter
    );
    return places;
  }

  async findOrdersWithinDistance(
    paginationOrderAroundDto: PaginationOrderAroundDto
  ): Promise<PaginatedResponse<OrderEntity>> {
    paginationOrderAroundDto['latitude'] = 1;
    paginationOrderAroundDto.longitude = 1;
    paginationOrderAroundDto.radiusInMilles = 10;
    const queryOrders = `
      SELECT
        o.*
      FROM 
       "Order" AS o
      JOIN 
       "Point" AS departure_point ON o."departure_id" = departure_point.id
      JOIN 
        "Point" AS destination_point ON o."destination_id" = destination_point.id
      WHERE 
      ST_DWithin(
        departure_point.coords,
        ST_SetSRID(ST_MakePoint($1, $2), 4326),
        $3
      )
      AND o.departure_id IS NOT NULL
      AND o.destination_id IS NOT NULL
      AND o."status" = 'PENDING'
      AND o."expiration_time" >= CURRENT_DATE
      LIMIT $4 OFFSET $5;
    `;

    const orders: any[] = await this.prisma.$queryRawUnsafe(
      queryOrders,
      paginationOrderAroundDto.longitude,
      paginationOrderAroundDto.latitude,
      paginationOrderAroundDto.radiusInMilles,
      paginationOrderAroundDto.perPage,
      paginationOrderAroundDto.page
    );

    const querryCount = `SELECT COUNT(*) AS count
    FROM "Order" AS o
    JOIN "Point" AS departure_point ON o."departure_id" = departure_point.id
    JOIN "Point" AS destination_point ON o."destination_id" = destination_point.id
    WHERE ST_DWithin(
      departure_point.coords,
      ST_SetSRID(ST_MakePoint($1, $2), 4326),
      $3
    )
    AND o.departure_id IS NOT NULL
    AND o.destination_id IS NOT NULL
    AND o."status" = 'PENDING'
    AND o."expiration_time" >= CURRENT_DATE
    `;

    const count = (
      await this.prisma.$queryRawUnsafe(
        querryCount,
        paginationOrderAroundDto.longitude,
        paginationOrderAroundDto.latitude,
        paginationOrderAroundDto.radiusInMilles
      )
    )[0].count;

    const skip =
      (paginationOrderAroundDto.page - 1) * paginationOrderAroundDto.perPage;
    const take = paginationOrderAroundDto.perPage;

    // const totalResults = 100;
    const totalResults = parseInt(count, 10);
    const totalPages = Math.ceil(
      totalResults / paginationOrderAroundDto.perPage
    );

    return {
      data: orders,
      pageInfo: {
        currentPage: paginationOrderAroundDto.page,
        totalPages,
        totalResults,
      },
    };
  }

  async countPointsWithinDistance(
    latitude: number,
    longitude: number,
    radiusInMiles: number,
    isActive: boolean,
    type: TypePointEnum
  ): Promise<any> {
    const radiusInMeters = radiusInMiles * 1609.34;

    const query = `
    SELECT
      p.id AS point_id,
      p.is_active AS point_is_active,
      p.type AS point_type,
      ST_AsText(p.coords) AS coords_text,
      -- Datos básicos de la orden
      o.id AS order_id,
      o.price AS order_price,
      o.milles AS order_milles,
      o.aditional_info AS order_aditional_info,
      o.delivery_date AS order_delivery_date,
      o.status AS order_status,
      o.car_count AS order_car_count,
      o.is_assistance_request_for_now AS order_is_assistance_request_for_now, -- Nueva columna agregada
      -- Datos de VehicleOrder (Vehículos asociados)
      vo.id AS vehicle_order_id,
      vo.qty AS vehicle_order_qty,
      vo.year AS vehicle_order_year,
      vo.vehicle_type AS vehicle_order_vehicle_type,
      vo.state AS vehicle_order_state,
      vo.vehicle_color AS vehicle_order_color,
      vo.is_the_keys_with_the_vehicle AS vehicle_order_has_keys,
      vo.trailer_type AS vehicle_order_trailer_type,
      -- Nombres del modelo y la marca
      m.name AS model_name,
      b.name AS brand_name
    FROM "Point" AS p
    LEFT JOIN "Order" AS o ON p.order_id = o.id
    LEFT JOIN "VehicleOrder" AS vo ON o.id = vo.order_id
    LEFT JOIN "Model" AS m ON vo.model_id = m.id
    LEFT JOIN "Brand" AS b ON m.brand_id = b.id
    WHERE ST_DWithin(
      ST_SetSRID(ST_MakePoint(\$1, \$2), 4326)::geography,
      p.coords::geography,
      \$3
    )
      AND p.is_active = \$4
      AND p.type = \$5::"TypePointEnum"
  `;

    const result = await this.prisma.$queryRawUnsafe(
      query,
      longitude,
      latitude,
      radiusInMeters,
      isActive,
      type
    );

    // El resultado suele venir como un array de filas; parsea la columna count
    return result;
  }

  async listPointsWithinDistance(
    latitude: number,
    longitude: number,
    radiusInMiles: number,
    isActive: boolean,
    type: TypePointEnum,
    // page: number = 1,
    // pageSize: number = 10
  ): Promise<any> {

    try {
      // convert miles to meters
      const radiusInMeters = radiusInMiles * 1609.34;
      // Calcular el offset para la paginación
      //const offset = (page - 1) * pageSize;

      const query = `
      SELECT 
        o.*, 
        COALESCE(json_agg(DISTINCT vo.*) FILTER (WHERE vo.id IS NOT NULL), '[]') AS vehicles, 
        COALESCE(json_agg(DISTINCT n.*) FILTER (WHERE n.id IS NOT NULL), '[]') AS negotiations,
        COALESCE(json_agg(DISTINCT jsonb_build_object('id', ph.id, 'name', ph.name, 'url', null)) 
                 FILTER (WHERE ph.id IS NOT NULL), '[]'
        ) AS photos,
        to_jsonb(dep.*) as departure,
        to_jsonb(dest.*) as destination,
        to_jsonb(u.*) as user
      FROM "Order" as o 
      LEFT JOIN (SELECT 
                  v.*,
                  to_jsonb(m.*) as model 
                  FROM "VehicleOrder" as v
                LEFT JOIN "Model" as m ON m.id = v.model_id
                GROUP BY v.id, m.id) as vo ON o.id = vo.order_id
      LEFT JOIN "Negotiation" as n ON o.id = n.order_id
      LEFT JOIN "Point" as dep ON o.departure_id = dep.id 
      LEFT JOIN "Point" as dest ON o.destination_id= dest.id
      LEFT JOIN "Photo" as ph ON o.id=ph.order_id
      LEFT JOIN "User" as u ON o.user_id=u.id
      WHERE ST_DWithin(
          ST_SetSRID(ST_MakePoint(\$1, \$2), 4326)::geography,
          dep.coords::geography,
          \$3
      )
      AND dep.is_active = \$4
      AND dep.coords IS NOT NULL
      AND dep.type = \$5::text::"TypePointEnum"
      GROUP BY o.id, dep.id, dest.id, u.id
      ORDER BY o.created_at DESC;`;

      //LIMIT \$6 OFFSET \$7

      const rawData: Order[] = await this.prisma.$queryRawUnsafe(
        query,
        longitude,
        latitude,
        radiusInMeters,
        isActive,
        type,
        // pageSize,
        // offset
      );

      const finalResult = await Promise.all(
        rawData.map(async (raw) => {
          return {
            ...raw,
            photos: await Promise.all(
              raw.photos.map(async (photo) => ({
                ...photo,
                url: await this.s3Service.getSignedUrl(photo.name),
              }))
            )
          };
        })
      );

      return toCamelCase(finalResult);

    } catch (error) {

      throw error;

    };

  };

  async classicUpdate(
    findOneArgs: Prisma.PointFindUniqueArgs,
    updateArgs: Prisma.PointUpdateArgs
  ): Promise<PointEntity> {
    await this.classicFindOne(findOneArgs);
    try {
      return await this.prisma.point.update(updateArgs);
    } catch (e) {
      this.managerError(e);
    }
  }

  async classicFindOne(
    findOneArgs: Prisma.PointFindUniqueArgs
  ): Promise<PointEntity> {
    let item;
    try {
      item = await this.prisma.point.findUnique(findOneArgs);
    } catch (e) {
      this.managerError(e);
    }
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  managerError(exception) {
    let status = 500;
    let message = 'An unexpected error occurred';

    switch (exception.code) {
      case 'P2002':
        status = 400;
        message =
          'Unique constraint failed, please ensure all required fields are unique.';
        break;
      case 'P2003':
        status = 400;
        message =
          'Foreign key constraint failed, please ensure the related record exists.';
        break;
      case 'P2004':
        status = 400;
        message =
          'A constraint failed on the database, please ensure all field constraints are met.';
        break;
      case 'P2018':
        message =
          'Required parameters are missing or the id of a nested parameter does not exist. Please ensure all required fields are provided or the id of a nested parameter does exist.';
        status = 400;
        break;
      case 'P2021':
        message = 'Item not found.';
        status = 400;
        break;
      case 'P2025':
        status = 400;
        message =
          'Record to delete does not exist or the id of a nested parameter does not exist.';
        break;
      case 'P2010':
        status = 400;
        message = exception.meta.message;
        break;
      default:
        console.error('Unhandled Prisma error: ', exception);
        break;
    }

    throw new HttpException(
      {
        statusCode: status,
        message,
        // timestamp: new Date().toISOString(),
      },
      status
    );
  }
}
