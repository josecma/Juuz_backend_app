import { ApiProperty, PartialType } from '@nestjs/swagger';
import { $Enums, Order } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEmail,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PointDto } from 'src/appCore/points/domain/point.dtos';
import { IsValidSubStatusConstraint } from './order.validation';
import { VehicleOrderApkDto } from './vehicleOrderApk.dto';

type OrderWithoutId = Omit<
  Order,
  | 'id'
  | 'orderPhoto'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedAt'
  | 'deletedAt'
  | 'deletedBy'
  | 'version'
  | 'ownerId'
  | 'companyId'
  | 'departureId'
  | 'destinationId'
  | 'status'
  | 'userId'
  | 'driverId'
  | 'carCount'
  | 'expirationTime'
  | 'orderStatus'
  | 'pricePerMile'
  | 'subStatus'
  | 'aditionalInfo'
  | 'note'
  | 'orderPhotos'
  | 'paymentMethod'
  | 'referredId'
  | 'isActive'
  | 'reason'
>;

export class OrderServiceApkDto {
  @ApiProperty({
    example: $Enums.ServiceEnum.OTHERS,
    description: 'Name of the main service provided.',
    enum: $Enums.ServiceEnum,
  })
  @IsEnum($Enums.ServiceEnum, {
    message: `serviceName must be one of the following values: ${Object.values(
      $Enums.ServiceEnum
    ).join(', ')}`,
  })
  @IsNotEmpty({ message: 'serviceName is required.' })
  serviceName: $Enums.ServiceEnum;

  @ApiProperty({
    example: $Enums.SubServiceEnum.AIR,
    description: 'Name of the sub-service provided.',
    enum: $Enums.SubServiceEnum,
  })
  @IsEnum($Enums.SubServiceEnum, {
    message: `subServiceName must be one of the following values: ${Object.values(
      $Enums.SubServiceEnum
    ).join(', ')}`,
  })
  @IsNotEmpty({ message: 'subServiceName is required.' })
  subServiceName: $Enums.SubServiceEnum;
}

export class OrderApkDto implements OrderWithoutId {
  @ApiProperty({
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  emailSecond: string;

  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
  })
  @IsString()
  @IsOptional()
  phoneSecond: string;

  @ApiProperty({
    description: 'The ID of the subService this entity belongs to',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'subServiceId must be an integer' })
  @Min(1, { message: 'subServiceId must be a positive integer' })
  @IsNotEmpty({ message: 'subServiceId is required' })
  @IsNotEmpty()
  subServiceId: number;

  @ApiProperty({
    description: 'The ID of the subService this entity belongs to',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'serviceId must be an integer' })
  @Min(1, { message: 'serviceId must be a positive integer' })
  @IsNotEmpty({ message: 'serviceId is required' })
  @IsNotEmpty()
  serviceId: number;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  @IsOptional()
  firstNameSecond: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastNameSecond: string;

  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    example: 'true',
    description: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isAssistanceRequestForNow: boolean;

  @ApiProperty({
    description: 'Price.',
    example: 2.5,
  })
  @IsNotEmpty()
  @Min(0, { message: 'Price must be greater than zero.' })
  price: number;

  @ApiProperty({
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'Pick-up date with time.',
    example: '2024-01-01T12:30:00',
  })
  @IsOptional()
  @IsISO8601(
    {},
    { message: 'Pick-up date must be a valid ISO 8601 date string.' }
  )
  pickUpDate: string; // Use string to accommodate ISO format

  @ApiProperty({
    description: 'Delivery date with time.',
    example: '2024-01-01T12:30:00',
  })
  @IsOptional()
  @IsISO8601(
    {},
    { message: 'Delivery date must be a valid ISO 8601 date string.' }
  )
  deliveryDate: string;

  // @ApiProperty({
  //   description: 'Additional information about the vehicle.',
  //   example: 'asdasd',
  //   required: false,
  // })
  // @IsOptional()
  // @IsString({ message: 'Additional vehicle information must be a string.' })
  // additionalVehicleInformation: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'last name of the user',
  })
  @IsOptional()
  @IsString({ message: 'last name must be a string' })
  lastName: string;

  @ApiProperty({
    example: 1,
    description: 'Numbers of milles',
  })
  @IsNumber()
  @IsNotEmpty()
  milles: number;

  // @ApiProperty({
  //   description: 'Payment Method',
  //   example: $Enums.PaymentMethodEnum.CASH,
  //   enum: $Enums.PaymentMethodEnum,
  // })
  // @IsNotEmpty()
  // @IsEnum($Enums.PaymentMethodEnum, { message: 'Payment Method' })
  // paymentMethod: $Enums.PaymentMethodEnum;

  @ApiProperty({
    type: PointDto,
    description: 'Point departure data.',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PointDto)
  departure: PointDto;

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
    type: PointDto,
    description: 'Point destination data.',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PointDto)
  destination: PointDto;

  @ApiProperty({ type: [VehicleOrderApkDto] })
  @ValidateNested({ each: true })
  @Type(() => VehicleOrderApkDto)
  @IsNotEmpty({ message: 'vehicleOrders is required' })
  @IsNotEmpty()
  vehicleOrders: VehicleOrderApkDto[];
}

export class UpdateOrderDto extends PartialType(OrderApkDto) {
  @ApiProperty({
    description:
      'Identifier for the driver assigned to the order. This field is optional and might not be present if the order is not yet assigned to a driver.',
    example: 502,
    required: false,
  })
  @IsInt()
  @Min(1, { message: 'The driverId must be a positive integer.' })
  @Max(9999, { message: 'The driverId must not exceed 9999.' })
  @IsOptional()
  driverId: number;

  @ApiProperty({
    description: 'Unique identifier for the user who placed the order.',
    example: 1001,
  })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'The userId must be a positive integer.' })
  userId: number;
  @ApiProperty({
    description:
      'Expiration time of the order, must be within today and 7 days from today in YYYY-MM-DD format',
    example: '2024-08-05',
  })
  @Transform(({ value }) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return date;
  })
  @Type(() => Date)
  expirationTime: Date;

  @ApiProperty({
    description: 'Price per mile.',
    example: 2.5,
  })
  @IsOptional()
  @IsDecimal()
  @IsPositive({ message: 'Price per mile must be a positive number.' })
  @Min(0.01, { message: 'Price per mile must be greater than zero.' })
  pricePerMile: number;

  @ApiProperty({
    example: $Enums.OrderStatusEnum.PENDING,
    description: 'Name of the main service provided.',
    enum: $Enums.OrderStatusEnum,
  })
  @IsEnum($Enums.OrderStatusEnum, {
    message: `serviceName must be one of the following values: ${Object.values(
      $Enums.OrderStatusEnum
    ).join(', ')}`,
  })
  status: $Enums.OrderStatusEnum;

  @ApiProperty({
    example: $Enums.OrderSubStatus.COMPLETE,
    description: 'Name of the main service provided.',
    enum: $Enums.OrderSubStatus,
  })
  @IsEnum($Enums.OrderSubStatus, {
    message: `serviceName must be one of the following values: ${Object.values(
      $Enums.OrderSubStatus
    ).join(', ')}`,
  })
  @Validate(IsValidSubStatusConstraint)
  subStatus: $Enums.OrderSubStatus;
}
