import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { cvSchema } from '@/lib/schemas/cv-schema';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { cvData, targetLang } = await req.json();

    const systemPrompt = `You are an expert, highly professional translator. 
Your task is to translate the provided CV/Portfolio data into ${targetLang}. 
- Maintain a highly professional and polished tone suitable for a senior executive or top-tier tech professional.
- Do NOT translate proper nouns (e.g., company names, tool names like React or Next.js, or URLs).
- Return the exact same JSON structure, with all text fields properly translated to ${targetLang}.`;

    const { object } = await generateObject({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      prompt: JSON.stringify(cvData),
      schema: cvSchema,
    });

    return Response.json({ translatedCV: object });
  } catch (error) {
    console.error("Translation API error:", error);
    return Response.json({ error: "Failed to translate CV" }, { status: 500 });
  }
}
