export type BusinessStakeholder<T> = {
    id: string;
    type: string;
    role: string;
    details?: T;
};