const mongoose = require('mongoose');

const emiSchema = new mongoose.Schema({
  dueDate: Date,
  amount: Number,
  principal: Number,
  interest: Number,
  outstandingBalance: Number,
  isPaid: {
    type: Boolean,
    default: false
  }
});

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  disbursementDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  tenure: { type: Number, required: true },
  emiSchedule: [emiSchema],
  totalInterest: Number,
  totalAmount: Number,
  status: {
    type: String,
    enum: ['PENDING', 'ACTIVE', 'COMPLETED', 'DEFAULTED'],
    default: 'PENDING'
  }
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema); 