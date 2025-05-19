import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PreInitializationService {
  private prisma = new PrismaClient();

  async verifyAndInstallPostgis() {
    try {
      const result = await this.prisma.$queryRaw`SELECT postgis_version();`;
      if (result) {
        console.log('PostGIS is already installed.');
      }
    } catch (error) {
      if (error.code === '42883') { // Function does not exist
        await this.prisma.$queryRaw`CREATE EXTENSION IF NOT EXISTS postgis;`;
        console.log('PostGIS has been successfully installed.');
      } else {
        console.error('Error checking PostGIS:', error);
        throw error;
      }
    } finally {
      await this.prisma.$disconnect();
    }
  }
}