import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import OtpSecretPort from '../../application/ports/otp.secret.port';

@Injectable({})
export class OtpSecretAdapter implements OtpSecretPort {

    public generate(): string {

        const secret = authenticator.generateSecret();

        return secret;

    };

};