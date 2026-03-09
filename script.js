/**
 * Paycheck Calculator
 *
 * Calculations:
 *   regularPay   = regularHours  × wage
 *   ot1Pay       = ot1Hours      × wage × 1.5
 *   ot2Pay       = ot2Hours      × wage × 2.0
 *   grossPay     = regularPay + ot1Pay + ot2Pay
 *   vacationPay  = grossPay      × (vacationPct / 100)
 *   pension      = wage × totalHours × (pensionPct / 100)
 *   totalPay     = grossPay + vacationPay + pension
 */

(function () {
  "use strict";

  /* ── DOM references ── */
  const form = document.getElementById("paycheck-form");
  const resetBtn = document.getElementById("reset-btn");
  const errorBox = document.getElementById("error-message");
  const resultsSection = document.getElementById("results");

  const fields = {
    regularHours: document.getElementById("regular-hours"),
    ot1Hours: document.getElementById("ot1-hours"),
    ot2Hours: document.getElementById("ot2-hours"),
    wage: document.getElementById("wage"),
    vacationPct: document.getElementById("vacation-pct"),
    pensionPct: document.getElementById("pension-pct"),
  };

  const resultCells = {
    regular: document.getElementById("result-regular"),
    ot1: document.getElementById("result-ot1"),
    ot2: document.getElementById("result-ot2"),
    grossBefore: document.getElementById("result-gross-before"),
    vacation: document.getElementById("result-vacation"),
    pension: document.getElementById("result-pension"),
    total: document.getElementById("result-total"),
  };

  /* ── Helpers ── */

  /**
   * Format a number as a dollar amount string.
   * @param {number} value
   * @returns {string}
   */
  function formatCurrency(value) {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(value);
  }

  /**
   * Parse a form field's value to a float.
   * Returns NaN when the field is empty or contains a non-numeric value.
   * @param {HTMLInputElement} input
   * @returns {number}
   */
  function parseField(input) {
    var raw = input.value.trim();
    if (raw === "") return NaN;
    return parseFloat(raw);
  }

  /**
   * Parse an optional form field, treating empty as 0.
   * Returns NaN only for non-numeric non-empty values.
   * @param {HTMLInputElement} input
   * @returns {number}
   */
  function parseOptionalField(input) {
    var raw = input.value.trim();
    if (raw === "") return 0;
    return parseFloat(raw);
  }

  /**
   * Validate all inputs and collect errors.
   * @returns {{ values: object|null, errors: string[] }}
   */
  function validate() {
    var errors = [];

    Object.values(fields).forEach(function (input) {
      input.classList.remove("invalid");
    });

    var regularHours = parseOptionalField(fields.regularHours);
    var ot1Hours = parseOptionalField(fields.ot1Hours);
    var ot2Hours = parseOptionalField(fields.ot2Hours);
    var wage = parseField(fields.wage);
    var vacationPct = parseOptionalField(fields.vacationPct);
    var pensionPct = parseOptionalField(fields.pensionPct);

    if (isNaN(regularHours) || regularHours < 0) {
      errors.push("Regular hours must be a non-negative number.");
      fields.regularHours.classList.add("invalid");
    }
    if (isNaN(ot1Hours) || ot1Hours < 0) {
      errors.push("Overtime (1.5×) hours must be a non-negative number.");
      fields.ot1Hours.classList.add("invalid");
    }
    if (isNaN(ot2Hours) || ot2Hours < 0) {
      errors.push("Double overtime (2×) hours must be a non-negative number.");
      fields.ot2Hours.classList.add("invalid");
    }
    if (isNaN(wage) || wage <= 0) {
      errors.push("Hourly wage is required and must be greater than zero.");
      fields.wage.classList.add("invalid");
    }
    if (isNaN(vacationPct) || vacationPct < 0 || vacationPct > 100) {
      errors.push("Vacation pay rate must be between 0 and 100.");
      fields.vacationPct.classList.add("invalid");
    }
    if (isNaN(pensionPct) || pensionPct < 0 || pensionPct > 100) {
      errors.push("Pension rate must be between 0 and 100.");
      fields.pensionPct.classList.add("invalid");
    }

    if (errors.length > 0) {
      return { values: null, errors: errors };
    }

    return {
      values: { regularHours, ot1Hours, ot2Hours, wage, vacationPct, pensionPct },
      errors: [],
    };
  }

  /**
   * Perform all paycheck calculations.
   * @param {object} v - Validated input values
   * @returns {object} Calculation results
   */
  function calculate(v) {
    var regularPay = v.regularHours * v.wage;
    var ot1Pay = v.ot1Hours * v.wage * 1.5;
    var ot2Pay = v.ot2Hours * v.wage * 2.0;
    var grossPay = regularPay + ot1Pay + ot2Pay;
    var vacationPay = grossPay * (v.vacationPct / 100);
    var totalHours = v.regularHours + v.ot1Hours + v.ot2Hours;
    var pension = v.wage * totalHours * (v.pensionPct / 100);
    var totalPay = grossPay + vacationPay + pension;

    return { regularPay, ot1Pay, ot2Pay, grossPay, vacationPay, pension, totalPay };
  }

  /**
   * Render calculation results into the results table.
   * @param {object} r - Calculation results
   */
  function renderResults(r) {
    resultCells.regular.textContent = formatCurrency(r.regularPay);
    resultCells.ot1.textContent = formatCurrency(r.ot1Pay);
    resultCells.ot2.textContent = formatCurrency(r.ot2Pay);
    resultCells.grossBefore.textContent = formatCurrency(r.grossPay);
    resultCells.vacation.textContent = formatCurrency(r.vacationPay);
    resultCells.pension.textContent = formatCurrency(r.pension);
    resultCells.total.textContent = formatCurrency(r.totalPay);
    resultsSection.classList.remove("hidden");
  }

  /* ── Event handlers ── */

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var result = validate();

    if (result.errors.length > 0) {
      errorBox.textContent = result.errors.join(" ");
      errorBox.classList.remove("hidden");
      resultsSection.classList.add("hidden");
      return;
    }

    errorBox.classList.add("hidden");
    errorBox.textContent = "";

    var calculated = calculate(result.values);
    renderResults(calculated);
  });

  resetBtn.addEventListener("click", function () {
    form.reset();
    Object.values(fields).forEach(function (input) {
      input.classList.remove("invalid");
    });
    errorBox.classList.add("hidden");
    errorBox.textContent = "";
    resultsSection.classList.add("hidden");
  });
})();
