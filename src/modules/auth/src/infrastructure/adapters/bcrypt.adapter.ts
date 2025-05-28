import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable({})
export class BcryptAdapter {

    async hash(
        data: string,
        saltRounds = 10,
    ): Promise<string> {
        return bcrypt.hash(data, saltRounds);
    };

    async compare(
        data: string,
        encrypted: string,
    ): Promise<boolean> {
        return bcrypt.compare(data, encrypted);
    };

};