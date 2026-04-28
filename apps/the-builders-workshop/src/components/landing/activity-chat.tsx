"use client";

import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: string;
  author: string;
  message: string;
  timestamp: Date;
  replyingTo?: string; // Author name this message is replying to
  fromOpenAI?: boolean; // Debug flag to indicate OpenAI-generated messages
}

// Mock data pool for generating messages
const mockAuthors = ["Alex", "Jordan", "Sam", "Casey", "Morgan", "Taylor", "Riley", "Quinn", "Jamie", "Drew"];

// Removed unused constants - only used in commented-out fallback function
// const mockPrototypes = [...];
// const messageTemplates = { ... };

// Removed unused constants: solutions, tools, topics, resources, insights
// Removed unused function: getInitialMessages (replaced by API call)

async function generateMessageWithOpenAI(
  lastAuthor: string | null,
  lastMessage: string | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _existingMessages: ChatMessage[]
): Promise<ChatMessage> {
  const shouldReply = lastAuthor && Math.random() > 0.8; // 20% chance of replying (we want mostly new posts)
  
  try {
    const response = await fetch("/api/generate-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastAuthor,
        lastMessage,
        shouldReply,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API error:", errorData);
      throw new Error(errorData.error || `Failed to generate message: ${response.status}`);
    }

    const data = await response.json();
    const cleanMessage = data.message.trim();
    
    return {
      id: `msg-${Date.now()}-${Math.random()}`,
      author: mockAuthors[Math.floor(Math.random() * mockAuthors.length)],
      message: cleanMessage,
      timestamp: new Date(),
      replyingTo: shouldReply && lastAuthor ? lastAuthor : undefined,
      fromOpenAI: data.fromOpenAI ?? true, // Default to true if not specified
    };
  } catch (error) {
    console.error("Error generating message with OpenAI:", error);
    // Retry once, then throw to prevent fallback
    try {
      const retryResponse = await fetch("/api/generate-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastAuthor,
          lastMessage,
          shouldReply,
        }),
      });

      if (!retryResponse.ok) {
        const errorText = await retryResponse.text();
        console.error("Retry failed with response:", errorText);
        throw new Error(`Failed to generate message after retry: ${errorText}`);
      }

      let retryData;
      try {
        retryData = await retryResponse.json();
      } catch (jsonError) {
        console.error("Failed to parse retry response as JSON:", jsonError);
        throw new Error("Invalid JSON response from server");
      }
      const cleanMessage = retryData.message.trim();
      
      return {
        id: `msg-${Date.now()}-${Math.random()}`,
        author: mockAuthors[Math.floor(Math.random() * mockAuthors.length)],
        message: cleanMessage,
        timestamp: new Date(),
        replyingTo: shouldReply && lastAuthor ? lastAuthor : undefined,
        fromOpenAI: true,
      };
    } catch (retryError) {
      console.error("Retry also failed:", retryError);
      throw retryError; // Don't fallback - user wants all OpenAI
    }
  }
}

