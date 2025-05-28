import { Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import CategoryController from "./src/presentation/controllers/category.controller";
import CreateCategoryService from "./src/application/create.category.service";
import CategoryRepository from "./src/infrastructure/category.repository";
import VehicleReadRepository from "./src/infrastructure/vehicle.read.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [CategoryController],
    providers: [
        CategoryRepository,
        CreateCategoryService,
        VehicleReadRepository,
    ],
    exports: [
        VehicleReadRepository,
    ]
})
export default class VehicleModule { };