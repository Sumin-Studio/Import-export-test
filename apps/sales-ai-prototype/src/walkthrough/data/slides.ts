export interface SlideInfo {
  number: number;
  title: string;
  subtitle?: string;
  dark?: boolean;
}

export const TOTAL_SLIDES = 6;

export const slides: SlideInfo[] = [
  {
    number: 1,
    title: "From 99 Concepts to One Direction",
    subtitle:
      "How the team moved from a broad problem space to focused swimlanes, explorations, and a prototype choice.",
  },
  {
    number: 2,
    title: "20 Problems",
    subtitle:
      "The broad pain-point landscape we started with before narrowing focus",
  },
  {
    number: 3,
    title: "Scoring Matrix",
    subtitle:
      "Stack-ranked problems across Severity, Feasibility, and Benefit of AI",
  },
  {
    number: 4,
    title: "3 Swimlanes",
    subtitle:
      "Which gave us 3 strong swimlanes to explore, backed by data",
  },
  {
    number: 5,
    title: "Concept Explorations",
    subtitle: "Compare and rank concepts generated across the three swimlanes",
  },
  {
    number: 6,
    title: "Our 3 Concepts",
    subtitle: "Final recommendation and launch point for the selected prototype",
  },
];
