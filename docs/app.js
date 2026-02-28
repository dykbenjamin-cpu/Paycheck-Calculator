const form = document.getElementById("payForm");
const results = document.getElementById("results");

function money(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function readNumber(id, fallback = 0) {
  const el = document.getElementById(id);
  const val = Number(el?.value);
  return Number.isFinite(val) ? val : fallback;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const hourlyWage = readNumber("hourlyWage");
  const hoursWorked = readNumber("hoursWorked");
  const vacationDays = readNumber("vacationDays");
  const sickDays = readNumber("sickDays");
  const hoursPerDay = readNumber("hoursPerDay", 8);
  const leavePayPercent = readNumber("leavePayPercent", 100);
  const pensionValue = readNumber("pensionValue");

  const pensionType = document.querySelector('input[name="pensionType"]:checked')?.value || "percent";

  const leaveHours = (vacationDays + sickDays) * hoursPerDay;
  const workedPay = hoursWorked * hourlyWage;
  const leavePay = leaveHours * hourlyWage * (leavePayPercent / 100);
  const grossPay = workedPay + leavePay;

  let pensionDeduction = 0;
  if (pensionType === "percent") {
    pensionDeduction = grossPay * (pensionValue / 100);
  } else {
    pensionDeduction = hoursWorked * pensionValue; // per hour actually worked
  }

  const netBeforeTax = grossPay - pensionDeduction;

  results.innerHTML = `
    <table>
      <tr><td>Worked Hours</td><td>${hoursWorked.toFixed(2)}</td></tr>
      <tr><td>Paid Leave Hours</td><td>${leaveHours.toFixed(2)}</td></tr>
      <tr><td>Leave Pay Rate</td><td>${leavePayPercent.toFixed(2)}%</td></tr>
      <tr><td>Worked Pay</td><td>${money(workedPay)}</td></tr>
      <tr><td>Leave Pay</td><td>${money(leavePay)}</td></tr>
      <tr><td>Gross Pay</td><td>${money(grossPay)}</td></tr>
      <tr><td>Pension Deduction</td><td>- ${money(pensionDeduction)}</td></tr>
      <tr><td>Net (before tax)</td><td>${money(netBeforeTax)}</td></tr>
    </table>
  `;
});