import { BadRequestException, Injectable } from '@nestjs/common';
import { DecodeVinValues } from '@shaggytools/nhtsa-api-wrapper';
import { BrandsService } from 'src/appCore/brand/aplication/brand.service';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ValidationService {
  constructor(
    private brandsService: BrandsService,
    private readonly prismaService: PrismaService
  ) {}

  async fetchWithRetry(
    fn: () => Promise<any>,
    retries: number = 3
  ): Promise<any> {
    let error;
    for (let i = 0; i < retries; i++) {
      try {
        const result = await fn();
        return result;
      } catch (err) {
        error = err;
        console.warn(`Reintento #${i + 1} fallido:`, err);
      }
    }
    throw error; // si se agotaron los reintentos
  }

  async getVehicleData(vin: string) {
    return this.fetchWithRetry(() => DecodeVinValues(vin));
  }

  async vinValidations(vin: string): Promise<any> {
    let vehicleData: any = await this.getVehicleData(vin);

    if (
      vehicleData.Results[0].ErrorText !==
      '0 - VIN decoded clean. Check Digit (9th position) is correct'
    ) {
      throw new BadRequestException(vehicleData.Results[0].ErrorText);
    }

    vehicleData = vehicleData.Results;

    const result = [];

    for (let i = 0; i < vehicleData.length; i++) {
      const make = vehicleData[i].Make;
      const modelName = vehicleData[i].Model.toUpperCase();

      if (make && modelName) {
        try {
          let brand = await this.prismaService.brand.findUnique({
            where: { name: make },
          });

          if (!brand) {
            brand = await this.prismaService.brand.create({
              data: { name: make },
            });
          }

          const model = await this.prismaService.model.upsert({
            where: {
              name_brandId_year: {
                name: modelName,
                brandId: brand.id,
                year: +vehicleData[i].ModelYear,
              },
            },
            update: {},
            create: {
              name: modelName,
              brandId: brand.id,
              year: +vehicleData[i].ModelYear,
            },
          });
          result.push({
            model: model,
            brand: brand,
            GVWR: vehicleData[i].GVWR,
            GVWR_to: vehicleData[i].GVWR_to,
            ModelYear: vehicleData[i].ModelYear,
            VehicleType: vehicleData[i].VehicleType,
          });
        } catch (error) {
          console.error(
            `Error al realizar upsert para Make: ${make}, Model: ${modelName}`,
            error
          );
          throw new Error(
            `Error al procesar el elemento ${i + 1} del array vehicleData.`
          );
        }
      }
    }

    return result;
  }
}
