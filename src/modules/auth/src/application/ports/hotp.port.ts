export default interface HotpPort {

    generateToken(
        params: {
            secret: string;
            counter: number;
        },
    ): string;

    verifyToken(
        params: {
            secret: string;
            token: string;
            counter: number;
        },
    ): boolean;

};