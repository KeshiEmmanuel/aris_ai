import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/actions/auth.actions";
import { Groq } from "groq-sdk";

// Initialize Groq. The API Key MUST be in your .env.local file
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    // Optional: Get keywords from the request (sent from the extension)
    // This helps Groq recognize "Vercel", "SaaS", "EBITDA" etc.
    // const keywords = (formData.get("keywords") as string) || "";

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------
    // THE GROQ TRANSCRIPTION ENGINE
    // ---------------------------------------------------------
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      // 'whisper-large-v3' is the most accurate model available on Groq
      model: "whisper-large-v3",

      // CRITICAL: This 'prompt' field guides the model's ear.
      // It forces the model to choose your specific words over generic ones.
      prompt: `translate only`,

      // Force JSON so we can easily parse the text property
      response_format: "json",
      language: "en",
    });

    // Return ONLY the raw text
    return NextResponse.json({
      text: transcription.text,
    });
  } catch (error) {
    console.error("Groq Transcription Error:", error);
    return NextResponse.json(
      { error: "Transcription failed" },
      { status: 500 },
    );
  }
}
