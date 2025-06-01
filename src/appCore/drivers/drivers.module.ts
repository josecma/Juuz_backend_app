import { forwardRef, Module } from '@nestjs/common';
// import { DriversController } from './infrastructure/drivers.controller';
// import { DriversService } from './application/drivers.service';
import { PrismaService } from 'nestjs-prisma';
import { PointsModule } from 'src/appCore/points/points.module';

@Module({
  imports: [
    forwardRef(() => PointsModule)
  ],
  controllers: [
    // DriversController
  ],
  providers: [
    // DriversService, 
    PrismaService
  ],
  exports: [
    // DriversService
  ],
})
export class DriversModule { }
