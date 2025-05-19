type CRS = {
    type: string;
    properties: {
        name: string;
    };
};

type Coordinates = {
    crs: CRS;
    type: "Point";
    coordinates: [number, number];
};

type LocationPoint = {
    id: number;
    city: string;
    type: "DEPARTURE" | "DESTINATION";
    state: string;
    coords: Coordinates;
    address: string;
    user_id: number;
    version: number;
    latitude: string;
    order_id: number | null;
    owner_id: number;
    driver_id: number | null;
    is_active: boolean;
    longitude: string;
    company_id: number | null;
    created_at: string;
    created_by: string;
    deleted_at: string | null;
    deleted_by: string | null;
    point_name: string;
    updated_at: string;
    updated_by: string | null;
};

type Photo = {
    id: number;
    name: string;
    url: string;
};


type User = {
    id: number;
    email: string;
    phone: string | null;
    logType: "SHIPPER" | "CARRIER";
    version: number;
    lastName: string | null;
    owner_id: number | null;
    password: string | null;
    firstName: string | null;
    is_active: boolean;
    created_at: string;
    created_by: string | null;
    deleted_at: string | null;
    deleted_by: string | null;
    updated_at: string;
    updated_by: string | null;
};

type Model = {
    id: number;
    name: string;
    year: number | null;
    version: number;
    brand_id: number;
    created_at: string;
    created_by: string | null;
    deleted_at: string | null;
    deleted_by: string | null;
    updated_at: string;
    updated_by: string | null;
};

type Vehicle = {
    id: number;
    qty: number | null;
    year: number;
    vehicle_type: string;
    state: string;
    vehicle_color: string;
    license_plate: string | null;
    last_number: string | null;
    vehicle_Problem: string | null;
    additional_detail: string | null;
    is_the_keys_with_the_vehicle: boolean;
    state_province: string | null;
    additional_vehicle_information: string | null;
    trailer_type: string | null;
    wide_load: boolean;
    order_id: number;
    model_id: number;
    driverId: number | null;
    created_at: string;
    updated_at: string;
    created_by: string | null;
    updated_by: string | null;
    deleted_at: string | null;
    deleted_by: string | null;
    version: number;
    owner_id: number;
    company_id: number | null;
    model: Model;
};

type Negotiation = {
    id: number;
    user_id: number;
    driver_id: number;
    order_id: number;
    offerCarrier: number;
    lastNegotiaton: "CARRIER" | "SHIPPER";
    status: "OPEN" | "CLOSED" | "PENDING";
    counterOfferShipper: number;
    company_id: number | null;
};

export type Order = {
    id: number;
    user_id: number;
    departure_id: number;
    destination_id: number;
    vehicles: VehicleOrder[];
    negotiations: Negotiation[];
    photos: Photo[];
    departure: LocationPoint;
    destination: LocationPoint;
    user: User;
};
