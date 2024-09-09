// /models/Truck.js
const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    licensePlate: { type: String, required: true, unique: true },
    type: { type: String, enum: ['owned', 'second party', 'outsourced'], required: true },
    status: { type: String, enum: ['idle', 'on delivery', 'delivered'], default: 'idle' },
    capacity: { type: Number, required: true },  // in tons, liters, etc.
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Truck', truckSchema);