import Link from "next/link";

export type Breadcrumb = {
  label: string;
  href?: string;
};

export default function PageHeader({
  breadcrumbs,
  title,
  badge,
  actions,
}: {
  breadcrumbs: Breadcrumb[];
  title: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[70px] items-center justify-between border-b border-border-secondary bg-white px-6 py-3">
      <div className="flex min-w-0 flex-col justify-center">
        <div className="flex items-center gap-1 text-[12px] text-content-secondary">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label + i} className="flex items-center gap-1">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-action-primary hover:underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {i < breadcrumbs.length - 1 && (
                <span className="text-content-secondary">›</span>
              )}
            </span>
          ))}
          {badge && <span className="ml-2">{badge}</span>}
        </div>
        <div className="truncate text-[20px] font-bold text-content-primary">
          {title}
        </div>
      </div>
      {actions && (
        <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  );
}
