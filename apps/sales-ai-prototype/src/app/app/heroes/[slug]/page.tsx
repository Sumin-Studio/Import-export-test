import type { Metadata } from "next";
import React from "react";
import HeroDetailClient from "./HeroDetailClient";

const SLUG_TO_LABEL: Record<string, string> = {
  "auto-pay": "Bill Planner",
  "auto-approval": "Auto approval agent",
  "just-pay": "Just Pay",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const label = SLUG_TO_LABEL[slug];
  return {
    title: label ?? "Hero",
  };
}

export default function HeroDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  return <HeroDetailClient slug={slug} />;
}

