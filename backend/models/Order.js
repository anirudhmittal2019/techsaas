// models/Order.js
const orderSchema = new mongoose.Schema({
    deal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, required: true },
    orderStatus: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);