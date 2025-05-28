// import { ApiProperty, PartialType } from '@nestjs/swagger';
// import { CarrierPerformance } from '@prisma/client';
// import {
//   IsInt,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   Length,
//   Max,
//   Min,
// } from 'class-validator';

// type CarrierPerformanceWithoutId = Omit<
//   CarrierPerformance,
//   | 'id'
//   | 'createdAt'
//   | 'updatedAt'
//   | 'createdBy'
//   | 'updatedBy'
//   | 'deletedAt'
//   | 'deletedAt'
//   | 'deletedBy'
//   | 'version'
//   | 'ownerId'
//   | 'companyId'
//   | 'userId'
// >;
// export class CarrierPerformanceDto implements CarrierPerformanceWithoutId {
//   @IsNotEmpty()
//   @ApiProperty({ description: 'Punctuality rating (1-5)' })
//   @IsInt({ message: 'Punctuality must be an integer' })
//   @Min(1, { message: 'Punctuality must be at least 1' })
//   @Max(5, { message: 'Punctuality must be at most 5' })
//   punctuality: number;

//   @IsNotEmpty()
//   @ApiProperty({ description: 'Cargo care rating (1-5)' })
//   @IsInt({ message: 'Cargo care must be an integer' })
//   @Min(1, { message: 'Cargo care must be at least 1' })
//   @Max(5, { message: 'Cargo care must be at most 5' })
//   cargoCare: number;

//   @IsNotEmpty()
//   @ApiProperty({ description: 'Friendliness rating (1-5)' })
//   @IsInt({ message: 'Friendliness must be an integer' })
//   @Min(1, { message: 'Friendliness must be at least 1' })
//   @Max(5, { message: 'Friendliness must be at most 5' })
//   friendliness: number;

//   @IsNotEmpty()
//   @ApiProperty({ description: 'Additional comments', required: false })
//   @IsString({ message: 'Additional comments must be a string' })
//   @IsOptional()
//   @Length(0, 255, {
//     message: 'Additional comments must be less than 255 characters',
//   })
//   additionalComments: string;
// }

// export class UpdateCarrierPerformanceDto extends PartialType(
//   CarrierPerformanceDto
// ) {}
