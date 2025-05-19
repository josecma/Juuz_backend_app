import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import NumericStringListDto from "../dtos/numeric.string.list.dto";

export default class NumericStringListPipeTransform implements PipeTransform<NumericStringListDto, string[]> {
    transform(value: NumericStringListDto, metadata: ArgumentMetadata): string[] {

        if (!value || typeof value !== "object" || !("ids" in value)) {
            throw new BadRequestException(`invalid identifiers request body`);
        }

        return (<NumericStringListDto>value).ids.map((obj): string => obj.id);
    };
};