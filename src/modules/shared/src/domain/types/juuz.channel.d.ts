export type JuuzChannel<T> = {
    id: string;
    name: string;
    type: string;
    details: T;
};