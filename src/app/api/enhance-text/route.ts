import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const maxDuration = 60;

const SYSTEM_PROMPT = 
  'You are an expert resume writer. Enhance the provided text based on the instruction. ' +
  'Return ONLY the enhanced text without quotes, markdown, or conversational filler.';

export async function POST(req: Request) {
  try {
    const { text, prompt, instruction } = await req.json();

    // Support both `text` (requested) and `prompt` (from useCompletion)
    const contentToEnhance = text || prompt;

    if (!contentToEnhance || !instruction) {
      return new Response('Missing text or instruction', { status: 400 });
    }

    const result = await streamText({
      model: google('gemini-1.5-pro-latest'),
      system: SYSTEM_PROMPT,
      prompt: `Instruction: ${instruction}\n\nText to enhance:\n${contentToEnhance}`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in enhance-text API:", error);
    return new Response('Failed to enhance text', { status: 500 });
  }
}
