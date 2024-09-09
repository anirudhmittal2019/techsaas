const Industry = require('../models/Industry');
const { sendEmail } = require('../services/email_service');
const { sendSMS } = require('../services/otp_service');

const registerIndustry = async (req, res) => {
    const { phone_number, name, gstn, industry_name } = req.body;
    const pan_card_photo = req.file ? req.file.filename : null;

    if (!phone_number || !name || !gstn || !industry_name || !pan_card_photo) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const industry = new Industry({ phone_number, name, gstn, industry_name, pan_card_photo });
        await industry.save();
        res.status(201).send({ message: 'Industry registered successfully. Awaiting approval.' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error registering industry', error });
    }
};

const approveIndustry = async (req, res) => {
    const industryId = req.params.id;
    const { status } = req.body;

    try {
        const industry = await Industry.findById(industryId);
        if (!industry) {
            return res.status(404).send({ message: 'Industry not found' });
        }

        industry.status = status;
        await industry.save();

        // Send notifications
        await sendEmail(industry.phone_number, status);
        await sendSMS(industry.phone_number, status);

        res.status(200).send({ message: `Industry ${status} successfully.` });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error ${status === 'approved' ? 'approving' : 'rejecting'} industry`, error });
    }
};

module.exports = { registerIndustry, approveIndustry };
