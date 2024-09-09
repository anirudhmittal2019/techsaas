// /routes/logistics_routes.js
const express = require('express');
const { addTruck, scheduleDelivery, updateDeliveryStatus, logisticsSummary } = require('../controllers/logistics_controller');
const router = express.Router();

router.post('/add-truck', addTruck);
router.post('/schedule-delivery', scheduleDelivery);
router.put('/update-delivery-status', updateDeliveryStatus);
router.get('/logistics-summary', logisticsSummary);

module.exports = router;
