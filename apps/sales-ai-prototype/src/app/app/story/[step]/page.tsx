import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { slides, TOTAL_SLIDES } from "@/walkthrough/data/slides";
import { StoryStepView } from "../StoryStepView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ step: string }>;
}): Promise<Metadata> {
  const { step } = await params;
  const num = parseInt(step, 10);
  const info = slides.find((s) => s.number === num);
  return {
    title: info ? info.title : "Story",
  };
}

export function generateStaticParams() {
  return Array.from({ length: TOTAL_SLIDES }, (_, i) => ({
    step: String(i + 1),
  }));
}

export default async function StoryStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const num = parseInt(step, 10);

  if (isNaN(num) || num < 1 || num > TOTAL_SLIDES) {
    notFound();
  }

  return <StoryStepView step={num} />;
}
