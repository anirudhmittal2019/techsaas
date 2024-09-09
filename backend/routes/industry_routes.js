const express = require('express');
const { registerIndustry, approveIndustry } = require('../controllers/industry_controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth_middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/register-industry', verifyToken, upload.single('pan_card_photo'), registerIndustry);
router.put('/approve-industry/:id', verifyAdmin, approveIndustry);

module.exports = router;
