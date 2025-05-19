import { BadRequestException, Injectable } from '@nestjs/common';
import { S3Service } from './s3.service';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class S3PhotoService {
  constructor(
    readonly s3Service: S3Service,
    private readonly prismaService: PrismaService
  ) {}

  async OrderCreate(
    files: Express.Multer.File[],
    ownerId: number,
    companyId: number
  ) {
    if (!files)
      throw new BadRequestException(
        `The file is not recognized or was not passed`
      );

    const createdPhotos = [];

    for (let i = 0; i < files.length; i++) {
      const userPhoto = await this.s3Service.uploadFileAndReturnName(
        files[i].buffer,
        files[i].originalname
      );

      const createPhotos: Prisma.PhotoCreateManyInput = {
        name: userPhoto,
        ownerId: ownerId,
        companyId: companyId,
      };
      const createdPhoto = await this.prismaService.photo.create({
        data: createPhotos,
      });
      createdPhotos.push(createdPhoto);
    }

    return createdPhotos;
  }

  async getSignedUrls(photoIds: string[]) {
    const signedUrls = await this.s3Service.getSignedUrls(photoIds, 300000);

    return signedUrls;
  }
}
