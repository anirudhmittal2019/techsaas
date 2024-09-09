// /models/Labor.js
const mongoose = require('mongoose');

const laborSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    payroll: { type: Number, required: true },
    attendance: { type: Map, of: Boolean },  // key as date, value as present or absent
    salaryPaid: { type: Boolean, default: false },
    tenure: { type: Number, default: 0 },  // In months
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Labor', laborSchema);