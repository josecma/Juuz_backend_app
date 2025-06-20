import { DeleteObjectsCommand, GetObjectCommand, PutObjectCommand, PutObjectCommandOutput, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import IStoragePort from "../../application/ports/i.storage.port";

@Injectable()
export default class S3Adapter implements IStoragePort {

    private s3Client: S3Client;
    private readonly bucketName: string;
    private readonly region: string;
    private readonly logger = new Logger(S3Adapter.name);
    private readonly accessKeyId: string;
    private readonly secretAccessKey: string;

    public constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {

        this.bucketName = this.configService.get<string>("BUCKET_NAME") ?? "bucket.juuz.statics.backend.dev";
        this.region = this.configService.get<string>("AWS_REGION") ?? "us-east-1";
        this.accessKeyId = this.configService.get("AWS_ACCESS_KEY_ID");
        this.secretAccessKey = this.configService.get("AWS_SECRET_ACCESS_KEY");
        this.connect();

    };

    public async uploadFiles(
        files: {
            fileName: string;
            key: string;
            buffer: Buffer;
            mimeType: string;
            metadata?: Record<string, any>;
        }[]
    ): Promise<Map<string, string>> {

        const dataKeyMap = new Map<string, string>();

        try {

            await Promise.all(files.map(async (file) => {

                const { buffer, mimeType, metadata, key } = file;

                const command = new PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                    Body: buffer,
                    ContentType: mimeType,
                    ContentLength: buffer.length,
                    Metadata: metadata
                });

                const putObjectCommandOutput: PutObjectCommandOutput = await this.s3Client.send(command);

                const { ETag } = putObjectCommandOutput;

                dataKeyMap.set(key, ETag);

            }));

            return dataKeyMap;

        } catch (error) {

            this.logger.error(`error uploading files to S3:`, error);

            throw new Error(`error at uploading files to S3: ${error.message}`);

        };

    };

    public async getFileUrls(
        params: {
            keys: string[];
            expiresIn?: number;
        }
    ): Promise<Map<string, string>> {

        const { keys, expiresIn } = params;

        const urlKeyMap = new Map<string, string>();

        try {

            await Promise.all(keys.map(async (key) => {

                const command = new GetObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                });

                const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: expiresIn });

                urlKeyMap.set(key, signedUrl);

            }));

            return urlKeyMap;

        } catch (error) {

            this.logger.error("error getting S3 URLs:", error);

            throw new Error(`error getting S3 URLs: ${error.message}`);

        };

    };

    public async deleteFiles(keys: string[]): Promise<void> {

        try {

            const command = new DeleteObjectsCommand({
                Bucket: this.bucketName,
                Delete: {
                    Objects: keys.map((key) => ({ Key: key })),
                },
            });

            const r = await this.s3Client.send(command);

        } catch (error) {

            this.logger.error("error deleting S3 URLs:", error);

            throw new Error(`error deleting S3 URLs: ${error.message}`);

        };

    };

    private connect() {

        if (this.s3Client) return;

        try {

            const missingKeys: string[] = [];

            if (!this.accessKeyId) missingKeys.push("AWS_ACCESS_KEY_ID");
            if (!this.secretAccessKey) missingKeys.push("AWS_SECRET_ACCESS_KEY");
            if (!this.region) missingKeys.push("AWS_REGION");

            if (missingKeys.length > 0) {

                throw new Error(`missing AWS credentials: ${missingKeys.join(", ")}`);

            };

            this.s3Client = new S3Client({
                region: this.region,
                credentials: {
                    accessKeyId: this.accessKeyId,
                    secretAccessKey: this.secretAccessKey,
                },
            });

        } catch (error) {

            this.logger.error("error at connect to AWS:", error);

            throw new Error(`error at connect to AWS: ${error}`);

        };

    };

};