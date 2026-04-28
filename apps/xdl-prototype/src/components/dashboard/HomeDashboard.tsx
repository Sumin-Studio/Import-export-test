"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Bell, Calendar, CheckCircle2, AlertTriangle, FileText, PieChart as PieChartIcon, BarChart3, Clock, CircleDollarSign, Wifi, Briefcase, Building2, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_CLIENTS } from "@/lib/data-store";
import { getDashboardNotifications } from "@/lib/dashboard-notifications";
import { buildClientsUrl } from "@/lib/clients-route";
import {
  ReadinessDonutChart,
  DeadlinesByWeekChart,
  TeamWorkloadBarChart,
  ServiceLineChart,
  TimeSummaryBarChart,
  BillableHoursDonut,
} from "@/components/dashboard/DashboardCharts";

const notifications = getDashboardNotifications(MOCK_CLIENTS);

/** XPH Homepage–style widget card (Figma XPH-Homepage). Header: icon + title + optional badge; content area. XDL tokens throughout. */
function WidgetCard({
  id,
  title,
  icon: Icon,
  iconClassName,
  badge,
  children,
  className,
  "aria-labelledby": ariaLabelledBy,
}: {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "rounded-large border border-border-soft bg-background-primary overflow-hidden flex flex-col",
        "shadow-[var(--shadow-elevation-lift)]",
        className
      )}
      aria-labelledby={ariaLabelledBy ?? `${id}-heading`}
    >
      <div
        className="flex items-center gap-2.5 border-b border-border-subtle bg-background-primary"
        style={{ padding: "var(--size-spacing-12) var(--size-spacing-20)" }}
      >
        <Icon className={cn("size-5 shrink-0 text-text-muted", iconClassName)} aria-hidden />
        <h2 id={ariaLabelledBy ?? `${id}-heading`} className="text-body-standard-semibold text-text-default flex-1 min-w-0 truncate">
          {title}
        </h2>
        {badge != null && <span className="shrink-0">{badge}</span>}
      </div>
      <div className="flex-1 min-h-0 flex flex-col">
        {children}
      </div>
    </section>
  );
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

function getWeekLabel(offset: number): string {
  const start = addDays(TODAY, offset * 7);
  const end = addDays(start, 6);
  return offset === 0 ? "This week" : offset === 1 ? "Next week" : `Week +${offset}`;
}

const SERVICE_LINE_LABELS: Record<string, string> = {
  "1099": "1099",
  "1040": "1040",
  "Bookkeeping": "Books",
  "Sales Tax": "Sales tax",
  "Payroll": "Payroll",
  "Audit": "Audit",
  "Advisory": "Advisory",
};

