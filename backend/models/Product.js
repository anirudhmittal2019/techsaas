// /models/Product.js
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    dailyProduction: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);