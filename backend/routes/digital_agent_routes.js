// /routes/digital_agent_routes.js
const express = require('express');
const { createDeal, filterCatalog, placeOrder } = require('../controllers/digital_agent_controller');
const router = express.Router();

router.post('/create-deal', createDeal);
router.get('/filter-catalog', filterCatalog);
router.post('/place-order', placeOrder);

module.exports = router;
