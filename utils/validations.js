const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };
  
  const validateAadhaar = (aadhaar) => {
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(aadhaar);
  };
  
  const validateGSTIN = (gstin) => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };
  
  const validateUDYAM = (udyam) => {
    const udyamRegex = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;
    return udyamRegex.test(udyam);
  };
  
  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18;
  };
  
  exports.validateUserData = (userData) => {
    const { name, dob, pan, aadhaar, gstin, udyam } = userData;
  
    if (!name || name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
  
    if (!dob || !validateAge(dob)) {
      return 'User must be at least 18 years old';
    }
  
    if (!pan || !validatePAN(pan)) {
      return 'Invalid PAN format. Should be like ABCDE1234F';
    }
  
    if (!aadhaar || !validateAadhaar(aadhaar)) {
      return 'Invalid Aadhaar format. Should be 12 digits';
    }
  
    if (!gstin || !validateGSTIN(gstin)) {
      return 'Invalid GSTIN format. Should be like 27AAPFU0939F1ZV';
    }
  
    if (!udyam || !validateUDYAM(udyam)) {
      return 'Invalid UDYAM format. Should be like UDYAM-MH-02-0000001';
    }
  
    return null; 
  };
  
  exports.validateLoanData = (loanData) => {
    const { amount, interestRate, tenure, disbursementDate } = loanData;
  
    if (!amount || amount <= 0) {
      return 'Loan amount must be greater than 0';
    }
  
    if (!interestRate || interestRate <= 0 || interestRate > 100) {
      return 'Interest rate must be between 0 and 100';
    }
  
    if (!tenure || tenure <= 0) {
      return 'Tenure must be greater than 0';
    }
  
    if (!disbursementDate) {
      return 'Disbursement date is required';
    }
  
    const disbursementDateTime = new Date(disbursementDate).getTime();
    const today = new Date().getTime();
  
    if (isNaN(disbursementDateTime) || disbursementDateTime < today) {
      return 'Disbursement date must be today or a future date';
    }
  
    return null; 
  };
  
  exports.validateObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
  };