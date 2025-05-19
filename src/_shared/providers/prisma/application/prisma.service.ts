import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.initPostgis();
    await this.$connect();
  }

  private async initPostgis() {
    try {
      const result = await this.$queryRaw`SELECT postgis_version();`;
      if (result) {
        console.log('PostGIS is already installed.');
      }
    } catch (error) {
      if (error.code === '42883') {
        // Function does not exist
        await this.$queryRaw`CREATE EXTENSION postgis;`;
        console.log('PostGIS has been successfully installed.');
      } else {
        console.error('Error checking PostGIS:', error);
        throw error;
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
