import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod, PaymentMethodType } from '@prisma/client';
export class PaymentMethodEntity implements PaymentMethod {
  @ApiProperty({
    description: 'The unique identifier of the credit card',
    example: 123,
    type: Number,
  })
  id: string;

  @ApiProperty({
    description: 'Nombre del método de pago',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Tipo de método de pago',
    enum: PaymentMethodType,
  })
  type: PaymentMethodType;

  @ApiProperty({
    description: 'Fecha de la transacción',
    type: Date,
  })
  date: Date;

  @ApiProperty({
    description: 'Porcentaje de descuento aplicado',
    type: Number,
    example: 10,
    required: false,
  })
  discountPercentage: number;

  @ApiProperty({
    description: 'ID de la compañía asociada',
    type: Number,
  })
  companyId: string;

  @ApiProperty({
    description: 'The credit card number',
    example: '1234567890123456',
    type: String,
  })
  number: string;

  @ApiProperty({
    description: 'The user ID associated with the credit card',
    example: 1,
    type: Number,
  })
  userId: string;

  @ApiProperty({
    description: 'Creation date of the communication record',
    example: '2023-04-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Creation date of the communication record',
    example: '2023-04-01T00:00:00.000Z',
  })
  @ApiProperty({
    description: 'Last update date of the communication record',
    example: '2023-04-02T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Identifier of the user who created the communication record',
    example: 'user123',
  })
  createdBy: string;

  @ApiProperty({
    description:
      'Identifier of the user who last updated the communication record',
    example: 'user456',
  })
  updatedBy: string;

  @ApiProperty({
    description: 'Deletion date of the communication record',
    example: '2023-04-03T00:00:00.000Z',
  })
  deletedAt: Date;

  @ApiProperty({
    description: 'Identifier of the user who deleted the communication record',
    example: 'user789',
  })
  deletedBy: string;

  @ApiProperty({
    description:
      'Version number of the communication record for optimistic concurrency control',
    example: 1,
  })
  version: number;

  @ApiProperty({
    description: 'Owner ID associated with this communication',
    example: 987,
  })
  ownerId: string;
}
