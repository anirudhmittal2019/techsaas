// /controllers/inventory_controller.js
const RawMaterial = require('../models/RawMaterial');
const Product = require('../models/Product');
const InventoryRecord = require('../models/InventoryRecord');
const { generateAISummary } = require('../services/ai_service');

const addRawMaterial = async (req, res) => {
    const { name, quantity, unit, dailyUsage } = req.body;
    try {
        const material = new RawMaterial({ name, quantity, unit, dailyUsage });
        await material.save();
        res.status(201).send({ message: 'Raw material added', material });
    } catch (error) {
        res.status(500).send({ message: 'Error adding raw material', error });
    }
};

const addProduct = async (req, res) => {
    const { name, quantity, dailyProduction } = req.body;
    try {
        const product = new Product({ name, quantity, dailyProduction });
        await product.save();
        res.status(201).send({ message: 'Product added', product });
    } catch (error) {
        res.status(500).send({ message: 'Error adding product', error });
    }
};

const adjustInventory = async (req, res) => {
    const { materialId, productId, adjustment } = req.body; // adjustment can be +/- quantity
    try {
        let record;
        if (materialId) {
            record = await RawMaterial.findById(materialId);
        } else if (productId) {
            record = await Product.findById(productId);
        }
        if (!record) return res.status(404).send({ message: 'Record not found' });
        record.quantity += adjustment;
        await record.save();
        res.status(200).send({ message: 'Inventory adjusted', record });
    } catch (error) {
        res.status(500).send({ message: 'Error adjusting inventory', error });
    }
};

const getInventorySummary = async (req, res) => {
    try {
        const rawMaterials = await RawMaterial.find({});
        const products = await Product.find({});
        const summary = await generateAISummary(rawMaterials, products);
        res.status(200).send({ summary });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching inventory summary', error });
    }
};

module.exports = { addRawMaterial, addProduct, adjustInventory, getInventorySummary };
