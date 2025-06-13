import { Location } from "./location"

export type Address = {
    country: string,
    city: string,
    state: string,
    zipCode: string,
    street: string,
    location: Location,
    metadata?: Record<string, unknown>
}