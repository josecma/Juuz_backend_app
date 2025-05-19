import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/appCore/users/application/users.service';
import {
  $Enums,
  CompanyType,
  PaymentMethodType,
  Prisma,
  RolesEnum,
} from '@prisma/client';
import { OtpDto } from '../domain/otp.dtos';
import { OtpSpeakeasyService } from 'src/_shared/application/otpSpeakeasy.service';
import { v4 as uuidv4 } from 'uuid';
import { CompaniesService } from 'src/appCore/companies/application/companies.service';
import { PermissionsService } from 'src/appCore/permissions/application/permissions.service';
import { OtpValidateResponseDto } from '../domain/otpValidateResponse.dtos';
import { Payload } from 'src/_shared/domain/interface/payload.interface';
import { AblyService } from 'src/_shared/providers/ably/application/ably.service';
import { RolesService } from 'src/appCore/roles/application/roles.service';
import { StripeService } from 'src/_shared/providers/stripe/application/stripe.service';
import { PaymentMethodsService } from 'src/appCore/paymentMethods/application/paymentMethods.service';
import { CompanyOtpDto } from 'src/appCore/companies/domain/companyOtp.dtos';
import { OtpResponseDto } from '../domain/otpResponse.dtos';
import * as bcrypt from 'bcrypt';
import { S3PhotoService } from 'src/s3/aplication/s3Photo.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private otpSpeakeasyService: OtpSpeakeasyService,
    private companyService: CompaniesService,
    private permissionsService: PermissionsService,
    private rolesService: RolesService,
    private ablyService: AblyService,
    private stripeService: StripeService,
    private paymentMethodsService: PaymentMethodsService,
    private readonly s3PhotoService: S3PhotoService
  ) {}

  roleCompany: Prisma.RoleFindUniqueArgs = {
    where: {
      name: 'SHIPPER',
    },
  };

  createFindCompanyArgs(name: string): Prisma.CompanyFindUniqueArgs {
    return {
      where: {
        companyName: name,
      },
    };
  }

  createRoleCompanyArgs(name: string): Prisma.RoleFindUniqueArgs {
    return {
      where: {
        name: name,
      },
    };
  }

  userFilterSelect: Prisma.UserSelect = {
    id: true,
    logType: true,
    userCompanyRoles: {
      select: {
        company: {
          select: {
            id: true,
            rating: true,
            companyName: true,
          },
        },
        role: {
          select: {
            name: true,
          },
        },
      },
    },
    driver: {
      select: {
        point: {
          select: {
            id: true,
          },
        },
      },
    },
  };

  async signIn(email: string, phone: string, otpNumber: string) {
    if (!email && !phone)
      throw new BadRequestException('Either email or phone is required.');

    const otpId = email ? email : phone;

    const validateOtp: OtpValidateResponseDto =
      this.otpSpeakeasyService.validateOtp(otpId, otpNumber);

    if (!validateOtp.valid) throw new BadRequestException('Wrong OTP number.');
    let where: any = { phone: phone };

    if (email) where = { email: email };

    let user;
    try {
      const filter: Prisma.UserFindUniqueArgs = {
        where: where,
        select: this.userFilterSelect,
      };
      user = await this.usersService.findOne(filter);
    } catch (e) {
      return { ...e, miMessage: 'Create user' };
    }
    user['companyId'] = await this.getCompanyId(user.id);
    return await this.createToken(user);
  }

  async createToken(payload: Payload) {
    const { token, refreshToken, tokenExpires } =
      await this.getTokensData(payload);

    return {
      token,
      refreshToken,
      tokenExpires,
      tokenType: 'bearer',
    };
  }

  async getCompanyId(userId: number) {
    const company = await this.companyService.findOne({
      where: { ownerId: userId },
    });
    return company.id;
  }

  async switch(userId: number, logType: $Enums.RolesEnum, companyId: number) {
    logType =
      logType === $Enums.RolesEnum.COMPANY
        ? $Enums.RolesEnum.SHIPPER
        : $Enums.RolesEnum.COMPANY;
    const role = await this.rolesService.findOne({ where: { name: logType } });
    const filter: Prisma.UserUpdateArgs = {
      data: {
        logType,
        userCompanyRoles: {
          update: {
            where: {
              userId_companyId: {
                userId: userId,
                companyId: companyId,
              },
            },
            data: {
              role: {
                connect: { id: role.id },
              },
              company: {
                update: {
                  companyType: $Enums.CompanyType.SHIPPER_AND_COMPANY,
                },
              },
            },
          },
        },
      },
      where: { id: userId },
      select: this.userFilterSelect,
    };
    const user: any = await this.usersService.update(
      this.usersService.filter(userId + ''),
      filter
    );

    const payload: Payload = {
      id: user?.id ?? undefined,
      companyId: user?.userCompanyRoles?.[0]?.company?.id ?? undefined,
      sessionId: user?.session?.[0]?.id
        ? String(user.session[0].id)
        : undefined,
      pointId: user?.driver?.point?.id ?? undefined,
      logType: user?.logType ?? undefined,
      hash: user?.session?.[0]?.id ? String(user.session[0].id) : undefined,
    };
    return await this.createToken(payload);
  }

  async switchCompany(userId: number, companyId: number) {
    const userFind: Prisma.UserFindUniqueArgs = {
      where: {
        id: userId,
      },
      select: {
        userCompanyRoles: {
          where: {
            companyId: companyId,
          },
          select: {
            role: {
              select: {
                type: true,
              },
            },
            companyId: true,
          },
        },
      },
    };

    const userData: any = await this.usersService.findOne(userFind);

    if (!userData || userData.userCompanyRoles.length === 0)
      throw new BadRequestException(
        'The company is not associated with the user'
      );

    const logType = userData.userCompanyRoles[0].role.type;

    const filter: Prisma.UserUpdateArgs = {
      data: {
        logType,
      },
      where: { id: userId },
      select: this.userFilterSelect,
    };
    const user: any = await this.usersService.update(
      this.usersService.filter(userId + ''),
      filter
    );

    const payload: Payload = {
      id: user?.id ?? undefined,
      companyId: user?.userCompanyRoles?.[0]?.company?.id ?? undefined,
      sessionId: user?.session?.[0]?.id
        ? String(user.session[0].id)
        : undefined,
      pointId: user?.driver?.point?.id ?? undefined,
      logType: user?.logType ?? undefined,
      hash: user?.session?.[0]?.id ? String(user.session[0].id) : undefined,
    };

    return await this.createToken(payload);
  }

  async createData(
    otpDto: OtpDto,
    logType: $Enums.RolesEnum,
    companyType: $Enums.CompanyType
  ) {
    const { ...userData } = otpDto;
    const ablyNameChannel = uuidv4();
    const ablyUserId = uuidv4();

    await this.ablyService.createChannel(ablyNameChannel);

    const role = await this.rolesService.findOne(
      this.createRoleCompanyArgs(logType)
    );

    const stripeAccountId = await this.stripeService.createAccount();

    const company = await this.companyService.create({
      data: {
        stripeAccountId: stripeAccountId,
        companyType: companyType,
      },
    });

    const userCreateArgs: Prisma.UserCreateArgs = {
      data: {
        ...userData,
        logType: logType,
        userCompanyRoles: {
          create: {
            companyId: company.id,
            roleId: role.id,
          },
        },
        ablyChannel: {
          create: {
            channelName: ablyNameChannel,
            ablyUser: ablyUserId,
            ownerId: 0,
          },
        },
      },
      include: {
        userCompanyRoles: {
          select: {
            company: {
              select: {
                id: true,
                rating: true,
                companyName: true,
              },
            },
          },
        },
      },
    };
    await this.createPaymentMethods(company.id);

    const user = await this.usersService.create(userCreateArgs);

    await this.companyService.update(
      this.companyService.filter('' + company.id),
      {
        data: { ownerId: user.id },
        where: { id: company.id },
      }
    );
    return user;
  }

  async signUp(
    otpDto: OtpDto,
    logType: $Enums.RolesEnum,
    companyType: $Enums.CompanyType
  ) {
    if (!otpDto.email && !otpDto.phone)
      throw new BadRequestException('Either email or phone is required.');
    let isPhone: boolean = true;
    try {
      let where: any = { phone: otpDto.phone };
      if (otpDto.email) {
        where = { email: otpDto.email };
        isPhone = false;
      }
      const user: any = await this.usersService.findOne({
        where: where,
        select: {
          id: true,
          userCompanyRoles: {
            select: {
              company: {
                select: {
                  id: true,
                  companyType: true,
                },
                where: {
                  userCompanyRoles: {
                    some: {
                      userId: where.id,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (logType !== user.userCompanyRoles[0].company.companyType)
        user.userCompanyRoles[0].company.companyType =
          CompanyType.SHIPPER_AND_COMPANY;
      const update: Prisma.UserUpdateArgs = {
        data: {
          logType,
          userCompanyRoles: {
            update: {
              where: {
                userId_companyId: {
                  userId: user.id,
                  companyId: user.userCompanyRoles[0].company.id,
                },
              },
              data: {
                company: {
                  update: {
                    companyType: user.userCompanyRoles[0].company.companyType,
                  },
                },
              },
            },
          },
        },
        where: { id: user.id },
      };
      await this.usersService.update(
        this.usersService.filter(user.id + ''),
        update
      );
    } catch (error) {
      if (error.message === 'Item not found') {
        await this.createData(otpDto, logType, companyType);
      } else throw new BadRequestException(error.message);
    }
    const otpId = otpDto.email ? otpDto.email : otpDto.phone;
    this.otpSpeakeasyService.generateSecret(otpId);
    const otp = this.otpSpeakeasyService.generateOtp(otpId);
    if (isPhone) {
      // this.twilioService.send({
      //   body: `Your otp number is ${otp.otpNumber} `,
      //   from: process.env.MY_PHONE_NUMBER,
      //   to: otpDto.phone,
      // });
    } else {
      // await this.mailerService.sendOtpEmail(
      //   otpDto.email,
      //   'OTP Number',
      //   otp.otpNumber
      // );
    }
    return otp;
  }

  async carrierCompanySignUp(otpDto: CompanyOtpDto) {
    const carrierLogic: (param: CompanyOtpDto) => Promise<any> = async (
      param: CompanyOtpDto
    ) => {
      const { ...userData } = otpDto;
      const ablyNameChannel = uuidv4();
      const ablyUserId = uuidv4();

      await this.ablyService.createChannel(ablyNameChannel);

      const role = await this.rolesService.findOne(
        this.createRoleCompanyArgs('COMPANY')
      );
      const stripeAccountId = await this.stripeService.createAccount();

      const company = await this.companyService.create({
        data: {
          stripeAccountId: stripeAccountId,
        },
      });

      const userCreateArgs: Prisma.UserCreateArgs = {
        data: {
          ...userData,
          logType: RolesEnum.COMPANY,
          userCompanyRoles: {
            create: {
              companyId: company.id,
              roleId: role.id,
            },
          },
          ablyChannel: {
            create: {
              channelName: ablyNameChannel,
              ablyUser: ablyUserId,
              ownerId: 0,
            },
          },
        },
        include: {
          userCompanyRoles: {
            select: {
              company: {
                select: {
                  id: true,
                  rating: true,
                  companyName: true,
                },
              },
            },
          },
        },
      };
      await this.createPaymentMethods(company.id);
      let user;
      try {
        user = await this.usersService.findOne({
          where: { email: userData.email },
          select: {
            ownerId: true,
            id: true,
            userCompanyRoles: {
              select: {
                company: {
                  select: {
                    id: true,
                    rating: true,
                    companyName: true,
                  },
                },
              },
            },
          },
        });
      } catch (e) {
        user = await this.usersService.create(userCreateArgs);
        await this.companyService.update(
          this.companyService.filter('' + company.id),
          {
            data: { ownerId: user.id },
            where: { id: company.id },
          }
        );
      }

      try {
        await this.companyService.update(
          this.companyService.filter('' + company.id),
          {
            data: { ownerId: user.id },
            where: { id: company.id },
          }
        );
      } catch (e) {}
      return user;
    };

    return await this.companySignUp(
      otpDto,
      $Enums.RolesEnum.COMPANY,
      carrierLogic
    );
  }

  async companySignUp(
    otpDto: CompanyOtpDto,
    logType: $Enums.RolesEnum,
    logic?: (param: CompanyOtpDto) => Promise<any>
  ) {
    const user = await logic(otpDto);

    const otpId = otpDto.email;
    this.otpSpeakeasyService.generateSecret(otpId);
    const otp: OtpResponseDto =
      await this.otpSpeakeasyService.generateOtp(otpId);
    return { user, otp: otp.otpNumber };
  }

  async simpleSignUp(otpDto: OtpDto) {
    if (!otpDto.email && !otpDto.phone)
      throw new BadRequestException('Either email or phone is required.');
    let isPhone: boolean = true;

    let where: any = { phone: otpDto.phone };
    if (otpDto.email) {
      where = { email: otpDto.email };
      isPhone = false;
    }

    try {
      await this.usersService.findOne({
        where: where,
      });
    } catch (e) {
      throw new UnauthorizedException(
        'There is no user with those credentials'
      );
    }

    const otpId = otpDto.email ? otpDto.email : otpDto.phone;
    this.otpSpeakeasyService.generateSecret(otpId);
    const otp = this.otpSpeakeasyService.generateOtp(otpId);
    if (isPhone) {
      // this.twilioService.send({
      //   body: `Your otp number is ${otp.otpNumber} `,
      //   from: process.env.MY_PHONE_NUMBER,
      //   to: otpDto.phone,
      // });
    } else {
      // const emailOptions = {
      //   to: otpDto.email, // Dirección de correo electrónico del destinatario
      //   subject: 'Tu código OTP', // Asunto del correo electrónico
      //   otpCode: otp.otpNumber, // Código OTP generado
      // };
      // await this.sesService.sendMail(emailOptions);
    }
    return otp;
  }

  private async getTokensData(payload: Payload) {
    let tokenExpires;
    try {
      tokenExpires =
        Date.now() + this.convertDurationToMinutes(process.env.EXPIRESIN);
    } catch (e) {
      throw new BadRequestException({
        message: e.message,
        EXPIRESIN: process.env.EXPIRESIN,
      });
    }

    let refreshToken;
    try {
      refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: process.env.REFRESH_EXPIRESIN,
      });
    } catch (e) {
      throw new BadRequestException({
        message: e.message,
        REFRESH_EXPIRESIN: process.env.REFRESH_EXPIRESIN,
      });
    }

    try {
      const token = await this.jwtService.signAsync(payload);
      return {
        token,
        refreshToken,
        tokenExpires,
      };
    } catch (e) {
      throw new BadRequestException({
        message: e.message,
        muMasda: 'jwtService.signAsync',
        data: payload,
      });
    }
  }

  private convertDurationToMinutes(input) {
    const units = input.slice(-1);
    const value = parseInt(input.slice(0, -1), 10);

    let minutes = 60;

    switch (units) {
      case 'm':
        minutes = value * minutes;
        break;
      case 'h':
        minutes = value * minutes * 60;
        break;
      case 'd':
        minutes = value * minutes * 60 * 24;
        break;
      default:
        throw new Error(
          'Unidad no reconocida. Use "m" para minutos, "h" para horas, o "d" para días.'
        );
    }

    return minutes;
  }

  async userCompaniesInfo(userId: number) {
    return this.usersService.findOne({
      where: { id: userId },
      select: {
        userCompanyRoles: {
          select: {
            company: {
              select: {
                id: true,
                rating: true,
                companyName: true,
              },
            },
          },
        },
      },
    });
  }

  userAccessInfo(userId: number) {
    return this.usersService.findOne({
      where: { id: userId },
      select: {
        userCompanyRoles: {
          select: {
            company: {
              select: {
                id: true,
                rating: true,
                companyName: true,
                phone: true,
                hours: true,
              },
            },
          },
        },
      },
    });
  }

  async userInfo(userInfo: number, companyId: number) {
    const permissonSelecet: Prisma.PermissionFindManyArgs = {
      skip: 0,
      take: 500,
      select: {
        name: true,
        action: true,
      },
      where: {
        role: {
          some: {
            UserCompanyRole: {
              some: { companyId: companyId, userId: userInfo },
            },
          },
        },
      },
    };
    const permissions = await this.permissionsService.findAll(permissonSelecet);
    const userselect: Prisma.UserSelect = {
      id: true,
      email: true,
      phone: true,
      firstName: true,
      lastName: true,
      isActive: true,
      logType: true,
      photos: {
        select: {
          name: true,
        },
      },
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
          point: {
            select: { id: true },
          },
        },
      },
      userCompanyRoles: {
        select: {
          company: {
            select: {
              id: true,
              rating: true,
              companyName: true,
              phone: true,
              hours: true,
              roles: true,
            },
          },
          role: { select: { name: true } },
        },
      },
    };
    const user: any = await this.usersService.findOne({
      ...this.usersService.filter(userInfo + ''),
      select: userselect,
    });

    if (user.photos.length) {
      const fileNames = user.photos.map(({ name }) => name);
      // Now it matches the expected string[] type:
      const signedUrls = await this.s3PhotoService.getSignedUrls(fileNames);
      const urls = Object.values(signedUrls).map((url) => ({
        name: url,
      }));
      user.photos = urls;
    }

    user['permissions'] = permissions;
    user['companyId'] = companyId;
    return user;
  }

  async createPaymentMethods(companyId: number) {
    const paymentMethods = [
      {
        name: PaymentMethodType.CASH,
        type: PaymentMethodType.CASH, // Asegúrate de que este valor esté definido en tu enum
        date: new Date(), // Puedes ajustar la fecha según sea necesario
        discountPercentage: 0, // Ajusta el porcentaje de descuento según sea necesario
        createdBy: 'system', // O el usuario que crea el registro
        updatedBy: 'system',
      },
      {
        name: PaymentMethodType.CARD,
        type: PaymentMethodType.CARD,
        date: new Date(),
        discountPercentage: 0,
        createdBy: 'system',
        updatedBy: 'system',
      },
      {
        name: PaymentMethodType.QUICK_DEPOSIT,
        type: PaymentMethodType.QUICK_DEPOSIT,
        date: new Date(),
        discountPercentage: 0,
        createdBy: 'system',
        updatedBy: 'system',
      },
      {
        name: PaymentMethodType.WEEKLY_DEPOSIT,
        type: PaymentMethodType.WEEKLY_DEPOSIT,
        date: new Date(),
        discountPercentage: 0,
        createdBy: 'system',
        updatedBy: 'system',
      },
    ];

    for (const method of paymentMethods) {
      await this.paymentMethodsService.create({
        data: {
          name: method.name,
          type: method.type,
          date: method.date,
          companyId: companyId,
          discountPercentage: method.discountPercentage,
          createdBy: method.createdBy,
          updatedBy: method.updatedBy,
        },
      });
    }
  }

  async register(email: string, password: string) {
    try {
      await this.usersService.findOne({
        where: { email },
      });
      throw new ConflictException('This URL is already registered.');
    } catch (e) {
      const hashedPassword = await bcrypt.hash(
        password,
        +process.env.SALT_ROUNDS
      );

      const newUser = await this.usersService.create({
        data: {
          email,
          password: hashedPassword,
          logType: RolesEnum.ADMIN,
        },
      });

      return {
        id: newUser.id,
        userUrl: newUser.email,
        createdAt: newUser.createdAt,
      };
    }
  }

  async validateUser(email: string, password: string) {
    const user: any = await this.usersService.findOne({
      where: { email },
      select: {
        id: true,
        password: true,
        logType: true,
        userCompanyRoles: {
          select: {
            role: {
              select: {
                type: true,
              },
            },
            companyId: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const payload: Payload = {
      id: user?.id ?? undefined,
      companyId: undefined,
      sessionId: undefined,
      pointId: undefined,
      logType: user?.logType ?? undefined,
      hash: undefined,
    };

    return await this.createToken(payload);
  }

  async login(user: { id: number; userUrl: string }) {
    const payload = { sub: user.id, userUrl: user.userUrl };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
