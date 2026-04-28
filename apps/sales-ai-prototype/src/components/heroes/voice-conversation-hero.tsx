"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff } from "lucide-react"

interface Message {
  role: "ai" | "user"
  text: string
  delay: number
}

const conversation: Message[] = [
  { role: "ai", text: "Morning! Quick update — looks like Lumber Cutter Supply sent an invoice for $2,400. Your usual monthly order. Want me to pay that?", delay: 0 },
  { role: "user", text: "Yep, go ahead.", delay: 1500 },
  { role: "ai", text: "Done. Also, Deer & Co says you owe $1,200 for last week's delivery. Want me to set that up for Thursday?", delay: 3000 },
  { role: "user", text: "Yep.", delay: 4500 },
  { role: "ai", text: "Scheduled for Thursday. One more thing — you're getting a bit pressed on cash this week. Want me to hold off on the non-urgent ones?", delay: 6000 },
  { role: "user", text: "Yeah, do that.", delay: 7500 },
  { role: "ai", text: "Done. I've deferred Bayside Club and ABC Furniture to next week — no late fees. You've got $5,200 free for the rest of the week. Have a good one! 👋", delay: 9000 },
]

export function VoiceConversationHero() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  function startConversation() {
    // Reset
    setVisibleCount(0)
    setIsPlaying(true)
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    conversation.forEach((msg, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1)
        if (i === conversation.length - 1) {
          setTimeout(() => setIsPlaying(false), 1000)
        }
      }, msg.delay)
      timeoutsRef.current.push(t)
    })
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleCount])

  // Cleanup
  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout)
  }, [])

  const visibleMessages = conversation.slice(0, visibleCount)

  return (
    <div className="w-[320px] bg-[#1a1a2e] rounded-xl shadow-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0d47a1] to-[#42a5f5] flex items-center justify-center">
            <span className="text-white text-xs font-bold">X</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Xero Agent</p>
            <p className="text-xs text-white/50">Voice assistant</p>
          </div>
          <div className="ml-auto">
            {isPlaying ? (
              <div className="flex items-center gap-1">
                <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" />
                <div className="w-1 h-5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.15s" }} />
                <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
                <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.45s" }} />
              </div>
            ) : (
              <div className="w-2 h-2 rounded-full bg-white/30" />
            )}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="h-[440px] overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {visibleCount === 0 && !isPlaying && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Mic className="h-7 w-7 text-white/30" />
            </div>
            <p className="text-sm text-white/50 max-w-[200px]">
              Tap the mic to hear a morning check-in with your Xero agent
            </p>
          </div>
        )}

        {visibleMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[240px] px-3.5 py-2.5 ${
                msg.role === "user"
                  ? "bg-[#0d47a1] rounded-2xl rounded-br-sm"
                  : "bg-white/10 rounded-2xl rounded-bl-sm"
              }`}
            >
              <p className={`text-sm leading-relaxed ${msg.role === "user" ? "text-white" : "text-white/90"}`}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {visibleCount === conversation.length && !isPlaying && (
          <div className="flex justify-center mt-2">
            <p className="text-xs text-white/30 italic">Conversation complete</p>
          </div>
        )}
      </div>

      {/* Mic button */}
      <div className="px-4 py-4 border-t border-white/10 flex justify-center">
        <button
          type="button"
          onClick={startConversation}
          disabled={isPlaying}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? "bg-red-500/80 scale-110"
              : "bg-white/10 hover:bg-white/20 hover:scale-105"
          }`}
        >
          {isPlaying ? (
            <MicOff className="h-6 w-6 text-white" />
          ) : (
            <Mic className="h-6 w-6 text-white/70" />
          )}
        </button>
      </div>
    </div>
  )
}
