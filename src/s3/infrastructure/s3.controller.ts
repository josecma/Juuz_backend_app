import {
  Controller,
  Post,
  UseInterceptors,
  Req,
  UploadedFiles,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { S3PhotoService } from '../aplication/s3Photo.service';
import { multerImageConfig } from 'src/_shared/domain/multerImage.config';
import { RequestUserId } from 'src/_shared/domain/requestId';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResponseSwagger } from 'src/_shared/infrastructure/swagger/response.swagger';
import { createSwagger } from 'src/_shared/infrastructure/swagger/http.swagger';
import { PhotoIdsDto } from '../domain/photoIds.dto';

const controllerName = 'updload';

@ApiTags('upload')
@Controller({
  path: 'upload/',
  version: '1',
})
export class S3Controller {
  constructor(private readonly s3PhotoService: S3PhotoService) {}

  /**
   * Creates a order.
   * @param body DTO of the creation of a order.
   * @returns The created order or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    description: 'Upload multiple files',
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary', // Indicates that the items are files
          },
        },
      },
      example: {
        files: ['file1.jpg', 'file2.png'],
      },
    },
  })
  @ApiResponseSwagger(createSwagger(null, controllerName))
  @Post('photo')
  @UseInterceptors(FilesInterceptor('files', 10, multerImageConfig))
  async uploadPhotoFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: RequestUserId
  ) {
    return this.s3PhotoService.OrderCreate(
      files,
      req.user.id,
      req.user.companyId
    );
  }

  /**
   * Creates an order with PDF files.
   * @param body DTO of the creation of an order.
   * @returns The created order or an error.
   */

  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    description: 'Upload multiple PDF files',
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      example: {
        files: ['document1.pdf', 'document2.pdf'],
      },
    },
  })
  @ApiResponseSwagger(createSwagger(null, controllerName))
  @Post('pdf')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['application/pdf'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Only PDF files are allowed!'), false);
        }
      },
    })
  )
  async uploadPdfFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: RequestUserId
  ) {
    return this.s3PhotoService.OrderCreate(
      files,
      req.user.id,
      req.user.companyId
    );
  }

  @Post('urls')
  @ApiBody({
    description: 'Array de nombres de archivos para obtener URLs firmadas',
    type: PhotoIdsDto,
  })
  async getSignedUrls(@Body() photoIdsDto: PhotoIdsDto) {
    const { photoIds } = photoIdsDto;

    return this.s3PhotoService.getSignedUrls(photoIds);
  }
}
