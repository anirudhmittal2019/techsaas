// /models/InventoryRecord.js
const inventoryRecordSchema = new mongoose.Schema({
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'RawMaterial' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    currentQuantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InventoryRecord', inventoryRecordSchema);