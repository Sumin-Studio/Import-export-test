"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function KeyboardNav({ prevId, nextId }: { prevId: string | null; nextId: string | null }) {
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" && prevId) {
        router.push(`/concept/${prevId}`)
      } else if (e.key === "ArrowRight" && nextId) {
        router.push(`/concept/${nextId}`)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevId, nextId, router])

  return null
}
