import { ApiProperty, PartialType } from '@nestjs/swagger';
import { $Enums, Comunication } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

type ComunicationWithoutId = Omit<
  Comunication,
  | 'id'
  | 'status'
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
export class ComunicationDto implements ComunicationWithoutId {
  @ApiProperty({ description: 'Order identifier', example: 100 })
  @IsInt({ message: 'orderId must be an integer' })
  @Min(1, { message: 'orderId must be at least 1' })
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({ description: 'Driver channel identifier', example: 200 })
  @IsInt({ message: 'driverChanelId must be an integer' })
  @Min(1, { message: 'driverChanelId must be at least 1' })
  @IsNotEmpty()
  driverChanelId: number;

  @ApiProperty({ description: 'Rider channel identifier', example: 300 })
  @IsInt({ message: 'riderChanelId must be an integer' })
  @Min(1, { message: 'riderChanelId must be at least 1' })
  @IsOptional()
  riderChanelId: number;

  @ApiProperty({ description: 'Number of communications', example: 5 })
  @IsInt({ message: 'numberOfComunications must be an integer' })
  @Min(0, { message: 'numberOfComunications must be at least 0' })
  @IsNotEmpty()
  numberOfComunications: number;
}

export class UpdateComunicationDto extends PartialType(ComunicationDto) {
  @ApiProperty({
    enum: ['$Enums.ComunicationEnum'],
    description: 'The status the comunication.',
    example: $Enums.ComunicationEnum.OPEN,
  })
  @IsOptional()
  status: $Enums.ComunicationEnum;
}
