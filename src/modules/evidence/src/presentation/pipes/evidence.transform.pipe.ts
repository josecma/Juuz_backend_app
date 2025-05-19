import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { EvidenceType } from "../../domain/enums/evidence.type";
import CreateEvidenceDto from "../dtos/create.evidence.dto";

export default class EvidenceTransformPipe implements PipeTransform<any, CreateEvidenceDto> {

    transform(value: any, metadata: ArgumentMetadata): CreateEvidenceDto {
        console.log(value.body);

        const { coords, orderId, description, type } = value;

        let requiredProperties: [string, string][] = [];

        if (!coords) requiredProperties.push(["coords", "is required"]);
        if (!orderId) requiredProperties.push(["orderId", "is required"]);
        if (!description) requiredProperties.push(["description", "is required"]);
        if (!type) requiredProperties.push(["type", "is required"]);

        if (requiredProperties.length > 0) throw new BadRequestException(requiredProperties);

        const dto = {
            orderId: parseInt(orderId),
            description: String(description),
            type: type as EvidenceType,
            coords: JSON.parse(coords),
        }
        console.log(dto);

        return dto;

    };

};