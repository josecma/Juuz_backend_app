import { Injectable } from "@nestjs/common";
import { hotp } from "otplib";
import HotpPort from "../../application/ports/hotp.port";

@Injectable({})
export default class HotpAdapter implements HotpPort {

    generateToken(
        params: {
            secret: string;
            counter: number;
        }
    ): string {

        const {
            secret,
            counter,
        } = params;

        return hotp.generate(secret, counter);

    };

    verifyToken(
        params: {
            secret: string;
            token: string;
            counter: number;
        }
    ): boolean {

        const {
            secret,
            token,
            counter,
        } = params;

        return hotp.verify(
            {
                token,
                secret,
                counter,
            }
        );

    };

};