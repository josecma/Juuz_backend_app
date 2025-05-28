import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// import { UserCompanyRolesService } from './application/userCompanyRoles.service';

@Module({
  providers: [
    // UserCompanyRolesService,
    PrismaService
  ],
  exports: [
    // UserCompanyRolesService
  ],
})
export class UserCompanyRolesModule { }
