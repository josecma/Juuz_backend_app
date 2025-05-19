import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { UserEntity } from '../domain/user.entity';
import { ValidationService } from 'src/_shared/providers/validation/application/validation.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDriverDto, UserDriverDto } from '../domain/userCarrier.dtos';
import { S3Service } from 'src/s3/aplication/s3.service';
import { UserExistDto } from '../domain/userExist.dtos';

@Injectable()
export class UsersService extends PrismaGenericService<
  UserEntity,
  Prisma.UserCreateArgs,
  Prisma.UserFindUniqueArgs,
  Prisma.UserUpdateArgs,
  Prisma.UserDeleteArgs,
  Prisma.UserFindManyArgs
> {
  userselect: Prisma.UserSelect = {
    id: true,
    email: true,
    phone: true,
    firstName: true,
    lastName: true,
    isActive: true,
    // roles         Role[]
    // session       Session[]
    // order         Order[]
    photos: {
      select: {
        name: true,
      },
    },
    // company       Company?        @relation(fields: [companyId], references: [id])
    driver: {
      select: {
        id: true,
        vinNumber: true,
        insuranceDoc: true,
        faceId: true,
        vehicleType: true,
        capacity: true,
        vehicleInfoId: true,
        vehicleInfo: true,
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            firstName: true,
            lastName: true,
            isActive: true,
            photos: true,
            createdAt: true,
            updatedAt: true,
            createdBy: true,
            updatedBy: true,
            deletedAt: true,
            deletedBy: true,
            version: true,
            ownerId: true,
            logType: true,
            userCompanyRoles: {
              select: {
                userId: true,
                companyId: true,
                roleId: true,
              },
            },
          },
        },
      },
    },
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
    version: true,
    ownerId: true,
  };
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validateService: ValidationService,
    private readonly s3Service: S3Service
  ) {
    super(prismaService.user);
  }

  async createUser(
    body: UserDriverDto,
    ownerId: number,
    companyId: number
  ): Promise<UserEntity> {
    const { driver, ...userData } = body;
    const data: Prisma.UserCreateInput = {
      ...userData,
      ownerId: ownerId,
      userCompanyRoles: {
        create: {
          companyId: companyId,
          roleId: body.roleId,
        },
      },
      ablyChannel: {
        create: {
          channelName: uuidv4(),
          ablyUser: uuidv4(),
          ownerId: ownerId,
        },
      },
    };

    if (driver) {
      const { vehicleInfoId, serviceId, ...driverData } = driver;
      if (driverData && driverData.vinNumber)
        await this.validateService.vinValidations(driverData.vinNumber);
      data['driver'] = {
        create: {
          ...driverData,
          vehicleInfo: {
            connect: { id: vehicleInfoId },
          },
          service: {
            connect: {
              id: serviceId,
            },
          },
          ownerId: ownerId,
        },
      };
    }

    return await this.create({
      data: data,
    });
  }

  async createExistUser(
    body: UserExistDto,
    companyId: number
  ): Promise<string> {
    const user = await this.model.findUnique({
      where: {
        email: body.email,
        phone: body.phone,
      },
    });
    await this.prismaService.userCompanyRole.create({
      data: {
        userId: user.id,
        companyId: companyId,
        roleId: body.roleId,
      },
    });
    return 'url';
  }

  async createNewUser(
    ownerId: number,
    companyId: number,
    roleId: number
  ): Promise<string> {
    const data: Prisma.UserCreateInput = {
      ownerId: ownerId,
      userCompanyRoles: {
        create: { companyId: companyId, roleId: roleId },
      },
      ablyChannel: {
        create: {
          channelName: uuidv4(),
          ablyUser: uuidv4(),
          ownerId: ownerId,
        },
      },
    };
    await this.create({
      data: data,
    });
    return 'url';
  }

  async updateUser(
    id: string,
    updateUserDriverDto: UpdateUserDriverDto,
    ownerId: number,
    companyId: number
  ): Promise<UserEntity> {
    const { driver, photoIds, ...userData } = updateUserDriverDto;
    const data: Prisma.UserUpdateInput = {
      ...userData,
      photos: {
        connect: photoIds ? photoIds.map((id) => ({ id })) : undefined,
        deleteMany: {
          id: {
            notIn: photoIds ? photoIds : undefined,
          },
        },
      },
    };
    if (driver) {
      const { vehicleInfoId, serviceId, ...driverData } = driver;
      if (driverData && driverData.vinNumber) {
        await this.validateService.vinValidations(driverData.vinNumber);
        data['driver'] = {
          upsert: {
            where: { id: +updateUserDriverDto.driverId },
            update: {
              ...driverData,
              vehicleInfo: {
                connect: { id: vehicleInfoId },
              },
              service: {
                connect: {
                  id: serviceId,
                },
              },
            },
            create: {
              ...driverData,
              vehicleInfo: {
                connect: { id: vehicleInfoId },
              },
              service: {
                connect: {
                  id: serviceId,
                },
              },
              ownerId: ownerId,
            },
          },
        };
      }
    }
    return this.update(this.filter(id), {
      data: data,
      select: this.userselect,
      ...this.filter(id),
    });
  }

  async findOneUser(id: number): Promise<UserEntity> {
    const user = await this.findOne({
      ...this.filter(id + ''),
      select: this.userselect,
    });
    user.userPhoto = await this.s3Service.getSignedUrl(await user.userPhoto);
    return user;
  }
}
