import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CompanyStatus, Prisma, RolesEnum } from '@prisma/client';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UserCompanyRolesService } from 'src/appCore/userCompanyRoles/application/userCompanyRoles.service';
import { Payload } from 'src/_shared/domain/interface/payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userCompanyRolesService: UserCompanyRolesService
  ) {}

  private transformKeyToUpperCase(obj) {
    return Object.keys(obj)[0].toUpperCase();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const { user, route } = context.switchToHttp().getRequest();
    if (!user) {
      console.log('The payload does not contain the user');
      throw new UnauthorizedException();
    }
    if (user.logType === RolesEnum.ADMIN) return true;

    const action = this.transformKeyToUpperCase(route.methods);
    const name = route.path;

    const filter = this.filterAdminOrSistem(user, name, action);

    const find: any =
      await this.userCompanyRolesService.model.findFirst(filter);
    if (!find) return false;
    return this.companyAccessLogic(user, find, name, action);
  }

  companyAccessLogic(
    user: Payload,
    find,
    name: string,
    action: string
  ): boolean {
    if (
      user.logType === RolesEnum.COMPANY &&
      find.company &&
      find.company.companyStatus
    ) {
      if (find.company.companyStatus === CompanyStatus.NON_VERIFIED)
        return this.companyNoVerified(name, action);
      if (find.company.companyStatus === CompanyStatus.HOLD)
        return this.companyHold(name, action);
    }
    return true;
  }

  companyNoVerified(name: string, action: string): boolean {
    if (name === '/companyDrivers' && action === 'PATCH') return true;
    if (name === '/profile' && action === 'GET') return true;
    if (name === '/ably/token' && action === 'POST') return true;
    if (name === '/validation/vin-validation/:vinNumber' && action === 'GET')
      return true;
    if (name === '/upload/photo' && action === 'POST') return true;
    if (name === '/brands' && action === 'GET') return true;
    if (name === '/companyDrivers/vehicles' && action === 'GET') return true;
    return false;
  }

  companyHold(name: string, action: string): boolean {
    if (name === '/orders_carriers/noApplyings' && action === 'GET')
      throw new ForbiddenException('Company hold');
    return true;
  }

  filterAdminOrSistem(user, name: string, action: string) {
    if (user.logType !== RolesEnum.ADMIN) {
      const filter: Prisma.UserCompanyRoleFindFirstArgs = {
        where: {
          ...(user.companyId && { companyId: user.companyId }),
          user: { id: user.id },
          role: {
            permission: {
              some: {
                name,
                action,
              },
            },
          },
        },
        select: {
          company: {
            select: {
              companyStatus: true,
            },
          },
        },
      };
      return filter;
    }
    const filter: Prisma.UserCompanyRoleFindFirstArgs = {
      where: {
        user: { id: user.id },
        role: {
          permission: {
            some: {
              name,
              action,
            },
          },
          // name: RolesEnum.ADMIN,
        },
      },
      select: {
        company: {
          select: {
            companyStatus: true,
          },
        },
      },
    };
    return filter;
  }
}
