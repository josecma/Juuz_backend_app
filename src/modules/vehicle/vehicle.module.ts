import { forwardRef, Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import CategoryController from "./src/presentation/controllers/category.controller";
import CreateCategoryService from "./src/application/create.category.service";
import CategoryRepository from "./src/infrastructure/repositories/category.repository";
import VehicleReadRepository from "./src/infrastructure/repositories/vehicle.read.repository";
import VehicleController from "./src/presentation/controllers/vehicle.controller";
import CreateVehicleUseCase from "./src/application/useCases/create.vehicle.use.case";
import SharedModule from "../shared/shared.module";
import VehicleWriteRepository from "./src/infrastructure/repositories/vehicle.write.repository";
import VehicleMapper from "./src/infrastructure/mappers/vehicle.mapper";
import FindAllVehiclesUseCase from "./src/application/useCases/find.all.vehicles.use.case";
import DeleteOneVehicleByIdUseCase from "./src/application/useCases/delete.one.vehicle.by.id.use.case";
import UpdateVehicleUseCase from "./src/application/useCases/update.vehicle.use.case";

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => SharedModule),
    ],
    controllers: [
        CategoryController,
        VehicleController,
    ],
    providers: [
        CategoryRepository,
        VehicleWriteRepository,
        CreateCategoryService,
        VehicleReadRepository,
        CreateVehicleUseCase,
        FindAllVehiclesUseCase,
        DeleteOneVehicleByIdUseCase,
        UpdateVehicleUseCase,
        VehicleMapper,
    ],
    exports: [
        VehicleReadRepository,
    ]
})
export default class VehicleModule { };