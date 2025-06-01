// import { BadRequestException, Injectable, Logger } from '@nestjs/common';
// import { PrismaService } from 'nestjs-prisma';
// import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
// import { Prisma, TypePointEnum } from '@prisma/client';
// import { DriverEntity } from '../domain/driver.entity';
// import { CarrierDto, DriverDto, UpdateDriverDto } from '../domain/driver.dtos';
// import { ValidationService } from 'src/_shared/providers/validation/application/validation.service';
// import { PointsService } from 'src/appCore/points/application/points.service';
// import { PointDto } from 'src/appCore/points/domain/point.dtos';

// @Injectable()
// export class DriversService extends PrismaGenericService<
//   DriverEntity,
//   Prisma.VehicleCreateArgs,
//   Prisma.VehicleFindUniqueArgs,
//   Prisma.VehicleUpdateArgs,
//   Prisma.VehicleDeleteArgs,
//   Prisma.VehicleFindManyArgs
// > {
//   private readonly logger = new Logger(DriversService.name);
//   constructor(
//     private readonly prismaService: PrismaService,
//     private readonly validateService: ValidationService,
//     private readonly pointsService: PointsService
//   ) {
//     super(prismaService.vehicle);
//   }

//   async createDriver(body, ownerId: string, companyId: string) {
//     if (!body.userId) body['userId'] = ownerId;
//     await this.validateService.vinValidations(body.vinNumber);

//     const existingDriver = await this.model.findUnique({
//       where: {
//         vinNumber: body.vinNumber,
//       },
//     });

//     if (existingDriver) {
//       throw new BadRequestException(
//         `There is already a driver associated with the user ID ${ownerId}.`
//       );
//     }
//     const { vehicleInfo, userId, serviceId, photoIds, ...data } = body;
//     const driver = await this.create({
//       data: {
//         ...data,
//         photos: {
//           connect: photoIds ? photoIds.map((id) => ({ id })) : undefined,
//         },
//         user: {
//           connect: { id: userId },
//         },
//         vehicleInfo: {
//           create: {
//             ...vehicleInfo,
//             ownerId: ownerId,
//           },
//         },
//         service: {
//           connect: {
//             id: serviceId,
//           },
//         },
//         ownerId: ownerId,
//         Company: { connect: { id: companyId } },
//       },
//     });
//     const point: PointDto = {
//       pointName: '',
//       orderId: '',
//       driverId: driver.id,
//       comunicationId: 0,
//       coords: {
//         latitude: 1,
//         longitude: 1,
//       },
//       address: '',
//       city: '',
//       state: '',
//     };
//     await this.pointsService.create(
//       point,
//       '' + ownerId,
//       TypePointEnum.VEHICLE,
//       false
//     );
//     return driver;
//   }

//   async updateCreate(
//     id: string,
//     updateDriverDto: UpdateDriverDto,
//     companyId: string
//   ) {
//     // if (updateDriverDto.vinNumber)
//     // await this.validateService.vinValidations(updateDriverDto.vinNumber);

//     const { vehicleInfo, serviceId, photoIds, ...data } = updateDriverDto;

//     const update: Prisma.VehicleUpdateArgs = {
//       data: {
//         ...data,
//         ...(vehicleInfo
//           ? {
//             vehicleInfo: {
//               update: vehicleInfo,
//             },
//           }
//           : {}),
//         photos: {
//           connect: photoIds ? photoIds.map((id) => ({ id })) : undefined,
//           deleteMany: {
//             id: {
//               notIn: photoIds ? photoIds : undefined,
//             },
//           },
//         },
//         ...(serviceId
//           ? { service: { connect: { id: serviceId } } }
//           : undefined),
//       },
//       where: { id: id },
//     };

//     return this.update(this.filter(id), update);
//   }
// }
