// /routes/chat_routes.js
const express = require('express');
const { handleChatbotRequest } = require('../controllers/chat_controller');
const { verifyUser } = require('../middleware/auth_middleware');
const router = express.Router();

router.post('/chat', verifyUser, handleChatbotRequest);

module.exports = router;
