// /routes/supply_chain_routes.js
const express = require('express');
const { addRawMaterial, addProduct, adjustInventory, getInventorySummary } = require('../controllers/inventory_controller');
const router = express.Router();

router.post('/add-raw-material', addRawMaterial);
router.post('/add-product', addProduct);
router.post('/adjust-inventory', adjustInventory);
router.get('/inventory-summary', getInventorySummary);

module.exports = router;
