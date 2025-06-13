import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { BrandEntity } from '../domain/brand.entity';
import { PaginationBrandDto } from '../domain/pagination-brand.dto';
import { YearlyInstance } from 'twilio/lib/rest/api/v2010/account/usage/record/yearly';

@Injectable()
export class BrandsService extends PrismaGenericService<
    BrandEntity,
    Prisma.VehicleMakeCreateArgs,
    Prisma.VehicleMakeFindUniqueArgs,
    Prisma.VehicleMakeUpdateArgs,
    Prisma.VehicleMakeDeleteArgs,
    Prisma.VehicleMakeFindManyArgs
> {
    constructor(private readonly prismaService: PrismaService) {
        super(prismaService.vehicleMake);
    }

    async findAllBrands(
        data: Prisma.VehicleMakeFindManyArgs,
        pagination: PaginationBrandDto
    ) {
        const where: Prisma.VehicleMakeWhereInput = {
            ...(pagination.brandNamePrefix
                ? { name: { startsWith: pagination.brandNamePrefix } }
                : {}),
            ...(pagination.modelNamePrefix
                ? {
                    models: {
                        some: { name: { startsWith: pagination.modelNamePrefix } },
                    },
                }
                : {}),
            ...(pagination.year
                ? {
                    models: {
                        some: {
                            year: pagination.year
                        },
                    },
                }
                : {}),
        };

        const include: Prisma.VehicleMakeInclude = {
            models: {
                where: {
                    name: {
                        startsWith: pagination.modelNamePrefix,
                    },
                },
                select: {
                    name: true,
                    id: true,
                    year: true,
                },
            },
        };

        return this.findAll({
            ...data,
            include,
            where,
            take: pagination.perPage,
            skip: pagination.page,
        });
    }
}
