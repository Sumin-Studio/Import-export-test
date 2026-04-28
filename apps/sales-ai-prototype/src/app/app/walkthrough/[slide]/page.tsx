import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { slides, TOTAL_SLIDES } from "@/walkthrough/data/slides";
import CoverSlide from "@/walkthrough/slides/CoverSlide";
import ProblemsSlide from "@/walkthrough/slides/ProblemsSlide";
import ScoringSlide from "@/walkthrough/slides/ScoringSlide";
import SwimlanesOverviewSlide from "@/walkthrough/slides/SwimlanesOverviewSlide";
import ExplorationsSlide from "@/walkthrough/slides/ExplorationsSlide";
import FinalPrototypeSlide from "@/walkthrough/slides/FinalPrototypeSlide";

const slideComponents: Record<number, React.ComponentType> = {
  1: CoverSlide,
  2: ProblemsSlide,
  3: ScoringSlide,
  4: SwimlanesOverviewSlide,
  5: ExplorationsSlide,
  6: FinalPrototypeSlide,
};

export function generateStaticParams() {
  return Array.from({ length: TOTAL_SLIDES }, (_, i) => ({
    slide: String(i + 1),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slide: string }>;
}): Promise<Metadata> {
  const { slide } = await params;
  const num = parseInt(slide, 10);
  const info = slides.find((s) => s.number === num);
  return {
    title: info ? info.title : "Walkthrough",
  };
}

export default async function WalkthroughSlidePage({
  params,
}: {
  params: Promise<{ slide: string }>;
}) {
  const { slide } = await params;
  const num = parseInt(slide, 10);

  if (isNaN(num) || num < 1 || num > TOTAL_SLIDES) {
    notFound();
  }

  const SlideComponent = slideComponents[num];
  if (!SlideComponent) notFound();

  return <SlideComponent />;
}
