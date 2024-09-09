// /services/calendar_service.js
const sendShiftNotification = async (laborIds, shift) => {
    // Logic to send notifications to labor about shift assignments
    laborIds.forEach(laborId => {
        console.log(`Notification sent to labor ${laborId} for shift: ${shift}`);
    });
};

module.exports = { sendShiftNotification };
