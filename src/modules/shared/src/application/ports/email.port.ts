export default interface EmailPort {
    send(
        params: {
            to: string[];
            subject: string;
            text: string;
            template: string;
        }
    ): Promise<void>;
};