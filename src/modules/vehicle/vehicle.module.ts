import { Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import CategoryController from "./src/presentation/controllers/category.controller";
import CreateCategoryService from "./src/application/create.category.service";
import CategoryRepository from "./src/infrastructure/category.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [CategoryController],
    providers: [
        CategoryRepository,
        CreateCategoryService,
    ],
})
export default class VehicleModule { };