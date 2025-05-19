import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { EvidenceType } from "../../domain/enums/evidence.type";

export default class FormDataInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();

        const { coords, orderId, description, type } = req.body;

        let requiredProperties: [string, string][] = [];

        if (!coords) requiredProperties.push(["coords", "is required"]);
        if (!orderId) requiredProperties.push(["orderId", "is required"]);
        if (!description) requiredProperties.push(["description", "is required"]);
        if (!type) requiredProperties.push(["type", "is required"]);

        if (requiredProperties.length > 0) throw new BadRequestException(requiredProperties);

        const obj = {
            orderId: parseInt(orderId),
            description: String(description),
            type: type as EvidenceType,
            coords: JSON.parse(coords),
        }

        req.body = obj;

        return next.handle();
    };

};