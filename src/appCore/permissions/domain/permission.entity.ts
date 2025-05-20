// import { ApiProperty } from '@nestjs/swagger';
// import { $Enums, Permission } from '@prisma/client';
// export class PermissionEntity implements Permission {
//   @ApiProperty({
//     description: 'The unique identifier of the permission',
//     example: 1
//   })
//   id: number;

//   @ApiProperty({
//     description: 'The name of the permission',
//     example: 'Admin Access'
//   })
//   name: string;

//   @ApiProperty({
//     description: 'The action type associated with the permission',
//     example: 'create'
//   })
//   action: string;

//   @ApiProperty({
//     description: 'A detailed description of the permission',
//     example: 'Allows creating new administrative accounts',
//     required: false
//   })
//   description: string;

//   @ApiProperty({
//     description: 'Indicates whether the permission is currently active',
//     example: true
//   })
//   active: boolean;
// }