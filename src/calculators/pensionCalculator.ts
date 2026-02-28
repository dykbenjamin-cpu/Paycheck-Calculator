export class PensionCalculator {
    private wage: number;
    private hoursWorked: number;

    constructor(wage: number, hoursWorked: number) {
        this.wage = wage;
        this.hoursWorked = hoursWorked;
    }

    calculatePercentageContribution(percentage: number): number {
        const totalEarnings = this.wage * this.hoursWorked;
        return (percentage / 100) * totalEarnings;
    }

    calculateFixedContribution(fixedAmount: number): number {
        return fixedAmount * this.hoursWorked;
    }
}