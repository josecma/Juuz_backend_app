export default class Credential {
    private readonly _value: string;

    public constructor(value: string) {
        if (!this.isValid(value)) {
            throw new Error(
                'Password must be at least 8 characters long and contain: ' +
                'uppercase letters, lowercase letters, numbers, and special characters'
            );
        }
        this._value = value;
    }

    get value(): string {
        return this._value;
    }

    private isValid(password: string): boolean {
        // Minimum 8 characters
        if (password.length < 8) return false;

        // Must contain at least one uppercase letter
        if (!/[A-Z]/.test(password)) return false;

        // Must contain at least one lowercase letter
        if (!/[a-z]/.test(password)) return false;

        // Must contain at least one number
        if (!/[0-9]/.test(password)) return false;

        // Must contain at least one special character
        if (!/[\W_]/.test(password)) return false; // \W = non-word characters, _ is considered a word char

        return true;
    }

    public equals(other: Credential): boolean {
        return this._value === other._value;
    }

    // Optional: Add password hashing capability
    public async hash(): Promise<string> {
        // In a real implementation, you would use bcrypt or similar
        // This is just a placeholder example
        return Promise.resolve(this._value); // Replace with actual hashing
    }

    // Optional: Add password verification
    public async verify(hashedPassword: string): Promise<boolean> {
        // In a real implementation, you would compare with bcrypt
        return (await this.hash()) === hashedPassword;
    }
}