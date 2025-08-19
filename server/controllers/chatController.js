const axios = require('axios');
require('dotenv').config();

const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

async function getChatbotResponse(userMessage) {
	try {
		const apiKey = process.env.GEMINI_API_KEY;
		if (!apiKey) {
			throw new Error('Missing GEMINI_API_KEY in environment');
		}

		const prompt = `You are a helpful, concise mentor chatbot for the QueenB platform. Answer clearly and briefly, with a friendly tone.\n\nUser: ${userMessage}\nAssistant:`;

		const requestBody = {
			contents: [
				{
					role: 'user',
					parts: [{ text: prompt }]
				}
			]
		};

		const response = await axios.post(`${GEMINI_API_URL}?key=${apiKey}`, requestBody, {
			headers: { 'Content-Type': 'application/json' }
		});

		const candidates = response && response.data && response.data.candidates;
		const parts = candidates && candidates[0] && candidates[0].content && candidates[0].content.parts;
		const text = Array.isArray(parts) ? parts.map(p => p.text || '').join('') : '';

		return text || 'Sorry, I could not generate a response.';
	} catch (error) {
		return 'Sorry, something went wrong while generating a response.';
	}
}

module.exports = { getChatbotResponse };


