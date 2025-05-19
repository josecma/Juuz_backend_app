import { applyDecorators } from "@nestjs/common";
import { IsNotEmpty, IsNumber } from "class-validator";

export function IsDecimalEqualToOrGreaterThanZero() {
    return applyDecorators(
        IsNotEmpty(),
        IsNumber(),
    );
}
