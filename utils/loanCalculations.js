exports.calculateEMISchedule = (principal, rate, tenure, disbursementDate) => {
  const monthlyRate = (rate / 12) / 100;
  const numberOfPayments = tenure * 12;
  
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) 
    / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  let remainingBalance = principal;
  const schedule = [];
  const startDate = new Date(disbursementDate);

  for (let i = 1; i <= numberOfPayments; i++) {
    const interest = remainingBalance * monthlyRate;
    const principalPart = emi - interest;
    remainingBalance = remainingBalance - principalPart;

    startDate.setMonth(startDate.getMonth() + 1);

    schedule.push({
      dueDate: new Date(startDate),
      amount: Math.round(emi),
      principal: Math.round(principalPart),
      interest: Math.round(interest),
      outstandingBalance: Math.max(0, Math.round(remainingBalance))
    });
  }

  return schedule;
};