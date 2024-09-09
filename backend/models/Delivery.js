// /models/Delivery.js
const deliverySchema = new mongoose.Schema({
    truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    deliveryStatus: { type: String, enum: ['scheduled', 'in transit', 'delivered'], default: 'scheduled' },
    departureDate: { type: Date, required: true },
    expectedDeliveryDate: { type: Date, required: true },
    actualDeliveryDate: { type: Date },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', deliverySchema);