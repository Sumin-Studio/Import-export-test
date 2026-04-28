import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/site-layout";
import { BuilderHeader } from "@/components/builders/builder-header";
import { BuilderTimeline } from "@/components/builders/builder-timeline";
import { BuilderSandbox } from "@/components/builders/builder-sandbox";
import {
  getBuilderBySlug,
  getBuilders,
  type Builder,
} from "@/lib/builders";
import type { Metadata } from "next";

type BuilderPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getBuilders().map((builder) => ({ slug: builder.slug }));
}

function buildMetadata(builder: Builder): Metadata {
  return {
    title: `${builder.name} · Builder Profile`,
    description: `${builder.name} is part of The Builders Workshop pilot, exploring AI-assisted design workflows at Xero.`,
    openGraph: {
      title: `${builder.name} · The Builders Workshop`,
      description: builder.notes ?? undefined,
    },
  };
}

export async function generateMetadata({ params }: BuilderPageProps): Promise<Metadata> {
  const { slug } = await params;
  const builder = getBuilderBySlug(slug);
  if (!builder) {
    return {
      title: "Builder not found",
    };
  }

  return buildMetadata(builder);
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const { slug } = await params;
  const builder = getBuilderBySlug(slug);

  if (!builder) {
    notFound();
  }

  return (
    <SiteLayout>
      <div className="space-y-12">
        <BuilderHeader builder={builder} />
        <BuilderTimeline builder={builder} />
        <BuilderSandbox builder={builder} />
      </div>
    </SiteLayout>
  );
}

