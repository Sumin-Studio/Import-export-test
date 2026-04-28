import Image from "next/image";
import type { Builder } from "@/lib/builders";

type BuilderHeaderProps = {
  builder: Builder;
};

export function BuilderHeader({ builder }: BuilderHeaderProps) {
  const joinedDate = new Date(builder.joined).toLocaleDateString();

  return (
    <header className="flex flex-col gap-6 rounded-3xl border border-border bg-white px-6 py-10 shadow-sm sm:px-10 lg:px-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex items-center gap-5">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-primary/10">
            {builder.photo ? (
              <Image
                src={builder.photo}
                alt={builder.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-primary">
                {builder.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              {builder.name}
            </h1>
            <p className="text-base text-slate-600">{builder.role}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <div className="rounded-2xl border border-dashed border-border bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Joined
            </p>
            <p className="text-sm font-medium text-slate-800">{joinedDate}</p>
          </div>
          {builder.github ? (
            <a
              href={builder.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              GitHub prototypes
              <span aria-hidden>↗</span>
            </a>
          ) : null}
          {builder.favoritePrototype ? (
            <a
              href={builder.favoritePrototype}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
            >
              Favorite prototype
              <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}

