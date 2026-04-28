import Link from "next/link";
import { Header } from "@/components/nav";
import { mockApps } from "@/lib/mock/app";

export default function MyAppsPage() {
  return (
    <>
      <Header selected="My Apps" />
      <main className="pt-[60px]">
        <div className="mx-auto max-w-[1040px] px-6 py-8">
          <div className="flex items-center justify-between pb-4">
            <h1 className="text-[24px] font-bold text-content-primary">
              My Apps
            </h1>
            <button className="inline-flex h-10 items-center rounded bg-action-primary px-4 text-[14px] font-bold text-white hover:bg-action-secondary">
              New app
            </button>
          </div>
          <div className="rounded-lg border border-border-secondary bg-white">
            {/* Same column template on header + rows so right-aligned cells line up with headers */}
            <div className="grid grid-cols-[minmax(0,1fr)_11rem_7rem] items-center gap-x-4 border-b border-border-secondary px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-content-secondary">
              <div>App</div>
              <div className="text-right tabular-nums">Certification</div>
              <div className="text-right tabular-nums">Connections</div>
            </div>
            {mockApps.map((app) => (
              <Link
                key={app.id}
                href={`/apps/${app.id}`}
                className="grid grid-cols-[minmax(0,1fr)_11rem_7rem] items-center gap-x-4 border-b border-border-secondary px-6 py-4 text-[14px] hover:bg-action-tertiary/30"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded font-bold text-white"
                    style={{ background: app.color }}
                  >
                    {app.initial}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-bold">{app.name}</div>
                    <div className="text-[12px] text-content-secondary">
                      Uncertified
                    </div>
                  </div>
                </div>
                <div className="text-right text-[12px] text-content-secondary tabular-nums">
                  Not submitted
                </div>
                <div className="text-right text-content-secondary tabular-nums">
                  {app.connections} of {app.maxConnections}
                </div>
              </Link>
            ))}
            <div className="px-6 py-3 text-[12px] text-content-secondary">
              Showing apps 1–{mockApps.length} of {mockApps.length}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
