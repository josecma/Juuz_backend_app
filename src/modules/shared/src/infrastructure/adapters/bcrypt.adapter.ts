import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import HashPort from '../../application/ports/hash.port';

@Injectable({})
export class BcryptAdapter implements HashPort {

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