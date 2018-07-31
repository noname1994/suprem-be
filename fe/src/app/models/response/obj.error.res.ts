export class ErrorResponse<T> {
    code: Number;

    message: string;

    error: T;

    constructor(obj) {
        this.code = obj.code;
        this.message = obj.message;
        this.error = obj.error;
    }
}