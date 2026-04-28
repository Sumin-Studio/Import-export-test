"use client";

import { WalkthroughPathContext } from "@/walkthrough/context/walkthrough-path-context";
import CoverSlide from "@/walkthrough/slides/CoverSlide";
import ProblemsSlide from "@/walkthrough/slides/ProblemsSlide";
import ScoringSlide from "@/walkthrough/slides/ScoringSlide";
import SwimlanesOverviewSlide from "@/walkthrough/slides/SwimlanesOverviewSlide";
import ExplorationsSlide from "@/walkthrough/slides/ExplorationsSlide";
import FinalPrototypeSlide from "@/walkthrough/slides/FinalPrototypeSlide";
import { TOTAL_SLIDES } from "@/walkthrough/data/slides";

const slideComponents: Record<number, React.ComponentType> = {
  1: CoverSlide,
  2: ProblemsSlide,
  3: ScoringSlide,
  4: SwimlanesOverviewSlide,
  5: ExplorationsSlide,
  6: FinalPrototypeSlide,
};

const storyContext = {
  basePath: "/app/story",
  label: "Diya Review",
} as const;

export function StoryStepView({ step }: { step: number }) {
  const SlideComponent = slideComponents[step];
  if (!SlideComponent || step < 1 || step > TOTAL_SLIDES) return null;

  return (
    <WalkthroughPathContext.Provider
      value={{ basePath: storyContext.basePath, label: storyContext.label }}
    >
      <SlideComponent />
    </WalkthroughPathContext.Provider>
  );
}
