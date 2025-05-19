import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MailerService } from 'src/_shared/application/nodeMailer.service';
import { CompaniesService } from 'src/appCore/companies/application/companies.service';
import DatabaseModule from 'src/modules/database/database.module';
import UserModule from 'src/modules/user/user.module';
import { S3Service } from 'src/s3/aplication/s3.service';
import { UserCompanyRolesModule } from '../userCompanyRoles/userCompanyRoles.module';
import { UsersService } from './application/users.service';
import { UserCarriersController } from './infrastructure/userCarrier.controller';
import { UsersController } from './infrastructure/users.controller';
import { UserShippersController } from './infrastructure/userShipper.controller';

@Module({
  imports: [UserCompanyRolesModule, DatabaseModule, UserModule],
  controllers: [
    UserCarriersController,
    UsersController,
    UserShippersController,
  ],
  providers: [
    UsersService,
    PrismaService,
    S3Service,
    CompaniesService,
    MailerService,
  ],
  exports: [UsersService,],
})
export class UsersModule { }