import { NextResponse } from 'next/server';
import PDFParser from 'pdf2json';

// ─── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT =
  'You are an expert HR AI. Extract structured data from the CV text provided by the user. ' +
  'Return ONLY a valid JSON object — no markdown, no code fences, no extra text — with these exact keys:\n' +
  '  name: string (full name of the candidate),\n' +
  '  summary: string (2-4 sentence professional summary),\n' +
  '  skills: string[] (top 8 technical skills),\n' +
  '  experience: { title: string, company: string, duration?: string, description?: string }[]\n' +
  'If a field cannot be determined leave it as an empty string or empty array.';

// ─── OpenRouter call ──────────────────────────────────────────────────────────
async function callOpenRouter(text: string): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error('OPENROUTER_API_KEY is not set in .env.local');

  console.log('🔄 Calling OpenRouter (google/gemini-2.5-flash)…');

  let res: Response;
  try {
    res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
        'X-Title': 'PortfolioAI CV Extractor',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user',   content: text },
        ],
        temperature: 0.2,
      }),
    });
  } catch (err: unknown) {
    // Network-level failure (DNS, TLS, connection refused…)
    const cause = (err as NodeJS.ErrnoException).cause ?? err;
    console.error('❌ OpenRouter fetch() network error:', cause);
    throw new Error(`OpenRouter network failure: ${(err as Error).message}`);
  }

  if (!res.ok) {
    const body = await res.text();
    console.error(`❌ OpenRouter HTTP ${res.status}:`, body);
    throw new Error(`OpenRouter returned ${res.status}: ${body.slice(0, 200)}`);
  }

  const json = await res.json();
  const content: string = json?.choices?.[0]?.message?.content ?? '';
  if (!content) throw new Error('OpenRouter returned an empty message content');
  console.log('✅ OpenRouter responded. Content length:', content.length);
  return content;
}

// ─── Groq fallback ────────────────────────────────────────────────────────────
async function callGroq(text: string): Promise<string> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error('GROQ_API_KEY is not set in .env.local');

  console.log('🔄 Calling Groq (llama-3.3-70b-versatile) as fallback…');

  let res: Response;
  try {
    res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user',   content: text },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      }),
    });
  } catch (err: unknown) {
    const cause = (err as NodeJS.ErrnoException).cause ?? err;
    console.error('❌ Groq fetch() network error:', cause);
    throw new Error(`Groq network failure: ${(err as Error).message}`);
  }

  if (!res.ok) {
    const body = await res.text();
    console.error(`❌ Groq HTTP ${res.status}:`, body);
    throw new Error(`Groq returned ${res.status}: ${body.slice(0, 200)}`);
  }

  const json = await res.json();
  const content: string = json?.choices?.[0]?.message?.content ?? '';
  if (!content) throw new Error('Groq returned an empty message content');
  console.log('✅ Groq responded. Content length:', content.length);
  return content;
}

// ─── JSON fence stripper ──────────────────────────────────────────────────────
function extractJSON(raw: string): Record<string, unknown> {
  // Strip ```json … ``` or ``` … ``` wrappers
  const stripped = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  // Find the outermost { … }
  const start = stripped.indexOf('{');
  const end   = stripped.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object found in AI response');
  return JSON.parse(stripped.slice(start, end + 1));
}

// ─── Route handler ────────────────────────────────────────────────────────────
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
      parser.on('pdfParser_dataError', (e: any) =>
        reject(e?.parserError ?? e)
      );
      parser.on('pdfParser_dataReady', () => resolve(parser.getRawTextContent()));
      parser.parseBuffer(buffer);
    });

    console.log('✅ PDF text extracted. Length:', extractedText.length);
    if (extractedText.trim().length < 50) {
      return NextResponse.json({ error: 'PDF appears to be empty or image-only.' }, { status: 400 });
    }

    // 3. Try OpenRouter → fallback to Groq
    let rawContent: string;
    try {
      rawContent = await callOpenRouter(extractedText);
    } catch (primaryErr) {
      console.warn('⚠️  OpenRouter failed, falling back to Groq…', (primaryErr as Error).message);
      rawContent = await callGroq(extractedText);
    }

    // 4. Parse the JSON payload
    const parsedData = extractJSON(rawContent);
    console.log('✅ CV data parsed successfully. Keys:', Object.keys(parsedData).join(', '));

    return NextResponse.json({ success: true, data: parsedData });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    const cause = (error as NodeJS.ErrnoException).cause;
    console.error('❌ /api/process-cv failed:', msg);
    if (cause) console.error('   Cause:', cause);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}