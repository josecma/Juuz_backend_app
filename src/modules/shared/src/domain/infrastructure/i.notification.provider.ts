export default interface INotificationProvider {
    send(params: { to: string; message: string; }): Promise<void>;
};