"use strict";
// src/services/openai.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAIResponse = void 0;
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY, // ✅ Your OpenRouter API key
    baseURL: 'https://openrouter.ai/api/v1', // ✅ Correct base URL
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:5173/', // ✅ Must be a valid Referer (your frontend origin)
        'X-Title': 'My AI Chat App', // Optional title
    },
});
const getAIResponse = async (message) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'mistralai/mistral-7b-instruct', // ✅ Can be any OpenRouter-supported model (free or paid)
            messages: [{ role: 'user', content: message }],
        });
        const aiMessage = response.choices?.[0]?.message?.content;
        console.log('OpenRouter response:', response.choices?.[0]);
        return aiMessage ?? 'No response';
    }
    catch (error) {
        console.error('❌ OpenRouter Error:', error?.response?.data || error.message || error);
        return 'Error communicating with OpenRouter AI';
    }
};
exports.getAIResponse = getAIResponse;
