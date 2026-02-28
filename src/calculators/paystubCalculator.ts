class PaystubCalculator {
    private wage: number;
    private vacationDays: number;
    private sickDays: number;
    private pensionContribution: number;

    constructor(wage: number, vacationDays: number, sickDays: number, pensionContribution: number) {
        this.wage = wage;
        this.vacationDays = vacationDays;
        this.sickDays = sickDays;
        this.pensionContribution = pensionContribution;
    }

    public calculateGrossPay(): number {
        const totalDaysOff = this.vacationDays + this.sickDays;
        const totalHoursWorked = (40 * 52) - (totalDaysOff * 8); // Assuming 40 hours a week and 52 weeks a year
        return this.wage * totalHoursWorked;
    }

    public calculateNetPay(): number {
        const grossPay = this.calculateGrossPay();
        const deductions = this.calculateDeductions(grossPay);
        return grossPay - deductions;
    }

    private calculateDeductions(grossPay: number): number {
        return grossPay * this.pensionContribution; // Assuming pensionContribution is a percentage
    }

    public getPaystub(): { grossPay: number; netPay: number; deductions: number } {
        const grossPay = this.calculateGrossPay();
        const deductions = this.calculateDeductions(grossPay);
        const netPay = grossPay - deductions;

        return {
            grossPay,
            netPay,
            deductions
        };
    }
}

export default PaystubCalculator;