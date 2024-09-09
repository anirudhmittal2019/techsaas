// /models/Deal.js
const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    industry: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry', required: true },
    productName: { type: String, required: true },
    pricePerUnit: { type: Number, required: true },  // Price per kg/liter
    minimumQuantity: { type: Number, required: true },
    maximumQuantity: { type: Number, required: true },
    deliveryAvailable: { type: Boolean, required: true },  // true = available, false = user must arrange
    estimatedDeliveryTime: { type: String, required: true },  // e.g., "2-3 days"
    distance: { type: Number, required: true },  // in kilometers
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deal', dealSchema);