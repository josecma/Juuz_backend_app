import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable({})
export default class CryptoAdapter {

    private readonly algorithm = 'aes-256-cbc';
    private readonly ivLength = 16;
    private readonly logger = new Logger(CryptoAdapter.name);

    public constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) { };

    private getKey(): Buffer {

        const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY');

        if (!encryptionKey) {

            this.logger.error('ENCRYPTION_KEY is not defined in environment variables')
            throw new Error('ENCRYPTION_KEY is not defined in environment variables');

        };

        return crypto.createHash('sha256').update(encryptionKey).digest();

    };

    public encrypt(text: string): string {

        const iv = crypto.randomBytes(this.ivLength);

        const cipher = crypto.createCipheriv(this.algorithm, this.getKey(), iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');

        encrypted += cipher.final('hex');

        return iv.toString('hex') + ':' + encrypted;

    };

    public decrypt(encryptedText: string): string {
        const parts = encryptedText.split(':');
        if (parts.length !== 2) {
            throw new Error('Invalid encrypted text format');
        }

        const iv = Buffer.from(parts[0], 'hex');

        const encrypted = parts[1];

        const decipher = crypto.createDecipheriv(this.algorithm, this.getKey(), iv);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');

        decrypted += decipher.final('utf8');

        return decrypted;

    };

};