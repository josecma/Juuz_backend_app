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
  Prisma.BrandCreateArgs,
  Prisma.BrandFindUniqueArgs,
  Prisma.BrandUpdateArgs,
  Prisma.BrandDeleteArgs,
  Prisma.BrandFindManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.brand);
  }

  async findAllBrands(
    data: Prisma.BrandFindManyArgs,
    pagination: PaginationBrandDto
  ) {
    const where: Prisma.BrandWhereInput = {
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
                year: pagination.year, // Filtra por el año en los modelos relacionados
              },
            },
          }
        : {}),
    };

    const include: Prisma.BrandInclude = {
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
