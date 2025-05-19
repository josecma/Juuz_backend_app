import Base from "src/modules/shared/src/domain/base";
import GeoPoint from "src/modules/shared/src/domain/valueObjects/geo.point";
import { UserJSON } from "./types";

export default class User extends Base {

    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    isActive: boolean;
    geoPoint?: GeoPoint;

    public constructor(params: {
        id?: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        isActive: boolean;
        geoPoint?: GeoPoint;
    }) {

        const { id, firstName, lastName, email, password, phone, isActive, geoPoint } = params;

        super({ id });

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.isActive = isActive;
        this.geoPoint = geoPoint;

    };

    public toJSON(): UserJSON {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            phone: this.phone,
            isActive: this.isActive,
            geoPoint: this.geoPoint?.toJSON(),
        };
    };

};