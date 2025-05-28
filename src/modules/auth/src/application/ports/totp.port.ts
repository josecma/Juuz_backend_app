export default interface TotpPort {

    generateToken(
        params: {
            secret: string;
        },
    ): string;

    verifyToken(
        params: {
            secret: string;
            token: string;
        },
    ): boolean;

};