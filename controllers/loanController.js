const Loan = require('../models/Loan');
const { validateLoanData, validateObjectId } = require('../utils/validations');
const { calculateEMISchedule } = require('../utils/loanCalculations');

exports.createLoan = async (req, res) => {
  try {
    const validationError = validateLoanData(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    if (!validateObjectId(req.body.userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const { userId, disbursementDate, amount, interestRate, tenure } = req.body;
    const emiSchedule = calculateEMISchedule(amount, interestRate, tenure, disbursementDate);
    
    // Calculate total interest
    const totalInterest = emiSchedule.reduce((sum, emi) => sum + emi.interest, 0);

    // Create loan with EMI schedule including outstanding balance
    const loan = new Loan({
      userId,
      disbursementDate,
      amount,
      interestRate,
      tenure,
      emiSchedule,
      totalInterest,
      totalAmount: amount + totalInterest,
      status: 'ACTIVE'
    });

    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.getLoanLedger = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('userId');
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.downloadLedger = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('userId');
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    // Create CSV content
    const headers = 'Due Date,EMI Amount,Principal,Interest,Outstanding Balance\n';
    
    let remainingBalance = loan.amount;
    const rows = loan.emiSchedule.map(emi => {
      const dueDate = new Date(emi.dueDate).toLocaleDateString();
      remainingBalance -= emi.principal;
      return `${dueDate},${emi.amount},${emi.principal},${emi.interest},${Math.max(0, Math.round(remainingBalance))}`;
    }).join('\n');

    const csvContent = headers + rows;

    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=loan-ledger-${loan._id}.csv`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

    // Send CSV content
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};