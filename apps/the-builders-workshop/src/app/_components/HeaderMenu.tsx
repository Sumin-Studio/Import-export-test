"use client";

import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";

export default function HeaderMenu() {
  const { user, isSignedIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  if (!isSignedIn) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          aria-label="Open menu"
          className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-800 hover:bg-gray-700 text-white"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1">
            <span className="block w-5 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </div>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-44 rounded-md bg-white shadow-lg p-2">
            <div className="px-2 py-1 text-xs text-gray-500">
              {user?.email}
            </div>
            <button
              onClick={() => signOut().then(() => window.location.assign("/sign-in"))}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-800"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
