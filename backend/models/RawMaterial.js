// /models/RawMaterial.js
const mongoose = require('mongoose');

const rawMaterialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true }, // in kg/liters
    unit: { type: String, required: true },     // 'kg' or 'liter'
    dailyUsage: { type: Number, required: true }, // quantity used per day
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RawMaterial', rawMaterialSchema);