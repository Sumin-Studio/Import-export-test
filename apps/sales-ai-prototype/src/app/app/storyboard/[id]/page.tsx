import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getStoryboardBeat,
  getStoryboardBeatIds,
  storyboardBeats,
} from "@/walkthrough/data/storyboard-beats";
import { StoryboardFullScreen } from "../StoryboardFullScreen";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const beat = getStoryboardBeat(id);
  return {
    title: beat ? beat.title : "Storyboard",
  };
}

export function generateStaticParams() {
  return getStoryboardBeatIds().map((id) => ({ id }));
}

export default async function StoryboardBeatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const beat = getStoryboardBeat(id);

  if (!beat) notFound();

  const prevBeat = storyboardBeats.find((b) => b.order === beat.order - 1);
  const nextBeat = storyboardBeats.find((b) => b.order === beat.order + 1);

  return (
    <StoryboardFullScreen
      beat={beat}
      prevBeat={prevBeat ?? null}
      nextBeat={nextBeat ?? null}
      total={storyboardBeats.length}
    />
  );
}
