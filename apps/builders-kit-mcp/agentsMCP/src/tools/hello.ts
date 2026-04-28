import type { Tool } from "@modelcontextprotocol/sdk/types.js";

const GREETINGS = [
  { language: "Mandarin", greeting: "Ni hao" },
  { language: "Spanish", greeting: "Hola" },
  { language: "Hindi", greeting: "Namaste" },
  { language: "Arabic", greeting: "Marhaba" },
  { language: "French", greeting: "Bonjour" },
  { language: "Swahili", greeting: "Jambo" },
  { language: "Japanese", greeting: "Konnichiwa" },
  { language: "Korean", greeting: "Annyeonghaseyo" },
  { language: "Portuguese", greeting: "Ola" },
  { language: "Russian", greeting: "Privet" },
  { language: "German", greeting: "Hallo" },
  { language: "Italian", greeting: "Ciao" },
  { language: "Turkish", greeting: "Merhaba" },
  { language: "Thai", greeting: "Sawasdee" },
  { language: "Vietnamese", greeting: "Xin chao" },
  { language: "Greek", greeting: "Yia sou" },
  { language: "Hawaiian", greeting: "Aloha" },
  { language: "Zulu", greeting: "Sawubona" },
  { language: "Maori", greeting: "Kia ora" },
  { language: "Finnish", greeting: "Moi" },
];

export const helloTools: Tool[] = [
  {
    name: "hello_world",
    description: "Says hello in a random language. A friendly test tool.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

export async function handleHelloTool(
  name: string,
  args: Record<string, unknown>
): Promise<string> {
  const pick = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  return JSON.stringify({
    greeting: pick.greeting,
    language: pick.language,
    message: `${pick.greeting}! Hello from agents-mcp.`,
  });
}
