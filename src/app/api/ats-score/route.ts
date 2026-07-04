import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { cvData } = await req.json();

    if (!cvData) {
      return NextResponse.json({ error: 'Missing cvData' }, { status: 400 });
    }

    const systemPrompt = `You are an expert ATS System. Analyze the CV data. You MUST return your response STRICTLY as a raw JSON object with the exact structure: {"score": number, "feedback": ["string", "string", "string"]}. Do not include any markdown formatting, do not use \`\`\`json blocks, just return the raw JSON string starting with { and ending with }.

CV Data:
${JSON.stringify(cvData, null, 2)}`;

    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: systemPrompt,
    });

    const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    if (typeof parsedData.score !== 'number' || !Array.isArray(parsedData.feedback)) {
      throw new Error('Malformed AI response structure');
    }

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('ATS Score Generation Error:', error);
    return NextResponse.json(
      {
        score: 0,
        feedback: [
          "The AI system is currently overloaded or returned malformed data.",
          "Please click 'Scan CV' again in a few moments."
        ]
      },
      { status: 503 }
    );
  }
}
