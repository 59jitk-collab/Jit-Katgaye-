import { GoogleGenAI, Chat } from "@google/genai";
import { StudyTask } from '../types';

// Initialize Gemini API
// Note: process.env.API_KEY is assumed to be available in the environment
const apiKey = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getGeminiChat = (systemInstruction: string): Chat | null => {
  if (!ai) return null;
  
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
      temperature: 0.7,
    }
  });
};

export const generateStudyPlan = async (goal: string): Promise<StudyTask[]> => {
  if (!ai) return [];

  try {
    const prompt = `Create a realistic daily study schedule for a student with the goal: "${goal}". 
    Return ONLY a raw JSON array of objects with no markdown formatting. 
    Each object must have: "text" (activity description), "time" (e.g. "09:00 AM"), and "subject" (e.g. "Math" or "Break").
    Generate about 5-7 tasks for a day.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    const text = response.text || "[]";
    // Clean up markdown code blocks if present
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const tasks = JSON.parse(jsonString);
    return tasks.map((t: any, index: number) => ({
      id: Date.now().toString() + index,
      text: t.text,
      time: t.time,
      subject: t.subject,
      completed: false
    }));
  } catch (error) {
    console.error("Error generating plan:", error);
    return [];
  }
};

export const summarizeText = async (text: string): Promise<string> => {
  if (!ai) return "API Key missing.";
  if (!text || text.length < 10) return "Note is too short to summarize.";

  try {
    const prompt = `Summarize the following study notes into 3-5 concise bullet points. capturing the key concepts:\n\n${text}`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Error summarizing:", error);
    return "Failed to generate summary.";
  }
};