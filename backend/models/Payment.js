// /models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentType: { type: String, enum: ['paymentTo', 'paymentFrom'], required: true },  // payment to or received from
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    paymentStatus: { type: String, enum: ['completed', 'pending', 'delayed'], default: 'pending' },
    discountAvailable: { type: Boolean, default: false },
    discountDeadline: { type: Date },  // If there's a discount, this field is relevant
    invoicePhoto: { type: String },  // File path for invoice photo
    submitted: { type: Boolean, default: false },  // Indicates if the user confirmed details
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
