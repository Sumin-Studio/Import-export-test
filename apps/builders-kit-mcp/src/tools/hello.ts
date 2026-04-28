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
  { language: "Maori", greeting: "Kia ora" },
];

export const helloTools: Tool[] = [
  {
    name: "hello_world",
    description:
      "Returns a friendly hello in a random language. Use this to verify the MCP server is reachable and working.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

export async function handleHelloTool(
  _name: string,
  _args: Record<string, unknown>
): Promise<string> {
  const pick = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  return JSON.stringify({
    greeting: pick.greeting,
    language: pick.language,
    message: `${pick.greeting}! Hello from builders-kit-mcp.`,
  });
}
