interface SupplierRow {
  initials: string;
  name: string;
  due: string;
  overdue: string;
  avatarBg: string;
  avatarText: string;
}

/** Avatar fills from product reference; dark initials on muted tiles, ~4px radius squares. */
const SAMPLE: SupplierRow[] = [
  {
    initials: "BB",
    name: "Barry Bananas",
    due: "10,303.20",
    overdue: "10,303.20",
    avatarBg: "bg-[#b6b3e3]",
    avatarText: "text-[#3d3a6b]",
  },
  {
    initials: "TC",
    name: "Tina Chen",
    due: "10,012.00",
    overdue: "10,012.00",
    avatarBg: "bg-[#fbc6d1]",
    avatarText: "text-[#6b2d3d]",
  },
  {
    initials: "GPE",
    name: "Gareth Price (Expenses)",
    due: "8,848.44",
    overdue: "8,848.44",
    avatarBg: "bg-[#f6d38d]",
    avatarText: "text-[#5c4510]",
  },
  {
    initials: "AT",
    name: "Audrey Tan",
    due: "5,428.80",
    overdue: "5,428.80",
    avatarBg: "bg-[#8fbc94]",
    avatarText: "text-[#1e4d2a]",
  },
  {
    initials: "FS",
    name: "Foxglove Studios",
    due: "240.00",
    overdue: "240.00",
    avatarBg: "bg-[#d9b7e1]",
    avatarText: "text-[#5c3d6b]",
  },
  {
    initials: "阿",
    name: "阿布迪阿斯",
    due: "217.20",
    overdue: "217.20",
    avatarBg: "bg-[#b9e7d0]",
    avatarText: "text-[#1f5c40]",
  },
  {
    initials: "B",
    name: "Barnabies",
    due: "168.00",
    overdue: "168.00",
    avatarBg: "bg-[#d9b7e1]",
    avatarText: "text-[#5c3d6b]",
  },
  {
    initials: "BV",
    name: "Banana Vinyl",
    due: "151.20",
    overdue: "151.20",
    avatarBg: "bg-[#e39b9b]",
    avatarText: "text-[#7f1d1d]",
  },
  {
    initials: "JC",
    name: "Joe Caminiti",
    due: "120.00",
    overdue: "120.00",
    avatarBg: "bg-[#f6d38d]",
    avatarText: "text-[#5c4510]",
  },
];

function DueSortIcon() {
  return (
    <svg
      className="ml-0.5 inline-block size-2.5 shrink-0 opacity-50"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6 8L2.5 4.5h7L6 8z" />
    </svg>
  );
}

interface CustomersYouOweMostProps {
  className?: string;
}

export function CustomersYouOweMost({ className = "" }: CustomersYouOweMostProps) {
  return (
    <div
      className={`relative flex h-auto min-h-[520px] w-full min-w-0 flex-col rounded-xl bg-white lg:h-auto lg:min-h-[520px] ${className}`}
    >
      <div className="relative flex items-center justify-between pb-1 pl-6 pr-2 pt-[10px]">
        <h3 className="cursor-pointer text-[17px]/[28px] font-bold hover:underline">
          Customers you owe the most
        </h3>
      </div>
      <div className="relative mt-3 px-6">
        <div className="flex border-b border-background-tertiary pb-1.5 text-[11px]/[14px] font-bold text-content-secondary">
          <span className="flex-1">Customer</span>
          <span className="flex w-24 items-center justify-end text-right">
            Due
            <DueSortIcon />
          </span>
          <span className="w-24 text-right">Overdue</span>
        </div>
        <ul className="text-[13px]/[15px]">
          {SAMPLE.map((row) => (
            <li
              key={row.name}
              className="flex h-10 items-center border-b border-background-tertiary last:border-b-0"
            >
              <span className="flex min-w-0 flex-1 items-center gap-2.5">
                <span
                  className={`flex size-8 flex-none items-center justify-center rounded-[4px] text-[10px] font-[700] leading-none tracking-tight ${row.avatarBg} ${row.avatarText}`}
                  aria-hidden
                >
                  {row.initials}
                </span>
                <button
                  type="button"
                  className="truncate text-left text-[#2b7ab9] hover:underline"
                >
                  {row.name}
                </button>
              </span>
              <span className="w-24 shrink-0 text-right tabular-nums text-content-primary">{row.due}</span>
              <span className="w-24 shrink-0 text-right tabular-nums text-[#b91c1c]">{row.overdue}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative mb-5 ml-6 mr-auto mt-auto flex gap-2 pt-2">
        <button
          className="inline-block w-auto flex-none rounded-[48px] border border-border-primary bg-white px-3 py-[6px] text-[13px]/[16px] font-bold text-brand-primary transition-all duration-200 ease-in-out hover:bg-[#eff1f2]"
          type="button"
        >
          View all
        </button>
      </div>
    </div>
  );
}

export default CustomersYouOweMost;
