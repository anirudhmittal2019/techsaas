// /controllers/payments_controller.js
const Payment = require('../models/Payment');
const { scanInvoicePhoto } = require('../services/scan_service');
const { setDiscountAlert } = require('../services/discount_service');

const addInvoice = async (req, res) => {
    const { paymentType, amount, date, discountAvailable, discountDeadline } = req.body;
    const invoicePhoto = req.file ? req.file.path : null;

    try {
        const payment = new Payment({
            paymentType,
            amount,
            date,
            discountAvailable,
            discountDeadline,
            invoicePhoto,
            user: req.user._id  // assuming user is authenticated
        });

        // Save payment without submitting (user needs to confirm details)
        await payment.save();

        res.status(201).send({ message: 'Invoice added, awaiting confirmation', payment });
    } catch (error) {
        res.status(500).send({ message: 'Error adding invoice', error });
    }
};

const scanInvoice = async (req, res) => {
    const { paymentId } = req.params;

    try {
        const payment = await Payment.findById(paymentId);
        if (!payment) return res.status(404).send({ message: 'Payment not found' });

        // AI service scans the photo and fills the details
        const scannedDetails = await scanInvoicePhoto(payment.invoicePhoto);

        res.status(200).send({
            message: 'Scanned details from invoice',
            details: scannedDetails,
            confirm: 'Please confirm the details before submitting'
        });
    } catch (error) {
        res.status(500).send({ message: 'Error scanning invoice', error });
    }
};

const confirmDetails = async (req, res) => {
    const { paymentId, confirmedDetails } = req.body;

    try {
        let payment = await Payment.findById(paymentId);
        if (!payment) return res.status(404).send({ message: 'Payment not found' });

        // User confirmed details, mark as submitted
        payment = Object.assign(payment, confirmedDetails, { submitted: true });
        await payment.save();

        if (payment.discountAvailable) {
            // Set alerts if discount is available
            await setDiscountAlert(payment.user, payment.discountDeadline);
        }

        res.status(200).send({ message: 'Payment details confirmed and submitted', payment });
    } catch (error) {
        res.status(500).send({ message: 'Error confirming payment details', error });
    }
};

const calculateDiscountsAndInterest = async (req, res) => {
    // Logic to calculate automated discounts or interest
    // If paid early, apply discount; if delayed, calculate interest
    // Generate a report
};

module.exports = { addInvoice, scanInvoice, confirmDetails, calculateDiscountsAndInterest };
