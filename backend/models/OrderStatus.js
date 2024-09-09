// /models/OrderStatus.js
const orderStatusSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OrderStatus', orderStatusSchema);
