import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma, RolesEnum } from '@prisma/client';
import { CompanyEntity } from '../domain/company.entity';
import { S3Service } from 'src/s3/aplication/s3.service';
import { UpdateCompanyDto } from '../domain/company.dtos';
import { CompanyOtpDto } from '../domain/companyOtp.dtos';
import { UserCompanyRolesService } from 'src/appCore/userCompanyRoles/application/userCompanyRoles.service';
import { MailerService } from 'src/_shared/application/nodeMailer.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/_shared/domain/interface/payload.interface';

@Injectable()
export class CompaniesService extends PrismaGenericService<
  CompanyEntity,
  Prisma.CompanyCreateArgs,
  Prisma.CompanyFindUniqueArgs,
  Prisma.CompanyUpdateArgs,
  Prisma.CompanyDeleteArgs,
  Prisma.CompanyFindManyArgs
> {
  private readonly logger = new Logger(CompaniesService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service,
    private readonly userCompanyRolesService: UserCompanyRolesService,
    private readonly mailerService: MailerService,
    private jwtService: JwtService
  ) {
    super(prismaService.company);
  }

  select: Prisma.CompanySelect = {
    id: true,
    rating: true,
    dotNumber: true,
    stripeAccountId: true,
    expMonth: true,
    expYear: true,
    cardNumber: true,
    companyName: true,
    carrierIdentifier: true,
    usdot: true,
    mc: true,
    primaryAdminEmail: true,
    countryCode: true,
    phoneNumber: true,
    extension: true,
    addressLine1: true,
    addressLine2: true,
    city: true,
    state: true,
    zipCode: true,
    country: true,
    phone: true,
    infoUrl: true,
    hours: true,
    insuranceDetails: true,
    companyStatus: true,
    companyType: true, //ojo quitar
    licenseType: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
    version: true,
    ownerId: true,
    roles: true,
    photos: true,
    transfers: true,
    userCompanyRoles: true,
    payments: true,
    paymentMethod: true,
    drivers: true,
  };

  async updateCompanies(
    updateCompanyDto: UpdateCompanyDto,
    companyId: string,
    userId: string
  ): Promise<CompanyEntity> {
    const { dataIds, vehicles, ...data } = updateCompanyDto;
    let existingVehicleOrders, idAndOtherFieldsOrders, newVehicleOrders;
    if (vehicles) {
      existingVehicleOrders = vehicles.filter(
        ({ id }) => id !== null && id !== undefined
      );

      idAndOtherFieldsOrders = vehicles.filter(
        ({ id, ...order }) =>
          id !== null && id !== undefined && Object.keys(order).length > 0
      );

      newVehicleOrders = vehicles.filter(({ id }) => {
        if (!id) {
          return true;
        }
        return false;
      });
    }
    const updateArgs: Prisma.CompanyUpdateArgs = {
      select: this.select,
      where: { id: +companyId },
      data: {
        ...data,
        photos: {
          connect: dataIds ? dataIds.map((id) => ({ id })) : undefined,
        },
        drivers: {
          deleteMany: existingVehicleOrders
            ? {
                id: {
                  notIn: existingVehicleOrders.map(({ id }) => id),
                },
              }
            : undefined,
          create: newVehicleOrders?.map(
            ({ vehicleInfo, userId: uId, serviceId, photoIds, ...voData }) => ({
              ...voData,
              photos: {
                connect: photoIds ? photoIds.map((id) => ({ id })) : undefined,
              },
              user: uId ? { connect: { id: uId } } : undefined,
              vehicleInfo: {
                create: {
                  ...vehicleInfo,
                  ownerId: +userId,
                },
              },
              service: {
                connect: {
                  id: serviceId,
                },
              },
              ownerId: +userId,
            })
          ),
          update: idAndOtherFieldsOrders?.map(
            ({
              id,
              vehicleInfo,
              userId: uId,
              serviceId,
              photoIds,
              ...voData
            }) => ({
              where: { id, companyId: +companyId },
              data: {
                ...voData,
                ...(vehicleInfo
                  ? {
                      vehicleInfo: {
                        update: vehicleInfo,
                      },
                    }
                  : {}),
                photos: {
                  connect: photoIds
                    ? photoIds.map((id) => ({ id }))
                    : undefined,
                },
                ...(serviceId
                  ? { service: { connect: { id: serviceId } } }
                  : undefined),
              },
            })
          ),
        },
      },
    };
    return this.update(this.filter(companyId + ''), updateArgs);
  }

  async findOneCompany(
    find: Prisma.CompanyFindUniqueArgs
  ): Promise<CompanyEntity> {
    const company = await this.findOne(find);
    company.infoUrl = await this.s3Service.getSignedUrl(await company.infoUrl);
    return company;
  }

  async inviteDriverToCompany(
    signInDto: CompanyOtpDto,
    companyId: number,
    otp: string
  ) {
    const select: Prisma.UserCompanyRoleSelect = {
      companyId: true,
      role: {
        select: { id: true, type: true },
      },
      userId: true,
    };

    const userCompamyRoleFind: Prisma.UserCompanyRoleFindManyArgs = {
      select: select,
      where: {
        user: {
          email: signInDto.email,
        },
      },
    };

    const userCompanyRoles: any =
      await this.userCompanyRolesService.findAll(userCompamyRoleFind);

    let userCompanyRoleData = userCompanyRoles.data.find(
      (role) => role.companyId === companyId
    );

    if (!userCompanyRoleData) {
      const userCompanyRoleCreate: Prisma.UserCompanyRoleCreateArgs = {
        data: {
          user: {
            connectOrCreate: {
              where: {
                email: signInDto.email,
              },
              create: {
                email: signInDto.email,
                isActive: false,
              },
            },
          },
          company: {
            connect: {
              id: companyId,
            },
          },
          role: {
            connect: {
              name: RolesEnum.DRIVER,
            },
          },
        },
        select: select,
      };

      userCompanyRoleData = await this.userCompanyRolesService.create(
        userCompanyRoleCreate
      );
    }

    const payload: Payload = {
      id: userCompanyRoleData.userId,
      companyId: userCompanyRoleData.companyId,
      sessionId: '',
      pointId: '',
      hash: '',
      logType: userCompanyRoleData.role.type,
    };
    const token = await this.getTokensData(payload);
    const verificationUrl = process.env.REDIRECT_URL + `?otp=${otp}`;

    await this.mailerService.sendOtpEmailWhitUrl(
      signInDto.email,
      'Verify Your Account',
      otp,
      companyId
    );

    return userCompanyRoleData;
  }

  private async getTokensData(payload: Payload) {
    try {
      const token = await this.jwtService.signAsync(payload);
      return token;
    } catch (e) {
      throw new BadRequestException('Create Token');
    }
  }
}
