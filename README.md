# Loan Management System

A full-stack application for managing loans, including user onboarding, loan creation, and EMI calculations.

## Features

- User registration with validation (PAN, Aadhar, GSTIN, UDYAM)
- Loan creation with EMI calculations
- Loan ledger view
- CSV export of loan schedule
- Responsive UI using Material-UI

## Tech Stack

- Frontend: React.js (Vite)
- Backend: Node.js, Express
- Database: MongoDB
- UI Library: Material-UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/CRYPTOcoderAS/LMS-BE
```

### 2. Backend Setup
```bash
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=
```

Start the server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints & Testing

### 1. Create User
```bash
curl -X POST http://localhost:5000/api/users \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "dob": "1990-01-01",
  "pan": "ABCDE1234F",
  "aadhaar": "123456789012",
  "gstin": "27AAPFU0939F1ZV",
  "udyam": "UDYAM-MH-02-0000001"
}'
```

### 2. Create Loan
```bash
curl -X POST http://localhost:5000/api/loans \
-H "Content-Type: application/json" \
-d '{
  "userId": "USER_ID_FROM_PREVIOUS_RESPONSE",
  "disbursementDate": "2024-03-15",
  "amount": 1000000,
  "interestRate": 12,
  "tenure": 3
}'
```

### 3. Get Loan Details
```bash
curl http://localhost:5000/api/loans/LOAN_ID
```

### 4. Download Loan Ledger
```bash
curl -O -J http://localhost:5000/api/loans/LOAN_ID/download
```

## Data Validation Rules

### PAN Format
- 5 alphabets + 4 numbers + 1 alphabet
- Example: ABCDE1234F

### Aadhaar Format
- 12 digits
- Example: 123456789012

### GSTIN Format
- 2 digits + 5 alphabets + 4 digits + 1 alphabet + 1 digit/alphabet + Z + 1 digit/alphabet
- Example: 27AAPFU0939F1ZV

### UDYAM Format
- UDYAM-XX-DD-XXXXXXX
- Example: UDYAM-MH-02-0000001


## Sample Data for Testing

### User Data
```json
{
  "name": "John Doe",
  "dob": "1990-01-01",
  "pan": "ABCDE1234F",
  "aadhaar": "123456789012",
  "gstin": "27AAPFU0939F1ZV",
  "udyam": "UDYAM-MH-02-0000001"
}
```

### Loan Data
```json
{
  "userId": "{userId}",
  "disbursementDate": "2024-03-15",
  "amount": 100000,
  "interestRate": 12,
  "tenure": 2
}
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Server Error

## Development

To run in development mode with hot reloading:

Backend:
```bash
npm run dev  # if nodemon is configured
```

Frontend:
```bash
cd client
npm run dev
```

## Production Build

Frontend:
```bash
cd client
npm run build
```

The build files will be in the `dist` directory.



## License

This project is licensed under the MIT License - see the LICENSE file for details
