import { ApiProperty } from '@nestjs/swagger';
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
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { UpdateVehicleOrderDto, VehicleOrderDto } from './vehicleOrder.dto';
import {
  PointDto,
  UpdatePointWhitIdDto,
} from 'src/appCore/points/domain/point.dtos';
import { IsValidSubStatusConstraint } from './order.validation';

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
  | 'orderPhotos'
  | 'paymentMethod'
  | 'referredId'
  | 'isActive'
  | 'reason'
>;

export class OrderServiceDto {
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

export class OrderDto implements OrderWithoutId {
  @ApiProperty({
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional({ message: 'emailSecond is required' })
  emailSecond: string;

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
    example: 'true',
    description: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isAssistanceRequestForNow: boolean;

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

  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
  })
  @IsString()
  @IsOptional()
  phoneSecond: string;

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
    example: 'My order',
    description: 'Note',
  })
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty({
    example: 'Order 1',
    description: 'Aditional Info',
  })
  @IsString()
  @IsOptional()
  aditionalInfo: string;

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
  @IsNotEmpty()
  @IsISO8601(
    {},
    { message: 'Pick-up date must be a valid ISO 8601 date string.' }
  )
  pickUpDate: string; // Use string to accommodate ISO format

  @ApiProperty({
    description: 'Delivery date with time.',
    example: '2024-01-01T12:30:00',
  })
  @IsNotEmpty()
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

  @ApiProperty({
    description: 'Payment Method',
    example: $Enums.PaymentMethodEnum.CASH,
    enum: $Enums.PaymentMethodEnum,
  })
  @IsNotEmpty()
  @IsEnum($Enums.PaymentMethodEnum, { message: 'Payment Method' })
  paymentMethod: $Enums.PaymentMethodEnum;

  @ApiProperty({
    type: PointDto,
    description: 'Point departure data.',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PointDto)
  departure: PointDto;

  @ApiProperty({
    type: PointDto,
    description: 'Point destination data.',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PointDto)
  destination: PointDto;

  @ApiProperty({ type: [VehicleOrderDto] })
  @ValidateNested({ each: true })
  @Type(() => VehicleOrderDto)
  @IsNotEmpty({ message: 'vehicleOrders is required' })
  @IsNotEmpty()
  vehicleOrders: VehicleOrderDto[];
}

export class UpdateOrderDto {
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
    example: 'true',
    description: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isAssistanceRequestForNow: boolean;

  @ApiProperty({
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  emailSecond: string;

  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
  })
  @IsString()
  @IsOptional()
  phoneSecond: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name second of the user',
  })
  @IsString()
  @IsOptional()
  firstNameSecond: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Doe',
    description: 'The last name second of the user',
  })
  lastNameSecond: string;

  @ApiProperty({
    description: 'The ID of the subService this entity belongs to',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'subServiceId must be an integer' })
  @Min(1, { message: 'subServiceId must be a positive integer' })
  @IsOptional()
  subServiceId: number;

  @ApiProperty({
    description: 'The ID of the subService this entity belongs to',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'serviceId must be an integer' })
  @Min(1, { message: 'serviceId must be a positive integer' })
  @IsOptional()
  serviceId: number;

  @ApiProperty({
    example: '323 2032',
    description: 'Phone of the user',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    example: 1,
    description: 'Numbers of milles',
  })
  @IsNumber()
  @IsOptional()
  milles: number;

  @ApiProperty({
    description: 'Payment Method',
    example: $Enums.PaymentMethodEnum.CASH,
    enum: $Enums.PaymentMethodEnum,
  })
  @IsOptional()
  @IsEnum($Enums.PaymentMethodEnum, { message: 'Payment Method' })
  paymentMethod: $Enums.PaymentMethodEnum;

  @ApiProperty({
    description: 'Price.',
    example: 2.5,
  })
  @IsOptional()
  @IsPositive({ message: 'Price must be a positive number.' })
  @Min(0.01, { message: 'Price must be greater than zero.' })
  price: number;

  @ApiProperty({
    example: 'hello@domain.com',
    description: 'Email of the user',
  })
  @IsOptional()
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

  @ApiProperty({ type: [UpdateVehicleOrderDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateVehicleOrderDto)
  @IsOptional()
  vehicleOrders: UpdateVehicleOrderDto[];

  @ApiProperty({
    type: PointDto,
    description: 'Point departure data.',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePointWhitIdDto)
  departure: UpdatePointWhitIdDto;

  @ApiProperty({
    type: PointDto,
    description: 'Point destination data.',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePointWhitIdDto)
  destination: UpdatePointWhitIdDto;

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
  @Min(-0.00001, { message: 'Price per mile must be greater than zero.' })
  pricePerMile: number;

  @ApiProperty({
    example: $Enums.OrderStatusEnum.PENDING,
    description: 'Status of the order.',
    enum: $Enums.OrderStatusEnum,
  })
  @IsEnum($Enums.OrderStatusEnum, {
    message: `Status must be one of the following values: ${Object.values(
      $Enums.OrderStatusEnum
    ).join(', ')}`,
  })
  @IsOptional()
  status: $Enums.OrderStatusEnum;

  @ApiProperty({
    example: $Enums.OrderSubStatus.COMPLETE,
    description: 'SubStatus of the order.',
    enum: $Enums.OrderSubStatus,
  })
  @IsEnum($Enums.OrderSubStatus, {
    message: `SubStatus must be one of the following values: ${Object.values(
      $Enums.OrderSubStatus
    ).join(', ')}`,
  })
  @IsOptional()
  @Validate(IsValidSubStatusConstraint)
  subStatus: $Enums.OrderSubStatus;
}

export class UpdateReferedOrderDto {
  @ApiProperty({
    description: 'Unique identifier for the user who referred the order.',
    example: 1001,
  })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'The userId must be a positive integer.' })
  userId: number;
}
