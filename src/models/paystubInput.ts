export class PaystubInput {
    wage: number;
    vacationDays: number;
    sickDays: number;

    constructor(wage: number, vacationDays: number, sickDays: number) {
        this.wage = wage;
        this.vacationDays = vacationDays;
        this.sickDays = sickDays;
    }
}