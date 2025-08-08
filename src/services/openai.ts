// src/services/openai.ts

import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, // ✅ Your OpenRouter API key
  baseURL: 'https://openrouter.ai/api/v1', // ✅ Correct base URL
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5173/', // ✅ Must be a valid Referer (your frontend origin)
    'X-Title': 'My AI Chat App', // Optional title
  },
});

export const getAIResponse = async (message: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct', // ✅ Can be any OpenRouter-supported model (free or paid)
      messages: [{ role: 'user', content: message }],
    });

    const aiMessage = response.choices?.[0]?.message?.content;

    console.log('OpenRouter response:', response.choices?.[0]);

    return aiMessage ?? 'No response';
  } catch (error: any) {
    console.error('❌ OpenRouter Error:', error?.response?.data || error.message || error);
    return 'Error communicating with OpenRouter AI';
  }
};
