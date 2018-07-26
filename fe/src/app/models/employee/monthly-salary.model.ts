export class MonthlySalary {
    status: string;
    dateReceived: Date;
    baseSalary: number;
    positionSalary: number;
    promotionSalary: number;
    allowanceSalary: number;

    constructor(body) {
        this.status = body.status;
        this.dateReceived = body.dateReceived;
        this.baseSalary = body.baseSalary;
        this.positionSalary = body.positionSalary;
        this.promotionSalary = body.promotionSalary;
        this.allowanceSalary = body.allowanceSalary;
    }
}