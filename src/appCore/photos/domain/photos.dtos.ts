import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Photo } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

type PhotoWithoutId = Omit<
  Photo,
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
  | 'userId'
>;

export class PhotoDto implements PhotoWithoutId {
  @ApiProperty({
    description: 'The unique identifier for the photo',
    example: 1,
  })
  id: number; // Unique identifier for the photo

  @ApiProperty({
    description: 'The URL of the photo stored in S3',
    example: 'https://example.com/photo.jpg',
  })
  @IsNotEmpty() // Ensures the URL is not empty
  @IsUrl() // Validates that the string is a URL
  name: string; // URL of the photo

  @ApiProperty({
    description: 'The ID of the associated order',
    example: 1,
  })
  @IsInt() // Validates that the orderId is an integer
  @IsOptional() // Ensures the orderId is not empty
  orderId: number; // ID of the associated order
}

export class UpdatePhotoDto extends PartialType(PhotoDto) {}
