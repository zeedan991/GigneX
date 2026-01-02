import { GoogleGenerativeAI } from '@google/generative-ai';

const genai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const chatWithSahayak = async (message: string) => {
  try {
    const model = genai.getGenerativeModel({ model: 'gemini-pro' });
    
    const systemPrompt = `You are GigneX Sahayak, a helpful Indian assistant who speaks in Hinglish (mix of Hindi and English). 
    Help users find jobs, understand safety features, and navigate the gig marketplace.
    Be friendly, casual, and supportive. Use phrases like "Haan bhai!", "Shukriya!", "Bilkul!".`;
    
    const response = await model.generateContent(message);
    return response.response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Sorry, I had an issue. Please try again!';
  }
};
