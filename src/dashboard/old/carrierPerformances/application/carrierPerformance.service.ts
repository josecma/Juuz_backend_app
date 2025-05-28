// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'nestjs-prisma';
// import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
// import { Prisma } from '@prisma/client';
// import { CarrierPerformanceEntity } from '../domain/carrierPerformance.entity';
// import { PaginationCarrierPerformanceDto } from '../domain/pagination-carrierPerformance.dto';
// import { AverageCarrierPerformanceDto } from '../domain/averageCarrierPerformance.dtos';

// @Injectable()
// export class CarrierPerformancesService extends PrismaGenericService<
//   CarrierPerformanceEntity,
//   Prisma.CarrierPerformanceCreateArgs,
//   Prisma.CarrierPerformanceFindUniqueArgs,
//   Prisma.CarrierPerformanceUpdateArgs,
//   Prisma.CarrierPerformanceDeleteArgs,
//   Prisma.CarrierPerformanceFindManyArgs
// > {
//   constructor(private readonly prismaService: PrismaService) {
//     super(prismaService.carrierPerformance);
//   }

//   async findAllCarrierPerformances(
//     data: Prisma.CarrierPerformanceFindManyArgs,
//     pagination: PaginationCarrierPerformanceDto
//   ) {
//     const where: Prisma.CarrierPerformanceWhereInput = {
//       ...(pagination.userId !== undefined && { userId: pagination.userId }),
//       ...(pagination.punctuality !== undefined && {
//         punctuality: pagination.punctuality,
//       }),
//       ...(pagination.cargoCare !== undefined && {
//         cargoCare: pagination.cargoCare,
//       }),
//       ...(pagination.friendliness !== undefined && {
//         friendliness: pagination.friendliness,
//       }),
//     };

//     return this.findAll({
//       ...data,
//       where,
//       take: pagination.perPage,
//       skip: pagination.page,
//     });
//   }

//   async averages(): Promise<AverageCarrierPerformanceDto> {
//     const result = await this.model.aggregate({
//       _avg: {
//         punctuality: true,
//         cargoCare: true,
//         friendliness: true,
//       },
//     });

//     const overallAverage =
//       (result._avg.punctuality +
//         result._avg.cargoCare +
//         result._avg.friendliness) /
//       3;

//     return {
//       punctuality: result._avg.punctuality,
//       cargoCare: result._avg.cargoCare,
//       friendliness: result._avg.friendliness,
//       overallAverage,
//     };
//   }
// }
