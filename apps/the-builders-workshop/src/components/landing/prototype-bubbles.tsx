"use client";

interface PrototypeBubble {
  title: string;
}

interface PrototypeBubblesProps {
  bubbles?: PrototypeBubble[];
}

// Stub data - ~25 bubbles showing things you can make
const defaultBubbles: PrototypeBubble[] = [
  { title: "Interactive Dashboard" },
  { title: "Data Visualization" },
  { title: "Form Builder" },
  { title: "Task Manager" },
  { title: "Calendar App" },
  { title: "Chat Interface" },
  { title: "E-commerce Store" },
  { title: "Blog Platform" },
  { title: "Portfolio Site" },
  { title: "Weather Widget" },
  { title: "Recipe Finder" },
  { title: "Music Player" },
  { title: "Photo Gallery" },
  { title: "Note Taking App" },
  { title: "Expense Tracker" },
  { title: "Habit Tracker" },
  { title: "Quiz Game" },
  { title: "Timer App" },
  { title: "Color Picker" },
  { title: "Password Generator" },
  { title: "Unit Converter" },
  { title: "Random Quote Generator" },
  { title: "Todo List" },
  { title: "Shopping Cart" },
  { title: "User Profile" },
];

export function PrototypeBubbles({ bubbles = defaultBubbles }: PrototypeBubblesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className="px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-200 transition-colors"
        >
          {bubble.title}
        </div>
      ))}
    </div>
  );
}

