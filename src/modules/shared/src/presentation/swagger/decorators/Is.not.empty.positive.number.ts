import { applyDecorators } from "@nestjs/common";
import { IsPositive } from "class-validator";
import { IsNotEmptyNumber } from "./is.not.empty.number";

export function IsNotEmptyPositiveNumber() {
    return applyDecorators(
        IsNotEmptyNumber(),
        IsPositive()
    );
}
