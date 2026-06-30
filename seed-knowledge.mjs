import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import WebSocket from 'ws'; // <-- NEW: Import WebSocket

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

// <-- NEW: Inject WebSocket into the client
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    transport: WebSocket, 
  }
});

// --- YOUR PERSONAL DATA BLOCK ---
const portfolioData = [
  "Montassar is an engineering student specializing in computer science, robotics, and automation.",
  "Montassar has strong expertise in ROS (Robot Operating System), developing control algorithms and simulating robotic behaviors.",
  "Montassar is highly skilled in software engineering, programming with TypeScript, JavaScript, Python, C++, and building web applications with Next.js and Tailwind CSS.",
  "Montassar has hands-on experience in electronics, hardware-software integration, and circuit design including working with condensers and microcontrollers.",
  "Montassar's academic projects include advanced implementations of complex data structures and algorithms.",
  "Montassar speaks multiple languages, with professional or academic proficiency in Arabic, French, English, and Italian.",
  "Montassar is building an AI-powered portfolio to showcase full-stack development capability, autonomous systems knowledge, and cloud database architecture."
];

// Feature: Free feature to fetch text embeddings matching 384-dimensions (all-MiniLM-L6-v2)
async function getEmbedding(text) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
      }
    );
    
    if (!response.ok) throw new Error(`HuggingFace API error: ${response.statusText}`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error generating embedding:", err);
    return null;
  }
}

async function main() {
  console.log("🚀 Starting to generate embeddings for Montassar's portfolio...");

  // Clear old data to prevent duplication
  const { error: deleteError } = await supabase.from('portfolio_knowledge').delete().neq('id', 0);
  if (deleteError) console.log("Note:", deleteError.message);

  for (const text of portfolioData) {
    console.log(`\nProcessing chunk: "${text.substring(0, 40)}..."`);
    
    const embedding = await getEmbedding(text);
    if (!embedding || !Array.isArray(embedding)) {
      console.error("❌ Skipped chunk due to embedding failure.");
      continue;
    }

    const { error } = await supabase.from('portfolio_knowledge').insert({
      content: text,
      embedding: embedding
    });

    if (error) {
      console.error("❌ Failed to insert into Supabase:", error.message);
    } else {
      console.log("✅ Successfully injected into vector database!");
    }
  }

  console.log("\n🎉 Knowledge base initialization complete!");
}

main();