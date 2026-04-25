// Gemini AI configuration for UpLift
// Replace with your actual Gemini API key from https://aistudio.google.com/apikey
// Free tier: 15 requests/minute for Gemini 1.5 Flash

import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// For OCR + Report Analysis (multimodal - text + image)
export const analysisModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.2,
    maxOutputTokens: 1024,
  },
});

// For Chat / Volunteer Matchmaker (text only with function calling)
export const chatModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 512,
  },
});

export default genAI;
