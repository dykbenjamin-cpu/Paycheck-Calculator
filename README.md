# Paystub Calculator

This project is a Paystub Calculator application that allows users to calculate paystubs based on employee wages, vacation/sick days, and pension options. The application is built using TypeScript and follows a modular architecture.

## Features

- Calculate total paystub based on wage and days off.
- Support for pension contributions as either a percentage of total wage or a fixed dollar amount per hour worked.
- Modular design with separate files for models, calculators, and options.

## Project Structure

```
paystub-calculator
├── .github
│   └── workflows
│       └── ci.yml
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── calculators
│   │   ├── paystubCalculator.ts
│   │   └── pensionCalculator.ts
│   ├── models
│   │   ├── employee.ts
│   │   ├── paystubInput.ts
│   │   └── paystubResult.ts
│   ├── options
│   │   └── pensionOption.ts
│   └── types
│       └── index.ts
├── tests
│   ├── paystubCalculator.test.ts
│   └── pensionCalculator.test.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/paystub-calculator.git
   ```
2. Navigate to the project directory:
   ```
   cd paystub-calculator
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the application, use the following command:
```
npm start
```

You can then access the application and use the paystub calculation features.

## Testing

To run the tests, use the following command:
```
npm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.