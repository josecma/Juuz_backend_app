import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/_shared/domain/dtos/pagination.dto';

export class PaginationOrderCarrierDto extends PaginationDto {
  @ApiProperty({
    enum: ['$Enums.ComunicationEnum'],
    description: 'The status the comunication.',
    example: $Enums.OrderStatusEnum.HISTORY,
  })
  @IsOptional()
  status: $Enums.OrderStatusEnum;

  @ApiProperty({
    enum: ['$Enums.NegotiationStatus'],
    description: 'The status the negotiation.',
    example: $Enums.NegotiationStatus.CLOSE,
  })
  @IsOptional()
  NegotiationStatus: $Enums.NegotiationStatus;
}
