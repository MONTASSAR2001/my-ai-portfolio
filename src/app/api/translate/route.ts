import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

const cvSchema = z.object({
  name: z.string(),
  role: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  summary: z.string(),
  skills: z.array(z.string()),
  experience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    duration: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
  })),
  phone: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  cv_url: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const { cvData, targetLang } = await req.json();

    const systemPrompt = `You are an expert, highly professional translator. 
Your task is to translate the provided CV/Portfolio data into ${targetLang}. 
- Maintain a highly professional and polished tone suitable for a senior executive or top-tier tech professional.
- Do NOT translate proper nouns (e.g., company names, tool names like React or Next.js, or URLs).
- Return the exact same JSON structure, with all text fields properly translated to ${targetLang}.`;

    const { object } = await generateObject({
      model: groq('llama-3.1-8b-instant'),
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
