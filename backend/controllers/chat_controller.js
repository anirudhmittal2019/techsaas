// /controllers/chat_controller.js
const { getLLMResponse } = require('../services/ai_service');

const handleChatbotRequest = async (req, res) => {
    const { userInput } = req.body;

    if (!userInput) {
        return res.status(400).send({ message: 'Input is required' });
    }

    try {
        // Get the AI response from your custom LLM
        const aiResponse = await getLLMResponse(userInput, req.user); // passing user info if needed for context
        res.status(200).send({ response: aiResponse });
    } catch (error) {
        console.log('AI chatbot error:', error);
        res.status(500).send({ message: 'Error processing chatbot request', error });
    }
};

module.exports = { handleChatbotRequest };
