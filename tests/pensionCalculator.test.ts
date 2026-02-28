import { PensionCalculator } from '../src/calculators/pensionCalculator';
import { PensionOption } from '../src/options/pensionOption';

describe('PensionCalculator', () => {
    let pensionCalculator: PensionCalculator;

    beforeEach(() => {
        pensionCalculator = new PensionCalculator();
    });

    test('should calculate pension as a percentage of total wage', () => {
        const wage = 1000;
        const percentage = 5; // 5%
        const expectedPension = wage * (percentage / 100);
        
        const result = pensionCalculator.calculatePension(wage, percentage, PensionOption.Percentage);
        expect(result).toBe(expectedPension);
    });

    test('should calculate pension as a fixed dollar amount per hour worked', () => {
        const hoursWorked = 40;
        const fixedAmount = 10; // $10 per hour
        const expectedPension = hoursWorked * fixedAmount;

        const result = pensionCalculator.calculatePension(hoursWorked, fixedAmount, PensionOption.FixedAmount);
        expect(result).toBe(expectedPension);
    });

    test('should throw an error for invalid pension option', () => {
        const wage = 1000;
        const invalidOption = 'invalid' as any;

        expect(() => {
            pensionCalculator.calculatePension(wage, 5, invalidOption);
        }).toThrow('Invalid pension option');
    });
});