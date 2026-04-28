/**
 * Plus mark matching the org switcher “Add new organisation” row (without tile background).
 */
export function OrgSwitcherAddNewIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center ${className}`}
      aria-hidden
    >
      <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
        <rect fill="#003C64" height="12" rx="0.6" width="1.2" x="5.25006" y="0.000106812" />
        <rect fill="#003C64" height="1.2" rx="0.6" width="12" y="5.24994" />
      </svg>
    </span>
  );
}
