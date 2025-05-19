export default interface IEmailProvider {
    send(params: { to: string[]; subject: string; text: string }): Promise<void>;
};