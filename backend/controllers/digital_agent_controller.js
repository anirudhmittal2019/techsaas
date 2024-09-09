// /controllers/digital_agent_controller.js
const Deal = require('../models/Deal');
const Order = require('../models/Order');
const Industry = require('../models/Industry');
const { notifyIndustry } = require('../services/notification_service');

const createDeal = async (req, res) => {
    const { productName, pricePerUnit, minimumQuantity, maximumQuantity, deliveryAvailable, estimatedDeliveryTime, distance } = req.body;
    const industryId = req.user.industryId;  // Assuming user is associated with an industry

    try {
        const deal = new Deal({
            industry: industryId,
            productName,
            pricePerUnit,
            minimumQuantity,
            maximumQuantity,
            deliveryAvailable,
            estimatedDeliveryTime,
            distance
        });

        await deal.save();
        res.status(201).send({ message: 'Deal created successfully', deal });
    } catch (error) {
        res.status(500).send({ message: 'Error creating deal', error });
    }
};

const filterCatalog = async (req, res) => {
    const { productType, maxPrice, maxDistance } = req.query;

    try {
        const filters = {};
        if (productType) filters.productName = new RegExp(productType, 'i');
        if (maxPrice) filters.pricePerUnit = { $lte: maxPrice };
        if (maxDistance) filters.distance = { $lte: maxDistance };

        const deals = await Deal.find(filters).populate('industry', 'name phoneNumber');
        res.status(200).send({ message: 'Deals retrieved', deals });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving catalog', error });
    }
};

const placeOrder = async (req, res) => {
    const { dealId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const deal = await Deal.findById(dealId);
        if (!deal) return res.status(404).send({ message: 'Deal not found' });

        if (quantity < deal.minimumQuantity || quantity > deal.maximumQuantity) {
            return res.status(400).send({ message: 'Invalid quantity for this deal' });
        }

        const order = new Order({ deal: dealId, user: userId, quantity });
        await order.save();

        // Notify the industry about the order
        await notifyIndustry(deal.industry, order._id);

        res.status(201).send({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).send({ message: 'Error placing order', error });
    }
};

module.exports = { createDeal, filterCatalog, placeOrder };
