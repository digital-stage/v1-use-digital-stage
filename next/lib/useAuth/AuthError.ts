class AuthError extends Error {
    protected _code: number;

    public get code(): number {
        return this._code;
    }

    constructor(code: number, message: string) {
        super(message);
        this._code = code;
    }
}

export default AuthError;
