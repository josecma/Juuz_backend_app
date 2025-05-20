import { } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Payment, PaymentMethodType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

type PaymentWithoutId = Omit<
  Payment,
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
  | 'finalAmount'
  | 'userId'
  | 'status'
  | 'paymentDate'
  | 'receivedDate'
  | 'depositDate'
  | 'paymentMethodId'
>;
export class PaymentDto implements PaymentWithoutId {
  @ApiProperty({
    description: 'Monto total del pago',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  // @ApiProperty({
  //   description: 'Estado del pago',
  //   enum: PaymentStatus,
  // })
  // @IsEnum(PaymentStatus)
  // status: PaymentStatus;

  // @ApiProperty({
  //   description: 'Fecha en que se realizó el pago',
  //   type: Date,
  // })
  // @IsDate()
  // paymentDate: Date;

  // @ApiProperty({
  //   description: 'Fecha en que se realizó el depósito',
  //   type: Date,
  // })
  // @IsDate()
  // depositDate: Date;

  // @ApiProperty({
  //   description: 'Fecha en que se recibió el pago',
  //   type: Date,
  // })
  // @IsDate()
  // receivedDate: Date;

  @ApiProperty({
    description: 'Estado del pago',
    enum: PaymentMethodType,
  })
  @IsEnum(PaymentMethodType)
  @IsNotEmpty()
  paymentMethodType: PaymentMethodType;

  @ApiProperty({
    description: 'ID de la orden asociada al pago',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  orderId: string;
}

export class PaymentCashDto {
  @ApiProperty({
    description: 'ID de la orden asociada al pago',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  orderId: string;
}

export class UpdatePaymentDto extends PartialType(PaymentDto) { }
