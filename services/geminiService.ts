import { GoogleGenAI, Chat } from "@google/genai";
import { StudyTask } from '../types';

// Initialize Gemini API
// Note: process.env.API_KEY is replaced by the actual key string during build by Vite
const apiKey = AIzaSyDr1MrK-nPOTQ3unVdPGauUZ26KLGgmk0M || ''; 

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apikey });
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
    const prompt = `Act as a strict Class 10 CBSE Board Topper Mentor. Create a realistic daily study schedule for a student with the goal: "${goal}". 
    Focus on NCERT subjects: Math, Science, Social Science, English.
    Return ONLY a raw JSON array of objects with no markdown formatting. 
    Each object must have: "text" (specific NCERT chapter/topic), "time" (e.g. "09:00 AM"), and "subject" (e.g. "Math" or "Break").
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
    const prompt = `Summarize the following Class 10 study notes into 3-5 concise bullet points ideal for board exam revision:\n\n${text}`;
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

export const generateSimpleNotes = async (subject: string, chapter: string): Promise<string> => {
  if (!ai) return "## Connection Error\nPlease check your internet connection and API Key.";

  try {
    const prompt = `Create detailed, student-friendly revision notes for Class 10 CBSE NCERT Topic: "${chapter}" in Subject: "${subject}".
    
    Rules:
    1. Strictly follow Class 10 NCERT syllabus.
    2. Use emojis to make it engaging.
    3. Include "Important Definitions".
    4. Include "Key Formulas" (if Math/Science) or "Key Dates/Events" (if SST).
    5. Use Markdown for formatting (Bold, Headers, Lists).
    6. Add a "Board Exam Tip" at the end.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    return response.text || "## No Content Generated\nTry again later.";
  } catch (error) {
    console.error("Error generating notes:", error);
    return "## Error\nCould not generate notes at this time.";
  }
};

export const generatePracticeQuestions = async (subject: string, chapter?: string): Promise<any[]> => {
    if (!ai) return [];
    
    try {
        const prompt = `Generate 5 unique MCQ questions for Class 10 CBSE Subject: ${subject} ${chapter ? `, Chapter: ${chapter}` : ''}.
        Focus on Board Exam patterns (Competency Based Questions).
        Return ONLY a JSON array. Each object: { "text": "question", "options": ["a", "b", "c", "d"], "correctAnswer": index_number, "explanation": "short reason" }.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        const text = response.text || "[]";
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Error generating questions", e);
        return [];
    }
}
