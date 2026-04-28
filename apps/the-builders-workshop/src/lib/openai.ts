import OpenAI from "openai";

// Initialize OpenAI with API key from environment
const apiKey = process.env.OPENAI_API_KEY?.trim();

if (!apiKey) {
  console.warn("OPENAI_API_KEY not found in environment variables");
}

const openai = apiKey ? new OpenAI({ apiKey }) : null;

// OpenAI model name
export const OPENAI_MODEL = "gpt-4o-mini"; // Fast and cost-effective

/**
 * Check if OpenAI is configured
 */
export function isOpenAIConfigured(): boolean {
  return !!apiKey;
}

/**
 * Generate text using OpenAI
 */
export async function generateText(prompt: string, options?: {
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  if (!openai) {
    throw new Error("OpenAI API key not configured. Set OPENAI_API_KEY in your environment variables.");
  }

  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: options?.temperature ?? 0.9,
      max_tokens: options?.maxTokens ?? 150,
    });

    const message = response.choices[0]?.message?.content;
    if (!message) {
      throw new Error("No response from OpenAI - empty message");
    }

    return message;
  } catch (error: unknown) {
    // Log the full error for debugging
    const errorObj = error as { message?: string; status?: number; code?: string; type?: string; name?: string; stack?: string };
    console.error("OpenAI API error details:", {
      message: errorObj?.message,
      status: errorObj?.status,
      code: errorObj?.code,
      type: errorObj?.type,
      name: errorObj?.name,
      stack: errorObj?.stack?.substring(0, 500),
    });
    
    const errorMessage = String(errorObj?.message || "Unknown error");
    const errorStatus = errorObj?.status;
    const errorCode = errorObj?.code;
    
    // Handle specific error types
    if (errorStatus === 401 || errorCode === "invalid_api_key") {
      throw new Error("OpenAI API key is invalid or expired. Please check your API key at https://platform.openai.com/api-keys");
    }
    if (errorStatus === 429) {
      throw new Error("OpenAI API rate limit exceeded. Please try again later.");
    }
    
    // For pattern/string errors, wrap in a clean error message
    if (errorMessage.includes("pattern") || errorMessage.includes("expected pattern")) {
      throw new Error(`OpenAI API error: ${errorMessage}. This may indicate an API key format issue.`);
    }
    
    // Re-throw with sanitized message
    throw new Error(`OpenAI API error: ${errorMessage.substring(0, 200)}`);
  }
}
