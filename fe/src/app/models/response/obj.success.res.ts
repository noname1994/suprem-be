export class SuccessResponse<T> {
    code: Number;

    message: string;

    value: T;

    constructor(obj) {
        this.code = obj.code;
        this.message = obj.message;
        this.value = obj.value;
    }
}