export default class Email {
    private readonly _value: string;

    public constructor(value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid email address');
        }
        this._value = value.toLowerCase();
    }

    get value(): string {
        return this._value;
    }

    private isValid(email: string): boolean {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    public equals(other: Email): boolean {
        return this._value === other._value;
    }

    public toString(): string {
        return this._value;
    }
}