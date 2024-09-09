const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = (phoneNumber, status) => {
    return client.messages.create({
        body: `Your industry registration has been ${status}.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
    });
};

module.exports = { sendSMS };
