const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = (phoneNumber, status) => {
    const emailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: `${phoneNumber}@sms.email.com`,
        subject: `Industry Registration ${status}`,
        text: `Your industry registration has been ${status}.`
    };

    return transporter.sendMail(emailOptions);
};

module.exports = { sendEmail };