// Removed unused fallback function - all messages now come from OpenAI
// function generateRandomMessageFallback(lastAuthor: string | null, lastMessage: string | null): ChatMessage {
//   const shouldReply = lastAuthor && Math.random() > 0.8; // 20% chance to match OpenAI behavior
//   
//   if (shouldReply && lastAuthor) {
//     const template = messageTemplates.reply[Math.floor(Math.random() * messageTemplates.reply.length)];
//     return {
//       id: `msg-${Date.now()}-${Math.random()}`,
//       author: mockAuthors[Math.floor(Math.random() * mockAuthors.length)],
//       message: template,
//       timestamp: new Date(),
//       replyingTo: lastAuthor,
//     };
//   } else {
//     const template = messageTemplates.announcement[Math.floor(Math.random() * messageTemplates.announcement.length)];
//     const prototype = mockPrototypes[Math.floor(Math.random() * mockPrototypes.length)];
//     const message = template.replace("{prototype}", prototype);
//     
//     return {
//       id: `msg-${Date.now()}-${Math.random()}`,
//       author: mockAuthors[Math.floor(Math.random() * mockAuthors.length)],
//       message,
//       timestamp: new Date(),
//     };
//   }
// }

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "just now";
  if (diffMins === 1) return "1 min ago";
  if (diffMins < 60) return `${diffMins} mins ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return "1 hour ago";
  if (diffHours < 24) return `${diffHours} hours ago`;
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function getInitials(name: string): string {
  return name.charAt(0).toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-teal-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function ActivityChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingAuthor, setTypingAuthor] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const addedMessagesCountRef = useRef(0);
  const initialMessagesGeneratedRef = useRef(false);

  const scrollToBottom = (instant = false) => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      if (isNearBottom || instant) {
        if (instant) {
          container.scrollTop = container.scrollHeight;
        } else {
          container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        }
      }
    }
  };

  // Generate initial 3 messages on mount
  useEffect(() => {
    if (initialMessagesGeneratedRef.current) return;
    
    const generateInitialMessages = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching initial messages from OpenAI...");
        const response = await fetch("/api/generate-initial-thread", {
          method: "POST",
        });
        
        console.log("Response status:", response.status, response.ok);

        if (response.ok) {
          let data;
          try {
            const text = await response.text();
            console.log("Response text:", text.substring(0, 500));
            data = JSON.parse(text);
          } catch (parseError) {
            console.error("Failed to parse response as JSON:", parseError);
            throw new Error("Server returned invalid JSON response");
          }
          console.log("Response data:", data);
          
          if (!data.messages || !Array.isArray(data.messages)) {
            console.error("Invalid response format:", data);
            throw new Error(`Invalid response format: expected messages array`);
          }
          
          const now = Date.now();
          const initialMessages: ChatMessage[] = data.messages.map((msg: { author: string; message: string; replyingTo?: string }, index: number) => ({
            id: `initial-${index + 1}`,
            author: msg.author,
            message: msg.message,
            timestamp: new Date(now - (3 - index) * 120000), // Spread over 6 minutes
            replyingTo: msg.replyingTo,
            fromOpenAI: true,
          }));
          setMessages(initialMessages);
          initialMessagesGeneratedRef.current = true;
        } else {
          // Get error details from response
          let errorData = {};
          try {
            const text = await response.text();
            console.log("Error response text:", text);
            errorData = JSON.parse(text);
          } catch (parseError) {
            console.error("Failed to parse error response as JSON:", parseError);
            errorData = { error: `HTTP ${response.status}`, details: "Invalid JSON response from server" };
          }
          console.error("API error response:", { status: response.status, errorData });
          
          // Retry once if OpenAI fails
          try {
            console.log("Retrying API call...");
            const retryResponse = await fetch("/api/generate-initial-thread", {
              method: "POST",
            });
            if (retryResponse.ok) {
              let retryData;
              try {
                retryData = await retryResponse.json();
              } catch (jsonError) {
                console.error("Failed to parse retry response as JSON:", jsonError);
                throw new Error("Invalid JSON response from server");
              }
              const now = Date.now();
              const initialMessages: ChatMessage[] = retryData.messages.map((msg: { author: string; message: string; replyingTo?: string }, index: number) => ({
                id: `initial-${index + 1}`,
                author: msg.author,
                message: msg.message,
                timestamp: new Date(now - (3 - index) * 120000),
                replyingTo: msg.replyingTo,
                fromOpenAI: true,
              }));
              setMessages(initialMessages);
              initialMessagesGeneratedRef.current = true;
              return; // Success, exit early
            } else {
              const retryErrorData = await retryResponse.json().catch(() => ({}));
              console.error("Retry also failed:", { status: retryResponse.status, retryErrorData });
              throw new Error(retryErrorData.details || retryErrorData.error || `HTTP ${retryResponse.status}`);
            }
          } catch (retryError) {
            console.error("Retry failed, showing error state:", retryError);
            const errorMessage = retryError instanceof Error ? retryError.message : "Unknown error";
            // Show error state instead of fallback
            setMessages([{
              id: "error",
              author: "System",
              message: `Unable to generate messages: ${errorMessage}. Please check your OpenAI API key configuration and restart the dev server.`,
              timestamp: new Date(),
              fromOpenAI: false,
            }]);
            initialMessagesGeneratedRef.current = true;
          }
        }
      } catch (error) {
        console.error("Error generating initial messages:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        // Show error state with details
        setMessages([{
          id: "error",
          author: "System",
          message: `Unable to generate messages: ${errorMessage}. Please check your OpenAI API key configuration and restart the dev server.`,
          timestamp: new Date(),
          fromOpenAI: false,
        }]);
        initialMessagesGeneratedRef.current = true;
      } finally {
        setIsLoading(false);
      }
    };

    generateInitialMessages();
  }, []);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      scrollToBottom(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, [messages, isTyping]);

  useEffect(() => {
    // Only add 2 more messages total (starting with 3 initial messages)
    const maxAddedMessages = 2;
    
    // Don't start generating until initial messages are loaded
    if (isLoading || !initialMessagesGeneratedRef.current) {
      return;
    }
    
    if (addedMessagesCountRef.current >= maxAddedMessages) {
      return;
    }
    
    // Slower new messages: 8-15 seconds between messages
    const scheduleNextMessage = () => {
      if (addedMessagesCountRef.current >= maxAddedMessages) {
        return;
      }
      
      const delay = 8000 + Math.random() * 7000; // 8-15 seconds
      
      typingTimeoutRef.current = setTimeout(() => {
        // Capture current messages state
        setMessages((currentMessages) => {
          const lastMessage = currentMessages[currentMessages.length - 1];
          const author = mockAuthors[Math.floor(Math.random() * mockAuthors.length)];
          setTypingAuthor(author);
          setIsTyping(true);
          
          // Typing duration: 2-4 seconds
          const typingDuration = 2000 + Math.random() * 2000;
          
          // Use setTimeout for async operation
          setTimeout(async () => {
            if (addedMessagesCountRef.current >= maxAddedMessages) {
              setIsTyping(false);
              setTypingAuthor(null);
              return;
            }
            
            try {
              // All messages must come from OpenAI
              const newMessage = await generateMessageWithOpenAI(
                lastMessage?.author || null,
                lastMessage?.message || null,
                currentMessages
              );
              
              setMessages((prev) => [...prev, newMessage]);
              addedMessagesCountRef.current += 1;
              setIsTyping(false);
              setTypingAuthor(null);
              
              if (addedMessagesCountRef.current < maxAddedMessages) {
                scheduleNextMessage();
              }
            } catch (error) {
              console.error("Error generating message:", error);
              // Don't add fallback message - user wants all OpenAI
              // Just stop trying and show error in console
              setIsTyping(false);
              setTypingAuthor(null);
              // Optionally add an error message to the chat
              setMessages((prev) => [...prev, {
                id: `error-${Date.now()}`,
                author: "System",
                message: "Failed to generate new message. Check console for details.",
                timestamp: new Date(),
                fromOpenAI: false,
              }]);
            }
          }, typingDuration);
          
          return currentMessages; // Return unchanged
        });
      }, delay);
    };

    scheduleNextMessage();

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
      {/* Chat header */}
      <div className="px-5 py-4 border-b border-neutral-200 bg-neutral-50 flex-shrink-0">
        <h3 className="text-base font-semibold text-neutral-900">Community Activity</h3>
      </div>

      {/* Messages container */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-5 pt-5 pb-3">
        {isLoading && messages.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <div className="text-sm text-neutral-500">Generating conversation...</div>
          </div>
        )}
        {messages.map((msg, index) => {
          const prevMsg = index > 0 ? messages[index - 1] : null;
          const showAvatar = !prevMsg || prevMsg.author !== msg.author || 
            (msg.timestamp.getTime() - prevMsg.timestamp.getTime()) > 300000; // 5 min gap
          
          return (
            <div key={msg.id} className={`flex gap-3 mb-4 ${showAvatar ? "mt-2" : "mt-1"}`}>
              {/* Avatar - only show if different author or time gap */}
              {showAvatar ? (
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getAvatarColor(msg.author)} text-white flex items-center justify-center text-sm font-semibold`}>
                  {getInitials(msg.author)}
                </div>
              ) : (
                <div className="flex-shrink-0 w-10" />
              )}
              
              {/* Message content */}
              <div className="flex-1 min-w-0">
                {showAvatar && (
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-base font-semibold text-neutral-900">{msg.author}</span>
                    {msg.fromOpenAI && (
                      <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">[openai]</span>
                    )}
                    <span className="text-xs text-neutral-500">{formatTime(msg.timestamp)}</span>
                  </div>
                )}
                {!showAvatar && msg.fromOpenAI && (
                  <div className="mb-1">
                    <span className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">[openai]</span>
                  </div>
                )}
                {msg.replyingTo && (
                  <div className="text-xs text-neutral-500 mb-1 italic">
                    Replying to {msg.replyingTo}
                  </div>
                )}
                <div className="bg-neutral-50 rounded-lg px-4 py-2.5 border border-neutral-200/50">
                  <p className="text-base text-neutral-800 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && typingAuthor && (
          <div className="flex gap-3 mb-4 mt-2">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getAvatarColor(typingAuthor)} text-white flex items-center justify-center text-sm font-semibold`}>
              {getInitials(typingAuthor)}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-base font-semibold text-neutral-900">{typingAuthor}</span>
                <span className="text-xs text-neutral-500">typing...</span>
              </div>
              <div className="bg-neutral-50 rounded-lg px-4 py-2.5 border border-neutral-200/50 inline-block">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-1" />
      </div>
    </div>
  );
}
