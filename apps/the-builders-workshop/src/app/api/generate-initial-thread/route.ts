import { NextResponse } from "next/server";
import { generateText, isOpenAIConfigured } from "@/lib/openai";

export async function POST() {
  try {
    // Debug: Log environment variable status
    const hasKey = !!process.env.OPENAI_API_KEY;
    console.log("OpenAI API key check:", { 
      hasKey, 
      keyLength: process.env.OPENAI_API_KEY?.length || 0,
      keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7) || "none"
    });
    
    if (!isOpenAIConfigured()) {
      console.error("OpenAI API key not configured. OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "exists but invalid" : "missing");
      return NextResponse.json(
        { error: "OpenAI API key not configured", details: "OPENAI_API_KEY environment variable is missing or invalid" },
        { status: 500 }
      );
    }

    // Generate 3 messages: 2 new posts, 1 reply (staying within free tier 5 req/min limit)
    const messages: Array<{ author: string; message: string; replyingTo?: string }> = [];
    const authors = ["Sam", "Casey", "Jordan", "Taylor", "Morgan", "Alex", "Quinn", "Jamie", "Drew", "Riley"];
    const usedAuthors = new Set<string>();
    
    const getRandomAuthor = () => {
      const available = authors.filter(a => !usedAuthors.has(a));
      if (available.length === 0) {
        usedAuthors.clear();
        return authors[Math.floor(Math.random() * authors.length)];
      }
      const author = available[Math.floor(Math.random() * available.length)];
      usedAuthors.add(author);
      return author;
    };

    for (let i = 0; i < 3; i++) {
      // Small delay between requests to avoid hitting rate limits
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
      }
      
      const shouldReply = i === 1 && messages.length > 0; // 2nd message is a reply
      
      let prompt: string;
      if (shouldReply && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        prompt = `Generate a SHORT encouraging reply (1-3 words) to someone who just shared their first coding project. Examples: "Nice!", "That's awesome!", "Love it!", "So cool!"

They said: "${lastMessage.message}"

Return ONLY the reply text, no quotes.`;
      } else {
        prompt = `Generate a message for a community chat where designers share their very first coding projects.

Context: Designers learning to build basic things - simple, fun projects like pet pages, recipe collections, tiny portfolios, quotes pages, band fan pages.

Tone: Casual, excited, celebratory. Short (1-2 sentences). Use emojis occasionally (🐱 😊 🎉 ✨). No technical jargon.

Generate a message sharing a first simple project. Example: "Made a little page about my cat today! It's so simple but I'm so proud 🐱"

Return ONLY the message text, no quotes or extra text.`;
      }

      // Generate message with OpenAI
      let messageText: string;
      try {
        messageText = await generateText(prompt, { temperature: 0.9 });
      } catch (error: unknown) {
        console.error(`Error generating message ${i + 1}:`, error);
        // Re-throw with a clean error message that can be serialized to JSON
        const errorObj = error as { message?: string };
        const errorMsg = errorObj?.message || String(error);
        throw new Error(`Failed to generate message ${i + 1}: ${errorMsg}`);
      }
      
      if (!messageText) {
        throw new Error("Failed to generate message");
      }
      
      const cleanMessage = messageText.trim().replace(/^["']|["']$/g, '').split('\n')[0];
      
      const author = getRandomAuthor();
      messages.push({
        author,
        message: cleanMessage,
        replyingTo: shouldReply && messages.length > 0 ? messages[messages.length - 1].author : undefined,
      });
    }

    return NextResponse.json({ 
      messages: messages.map(msg => ({ ...msg, fromOpenAI: true }))
    });
  } catch (error) {
    console.error("Error generating initial thread:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Ensure error message is safe for JSON serialization
    const safeErrorMessage = errorMessage.replace(/[^\x20-\x7E]/g, '').substring(0, 500);
    return NextResponse.json(
      { 
        error: "Failed to generate messages", 
        details: safeErrorMessage
      },
      { status: 500 }
    );
  }
}
