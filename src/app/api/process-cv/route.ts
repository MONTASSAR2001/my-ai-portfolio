import { NextResponse } from 'next/server';
import PDFParser from 'pdf2json';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;

const cvSchema = z.object({
  name: z.string(),
  summary: z.string(),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      duration: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
    })
  ),
});

const SYSTEM_PROMPT =
  'You are an expert HR AI. Extract structured data from the CV text provided by the user. ' +
  'If a field cannot be determined leave it as an empty string or empty array.';

export async function POST(req: Request) {
  try {
    // 1. Parse multipart form
    const formData = await req.formData();
    const file = formData.get('cv') as File | null;
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

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

    // 3. Process with Google Gemini using AI SDK
    console.log('🔄 Calling Google (gemini-1.5-pro-latest)…');
    const { object } = await generateObject({
      model: google('gemini-1.5-pro-latest'),
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