// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'nestjs-prisma';
// import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
// import { Prisma } from '@prisma/client';
// import { ShipperPerformanceEntity } from '../domain/shipperPerformance.entity';
// import { PaginationShipperPerformanceDto } from '../domain/pagination-shipperPerformance.dto';
// import { AverageShipperPerformanceDto } from '../domain/averageShipperPerformance.dtos';

// @Injectable()
// export class ShipperPerformancesService extends PrismaGenericService<
//   ShipperPerformanceEntity,
//   Prisma.ShipperPerformanceCreateArgs,
//   Prisma.ShipperPerformanceFindUniqueArgs,
//   Prisma.ShipperPerformanceUpdateArgs,
//   Prisma.ShipperPerformanceDeleteArgs,
//   Prisma.ShipperPerformanceFindManyArgs
// > {
//   constructor(private readonly prismaService: PrismaService) {
//     super(prismaService.shipperPerformance);
//   }

//   async findAllShipperPerformances(
//     data: Prisma.ShipperPerformanceFindManyArgs,
//     pagination: PaginationShipperPerformanceDto
//   ) {
//     const where: Prisma.ShipperPerformanceWhereInput = {
//       ...(pagination.userId !== undefined && { userId: pagination.userId }),
//       ...(pagination.receptionPunctuality !== undefined && {
//         punctuality: pagination.receptionPunctuality,
//       }),
//       ...(pagination.instructionClarity !== undefined && {
//         cargoCare: pagination.instructionClarity,
//       }),
//       ...(pagination.accessibility !== undefined && {
//         friendliness: pagination.accessibility,
//       }),
//       ...(pagination.friendliness !== undefined && {
//         friendliness: pagination.friendliness,
//       }),
//       ...(pagination.onTimePayment !== undefined && {
//         onTimePayment: pagination.onTimePayment,
//       }),
//       ...(pagination.startDate && {
//         createdAt: { gte: new Date(pagination.startDate) },
//       }),
//       ...(pagination.endDate && {
//         createdAt: { lte: new Date(pagination.endDate) },
//       }),
//     };
//     return this.findAll({
//       ...data,
//       where,
//       take: pagination.perPage,
//       skip: pagination.page,
//     });
//   }

//   async averages(): Promise<AverageShipperPerformanceDto> {
//     const result = await this.model.aggregate({
//       _avg: {
//         receptionPunctuality: true,
//         instructionClarity: true,
//         accessibility: true,
//         friendliness: true,
//         onTimePayment: true,
//       },
//     });

//     const overallAverage =
//       (result._avg.receptionPunctuality +
//         result._avg.instructionClarity +
//         result._avg.accessibility +
//         result._avg.friendliness +
//         result._avg.onTimePayment) /
//       3;

//     return {
//       receptionPunctuality: result._avg.receptionPunctuality,
//       instructionClarity: result._avg.instructionClarity,
//       accessibility: result._avg.accessibility,
//       friendliness: result._avg.friendliness,
//       onTimePayment: result._avg.onTimePayment,
//       overallAverage,
//     };
//   }
// }
