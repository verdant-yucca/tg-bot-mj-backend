class UnauthorizedError extends Error {
    private statusCode: number;
    constructor(message: string) {
        super(message);
        this.statusCode = 401;
    }
}

export default UnauthorizedError;
