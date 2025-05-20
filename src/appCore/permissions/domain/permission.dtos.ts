// import { ApiProperty, PartialType } from '@nestjs/swagger';
// import { Permission } from '@prisma/client';
// import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

// type PermissionWithoutId = Omit<Permission, 'id'>;
// export class PermissionDto implements PermissionWithoutId {
//   @ApiProperty({
//     description: 'The name of the permission',
//     example: 'Admin Access',
//   })
//   @IsString({ message: 'name must be a string' })
//   @IsNotEmpty({ message: 'name cannot be empty' })
//   @IsNotEmpty()
//   name: string;

//   @ApiProperty({
//     description: 'The action type associated with the permission',
//     example: 'create',
//   })
//   @IsString({ message: 'action must be a string' })
//   @IsNotEmpty({ message: 'action cannot be empty' })
//   @IsNotEmpty()
//   action: string;

//   @ApiProperty({
//     description: 'A detailed description of the permission',
//     example: 'Allows creating new administrative accounts',
//     required: false,
//   })
//   @IsString({ message: 'description must be a string' })
//   @IsNotEmpty()
//   description: string;

//   @ApiProperty({
//     description: 'Indicates whether the permission is currently active',
//     example: true,
//   })
//   @IsBoolean({ message: 'active must be a boolean' })
//   @IsNotEmpty()
//   active: boolean;
// }

// export class UpdatePermissionDto extends PartialType(PermissionDto) {}
