import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HomeFullScreenViewer } from "../../HomeFullScreenViewer";
import type { FlatImage } from "../../HomeFullScreenViewer";

export const metadata: Metadata = {
  title: "Storyboard PNGs",
  description: "Bill Payment Planner, Intelligent Bill Approval, Just Pay — original PNG storyboard gallery.",
};

const STORYBOARD_SECTIONS = [
  {
    title: "Bill Pay Planner",
    blurb:
      "We recommend which bills to pay this week; you approve in 3 clicks (or tweak in plan mode). Dashboard / bills view first; optional chat for deeper planning.",
    images: [
      { src: "/Bill Pay Planner-1.png", description: "Inline for simple commands: keep the most common actions in the flow instead of sending people into a chat." },
      { src: "/Bill Pay Planner-2.png", description: "Progressive disclosure: show the essentials first; details on tap when someone wants to go deeper." },
      { src: "/Bill Pay Planner-3.png", description: "Task done — with a hint that we can do it automatically next time (train in the future)." },
      { src: "/Bill Pay Planner-4.png", description: "Intelligence embedded in the bills view: AI snippet and CTA live where the work already happens." },
      { src: "/Bill Pay Planner-5.png", description: "When chat is the right fit: traditional chatbot entry for exploratory or conversational flows." },
    ],
  },
  {
    title: "Intelligent Bill Approval",
    blurb:
      "We flag risk and send approval to the right person in WhatsApp; they tap to approve or open Xero for exceptions. Requester in-product; approver in WhatsApp.",
    images: [
      { src: "/Intelligent Bill Approval-1.png", description: "Bill list with call-out for what needs attention; anomaly alert (e.g. matching bills)." },
      { src: "/Intelligent Bill Approval-2.png", description: "Drill-down: things that don’t look right; related bills with highlighted discrepancy." },
      { src: "/Intelligent Bill Approval-3.png", description: "Approval POV via WhatsApp — approver gets the request with links to Xero." },
    ],
  },
  {
    title: "Just Pay",
    blurb:
      "You say it (in Xero or in your agent); we create the bill and pay. No forms. Can be in-product or in an agent (e.g. ChatGPT); confirmation via WhatsApp.",
    images: [
      { src: "/Just Pay-1.png", description: "How we show up in agents: Opus, Recruitment agent, ChatGPT — person talks to their agent." },
      { src: "/Just Pay-2.png", description: "Ah-ha moment where we magically provide value; agent handles it, user confirms." },
    ],
  },
] as const;

function buildFlatImages(): FlatImage[] {
  const flat: FlatImage[] = [];
  let index = 0;
  for (const section of STORYBOARD_SECTIONS) {
    for (const img of section.images) {
      flat.push({
        index,
        src: img.src,
        description: img.description,
        sectionTitle: section.title,
      });
      index += 1;
    }
  }
  return flat;
}

const CARD_IMAGE_HEIGHT = 240;
const flatImages = buildFlatImages();

export default function StoryboardPngPage() {
  return (
    <>
      <HomeFullScreenViewer flatImages={flatImages} />

      <main className="min-h-screen bg-slate-50 px-4 pb-8 pt-0 md:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="space-y-0">
            {(() => {
              let globalIndex = 0;
              return STORYBOARD_SECTIONS.map((section) => (
                <section
                  key={section.title}
                  className="flex flex-col gap-4 border-t border-slate-200 pt-8 first:border-t-0 first:pt-0 md:flex-row md:items-start md:gap-6"
                >
                  <div className="shrink-0 md:w-56 lg:w-64">
                    <h2 className="text-lg font-semibold text-slate-700">
                      {section.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {section.blurb}
                    </p>
                  </div>
                  <div
                    className="hidden shrink-0 self-stretch w-px bg-slate-200 md:block"
                    aria-hidden
                  />
                  <ul className="flex min-w-0 flex-1 flex-wrap gap-6">
                    {section.images.map(({ src, description }) => {
                      const viewIndex = globalIndex++;
                      return (
                        <li key={src} className="w-72 shrink-0">
                          <Link
                            href={`/app/storyboard-png?view=${viewIndex}`}
                            className="block focus:outline-none focus:ring-2 focus:ring-[#1F68DD] focus:ring-offset-2 rounded"
                          >
                            <figure className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition-shadow hover:shadow-md">
                              <div
                                className="relative flex-shrink-0 bg-slate-100"
                                style={{ height: CARD_IMAGE_HEIGHT }}
                              >
                                <Image
                                  src={encodeURI(src)}
                                  alt={description}
                                  fill
                                  className="object-contain"
                                  sizes="288px"
                                  unoptimized
                                />
                              </div>
                              <figcaption className="border-t border-slate-100 px-3 py-2 text-sm leading-snug text-slate-600">
                                {description}
                              </figcaption>
                            </figure>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ));
            })()}
          </div>
        </div>
      </main>
    </>
  );
}

