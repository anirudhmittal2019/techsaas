const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
    phone_number: { type: String, required: true },
    name: { type: String, required: true },
    gstn: { type: String, required: true },
    industry_name: { type: String, required: true },
    pan_card_photo: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    registered_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Industry', industrySchema);
