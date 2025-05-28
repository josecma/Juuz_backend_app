// import { ApiProperty, PartialType } from '@nestjs/swagger';
// import { RolesEnum, User } from '@prisma/client';
// import { Type } from 'class-transformer';
// import {
//   IsArray,
//   IsBoolean,
//   IsEmail,
//   IsEnum,
//   IsInt,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   Max,
//   Min,
//   ValidateNested,
// } from 'class-validator';
// import { DriverDto } from 'src/appCore/drivers/domain/driver.dtos';

// type UserWithoutId = Omit<
//   User,
//   | 'id'
//   | 'userPhoto'
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
//   | 'vehicleInfo'
//   | 'stripeAccountId'
//   | 'password'
//   | 'pointId'
// >;

// type ComunicationWithoutDriverIdType = Omit<
//   DriverDto,
//   'userId' | 'vehicleInfo'
// >;
// class DriverWithoutUserIdDto implements ComunicationWithoutDriverIdType {
//   @ApiProperty({
//     example: '[1,2,3]',
//     description: 'Photo Ids',
//   })
//   @IsArray()
//   @IsInt({ each: true })
//   @Type(() => Number)
//   @IsOptional()
//   photoIds: number[];

//   @ApiProperty({
//     description: 'The year of vehicles',
//     example: 1,
//   })
//   @IsInt()
//   @IsNotEmpty()
//   year: number;

//   @ApiProperty({
//     description: 'The Vehicle Identification Number (VIN) for the vehicle',
//     example: '1HGBH41JXMN109186',
//     type: String,
//   })
//   @IsString({ message: 'vinNumber must be a string' })
//   @IsNotEmpty({ message: 'vinNumber is required' })
//   vinNumber: string;

//   @ApiProperty({
//     description: "The document identifier for the vehicle's insurance",
//     example: 'INS1234567',
//     type: String,
//   })
//   @IsString({ message: 'insuranceDoc must be a string' })
//   @IsNotEmpty({ message: 'insuranceDoc is required' })
//   insuranceDoc: string;

//   @ApiProperty({
//     description: 'The ID of the vehicleInfoId registering the vehicle',
//     example: 42,
//     type: Number,
//   })
//   @IsInt({ message: 'vehicleInfoId must be an integer' })
//   @Min(1, { message: 'vehicleInfoId must be a positive integer' })
//   vehicleInfoId: number;

//   @ApiProperty({
//     description: 'The ID of the service registering the vehicle',
//     example: 42,
//     type: Number,
//   })
//   @IsInt({ message: 'serviceId must be an integer' })
//   @Min(1, { message: 'serviceId must be a positive integer' })
//   serviceId: number;

//   @ApiProperty({
//     description: "A unique identifier for the user's facial recognition data",
//     example: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
//     type: String,
//   })
//   @IsString()
//   faceId: string;

//   @ApiProperty({
//     description: 'The type of vehicle being registered',
//     example: 'Sedan',
//     type: String,
//   })
//   @IsString({ message: 'vehicleType must be a string' })
//   @IsNotEmpty({ message: 'vehicleType is required' })
//   vehicleType: string;

//   @ApiProperty({
//     description: 'The passenger capacity of the vehicle',
//     example: 5,
//     type: Number,
//   })
//   @IsInt({ message: 'capacity must be an integer' })
//   @Min(1, { message: 'capacity must be at least 1' })
//   @Max(8, { message: 'capacity must be no more than 8' }) // Asume a reasonable max for personal vehicles
//   capacity: number;
// }

// export class UserDto implements UserWithoutId {
//   @ApiProperty({
//     example: '323 2032',
//     description: 'Phone of the user',
//   })
//   @IsString()
//   // @MinLength(8)
//   phone: string;

//   @ApiProperty({
//     example: 'hello@domain.com',
//     description: 'Email of the user',
//   })
//   @IsEmail({}, { message: 'Invalid email format' })
//   email: string;

//   @ApiProperty({
//     example: true,
//     description: 'Whether the user is active or not',
//   })
//   @IsBoolean()
//   isActive: boolean;

//   @ApiProperty({
//     example: 'John',
//     description: 'First name of the user',
//   })
//   @IsString({ message: 'First name must be a string' })
//   firstName: string;

//   @ApiProperty({
//     example: 'Doe',
//     description: 'Last name of the user',
//   })
//   @IsString({ message: 'Last name must be a string' })
//   lastName: string;

//   @ApiProperty({
//     type: DriverWithoutUserIdDto,
//     description: 'Driver data.',
//   })
//   @IsOptional()
//   @ValidateNested()
//   @Type(() => DriverWithoutUserIdDto)
//   driver: DriverWithoutUserIdDto;

//   @ApiProperty({
//     description: 'The type of log entry',
//     enum: RolesEnum,
//     example: RolesEnum.COMPANY,
//   })
//   @IsEnum({
//     message: 'logType must be a valid enum value (NORMAL, SHIPPER, CARRIER)',
//   })
//   @IsOptional()
//   logType: RolesEnum;
// }

// export class UpdateUserDto extends PartialType(UserDto) { }
