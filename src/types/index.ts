export interface PaystubInput {
    wage: number;
    vacationDays: number;
    sickDays: number;
}

export interface PaystubResult {
    totalEarnings: number;
    totalDeductions: number;
    netPay: number;
}

export type PensionContribution = {
    type: 'percentage' | 'fixed';
    amount: number;
};