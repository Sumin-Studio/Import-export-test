import { NextRequest, NextResponse } from "next/server";
import { generateText, isOpenAIConfigured } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    if (!isOpenAIConfigured()) {
      console.error("OPENAI_API_KEY not found in environment");
      return NextResponse.json(
        { error: "OpenAI API key not configured", details: "OPENAI_API_KEY environment variable is missing" },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error("Failed to parse request JSON:", jsonError);
      return NextResponse.json(
        { error: "Invalid request body", details: "Request body must be valid JSON" },
        { status: 400 }
      );
    }
    const { lastAuthor, lastMessage, shouldReply } = body;
    
    console.log("Generating message with OpenAI:", { lastAuthor, shouldReply });

    const systemPrompt = `Generate a message for a community chat where designers share their very first coding projects.

Context: Designers learning to build basic things - simple, fun projects like pet pages, recipe collections, tiny portfolios, quotes pages, band fan pages.

Tone: Casual, excited, celebratory. Short (1-2 sentences). Use emojis occasionally (🐱 😊 🎉 ✨). No technical jargon.

${shouldReply && lastAuthor ? `Reply to "${lastAuthor}" who said: "${lastMessage}". Keep it SHORT - just 1-3 words like "Nice!", "That's awesome!", "Love it!"` : `Generate a message sharing a first simple project. Example: "Made a little page about my cat today! It's so simple but I'm so proud 🐱"`}

Return ONLY the message text, no quotes or extra text.`;

    const messageText = await generateText(systemPrompt, { temperature: 0.9 });
    const cleanMessage = messageText.trim().replace(/^["']|["']$/g, '').split('\n')[0];
    
    console.log("Generated message:", cleanMessage);

    return NextResponse.json({ 
      message: cleanMessage,
      fromOpenAI: true 
    });
  } catch (error) {
    console.error("Error generating message:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate message", details: errorMessage },
      { status: 500 }
    );
  }
}

