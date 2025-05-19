import { Injectable, OnModuleInit } from '@nestjs/common';
import { $Enums, Prisma, ServiceEnum, SubServiceEnum } from '@prisma/client';
import { CompaniesService } from 'src/appCore/companies/application/companies.service';
import { faker } from '@faker-js/faker';
import { PermissionsService } from 'src/appCore/permissions/application/permissions.service';
import { RolesService } from 'src/appCore/roles/application/roles.service';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { PrismaService } from 'nestjs-prisma';
import { SubcServicesService } from 'src/appCore/subServices/application/subServices.service';
import { ServicesService } from 'src/appCore/services/application/service.service';
import { AuthService } from 'src/auth/application/auth.service';
import { UserCompanyRolesService } from 'src/appCore/userCompanyRoles/application/userCompanyRoles.service';

@Injectable()
export class PopulateDBService implements OnModuleInit {
  constructor(
    private companiesService: CompaniesService,
    private permissionsService: PermissionsService,
    private rolesService: RolesService,
    private prisma: PrismaService,
    private discoveryService: DiscoveryService,
    private metadataScanner: MetadataScanner,
    private reflector: Reflector,
    private subcServicesService: SubcServicesService,
    private servicesService: ServicesService,
    private authService: AuthService,
    private userCompanyRolesService: UserCompanyRolesService
  ) {}
  roles: Record<string, [string, string][]> = {
    SHIPPER: [
      ['/refresh-token', 'POST'],
      ['/switch-company/:id', 'GET'],
      ['switch-company/:id', 'GET'],
      ['/upload/photo', 'POST'],
      ['/upload/photo-urls', 'POST'],
      ['/messages', 'GET'],
      ['/messages/unread', 'GET'],
      ['/messages/:id', 'GET'],
      ['/messages/unread/:id', 'PATCH'],
      ['/point_shippers/subscribe_driver/:id', 'PATCH'],
      ['/point_shippers/nearby_driver/', 'GET'],
      ['/user_shippers', 'GET'],
      ['/healths', 'GET'],
      ['/user_shippers', 'PATCH'],
      ['/user_shippers', 'DELETE'],
      ['/otp/shipper', 'POST'],
      ['/otp/carrier', 'POST'],
      ['/orders_shippers', 'POST'],
      ['/orders_shippers/apk', 'POST'],
      ['/orders_shippers', 'GET'],
      ['/orders_shippers/applyings', 'GET'],
      ['/orders_shippers/:id', 'GET'],
      // ['/orders_shippers/point/:id', 'PATCH'],
      ['/orders_shippers/accept/:id', 'PATCH'],
      ['/orders_shippers/canceled/:id', 'PATCH'],
      // ['/orders_shippers/apk/finished/:id', 'PATCH'],
      ['/orders_shippers/:id', 'PATCH'],
      ['/negotiations_shipper/shiepersApplyings/:id', 'GET'],
      ['/negotiations_shipper/carriersApplying', 'GET'],
      ['/negotiations_shipper/driversApplyings/:id', 'GET'],
      ['/negotiations_shipper/:id', 'GET'],
      ['/shipper_performances', 'POST'],
      ['/shipper_performances', 'GET'],
      ['/shipper_performances/averages', 'GET'],
      ['/shipper_performances/:id', 'GET'],
      ['/profile', 'GET'],
      ['/shipper_performances/:id', 'PATCH'],
      ['/shipper_performances/:id', 'DELETE'],
      ['/ably/token', 'POST'],
      ['/verify', 'POST'],
      ['/brands/:id', 'GET'],
      ['/brands', 'GET'],
      ['/brands/all', 'GET'],
      ['/validation/vin-validation/:vinNumber', 'GET'],
      ['/payments', 'POST'],
      ['/negotiations/:id', 'PATCH'],
      ['/switch', 'GET'],
      ['/services', 'GET'],
      ['/upload/pdf', 'POST'],
      ['/upload/urls', 'POST'],
    ],
    COMPANY: [
      ['/user_carriers/by-company', 'GET'],
      ['/point_drivers/nearby_order', 'GET'],
      ['/point_drivers/list-nearby-order', 'GET'],
      ['/companyDrivers/users', 'GET'],
      ['/companyDrivers/vehicles', 'GET'],
      ['/refresh-token', 'POST'],
      ['/switch-company/:id', 'GET'],
      ['/companyDrivers/invite-driver-to-company', 'PATCH'],
      ['/upload/urls', 'POST'],
      ['/orders_carriers/start/:id', 'PATCH'],
      ['/companyDrivers/add-driver-to-company/:id', 'POST'],
      ['/companyDrivers', 'POST'],
      ['/upload/photo-urls', 'POST'],
      ['/upload/photo', 'POST'],
      ['/upload/pdf', 'POST'],
      ['/messages', 'GET'],
      ['switch-company/:id', 'GET'],
      ['/messages/:id', 'GET'],
      ['/messages/unread/:id', 'PATCH'],
      ['/messages/unread', 'GET'],
      ['/point_drivers/on_or_off_driver_point/:id', 'PATCH'],
      ['/point_shippers/subscribe_driver/:id', 'PATCH'],
      ['/users', 'GET'],
      ['/user_shippers', 'GET'],
      ['/user_shippers', 'PATCH'],
      ['/user_shippers', 'DELETE'],
      ['/otp/shipper', 'POST'],
      ['/orders_shippers', 'POST'],
      ['/orders_shippers/apk', 'POST'],
      ['/orders_shippers', 'GET'],
      ['/orders_shippers/applyings', 'GET'],
      ['/orders_shippers/:id', 'GET'],
      // ['/orders_shippers/point/:id', 'PATCH'],
      ['/orders_shippers/accept/:id', 'PATCH'],
      ['/orders_shippers/canceled/:id', 'PATCH'],
      ['/orders_carriers/apk/finished/:id', 'PATCH'],
      ['/orders_shippers/:id', 'PATCH'],
      ['/negotiations_shipper/shiepersApplyings/:id', 'GET'],
      ['/negotiations_shipper/carriersApplying', 'GET'],
      ['/negotiations_shipper/driversApplyings/:id', 'GET'],
      ['/negotiations_shipper/:id', 'GET'],
      ['/shipper_performances', 'POST'],
      ['/shipper_performances', 'GET'],
      ['/shipper_performances/averages', 'GET'],
      ['/shipper_performances/:id', 'GET'],
      ['/shipper_performances/:id', 'PATCH'],
      ['/shipper_performances/:id', 'DELETE'],
      ['/user_carriers', 'GET'],
      ['/user_carriers', 'PATCH'],
      ['/user_carriers', 'DELETE'],
      ['/otp/carrier', 'POST'],
      ['/orders_carriers/applyings', 'GET'],
      ['/orders_carriers/noApplyings', 'GET'],
      ['/drivers/carrier', 'POST'],
      ['/negotiations_carrier/driversApplying', 'GET'],
      ['/negotiations_carrier/driversApplyings/:id', 'GET'],
      ['/carrier_performances', 'POST'],
      ['/carrier_performances', 'GET'],
      ['/carrier_performances/averages', 'GET'],
      ['/carrier_performances/:id', 'GET'],
      ['/carrier_performances/:id', 'PATCH'],
      ['/carrier_performances/:id', 'DELETE'],
      ['/ably/token', 'POST'],
      ['/ably', 'POST'],
      ['/users', 'POST'],
      ['/users', 'GET'],
      ['/users/:id', 'GET'],
      ['/users/:id', 'PATCH'],
      ['/users/:id', 'DELETE'],
      ['/verify', 'POST'],
      ['/profile', 'GET'],
      ['/companies', 'GET'],
      ['/switch', 'GET'],
      ['/sessions', 'POST'],
      ['/sessions', 'GET'],
      ['/sessions/:id', 'GET'],
      ['/sessions/:id', 'PATCH'],
      ['/sessions/:id', 'DELETE'],
      ['/companies', 'POST'],
      ['/companies/:id', 'GET'],
      ['/companies/:id', 'PATCH'],
      ['/companies/:id', 'DELETE'],
      ['/companyDrivers', 'PATCH'],
      ['/permissions', 'POST'],
      ['/permissions', 'GET'],
      ['/permissions/:id', 'GET'],
      ['/permissions/:id', 'PATCH'],
      ['/permissions/:id', 'DELETE'],
      ['/informations', 'POST'],
      ['/informations', 'GET'],
      ['/informations/:id', 'GET'],
      ['/informations/:id', 'PATCH'],
      ['/informations/:id', 'DELETE'],
      ['/points', 'POST'],
      ['/points', 'GET'],
      ['/points/:id', 'GET'],
      ['/points/:id', 'PATCH'],
      ['/point_drivers/:id', 'PATCH'],
      ['/orders', 'POST'],
      ['/orders', 'GET'],
      ['/orders/:id', 'GET'],
      ['/orders/:id', 'PATCH'],
      ['/orders/:id', 'DELETE'],
      ['/drivers', 'POST'],
      ['/drivers', 'GET'],
      ['/drivers/:id', 'GET'],
      ['/drivers/:id', 'PATCH'],
      ['/drivers/:id', 'DELETE'],
      ['/vehicle_infos', 'POST'],
      ['/vehicle_infos', 'GET'],
      ['/vehicle_infos/:id', 'GET'],
      ['/vehicle_infos/:id', 'PATCH'],
      ['/vehicle_infos/:id', 'DELETE'],
      ['/negotiations', 'POST'],
      ['/negotiations', 'GET'],
      ['/negotiations/:id', 'GET'],
      ['/negotiations/:id', 'PATCH'],
      ['/services', 'POST'],
      ['/services', 'GET'],
      ['/services:id', 'GET'],
      ['/services:id', 'PATCH'],
      ['/services:id', 'DELETE'],
      ['/subServices', 'POST'],
      ['/subServices', 'GET'],
      ['/subServices/:id', 'GET'],
      ['/subServices/:id', 'PATCH'],
      ['/subServices/:id', 'DELETE'],
      ['/roles', 'POST'],
      ['/roles', 'GET'],
      ['/roles/:id', 'GET'],
      ['/roles/:id', 'PATCH'],
      ['/roles/:id', 'DELETE'],
      ['/comunications', 'GET'],
      ['/comunications/:id', 'GET'],
      ['/comunications/:id', 'PATCH'],
      ['/comunications/:id', 'DELETE'],
      ['/comunications/rider-comunication', 'GET'],
      ['/comunications/driver-comunication', 'GET'],
      ['/healths/db', 'GET'],
      ['/healths/url', 'GET'],
      ['/healths', 'GET'],
      ['/validation/vin-validation/:vinNumber', 'GET'],
      ['/loaderBoards', 'POST'],
      ['/loaderBoards', 'GET'],
      ['/loaderBoards', 'DELETE'],
      ['/brands/:id', 'GET'],
      ['/brands', 'GET'],
      ['/brands/all', 'GET'],
      ['/s3upload', 'POST'],
      ['/trips', 'POST'],
      ['/trips/tripsAttention', 'GET'],
      ['/trips', 'GET'],
      ['/trips/:id', 'GET'],
      ['/trips/:id', 'PATCH'],
      ['/trips/:id', 'DELETE'],
      ['/payments', 'POST'],
      ['/orders/referred/:id', 'PATCH'],
      ['/services', 'GET'],
      ['/paymentswe', 'GET'],
      ['/companyDrivers', 'GET'],
      // ['/payments:id', 'GET'],
      // ['/payments:id', 'PATCH'],
      // ['/payments:id', 'DELETE'],
    ],
    DRIVER: [
      ['/refresh-token', 'POST'],
      ['/switch-company/:id', 'GET'],
      ['/trips', 'GET'],
      ['/orders_carriers/start/:id', 'PATCH'],
      ['/point_drivers/:id', 'PATCH'],
      ['/point_drivers/on_or_off_driver_point/:id', 'PATCH'],
      ['/trips/tripsAttention', 'GET'],
      ['/verify', 'POST'],
      ['/brands', 'GET'],
      ['/brands/:id', 'GET'],
      ['/ably/token', 'GET'],
      ['/companyDrivers', 'GET'],
      ['/vin-validation/', 'POST'],
      ['/orders_carriers/apk/finished/:id', 'PATCH'],
    ],
    ADMIN: [
      ['/companies/company-status/:id', 'PATCH'],
      ['/companies', 'GET'],
      ['/orders', 'GET'],
    ],
  };

