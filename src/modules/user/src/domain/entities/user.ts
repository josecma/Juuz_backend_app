export default class User {

    private _id?: string;
    private _firstName?: string;
    private _lastName?: string;
    public _verified: boolean;

    public constructor(
        params: {
            id?: string,
            firstName?: string,
            lastName?: string,
            verified: boolean,
        }
    ) {

        const {
            id,
            firstName,
            lastName,
            verified = false,
        } = params;

        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._verified = verified;

    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public set firstName(value: string) {
        this._firstName = value;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public set lastName(value: string) {
        this._lastName = value;
    }

    public toJSON(): {
        id?: string;
        firstName?: string;
        lastName?: string;
    } {
        return {
            id: this._id,
            firstName: this._firstName,
            lastName: this._lastName,
        };
    }
}