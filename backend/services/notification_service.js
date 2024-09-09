// /services/notification_service.js
const Industry = require('../models/Industry');
const Order = require('../models/Order');

const notifyIndustry = async (industryId, orderId) => {
    const industry = await Industry.findById(industryId).select('name phoneNumber');
    const order = await Order.findById(orderId).populate('user', 'name phoneNumber');

    if (!industry || !order) return;

    console.log(`Notifying industry ${industry.name} at ${industry.phoneNumber} about new order from ${order.user.name}`);

    // Logic to send SMS or email notification can be added here
};

module.exports = { notifyIndustry };
