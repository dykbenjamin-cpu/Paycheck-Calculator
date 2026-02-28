export class PaystubResult {
    totalEarnings: number;
    totalDeductions: number;
    netPay: number;

    constructor(totalEarnings: number, totalDeductions: number) {
        this.totalEarnings = totalEarnings;
        this.totalDeductions = totalDeductions;
        this.netPay = totalEarnings - totalDeductions;
    }
}