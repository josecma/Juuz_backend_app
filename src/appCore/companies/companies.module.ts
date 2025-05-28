import { forwardRef, Module } from '@nestjs/common';
import { CompaniesController } from './infrastructure/companies.controller';
import { CompaniesService } from './application/companies.service';
import { PrismaService } from 'nestjs-prisma';
import { S3Service } from 'src/s3/aplication/s3.service';
import { CompanyDriversController } from './infrastructure/companiesDrivers.controller';
// import { UserCompanyRolesModule } from '../userCompanyRoles/userCompanyRoles.module';
// import { AuthModule } from 'src/auth/auth.module';
import { S3PhotoService } from 'src/s3/aplication/s3Photo.service';
import { MailerService } from 'src/_shared/application/nodeMailer.service';

@Module({
  imports: [
    // UserCompanyRolesModule,
    // forwardRef(() => AuthModule
    // ),
  ],
  controllers: [
    CompaniesController,
    CompanyDriversController
  ],
  providers: [
    CompaniesService,
    PrismaService,
    S3Service,
    MailerService,
    S3PhotoService,
  ],
  exports: [
    CompaniesService
  ],
})
export class CompaniesModule { }
