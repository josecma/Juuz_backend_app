import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PaymentMethod, PaymentMethodType } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';

type PaymentMethodWithoutId = Omit<
  PaymentMethod,
  | 'id'
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
>;
export class PaymentMethodDto implements PaymentMethodWithoutId {
  @ApiProperty({
    description: 'Nombre del método de pago',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tipo de método de pago',
    enum: PaymentMethodType,
  })
  @IsEnum(PaymentMethodType)
  type: PaymentMethodType;

  @ApiProperty({
    description: 'Fecha de la transacción',
    type: Date,
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'Porcentaje de descuento aplicado',
    type: Number,
    example: 10,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  discountPercentage: number;

  @ApiProperty({
    description: 'ID de la compañía asociada',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  companyId: number;

  @ApiProperty({
    description: 'The unique identifier of the credit card',
    example: 123,
    type: Number,
  })
  @IsInt({ message: 'ID must be an integer' })
  id: number;

  @ApiProperty({
    description: 'The credit card number',
    example: '1234567890123456',
    type: String,
  })
  @IsString({ message: 'Number must be a string' })
  @Length(16, 16, { message: 'Number must be exactly 16 digits long' })
  number: string;

  @ApiProperty({
    description: 'The user ID associated with the credit card',
    example: 1,
    type: Number,
  })
  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be a positive integer' })
  userId: number;
}

export class UpdatePaymentMethodDto extends PartialType(PaymentMethodDto) {}
