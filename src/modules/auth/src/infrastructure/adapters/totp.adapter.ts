import { Injectable } from "@nestjs/common";
import { totp } from "otplib";
import TotpPort from "../../application/ports/totp.port";

@Injectable({})
export default class TotpAdapter implements TotpPort {

    public constructor() {
        totp.options = {
            digits: 4,
            step: 60 * 5,
        };
    };

    generateToken(
        params: {
            secret: string;
        }
    ): string {

        const {
            secret,
        } = params;

        return totp.generate(secret);

    };

    verifyToken(
        params: {
            secret: string;
            token: string;
        }
    ): boolean {

        const {
            secret,
            token,
        } = params;

        return totp.verify(
            {
                token,
                secret,
            }
        );

    };

};