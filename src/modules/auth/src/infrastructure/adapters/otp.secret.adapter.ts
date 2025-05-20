import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';

@Injectable({})
export class OtpSecretAdapter {

    public generate(): string {

        const secret = authenticator.generateSecret();

        return secret;

    };

};