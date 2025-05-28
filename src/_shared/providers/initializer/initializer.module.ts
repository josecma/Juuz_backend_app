import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { CompaniesModule } from 'src/appCore/companies/companies.module';
import { PopulateDBService } from './application/populateDB.service';
import { PermissionsModule } from 'src/appCore/permissions/permissions.module';
import { RolesModule } from 'src/appCore/roles/roles.module';
import { SubServicesModule } from 'src/appCore/subServices/subServices.module';
import { ServicesModule } from 'src/appCore/services/services.module';
import { MailerService } from 'src/_shared/application/nodeMailer.service';
// import { AuthModule } from 'src/auth/auth.module';
// import { UserCompanyRolesModule } from 'src/appCore/userCompanyRoles/userCompanyRoles.module';

@Module({
  imports: [
    DiscoveryModule,
    CompaniesModule,
    PermissionsModule,
    RolesModule,
    SubServicesModule,
    ServicesModule,
    // AuthModule,
    // UserCompanyRolesModule,
  ],
  providers: [
    PopulateDBService,
    PrismaService, MailerService],
})
export class InitializerModule { }
