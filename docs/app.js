const form = document.getElementById("payForm");
const results = document.getElementById("results");

function money(n) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const hourlyWage = Number(document.getElementById("hourlyWage").value || 0);
  const hoursWorked = Number(document.getElementById("hoursWorked").value || 0);
  const vacationDays = Number(document.getElementById("vacationDays").value || 0);
  const sickDays = Number(document.getElementById("sickDays").value || 0);
  const hoursPerDay = Number(document.getElementById("hoursPerDay").value || 8);
  const pensionValue = Number(document.getElementById("pensionValue").value || 0);

  const pensionType = document.querySelector('input[name="pensionType"]:checked').value;

  const leaveHours = (vacationDays + sickDays) * hoursPerDay;
  const paidHours = hoursWorked + leaveHours;
  const grossPay = paidHours * hourlyWage;

  let pension = 0;
  if (pensionType === "percent") {
    pension = grossPay * (pensionValue / 100);
  } else {
    pension = hoursWorked * pensionValue; // per hour worked only
  }

  const netBeforeTax = grossPay - pension;

  results.innerHTML = `
    <table>
      <tr><td>Worked Hours</td><td>${hoursWorked.toFixed(2)}</td></tr>
      <tr><td>Paid Leave Hours</td><td>${leaveHours.toFixed(2)}</td></tr>
      <tr><td>Total Paid Hours</td><td>${paidHours.toFixed(2)}</td></tr>
      <tr><td>Gross Pay</td><td>${money(grossPay)}</td></tr>
      <tr><td>Pension Deduction</td><td>- ${money(pension)}</td></tr>
      <tr><td>Net (before tax)</td><td>${money(netBeforeTax)}</td></tr>
    </table>
  `;
});