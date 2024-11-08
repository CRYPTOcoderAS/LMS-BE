const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.post('/', loanController.createLoan);
router.get('/:id', loanController.getLoanLedger);
router.get('/:id/download', loanController.downloadLedger);

module.exports = router; 