  async onModuleInit() {
    await this.endpointScannerService();
    // await this.createShipper();
    // await this.createRole(await this.getPermisionIds(this.roles['COMPANY']));
    await this.createAdmin();
    await this.upsertServicesAndSubServices();
    await this.bulkUpsertPermissions(this.roles);
  }

  async bulkUpsertPermissions(
    roles: Record<string, [string, string][]>
  ): Promise<void> {
    const upsertPromises = [];

    const roleIds = {
      SHIPPER: 1,
      COMPANY: 2,
      DRIVER: 3,
      ADMIN: 4,
    };

    for (const [roleName, permissions] of Object.entries(roles)) {
      const roleId = roleIds[roleName as keyof typeof roleIds];

      const roleExists = await this.prisma.role.findUnique({
        where: { id: roleId },
      });

      if (!roleExists) {
        await this.prisma.role.create({
          data: {
            type: $Enums.RolesEnum[roleName],
            description: `Role for ${roleName}`,
            name: $Enums.RolesEnum[roleName],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      for (const [action, name] of permissions) {
        const permissionsUpsert: Prisma.PermissionUpsertArgs = {
          where: {
            action_name: {
              action: name,
              name: action,
            },
          },
          update: {
            role: {
              connect: { id: roleId },
            },
          },
          create: {
            action: name,
            name: action,
            description: `Permission for ${roleName} to access ${action} with ${name} method`,
            role: {
              connect: { id: roleId },
            },
          },
        };
        const upsertPromise = this.prisma.permission.upsert(permissionsUpsert);

        upsertPromises.push(upsertPromise);
      }
    }

    // Execute all upsert operations in a single transaction
    await this.prisma.$transaction(upsertPromises);
  }
  async endpointScannerService() {
    const endpoints = await this.fetchAllEndpoints();
    for (let index = 0; index < endpoints.length; index++) {
      const data = this.endPointToPermission(
        endpoints[index].path,
        endpoints[index].method
      );
      const find = await this.prisma.permission.findFirst({
        where: {
          name: data.name,
          action: data.action,
        },
      });
      if (!find)
        await this.prisma.permission.create({
          data,
        });
    }
  }

  private fetchAllEndpoints(): any[] {
    const routes = [];

    const controllers = this.discoveryService.getControllers();
    controllers.forEach((controller) => {
      const { instance, metatype } = controller;
      const controllerPath = this.reflector.get<string>('path', metatype) || '';

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (name) => {
          const target = instance[name];
          const path = this.reflector.get<string>('path', target);
          const method = this.reflector.get<RequestMethod>('method', target);
          if (path !== undefined && method !== undefined) {
            routes.push({
              path: `${controllerPath}${path}`,
              method: RequestMethod[method],
            });
          }
        }
      );
    });

    return routes;
  }

  private endPointToPermission(path: string, method: RequestMethod) {
    const match = path.match(/([^/:]+)\/(\w+)$/);
    const transformedUrl = match
      ? `/${match[1]}/${match[2]}`
      : `/${path
          .split('/')
          .filter((part) => part)
          .join('/')}`;

    return {
      name: transformedUrl,
      action: method.toString(),
      description: '',
    };
  }

  async createShipper() {
    const companiesAndRoles: Prisma.CompanyUpsertArgs = {
      where: {
        companyName: 'Shipper Ghost Company', // Campo único
      },
      update: {
        phone: '123',
        hours: '123',
        dotNumber: faker.string.alphanumeric(10),
      },
      create: {
        phone: '123',
        hours: '123',
        dotNumber: faker.string.alphanumeric(10),
        companyName: 'Shipper Ghost Company',
        roles: {
          connect: {
            name: $Enums.RolesEnum.SHIPPER, // Conecta al rol existente basado en el campo único `name`
          },
        },
      },
    };

    await this.companiesService.model.upsert(companiesAndRoles);
  }

  async createRole(permissionIds: { id }[]) {
    await this.rolesService.model.upsert({
      where: {
        name: $Enums.RolesEnum.ADMIN,
      },
      update: {},
      create: {
        type: $Enums.RolesEnum.ADMIN,
        name: $Enums.RolesEnum.ADMIN,
        ownerId: 0,
        description: 'Movile',
        permission: {
          connect: permissionIds,
        },
      },
    });
  }

  async createAdmin() {
    try {
      const user = await this.authService.register(
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASSWORD
      );
      const roleData: Prisma.UserCompanyRoleCreateArgs = {
        data: {
          roleId: 4,
          userId: user.id,
        },
      };
      await this.userCompanyRolesService.create(roleData);
    } catch (e) {
      return;
    }
  }

  async getPermisionIds(
    shipperPermissions: [string, string][]
  ): Promise<{ id }[]> {
    const permissionIds = await this.permissionsService.model.findMany({
      where: {
        OR: shipperPermissions.map((permission) => ({
          name: permission[0],
          action: permission[1],
        })),
      },
      select: {
        id: true,
      },
    });

    return permissionIds.map((permission) => ({
      id: permission.id, // Asegúrate de retornar el objeto correctamente
    }));
  }

  async upsertServicesAndSubServices() {
    // Definimos los datos de los servicios y sus subservicios
    const servicesData = [
      {
        name: ServiceEnum.TOWING,
        description: 'Servicio de remolque',
        subServices: [
          { name: SubServiceEnum.AIR, description: 'Servicio de aire' },
          { name: SubServiceEnum.PICKUP, description: 'Servicio de recogida' },
        ],
      },
      {
        name: ServiceEnum.QUICK_ASSISTANCE,
        description: 'Asistencia rápida',
        subServices: [
          { name: SubServiceEnum.AIR, description: 'Servicio de aire' },
          { name: SubServiceEnum.PICKUP, description: 'Servicio de recogida' },
        ],
      },
      {
        name: ServiceEnum.OTHERS,
        description: 'Otros servicios',
        subServices: [],
      },
    ];

    // Paso 1: Upsert de todos los servicios
    for (const serviceData of servicesData) {
      await this.servicesService.model.upsert({
        where: { name: serviceData.name },
        update: {
          description: serviceData.description,
          updatedAt: new Date(),
          updatedBy: 'system', // Cambia según tu lógica
        },
        create: {
          name: serviceData.name,
          description: serviceData.description,
          createdBy: 'system', // Cambia según tu lógica
          ownerId: 1, // Cambia según tu lógica
          companyId: 1, // Cambia según tu lógica
        },
      });
    }

    // Paso 2: Upsert de los subservicios para cada servicio
    for (const serviceData of servicesData) {
      // Primero, obtenemos el servicio para obtener su ID
      const service = await this.servicesService.model.findUnique({
        where: { name: serviceData.name },
      });

      if (service) {
        for (const subService of serviceData.subServices) {
          await this.subcServicesService.model.upsert({
            where: {
              name_serviceId: { name: subService.name, serviceId: service.id }, // Asegúrate de que esto coincida con tu modelo
            },
            update: {},
            create: {
              name: subService.name,
              description: subService.description,
              createdBy: 'system', // Cambia según tu lógica
              ownerId: 1, // Cambia según tu lógica
              companyId: 1, // Cambia según tu lógica
              Service: {
                // Cambia 'service' a 'Service'
                connect: { id: service.id }, // Conectar el subservicio al servicio correspondiente
              },
            },
          });
        }
      }
    }
  }
}
