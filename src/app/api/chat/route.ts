import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { aiRateLimiter } from '@/lib/rate-limit';

export const maxDuration = 30;

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  if (!aiRateLimiter.check(ip)) {
    return new Response(JSON.stringify({ error: "Too Many Requests" }), { status: 429 });
  }

  try {
    const { messages, cvData } = await req.json();

    const systemPrompt = `You are a helpful, professional AI assistant embedded in a portfolio website.
Your primary role is to answer questions from recruiters and visitors based ONLY on the following CV data.
Do not hallucinate any information. If they ask a question you do not know the answer to, politely state that it's not in your database and encourage them to contact the creator directly.
Keep your responses concise, intelligent, and highly professional.

Creator's CV Data:
${JSON.stringify(cvData, null, 2)}`;

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: systemPrompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), { status: 500 });
  }
}