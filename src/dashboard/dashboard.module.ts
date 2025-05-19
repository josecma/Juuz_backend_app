import { Module } from '@nestjs/common';
import { ShipperPerformancesModule } from './old/shipperPerformance/shipperPerformances.module';
import { CarrierPerformancesModule } from './old/carrierPerformances/carrierPerformances.module';
import { LoaderBoardsModule } from './old/loardBoards /loardBoards.module';
import { TripsModule } from './old/trips/trips.module';
import { CompaniesModule } from './companies/companies.module';
import { OrdersModule } from './orders/orders.module';
import { CarriesModule } from './carries/carries.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [
    ShipperPerformancesModule,
    CarrierPerformancesModule,
    TripsModule,
    LoaderBoardsModule,
    CompaniesModule,
    OrdersModule,
    CarriesModule,
    DriversModule,
  ],
  exports: [
    ShipperPerformancesModule,
    CarrierPerformancesModule,
    TripsModule,
    LoaderBoardsModule,
    CompaniesModule,
    OrdersModule,
    CarriesModule,
    DriversModule,
  ],
})
export class DashboardModule {}
