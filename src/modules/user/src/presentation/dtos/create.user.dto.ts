import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import IdentityDto from "./identity.dto";
import UserDto from "./user.dto";

export default class CreateUserDto {

    @ValidateNested()
    @Type(() => UserDto)
    // @IsNotEmpty()
    @IsOptional()
    user?: UserDto;

    @IsOptional()
    @IsString()
    credential?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => IdentityDto)
    @ArrayMinSize(1)
    identities: IdentityDto[];
}