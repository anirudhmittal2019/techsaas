// /services/discount_service.js
const setDiscountAlert = async (userId, deadline) => {
    const today = new Date();
    const remainingDays = (deadline - today) / (1000 * 60 * 60 * 24);

    if (remainingDays > 0) {
        console.log(`Setting discount alerts for ${remainingDays} days until ${deadline}`);
        // Logic to send daily notifications via email or push notifications
    }
};

module.exports = { setDiscountAlert };
