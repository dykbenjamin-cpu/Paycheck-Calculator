export class Employee {
    name: string;
    wage: number;
    vacationDays: number;
    sickDays: number;

    constructor(name: string, wage: number, vacationDays: number = 0, sickDays: number = 0) {
        this.name = name;
        this.wage = wage;
        this.vacationDays = vacationDays;
        this.sickDays = sickDays;
    }

    getTotalDaysOff(): number {
        return this.vacationDays + this.sickDays;
    }
}