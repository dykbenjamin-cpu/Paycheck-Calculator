import { PaystubCalculator } from '../src/calculators/paystubCalculator';
import { PaystubInput } from '../src/models/paystubInput';
import { PaystubResult } from '../src/models/paystubResult';

describe('PaystubCalculator', () => {
    let paystubCalculator: PaystubCalculator;

    beforeEach(() => {
        paystubCalculator = new PaystubCalculator();
    });

    it('should calculate total earnings correctly without days off', () => {
        const input = new PaystubInput();
        input.wage = 20; // hourly wage
        input.daysOff = 0; // no days off
        const result: PaystubResult = paystubCalculator.calculate(input);
        
        expect(result.totalEarnings).toBe(1600); // Assuming 80 hours worked in a pay period
    });

    it('should calculate total earnings correctly with vacation days', () => {
        const input = new PaystubInput();
        input.wage = 20; // hourly wage
        input.daysOff = 2; // 2 vacation days
        const result: PaystubResult = paystubCalculator.calculate(input);
        
        expect(result.totalEarnings).toBe(1600); // Assuming 80 hours worked in a pay period
    });

    it('should calculate total earnings correctly with sick days', () => {
        const input = new PaystubInput();
        input.wage = 20; // hourly wage
        input.daysOff = 1; // 1 sick day
        const result: PaystubResult = paystubCalculator.calculate(input);
        
        expect(result.totalEarnings).toBe(1600); // Assuming 80 hours worked in a pay period
    });

    it('should handle negative wage input gracefully', () => {
        const input = new PaystubInput();
        input.wage = -20; // negative wage
        input.daysOff = 0; // no days off
        const result: PaystubResult = paystubCalculator.calculate(input);
        
        expect(result.totalEarnings).toBe(0); // Should not allow negative earnings
    });
});