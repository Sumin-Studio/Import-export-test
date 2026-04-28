import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with API key from environment
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY not found in environment variables");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Gemini 3 Flash model name - try both variants
export const GEMINI_MODEL = "gemini-3-flash-preview"; // Updated model name

/**
 * Get a Gemini model instance (Gemini 3 Flash)
 */
export function getGeminiModel() {
  if (!genAI) {
    throw new Error("Gemini API key not configured. Set GEMINI_API_KEY in your environment variables.");
  }
  return genAI.getGenerativeModel({ model: GEMINI_MODEL });
}

/**
 * Check if Gemini is configured
 */
export function isGeminiConfigured(): boolean {
  return !!apiKey;
}

/**
 * Generate text using Gemini 3 Flash
 */
export async function generateText(
  prompt: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options?: {
    temperature?: number;
    maxTokens?: number;
  }
): Promise<string> {
  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
