import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import CreateLocationEvidenceDto from "../dtos/create.location.evidence.dto";

export default class FormDataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();

        const { orderId, coords } = req.body;

        const dto: CreateLocationEvidenceDto = {
            orderId: orderId ? JSON.parse(orderId) : orderId,
            coords: coords ? JSON.parse(coords) : coords,
        };

        req.body = dto;

        return next.handle();
    };
};