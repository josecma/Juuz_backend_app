import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  ListBucketsCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Buffer } from 'buffer';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string = 'bucket.juuz.statics.backend.dev';

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async checkConnection() {
    try {
      const command = new ListBucketsCommand({});
      const response = await this.s3Client.send(command);
      console.log('Buckets disponibles:', response.Buckets);
      return response.Buckets; // Devuelve la lista de buckets
    } catch (error) {
      console.error('Error al conectar con S3:', error);
      throw new Error('No se pudo conectar a S3');
    }
  }

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string
  ): Promise<string | null> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: fileBuffer,
      });

      // Envía el comando para subir el archivo
      await this.s3Client.send(command);

      // Devuelve la URL del archivo
      return this.getSignedUrl(fileName);
    } catch (error) {
      console.error('Error uploading file:', error);
      return null; // Devuelve null en caso de error
    }
  }

  async uploadFileAndReturnName(
    fileBuffer: Buffer,
    originalFileName: string // Cambia el nombre del parámetro para reflejar que es el nombre original
  ): Promise<string | null> {
    try {
      // Genera un nombre de archivo único
      const fileExtension = originalFileName.split('.').pop(); // Obtiene la extensión del archivo
      const uniqueFileName = `${uuid()}.${fileExtension}`; // Genera un UUID y le añade la extensión

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: uniqueFileName, // Usa el nombre de archivo único
        Body: fileBuffer,
      });

      // Envía el comando para subir el archivo
      await this.s3Client.send(command);

      return uniqueFileName;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new InternalServerErrorException(
        'An error occurred while uploning photo.'
      );
    }
  }

  async getSignedUrl(
    fileName: string,
    expires: number = 30000
  ): Promise<string> {
    // Crea un comando para obtener el objeto
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
    });

    // Genera la URL firmada usando getSignedUrl
    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: expires,
    });
    return url; // Devuelve la URL firmada
  }

  async getSignedUrls(
    fileNames: string[],
    expires: number = 30000
  ): Promise<{ [fileName: string]: string }> {
    const signedUrlPromises = fileNames.map(async (fileName) => {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: fileName,
      });

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: expires,
      });
      return { fileName, url };
    });

    const signedUrlsArray = await Promise.all(signedUrlPromises);

    // Convertir el array a un objeto para un acceso fácil
    const signedUrls: { [fileName: string]: string } = {};
    for (const { fileName, url } of signedUrlsArray) {
      signedUrls[fileName] = url;
    }

    return signedUrls;
  }

  async deleteFile(fileName: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
      });

      // Send the command to delete the file
      await this.s3Client.send(command);
      console.log(`File ${fileName} deleted successfully.`);
      return true; // Return true if deletion was successful
    } catch (error) {
      console.error('Error deleting file:', error);
      return false; // Return false in case of error
    }
  }
}
