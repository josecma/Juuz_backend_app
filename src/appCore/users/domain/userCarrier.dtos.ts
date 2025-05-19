import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { UserShipperDto } from './userShipper.dtos';
import { DriverDto } from 'src/appCore/drivers/domain/driver.dtos';
type ComunicationWithoutDriverIdType = Omit<
  DriverDto,
  'userId' | 'vehicleInfo' | 'companyId'
>;
class DriverWithoutUserIdDto implements ComunicationWithoutDriverIdType {
  @ApiProperty({
    example: '[1,2,3]',
    description: 'Photo Ids',
  })
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  photoIds: number[];

  @ApiProperty({
    description: 'The year of vehicles',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'The Vehicle Identification Number (VIN) for the vehicle',
    example: '1HGBH41JXMN109186',
    type: String,
  })
  @IsString({ message: 'vinNumber must be a string' })
  @IsNotEmpty({ message: 'vinNumber is required' })
  vinNumber: string;

  @ApiProperty({
    description: "The document identifier for the vehicle's insurance",
    example: 'INS1234567',
    type: String,
  })
  @IsString({ message: 'insuranceDoc must be a string' })
  @IsNotEmpty({ message: 'insuranceDoc is required' })
  insuranceDoc: string;

  @ApiProperty({
    description: 'The ID of the vehicleInfoId registering the vehicle',
    example: 42,
    type: Number,
  })
  @IsInt({ message: 'vehicleInfoId must be an integer' })
  @Min(1, { message: 'vehicleInfoId must be a positive integer' })
  vehicleInfoId: number;

  @ApiProperty({
    description: 'The ID of the service registering the vehicle',
    example: 42,
    type: Number,
  })
  @IsInt({ message: 'serviceId must be an integer' })
  @Min(1, { message: 'serviceId must be a positive integer' })
  serviceId: number;

  @ApiProperty({
    description: "A unique identifier for the user's facial recognition data",
    example: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
    type: String,
  })
  @IsString()
  faceId: string;

  @ApiProperty({
    description: 'The type of vehicle being registered',
    example: 'Sedan',
    type: String,
  })
  @IsString({ message: 'vehicleType must be a string' })
  @IsNotEmpty({ message: 'vehicleType is required' })
  vehicleType: string;

  @ApiProperty({
    description: 'The passenger capacity of the vehicle',
    example: 5,
    type: Number,
  })
  @IsInt({ message: 'capacity must be an integer' })
  @Min(1, { message: 'capacity must be at least 1' })
  @Max(8, { message: 'capacity must be no more than 8' }) // Asume a reasonable max for personal vehicles
  capacity: number;
}

export class UserDriverDto extends UserShipperDto {
  @ApiProperty({
    type: DriverWithoutUserIdDto,
    description: 'Driver data.',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DriverWithoutUserIdDto)
  driver?: DriverWithoutUserIdDto;

  @ApiProperty({
    description: 'Driver id',
    example: '1',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  driverId: string;
}

export class UpdateUserDriverDto extends PartialType(UserDriverDto) {
  @ApiProperty({
    example: '[1,2,3]',
    description: 'Photo Ids',
  })
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  photoIds: number[];
}
