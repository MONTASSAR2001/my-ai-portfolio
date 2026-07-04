import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

const atsSchema = z.object({
  score: z.number().describe("Score from 0 to 100 representing the ATS match and CV strength"),
  feedback: z.array(z.string()).describe("3 to 5 actionable tips to improve the CV formatting, impact, or professional wording")
});

export async function POST(req: Request) {
  try {
    const { cvData } = await req.json();

    if (!cvData) {
      return new Response('Missing cvData', { status: 400 });
    }

    const systemPrompt = `Act as an strict ATS (Applicant Tracking System) and senior recruiter. 
Analyze the provided CV data. Calculate a realistic score out of 100 based on completeness, impact, quantifiable achievements, and professional wording. 
Provide 3-5 short, actionable feedback points to improve it.
Be strict but constructive. Return the structured data only.

CV Data:
${JSON.stringify(cvData, null, 2)}`;

    const { object } = await generateObject({
      model: groq('llama-3.1-8b-instant'),
      schema: atsSchema,
      prompt: systemPrompt,
    });

    return Response.json(object);
  } catch (error) {
    console.error('ATS Score Generation Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
