import { ApiProperty } from '@nestjs/swagger';
import { Payment, PaymentStatus } from '@prisma/client';
export class PaymentEntity implements Payment {
  @ApiProperty({
    description: 'The unique identifier for the carrier performance record',
  })
  id: number;

  @ApiProperty({
    description: 'Monto total del pago',
    type: Number,
  })
  amount: number;

  @ApiProperty({
    description: 'Monto final después de descuentos o ajustes',
    type: Number,
  })
  finalAmount: number;

  @ApiProperty({
    description: 'Estado del pago',
    enum: PaymentStatus,
  })
  status: PaymentStatus;

  @ApiProperty({
    description: 'Fecha en que se realizó el pago',
    type: Date,
  })
  paymentDate: Date;

  @ApiProperty({
    description: 'Fecha en que se realizó el depósito',
    type: Date,
  })
  depositDate: Date;

  @ApiProperty({
    description: 'Fecha en que se recibió el pago',
    type: Date,
  })
  receivedDate: Date;

  @ApiProperty({
    description: 'ID del método de pago utilizado',
    type: Number,
  })
  paymentMethodId: number;

  @ApiProperty({
    description: 'ID de la orden asociada al pago',
    type: Number,
  })
  orderId: number;

  @ApiProperty({
    description: 'Year-To-Date Gross income',
    example: 50000.0,
  })
  ytdGross: number;

  @ApiProperty({
    description: 'Net Balance after deductions',
    example: 35000.0,
  })
  netBalance: number;

  @ApiProperty({ description: 'The unique identifier for the associated user' })
  userId: number;

  @ApiProperty({ description: 'Record creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Record last update timestamp' })
  updatedAt: Date;

  @ApiProperty({ description: 'Identifier of the user who created the record' })
  createdBy: string;

  @ApiProperty({
    description: 'Identifier of the user who last updated the record',
  })
  updatedBy: string;

  @ApiProperty({ description: 'Record deletion timestamp, if applicable' })
  deletedAt: Date;

  @ApiProperty({
    description: 'Identifier of the user who deleted the record, if applicable',
  })
  deletedBy: string;

  @ApiProperty({
    description: 'Version number for optimistic concurrency control',
  })
  version: number;

  @ApiProperty({
    description: 'The unique identifier for the owner of the record',
  })
  ownerId: number;

  @ApiProperty({
    description: 'The unique identifier for the associated company',
  })
  companyId: number;
}
