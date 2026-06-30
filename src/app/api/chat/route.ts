import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    // We will extract the latest message from the user
    const userMessage = messages[messages.length - 1].text;

    // TODO: Connect to the AI Engine (Ollama / OpenAI / Groq)
    // For right now, we are echoing the backend connection to prove it works
    const aiResponse = `Backend received your message: "${userMessage}". The engine is ready to be connected!`;

    return NextResponse.json({ message: aiResponse });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}