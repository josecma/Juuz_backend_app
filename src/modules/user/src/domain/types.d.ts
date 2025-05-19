import { BaseJSON, BaseParams, GeoPointJSON } from "src/modules/shared/src/domain/shared";
import GeoPoint from "src/modules/shared/src/domain/valueObjects/geo.point";

export type UserJSON = BaseJSON & {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    isActive: boolean;
    geoPoint: GeoPointJSON;
};

export type UserParams = BaseParams & {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    isActive: boolean;
    geoPoint: GeoPoint;
};

export type PartialUserParams = Partial<UserParams>;

export type UpdateUserParams = Omit<PartialUserParams, "id" | "password">;
