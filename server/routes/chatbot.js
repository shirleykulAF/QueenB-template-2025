const express = require('express');
const router = express.Router();
const { getChatbotResponse } = require('../controllers/chatController');

router.post('/', async (req, res) => {
	try {
		const { message } = req.body || {};
		if (!message || typeof message !== 'string') {
			return res.status(400).json({ error: 'message is required' });
		}

		const reply = await getChatbotResponse(message);
		return res.json({ reply });
	} catch (error) {
		return res.status(500).json({ error: 'Failed to get chatbot response' });
	}
});

module.exports = router;


