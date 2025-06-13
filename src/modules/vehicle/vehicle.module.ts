import { HttpModule } from "@nestjs/axios";
import { forwardRef, Module, OnModuleInit } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import DatabaseModule from "../database/database.module";
import SharedModule from "../shared/shared.module";
import CreateVehicleMakeUseCase from "./src/application/useCases/create.vehicle.make.use.case";
import CreateVehicleModelsUseCase from "./src/application/useCases/create.vehicle.models.use.case";
import CreateVehicleTypeUseCase from "./src/application/useCases/create.vehicle.type.use.case";
import CreateVehicleUseCase from "./src/application/useCases/create.vehicle.use.case";
import DeleteOneVehicleByIdUseCase from "./src/application/useCases/delete.one.vehicle.by.id.use.case";
import FindAllVehiclesUseCase from "./src/application/useCases/find.all.vehicles.use.case";
import FindModelsByMakeIdAndYearUseCase from "./src/application/useCases/find.models.by.make.id.and.year.use.case";
import FindVehicleMakesUseCase from "./src/application/useCases/find.vehicle.makes.use.case";
import FindVehicleModelsByMakeUseCase from "./src/application/useCases/find.vehicle.models.by.make.id.use.case";
import FindVehicleTypesUseCase from "./src/application/useCases/find.vehicle.types.use.case";
import UpdateVehicleUseCase from "./src/application/useCases/update.vehicle.use.case";
import NHTSAdapter from "./src/infrastructure/adapters/nhtsa.adapter";
import VehicleMakeModelRepository from "./src/infrastructure/repositories/vehicle.make.model.repository";
import VehicleMakeRepository from "./src/infrastructure/repositories/vehicle.make.repository";
import VehicleManufacturerRepository from "./src/infrastructure/repositories/vehicle.manufacturer.repository";
import VehicleReadRepository from "./src/infrastructure/repositories/vehicle.read.repository";
import VehicleTypeRepository from "./src/infrastructure/repositories/vehicle.type.repository";
import VehicleWriteRepository from "./src/infrastructure/repositories/vehicle.write.repository";
import VehicleMakeSeed from "./src/infrastructure/seeds/vehicle.make.seed";
import VehicleManufacturerSeed from "./src/infrastructure/seeds/vehicle.manufacturer.seed";
import VehicleModelSeed from "./src/infrastructure/seeds/vehicle.model.seed";
import VehicleController from "./src/presentation/controllers/vehicle.controller";

@Module({
    imports: [
        HttpModule.register({
        }),
        DatabaseModule,
        forwardRef(() => SharedModule),
    ],
    controllers: [
        VehicleController,
    ],
    providers: [
        VehicleWriteRepository,
        VehicleTypeRepository,
        VehicleMakeModelRepository,
        VehicleMakeRepository,
        VehicleReadRepository,
        VehicleManufacturerRepository,
        CreateVehicleUseCase,
        FindAllVehiclesUseCase,
        DeleteOneVehicleByIdUseCase,
        UpdateVehicleUseCase,
        CreateVehicleTypeUseCase,
        FindVehicleMakesUseCase,
        FindVehicleModelsByMakeUseCase,
        FindVehicleTypesUseCase,
        CreateVehicleMakeUseCase,
        CreateVehicleModelsUseCase,
        FindModelsByMakeIdAndYearUseCase,
        NHTSAdapter,
        EventEmitter2,
        VehicleManufacturerSeed,
        VehicleMakeSeed,
        VehicleModelSeed,
    ],
    exports: [
        VehicleReadRepository,
    ]
})
export default class VehicleModule implements OnModuleInit {

    public constructor(
        private readonly vehicleManufacturerSeed: VehicleManufacturerSeed,
        private readonly vehicleMakeSeed: VehicleMakeSeed,
        private readonly vehicleModelSeed: VehicleModelSeed,
    ) { };

    public async onModuleInit() {

        //await this.vehicleManufacturerSeed.up();

        // await this.vehicleMakeSeed.up();
        // this.eventEmitter.on(
        //     'seed.completed',
        //     async (event: SeedEvent) => {

        //         if (event.eventName === 'manufacturers.seed.up') {


        //         };

        //     }
        // );

        //await this.vehicleModelSeed.up();

    };

};