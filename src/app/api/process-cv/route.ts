import { NextResponse } from 'next/server';
import PDFParser from 'pdf2json';
import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { cvSchema } from '@/lib/schemas/cv-schema';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 60;

const SYSTEM_PROMPT =
  'You are an expert HR AI. Extract structured data from the CV text provided by the user. ' +
  'If a field cannot be determined leave it as an empty string or empty array.';

export async function POST(req: Request) {
  try {
    // 1. Parse multipart form
    const formData = await req.formData();
    const file = formData.get('cv') as File | null;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must not exceed 5MB' }, { status: 413 });
    }

    // 2. Extract PDF text
    const buffer = Buffer.from(await file.arrayBuffer());
    const extractedText = await new Promise<string>((resolve, reject) => {
      const parser = new PDFParser(null, true);
      parser.on('pdfParser_dataError', (e: any) => reject(e?.parserError ?? e));
      parser.on('pdfParser_dataReady', () => resolve(parser.getRawTextContent()));
      parser.parseBuffer(buffer);
    });

    console.log('✅ PDF text extracted. Length:', extractedText.length);
    if (extractedText.trim().length < 50) {
      return NextResponse.json({ error: 'PDF appears to be empty or image-only.' }, { status: 400 });
    }

    // 3. Process with Groq using AI SDK
    console.log('🔄 Calling Groq (llama-3.3-70b-versatile)…');
    const { object } = await generateObject({
      model: groq('llama-3.3-70b-versatile'),
      system: SYSTEM_PROMPT,
      prompt: extractedText,
      schema: cvSchema,
    });

    console.log('✅ CV data parsed successfully. Keys:', Object.keys(object).join(', '));

    return NextResponse.json({ success: true, data: object });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    const cause = (error as NodeJS.ErrnoException).cause;
    console.error('❌ /api/process-cv failed:', msg);
    if (cause) console.error('   Cause:', cause);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}