import { ApiProperty } from '@nestjs/swagger';
import { Negotiation } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

type NegotiationWithoutId = Omit<
  Negotiation,
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
  | 'driverId'
  | 'counterOfferShipper'
  | 'userId'
  | 'status'
  | 'lastNegotiaton'
>;
export class NegotiationDto implements NegotiationWithoutId {
  @ApiProperty({
    description: 'The offer made by the carrier.',
    example: 500,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'offerCarrier must be a number with a maximum of 2 decimal places.',
    }
  )
  @IsPositive({ message: 'offerCarrier must be a positive number.' })
  @IsNotEmpty({ message: 'offerCarrier cannot be empty.' })
  offerCarrier: number;

  @ApiProperty({
    description: 'The ID of the user.',
    example: 1,
  })
  @IsInt({ message: 'User ID must be an integer.' })
  @IsPositive({ message: 'User ID must be a positive integer.' })
  userId: number;

  @ApiProperty({
    description: 'The ID of the order.',
    example: 3,
  })
  @IsInt({ message: 'Order ID must be an integer.' })
  @IsPositive({ message: 'Order ID must be a positive integer.' })
  orderId: number;
}

export class UpdateNegotiationDto {
  @ApiProperty({
    description: 'The offer made by the carrier.',
    example: 500.0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with a maximum of 2 decimal places.' }
  )
  @Min(0, { message: 'must be a positive, equal to or greater than zero.' })
  @IsOptional()
  offerCarrier?: number;

  @ApiProperty({
    description: 'The counteroffer made by the shipper.',
    example: 450.0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with a maximum of 2 decimal places.' }
  )
  @IsPositive({ message: 'Price must be a positive number.' })
  @IsOptional()
  counterOfferShipper?: number;
}
