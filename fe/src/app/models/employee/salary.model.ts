export class Salary {
    baseSalary: number;
    positionSalary: number;
    allowanceSalary: number;

    constructor(body) {
        this.baseSalary = body.baseSalary;
        this.positionSalary = body.positionSalary;
        this.allowanceSalary = body.allowanceSalary;
    }
}