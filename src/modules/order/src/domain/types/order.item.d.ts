export type OrderItem<T> = {
    type: string,
    id?: string,
    content: T,
}