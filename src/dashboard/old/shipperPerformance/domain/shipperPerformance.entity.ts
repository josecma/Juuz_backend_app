// import { ApiProperty } from '@nestjs/swagger';
// import { $Enums, ShipperPerformance } from '@prisma/client';
// export class ShipperPerformanceEntity {
//   @ApiProperty({
//     description: 'The unique identifier for the carrier performance record',
//   })
//   id: number;

//   @ApiProperty({ description: 'The unique identifier for the associated user' })
//   userId: number;

//   @ApiProperty({ description: 'Reception Punctuality rating' })
//   receptionPunctuality: number;

//   @ApiProperty({ description: 'Instruction clarity care rating' })
//   instructionClarity: number;

//   @ApiProperty({ description: 'Accessibility rating' })
//   accessibility: number;

//   @ApiProperty({ description: 'Friendliness care rating' })
//   friendliness: number;

//   @ApiProperty({ description: 'On time payment care rating' })
//   onTimePayment: number;

//   @ApiProperty({ description: 'Additional comments' })
//   additionalComments: string;

//   @ApiProperty({ description: 'Record creation timestamp' })
//   createdAt: Date;

//   @ApiProperty({ description: 'Record last update timestamp' })
//   updatedAt: Date;

//   @ApiProperty({ description: 'Identifier of the user who created the record' })
//   createdBy: string;

//   @ApiProperty({
//     description: 'Identifier of the user who last updated the record',
//   })
//   updatedBy: string;

//   @ApiProperty({ description: 'Record deletion timestamp, if applicable' })
//   deletedAt: Date;

//   @ApiProperty({
//     description: 'Identifier of the user who deleted the record, if applicable',
//   })
//   deletedBy: string;

//   @ApiProperty({
//     description: 'Version number for optimistic concurrency control',
//   })
//   version: number;

//   @ApiProperty({
//     description: 'The unique identifier for the owner of the record',
//   })
//   ownerId: number;

//   @ApiProperty({
//     description: 'The unique identifier for the associated company',
//   })
//   companyId: number;
// }
