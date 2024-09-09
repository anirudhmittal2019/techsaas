// /routes/payments_routes.js
const express = require('express');
const { addInvoice, scanInvoice, confirmDetails, calculateDiscountsAndInterest } = require('../controllers/payments_controller');
const multer = require('multer');  // Multer middleware for file uploads
const router = express.Router();

const upload = multer({ dest: 'uploads/invoices/' });

router.post('/add-invoice', upload.single('invoicePhoto'), addInvoice);
router.get('/scan-invoice/:paymentId', scanInvoice);
router.put('/confirm-details', confirmDetails);
router.get('/calculate-discounts-interest', calculateDiscountsAndInterest);

module.exports = router;
