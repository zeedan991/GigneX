import { GoogleGenAI, Content } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateGigDescription = async (title: string, category: string, skills: string): Promise<string> => {
  if (!apiKey) return "API Key not configured. Please add your Gemini API Key.";

  try {
    const prompt = `Write a professional and attractive job description for a gig on the GigneX marketplace.
    Title: ${title}
    Category: ${category}
    Required Skills: ${skills}
    
    The description should be concise (max 150 words), engaging, and formatted with bullet points for responsibilities.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};

export const getChatResponse = async (history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> => {
  if (!apiKey) return "Namaste! Please configure the API Key to chat with me.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `You are GigneX Sahayak (Helper), a warm, traditional, and trustworthy AI assistant for the GigneX platform in India. 
        
        Your Audience:
        - Local daily wage workers (blue-collar) like plumbers, painters, electricians who prefer simple language, Hinglish (Hindi+English), or Hindi.
        - Online freelancers (white-collar) who are tech-savvy.
        
        Your Personality:
        - Polite, respectful, and encouraging. Use Indian greetings like "Namaste", "Ram Ram", "Sat Sri Akal", or "Vanakkam" occasionally.
        - Use emojis to make the conversation friendly (🙏, 🤝, 🇮🇳, ✨).
        - Act like a wise, helpful elder or a smart, reliable friend.
        
        Your Goal:
        - Help users navigate the app (Find Gigs, Post Jobs, Learning Hub).
        - Explain how the blockchain security keeps their money safe (escrow).
        - Encourage them to upskill using the Learning Hub.
        
        Style:
        - Keep answers concise.
        - If the user asks in Hindi, reply in Hindi (or Hinglish).
        - If the user asks in English, reply in simple English.`,
      },
      history: history as Content[]
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I am thinking... please wait a moment. 🙏";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Maaf kijiye (Sorry), I am currently having trouble connecting. Please try again in a moment. 🙏";
  }
};