export type ActionType =
  | "addOrganisations"
  | "createOrganisation"
  | "createClient"
  | "createJob"
  | "createQuote"
  | "enterCost";

interface ComponentProps {
  className?: string;
  checkedItems: Record<ActionType, boolean>;
  onToggleCheck: (key: ActionType) => void;
}

const actions: Array<{ value: ActionType; label: string }> = [
  { value: "addOrganisations", label: "Add existing Xero organisations" },
  { value: "createOrganisation", label: "Create Xero organisation" },
  { value: "createClient", label: "Create client" },
  { value: "createJob", label: "Create job" },
  { value: "createQuote", label: "Create quote" },
  { value: "enterCost", label: "Enter cost" },
];

export default function QuickActionsOverflow({
  className = "",
  checkedItems,
  onToggleCheck,
}: ComponentProps) {
  return (
    <div className={className}>
      <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
        Actions
      </h3>
      <nav className="text-[15px]/[24px]">
        {actions.map((action) => (
          <div
            key={action.value}
            className="hover:bg-background-primary flex w-full items-center gap-2 px-5 py-2"
          >
            <input
              type="checkbox"
              id={action.value}
              className="h-4.5 w-4.5 cursor-pointer"
              checked={checkedItems[action.value]}
              onChange={() => onToggleCheck(action.value)}
            />
            <label htmlFor={action.value} className="cursor-pointer">
              {action.label}
            </label>
          </div>
        ))}
      </nav>
    </div>
  );
}

export { actions };
