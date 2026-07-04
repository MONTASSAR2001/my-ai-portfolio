import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { cvData, jobDescription, prompt } = await req.json();

    // Use prompt if passed by useCompletion natively, or jobDescription
    const jd = jobDescription || prompt;

    if (!cvData || !jd) {
      return new Response('Missing cvData or jobDescription', { status: 400 });
    }

    const systemPrompt = `You are an expert career coach and executive recruiter. 
Write a highly professional, concise, and persuasive cover letter based on the user's CV data and the specific Job Description. 
Match the tone of a high-end professional. Return only the letter text, ready to be copied. Do not use markdown blocks.

User CV Data:
${JSON.stringify(cvData, null, 2)}

Job Description:
${jd}`;

    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: "Please generate my cover letter." }
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Cover Letter Generation Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
