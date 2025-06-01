import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

export default class VehicleFormDataInterceptor implements NestInterceptor {

    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {

        const req = context.switchToHttp().getRequest();

        const {
            vinNumber,
            year,
            vehicleType,
            capacity,
            modelId,
            deleteIds
        } = req.body;

        let fileIds: string[] = [];

        if (deleteIds && typeof deleteIds === "string") {

            fileIds.push(...deleteIds.split(",").map((e) => e.trim()));

        };

        const obj = {
            vinNumber: vinNumber ? String(vinNumber) : undefined,
            vehicleType: vehicleType ? String(vehicleType) : undefined,
            capacity: capacity ? Number(capacity) : capacity,
            year: year ? Number(year) : year,
            modelId: modelId ? String(modelId) : modelId,
            deleteIds: fileIds,
        }

        req.body = obj;

        return next.handle();

    };

};