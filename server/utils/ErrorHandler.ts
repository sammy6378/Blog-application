class ErrorHandler extends Error {
    keyValue(keyValue: any) {
        throw new Error("Method not implemented.");
    }
    statusCode: number;
    path: any;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;