export function HomeDashboard() {
  const upcomingDeadlines = MOCK_CLIENTS.filter((c) => {
    const t = c.deadline.getTime();
    const weekEnd = addDays(TODAY, 7).getTime();
    return t >= TODAY.getTime() && t <= weekEnd && c.readinessTier !== "ready";
  }).length;

  const readyCount = MOCK_CLIENTS.filter((c) => c.readinessTier === "ready").length;
  const actionRequiredCount = MOCK_CLIENTS.filter((c) => c.readinessTier === "action_required").length;
  const blockedCount = MOCK_CLIENTS.filter((c) => c.readinessTier === "blocked").length;
  const incompleteCount = MOCK_CLIENTS.filter((c) => c.readinessTier !== "ready").length;

  const overdueCount = MOCK_CLIENTS.filter((c) => c.deadline.getTime() < TODAY.getTime() && c.readinessTier !== "ready").length;

  const partners = Array.from(new Set(MOCK_CLIENTS.map((c) => c.partnerName)));
  const workload = partners.map((name) => {
    const assigned = MOCK_CLIENTS.filter((c) => c.partnerName === name);
    const incomplete = assigned.filter((c) => c.readinessTier !== "ready").length;
    return { name, total: assigned.length, incomplete, complete: assigned.length - incomplete };
  }).sort((a, b) => b.incomplete - a.incomplete);

  const readinessChartData = useMemo(
    () => [
      { name: "Ready", value: readyCount, tier: "ready" as const },
      { name: "Action required", value: actionRequiredCount, tier: "action_required" as const },
      { name: "Blocked", value: blockedCount, tier: "blocked" as const },
    ].filter((d) => d.value > 0),
    [readyCount, actionRequiredCount, blockedCount]
  );

  const deadlinesByWeekData = useMemo(() => {
    const weeks = [0, 1, 2, 3];
    return weeks.map((offset) => {
      const weekStart = addDays(TODAY, offset * 7);
      const weekEnd = addDays(weekStart, 7);
      const count = MOCK_CLIENTS.filter((c) => {
        const t = c.deadline.getTime();
        return t >= weekStart.getTime() && t < weekEnd.getTime() && c.readinessTier !== "ready";
      }).length;
      return {
        week: getWeekLabel(offset),
        fullLabel: `${getWeekLabel(offset)} (${weekStart.toLocaleDateString("en-US", { month: "short" })} ${weekStart.getDate()} – ${weekEnd.toLocaleDateString("en-US", { month: "short" })} ${weekEnd.getDate()})`,
        count,
      };
    });
  }, []);

  const workloadChartData = useMemo(
    () => workload.slice(0, 6).map((w) => ({ name: w.name.split(" ")[0], complete: w.complete, incomplete: w.incomplete })),
    [workload]
  );

  const serviceLineData = useMemo(() => {
    const byService: Record<string, { total: number; incomplete: number }> = {};
    MOCK_CLIENTS.forEach((c) => {
      c.services.forEach((s) => {
        const key = s in SERVICE_LINE_LABELS ? s : s;
        if (!byService[key]) byService[key] = { total: 0, incomplete: 0 };
        byService[key].total += 1;
        if (c.readinessTier !== "ready") byService[key].incomplete += 1;
      });
    });
    return Object.entries(byService)
      .map(([service, { total, incomplete }]) => ({
        service: SERVICE_LINE_LABELS[service] ?? service,
        count: total,
        incomplete,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, []);

  // Your overview widgets – mock data
  const timeSummaryData = useMemo(
    () => [
      { day: "Mon", billable: 7, nonBillable: 1, capacity: 2 },
      { day: "Tue", billable: 8, nonBillable: 0, capacity: 2 },
      { day: "Wed", billable: 0, nonBillable: 0, capacity: 10 },
      { day: "Thu", billable: 0, nonBillable: 0, capacity: 10 },
      { day: "Fri", billable: 0, nonBillable: 0, capacity: 10 },
    ],
    []
  );
  const bankFeedAlerts = useMemo(
    () => [
      { id: "1", title: "Credential errors", subtitle: "Major – 3 clients", status: "major" as const },
      { id: "2", title: "MasterCard (Yodlee)", subtitle: "Major – 13 clients", status: "major" as const },
      { id: "3", title: "Wise", subtitle: "Planned – 8 clients", status: "planned" as const },
      { id: "4", title: "HSBC", subtitle: "Resolved – 18 clients", status: "resolved" as const },
      { id: "5", title: "Eastern Financial", subtitle: "Resolved – 7 clients", status: "resolved" as const },
    ],
    []
  );
  const jobsData = useMemo(
    () => [
      { id: "1", job: "J012 – Advisory Services", client: "Kohler Group", status: "To be invoiced", budget: "89%", due: "30 Aug", overdue: true },
      { id: "2", job: "J013 – Bookkeeping", client: "Lueilwitz - Abernathy", status: "In progress", budget: "89%", due: "30 Aug", overdue: true },
      { id: "3", job: "J014 – Tax", client: "Dicki Inc", status: "In progress", budget: "45%", due: "5 Sep", overdue: false },
      { id: "4", job: "J015 – Audit", client: "Marks LLC", status: "For review", budget: "100%", due: "12 Sep", overdue: false },
      { id: "5", job: "J016 – Payroll", client: "Smitham Corp", status: "Planned", budget: "0%", due: "20 Sep", overdue: false },
    ],
    []
  );
  const organisationsData = useMemo(
    () => [
      { id: "1", name: "Cheers", lastViewedByMe: "3 minutes ago", lastViewed: "Ricardo Diaz – 2 minutes ago", subscription: "Ignite" },
      { id: "2", name: "Dunder Mifflin", lastViewedByMe: "13 minutes ago", lastViewed: "You – 13 minutes ago", subscription: "Grow" },
      { id: "3", name: "Wonka Industries", lastViewedByMe: "1 hour ago", lastViewed: "You – 1 hour ago", subscription: "Established" },
      { id: "4", name: "Stark Industries", lastViewedByMe: "2 hours ago", lastViewed: "Sarah Chen – 45 min ago", subscription: "Ignite" },
    ],
    []
  );
  const bankReconData = useMemo(
    () => [
      { id: "1", client: "Erin Predovic", unreconciled: 86, oldest: "18 May 2025" },
      { id: "2", client: "Borer - Smitham", unreconciled: 71, oldest: "21 Apr 2025" },
      { id: "3", client: "Hector Hamill", unreconciled: 0, oldest: "—" },
      { id: "4", client: "Apex Corp", unreconciled: 12, oldest: "2 Mar 2025" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-background-secondary">
      {/* XPH Homepage hero: greeting (XDL typography) */}
      <div
        className="min-h-[52px] flex items-center border-b border-border-soft bg-background-primary"
        style={{ paddingLeft: "var(--size-spacing-20)", paddingRight: "var(--size-spacing-20)" }}
      >
        <h1 className="text-heading-small-bold text-text-default">
          Good morning, John
        </h1>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        style={{ padding: "var(--size-spacing-20)", gap: "var(--size-spacing-20)" }}
      >
        {/* Notifications */}
        <WidgetCard
          id="notifications"
          title="Notifications"
          icon={Bell}
          badge={
            notifications.length > 0 ? (
              <span className="rounded-full bg-[var(--color-action-default)] text-[var(--color-text-inverse)] text-label-small-semibold px-2 py-0.5">
                {notifications.length}
              </span>
            ) : undefined
          }
        >
          <div className="flex-1 overflow-y-auto min-h-0">
            {notifications.length === 0 ? (
              <p className="text-body-small-regular text-text-muted" style={{ padding: "var(--size-spacing-20)" }}>
                No issues requiring attention.
              </p>
            ) : (
              <ul className="divide-y divide-border-subtle">
                {notifications.map((n) => (
                  <li key={n.id}>
                    <Link
                      href={n.href}
                      className={cn(
                        "block text-left transition-colors hover:bg-background-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-action-focus)]",
                        n.urgency === "high" && "border-l-2 border-l-[var(--color-sentiment-negative-foreground)]"
                      )}
                      style={{ padding: "var(--size-spacing-12) var(--size-spacing-20)" }}
                    >
                      <span className="text-body-small-semibold text-text-default block">
                        {n.title}
                      </span>
                      {n.subtitle && (
                        <span className="text-body-small-regular text-text-muted block mt-0.5">
                          {n.subtitle}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </WidgetCard>

        {/* Readiness overview – donut */}
        <WidgetCard id="readiness-chart" title="Readiness overview" icon={PieChartIcon}>
          <div style={{ padding: "var(--size-spacing-16)" }}>
            {readinessChartData.length > 0 ? (
              <>
                <ReadinessDonutChart data={readinessChartData} />
                <div className="flex flex-wrap justify-center gap-4 px-2 pb-2">
                  {readinessChartData.map((d) => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <span
                        className="size-2.5 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            d.tier === "ready"
                              ? "var(--color-sentiment-positive-foreground)"
                              : d.tier === "blocked"
                                ? "var(--color-sentiment-negative-foreground)"
                                : "var(--color-sentiment-warning-foreground)",
                        }}
                        aria-hidden
                      />
                      <span className="text-label-small-regular text-text-muted">{d.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="py-8 text-center text-body-small-regular text-text-muted">No data</p>
            )}
          </div>
        </WidgetCard>

        {/* Deadlines pipeline */}
        <WidgetCard id="upcoming" title="Deadlines pipeline" icon={Calendar}>
          <div style={{ padding: "var(--size-spacing-16)" }}>
            <DeadlinesByWeekChart data={deadlinesByWeekData} />
            <div className="pt-2">
              <Link
                href={buildClientsUrl({ view: "incomplete" })}
                className="inline-flex items-center gap-1.5 text-body-small-semibold text-[var(--color-action-default)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-focus)] rounded-small"
              >
                View all clients
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </WidgetCard>

        {/* Client readiness – stat blocks */}
        <WidgetCard id="readiness" title="Client readiness" icon={CheckCircle2}>
          <div className="flex" style={{ padding: "var(--size-spacing-20)", gap: "var(--size-spacing-20)" }}>
            <div className="flex-1 min-w-0">
              <p className="text-data-super-medium tabular-nums text-[var(--color-sentiment-positive-foreground)]">
                {readyCount}
              </p>
              <p className="text-body-small-regular text-text-muted mt-0.5">Ready</p>
              <Link
                href={buildClientsUrl({ view: "ready" })}
                className="text-label-small-semibold text-[var(--color-action-default)] hover:underline mt-1.5 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-focus)] rounded-small"
              >
                View
              </Link>
            </div>
            <div className="w-px bg-border-subtle shrink-0" aria-hidden />
            <div className="flex-1 min-w-0">
              <p className="text-data-super-medium tabular-nums text-[var(--color-sentiment-warning-foreground)]">
                {incompleteCount}
              </p>
              <p className="text-body-small-regular text-text-muted mt-0.5">Incomplete</p>
              <Link
                href={buildClientsUrl({ view: "incomplete" })}
                className="text-label-small-semibold text-[var(--color-action-default)] hover:underline mt-1.5 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-focus)] rounded-small"
              >
                View
              </Link>
            </div>
          </div>
        </WidgetCard>

        {/* Overdue */}
        <WidgetCard
          id="overdue"
          title="Overdue"
          icon={AlertTriangle}
          iconClassName="text-[var(--color-sentiment-negative-foreground)]"
        >
          <div style={{ padding: "var(--size-spacing-20)" }}>
            <p className="text-data-large-bold tabular-nums text-[var(--color-sentiment-negative-foreground)]">
              {overdueCount}
            </p>
            <p className="text-body-small-regular text-text-muted mt-1">
              clients past internal due date
            </p>
            <Link
              href={buildClientsUrl({ view: "incomplete" })}
              className="mt-4 inline-flex items-center gap-1.5 text-body-small-semibold text-[var(--color-action-default)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-focus)] rounded-small"
            >
              Review
              <span aria-hidden>→</span>
            </Link>
          </div>
        </WidgetCard>

        {/* Billable hours – 1 col so row 2 is full (Client | Overdue | Billable) */}
        <WidgetCard id="billable-hours" title="Billable hours · This week" icon={CircleDollarSign}>
          <div style={{ padding: "var(--size-spacing-20)" }}>
            <BillableHoursDonut enteredHours={7} expectedHours={6} />
            <Link href="#" className="mt-4 inline-flex items-center h-8 px-4 rounded-full border border-border-subtle bg-background-primary text-button-small-medium text-[var(--color-action-default)] hover:bg-background-secondary">
              Enter time
            </Link>
          </div>
        </WidgetCard>

        {/* Team workload – full width so no hole */}
        <WidgetCard id="workload" title="Team workload" icon={BarChart3} className="md:col-span-2 xl:col-span-3">
          <div style={{ padding: "var(--size-spacing-16)" }}>
            <TeamWorkloadBarChart data={workloadChartData} />
            <div className="pt-3 flex flex-wrap gap-3">
              {workload.slice(0, 4).map((w) => (
                <Link
                  key={w.name}
                  href={buildClientsUrl({ partner: w.name, view: "incomplete" })}
                  className="text-label-small-semibold text-[var(--color-action-default)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-focus)] rounded-small"
                >
                  {w.name}
                </Link>
              ))}
            </div>
          </div>
        </WidgetCard>

        {/* By service line – full width so no hole */}
        <WidgetCard id="service-line" title="By service line" icon={FileText} className="md:col-span-2 xl:col-span-3">
          <div style={{ padding: "var(--size-spacing-16)" }}>
            {serviceLineData.length > 0 ? (
              <>
                <ServiceLineChart data={serviceLineData} />
                <div className="pt-3 flex flex-wrap gap-3">
                  <Link href={buildClientsUrl({ mode: "tax", view: "incomplete" })} className="text-label-small-semibold text-[var(--color-action-default)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-focus)] rounded-small">
                    1099
                  </Link>
                  <Link href={buildClientsUrl({ mode: "bookkeeping", view: "incomplete" })} className="text-label-small-semibold text-[var(--color-action-default)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-focus)] rounded-small">
                    Books
                  </Link>
                  <Link href={buildClientsUrl({ mode: "sales_tax", view: "incomplete" })} className="text-label-small-semibold text-[var(--color-action-default)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-focus)] rounded-small">
                    Sales tax
                  </Link>
                </div>
              </>
            ) : (
              <p className="py-8 text-center text-body-small-regular text-text-muted">No data</p>
            )}
          </div>
        </WidgetCard>

        {/* Your overview widgets */}
        <WidgetCard id="time-summary" title="Time summary" icon={Clock} className="md:col-span-2 xl:col-span-2">
          <div style={{ padding: "var(--size-spacing-16)" }}>
            <TimeSummaryBarChart data={timeSummaryData} />
            <div className="pt-3 flex flex-wrap gap-2">
              <Link href="#" className="inline-flex items-center h-8 px-4 rounded-full border border-border-subtle bg-background-primary text-button-small-medium text-[var(--color-action-default)] hover:bg-background-secondary">
                View timesheet
              </Link>
              <Link href="#" className="inline-flex items-center h-8 px-4 rounded-full border border-border-subtle bg-background-primary text-button-small-medium text-[var(--color-action-default)] hover:bg-background-secondary">
                Enter time
              </Link>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard id="bank-feed-alerts" title="Bank feed alerts" icon={Wifi}>
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex gap-4 border-b border-border-subtle" style={{ padding: "var(--size-spacing-12) var(--size-spacing-20)" }}>
              <div>
                <p className="text-data-super-regular tabular-nums text-text-muted">2</p>
                <p className="text-body-small-regular text-[var(--color-sentiment-negative-foreground)]">Major disruptions</p>
              </div>
              <div>
                <p className="text-data-super-regular tabular-nums text-text-muted">1</p>
                <p className="text-body-small-regular text-text-muted">Upcoming planned outages</p>
              </div>
            </div>
            <ul className="divide-y divide-border-subtle flex-1 overflow-y-auto min-h-0">
              {bankFeedAlerts.map((a) => (
                <li key={a.id}>
                  <Link href="#" className="flex items-center justify-between gap-2 text-left py-3 hover:bg-background-secondary" style={{ paddingLeft: "var(--size-spacing-20)", paddingRight: "var(--size-spacing-20)" }}>
                    <div>
                      <span className="text-body-small-semibold text-text-default block">{a.title}</span>
                      <span className="text-body-small-regular text-text-muted block">{a.subtitle}</span>
                    </div>
                    <span className="text-text-muted shrink-0" aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-border-subtle" style={{ padding: "var(--size-spacing-12) var(--size-spacing-20)" }}>
              <Link href="#" className="inline-flex items-center h-8 px-4 rounded-full border border-border-subtle bg-background-primary text-button-small-medium text-[var(--color-action-default)] hover:bg-background-secondary">
                View all disruptions
              </Link>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard id="jobs" title="Jobs" icon={Briefcase} className="xl:col-span-2">
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex gap-4 border-b border-border-subtle" style={{ padding: "var(--size-spacing-12) var(--size-spacing-20)" }}>
              <div>
                <p className="text-data-super-regular tabular-nums text-text-muted">12</p>
                <p className="text-body-small-regular text-text-muted">Due this week</p>
              </div>
              <div>
                <p className="text-data-super-regular tabular-nums text-[var(--color-sentiment-negative-foreground)]">2</p>
                <p className="text-body-small-regular text-[var(--color-sentiment-negative-foreground)]">Overdue</p>
              </div>
            </div>
            <div className="flex-1 overflow-x-auto min-h-0">
              <table className="w-full text-body-small-regular" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr className="border-b border-border-subtle text-left text-label-small-regular text-text-muted">
                    <th className="py-2 pr-2 font-medium" style={{ paddingLeft: "var(--size-spacing-20)" }}>Job</th>
                    <th className="py-2 pr-2 font-medium">Client</th>
                    <th className="py-2 pr-2 font-medium">Status</th>
                    <th className="py-2 pr-2 font-medium">Time budget</th>
                    <th className="py-2 pr-2 font-medium" style={{ paddingRight: "var(--size-spacing-20)" }}>Due</th>
                  </tr>
                </thead>
                <tbody>
                  {jobsData.map((j) => (
                    <tr key={j.id} className="border-b border-border-subtle">
                      <td className="py-2 pr-2 text-text-default" style={{ paddingLeft: "var(--size-spacing-20)" }}>{j.job}</td>
                      <td className="py-2 pr-2 text-text-muted">{j.client}</td>
                      <td className="py-2 pr-2 text-text-muted">{j.status}</td>
                      <td className="py-2 pr-2 text-text-muted">{j.budget}</td>
                      <td className={cn("py-2 pr-2 tabular-nums", j.overdue && "text-[var(--color-sentiment-negative-foreground)]")} style={{ paddingRight: "var(--size-spacing-20)" }}>{j.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2 border-t border-border-subtle" style={{ padding: "var(--size-spacing-12) var(--size-spacing-20)" }}>
              <Link href="#" className="inline-flex items-center h-8 px-4 rounded-full border border-border-subtle bg-background-primary text-button-small-medium text-[var(--color-action-default)] hover:bg-background-secondary">
                View jobs
              </Link>
              <Link href="#" className="inline-flex items-center h-8 px-4 rounded-full border border-border-subtle bg-background-primary text-button-small-medium text-[var(--color-action-default)] hover:bg-background-secondary">
                Create job
              </Link>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard id="organisations" title="Organisations" icon={Building2} className="md:col-span-2 xl:col-span-2">
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-x-auto min-h-0">
              <table className="w-full text-body-small-regular" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr className="border-b border-border-subtle text-left text-label-small-regular text-text-muted">
                    <th className="py-2 pr-2 font-medium" style={{ paddingLeft: "var(--size-spacing-20)" }}>Organisation</th>
                    <th className="py-2 pr-2 font-medium">Last viewed by me</th>
                    <th className="py-2 pr-2 font-medium">Last viewed</th>
                    <th className="py-2 pr-2 font-medium" style={{ paddingRight: "var(--size-spacing-20)" }}>Subscription type</th>
                  </tr>
                </thead>
                <tbody>
                  {organisationsData.map((o) => (
                    <tr key={o.id} className="border-b border-border-subtle">
                      <td className="py-2 pr-2 text-[var(--color-action-default)]" style={{ paddingLeft: "var(--size-spacing-20)" }}>
                        <Link href="#" className="hover:underline">{o.name}</Link>
                      </td>
                      <td className="py-2 pr-2 text-text-muted">{o.lastViewedByMe}</td>
                      <td className="py-2 pr-2 text-text-muted">{o.lastViewed}</td>
                      <td className="py-2 pr-2 text-text-muted" style={{ paddingRight: "var(--size-spacing-20)" }}>{o.subscription}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border-subtle" style={{ padding: "var(--size-spacing-12) var(--size-spacing-20)" }}>
              <Link href="#" className="inline-flex items-center h-8 px-4 rounded-full border border-border-subtle bg-background-primary text-button-small-medium text-[var(--color-action-default)] hover:bg-background-secondary">
                View all organisations
              </Link>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard id="bank-recon" title="Bank reconciliation" icon={Wallet}>
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-x-auto min-h-0">
              <table className="w-full text-body-small-regular" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr className="border-b border-border-subtle text-left text-label-small-regular text-text-muted">
                    <th className="py-2 pr-2 font-medium" style={{ paddingLeft: "var(--size-spacing-20)" }}>Client</th>
                    <th className="py-2 pr-2 font-medium">Unreconciled items</th>
                    <th className="py-2 pr-2 font-medium" style={{ paddingRight: "var(--size-spacing-20)" }}>Oldest item</th>
                  </tr>
                </thead>
                <tbody>
                  {bankReconData.map((r) => (
                    <tr key={r.id} className="border-b border-border-subtle">
                      <td className="py-2 pr-2 text-text-default" style={{ paddingLeft: "var(--size-spacing-20)" }}>{r.client}</td>
                      <td className="py-2 pr-2 text-text-muted tabular-nums">{r.unreconciled}</td>
                      <td className="py-2 pr-2 text-text-muted" style={{ paddingRight: "var(--size-spacing-20)" }}>{r.oldest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border-subtle" style={{ padding: "var(--size-spacing-12) var(--size-spacing-20)" }}>
              <Link href="#" className="inline-flex items-center h-8 px-4 rounded-full border border-border-subtle bg-background-primary text-button-small-medium text-[var(--color-action-default)] hover:bg-background-secondary">
                View all
              </Link>
            </div>
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
