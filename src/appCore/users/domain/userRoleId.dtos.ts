import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UserRoleIdDto {
  @ApiProperty({
    description: 'The ID of the roleId registering the vehicle',
    example: 42,
    type: Number,
  })
  @IsInt({ message: 'roleId must be an integer' })
  @Min(1, { message: 'roleId must be a positive integer' })
  roleId: number;
}
export class UpdateUserDto extends PartialType(UserRoleIdDto) {}
