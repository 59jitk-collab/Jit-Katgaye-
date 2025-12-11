import { GoogleGenAI, Chat } from "@google/genai";
import { StudyTask } from '../types';

// Initialize Gemini API
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

export const solveDoubt = async (query: string, imageBase64?: string): Promise<string> => {
    if (!ai) return "## AI Unavailable\nPlease check your internet connection or try again later.";

    try {
        const model = 'gemini-2.5-flash';
        let contents;

        // Clean base64 string if it contains the data URL prefix
        const cleanBase64 = imageBase64 ? imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '') : null;

        if (cleanBase64) {
             contents = {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
                    { text: query || "Analyze this image and solve the problem shown. Provide a step-by-step explanation suitable for a Class 10 student." }
                ]
             };
        } else {
            contents = {
                parts: [{ text: query }]
            };
        }

        const response = await ai.models.generateContent({
            model,
            contents,
            config: {
                systemInstruction: "You are an expert CBSE Class 10 tutor. Solve the doubt clearly, step-by-step. Use Markdown for formatting (bold, bullet points, math equations). Be encouraging and concise."
            }
        });

        return response.text || "I analyzed the input but couldn't generate a solution. Please try asking in a different way.";
    } catch (error) {
        console.error("Doubt Solver Error:", error);
        return "## Error\nSomething went wrong while processing your request. Please try again.";
    }
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
  if (!ai) return "## Connection Error\nPlease check your internet connection.";

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
