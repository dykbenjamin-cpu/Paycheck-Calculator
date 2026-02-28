import express from 'express';
import { PaystubCalculator } from './calculators/paystubCalculator';
import { PaystubInput } from './models/paystubInput';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/calculate-paystub', (req, res) => {
    const paystubInput = new PaystubInput(req.body.wage, req.body.vacationDays, req.body.sickDays);
    const paystubCalculator = new PaystubCalculator();
    
    const result = paystubCalculator.calculate(paystubInput);
    res.json(result);
});

app.listen(port, () => {
    console.log(`Paystub calculator app listening at http://localhost:${port}`);
});