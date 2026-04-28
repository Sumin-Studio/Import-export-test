"use client"

import type { ReactNode } from "react"
import { X, Maximize2, Plus, ArrowUp } from "lucide-react"

/* Xero JAX frame — matches Figma "JAX chat desktop" component
   Colors: dark blue #0d47a1, text #000a1e, muted #404756, border #ccced2
   Shadow: 0 8px 16px rgba(0,10,30,0.2) */

function PanelHeader({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#ccced2] bg-white pl-4 pr-3 py-3 shrink-0">
      <h2 className="text-[17px] font-bold text-[#000a1e] leading-7">Just Ask Xero</h2>
      <span className="rounded border border-[rgba(0,10,30,0.5)] px-1 py-0 text-[13px] text-[rgba(0,10,30,0.75)] leading-5">Beta</span>
      <div className="ml-auto flex items-center gap-1">
        <button type="button" className="text-[13px] font-bold text-[#0d47a1] hover:underline px-3 py-1.5">Settings</button>
        <button type="button" className="p-2 rounded-md hover:bg-[#f2f3f4] text-[#000a1e] transition-colors">
          <Maximize2 className="h-4 w-4" />
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className="p-2 rounded-md hover:bg-[#f2f3f4] text-[#000a1e] transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

function ChatInput() {
  return (
    <div className="bg-white pt-3 px-3 pb-3 shrink-0">
      <div className="flex flex-col gap-3 rounded-2xl border border-[#ccced2] bg-white p-2 focus-within:border-[#0d47a1] transition-colors">
        <div className="px-2 pt-1">
          <input className="w-full bg-transparent text-[15px] outline-none placeholder:text-[rgba(0,10,30,0.65)]" placeholder="Enter message" readOnly />
        </div>
        <div className="flex items-center justify-between">
          <button type="button" className="p-2 text-[#000a1e] hover:bg-[#f2f3f4] rounded-md transition-colors"><Plus className="h-5 w-5" /></button>
          <button type="button" className="p-2 text-[#000a1e] hover:bg-[#f2f3f4] rounded-md transition-colors"><ArrowUp className="h-5 w-5" /></button>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-[#404756] leading-4">
        JAX can make mistakes. Outputs are not financial, tax or legal advice.<br />
        <span className="text-[#404756]">Review <button type="button" className="underline">JAX disclaimer</button> | <button type="button" className="underline">JAX beta terms</button></span>
      </p>
    </div>
  )
}

export function JustAskXeroFrame({
  children,
  onClose,
}: {
  children: ReactNode
  onClose?: () => void
}) {
  return (
    <div className="flex h-[calc(100vh-2rem)] w-full max-w-[400px] flex-col bg-white shadow-[0_8px_16px_0_rgba(0,10,30,0.2)] overflow-hidden">
      <PanelHeader onClose={onClose} />
      <div className="flex-1 overflow-y-auto bg-white">
        {children}
      </div>
      <ChatInput />
    </div>
  )
}

export default JustAskXeroFrame
