import { Module } from "@nestjs/common";
import DatabaseModule from "../database/database.module";
import FindOnePointByService from "./src/application/find.one.point.by.service";
import PointRepository from "./src/infrastructure/point.repository";
import UpdatePointService from "./src/application/upsert.and.return.point.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        PointRepository,
        FindOnePointByService,
        UpdatePointService,
    ],
    exports: [
        FindOnePointByService,
        UpdatePointService,
    ],
})
export default class PointModule { };