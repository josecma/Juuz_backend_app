import { Module } from '@nestjs/common';
import { S3Service } from './aplication/s3.service';
import { S3Controller } from './infrastructure/s3.controller';
import { SESService } from './aplication/ses.service';
import { S3PhotoService } from './aplication/s3Photo.service';

@Module({
  imports: [],
  controllers: [S3Controller],
  providers: [S3Service, SESService, S3PhotoService],
  exports: [S3Service, SESService],
})
export class AWSModule {}
