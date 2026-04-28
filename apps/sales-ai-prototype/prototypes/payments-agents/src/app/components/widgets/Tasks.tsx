import { Arrow } from "@/app/components/ui/icons";
import { CustomizationOverlay } from "./CustomizationOverlay";
import { getBankAccountData } from "@/app/lib/RegionContent";
import { useRegion } from "@/app/contexts/RegionContext";

interface ComponentProps {
  className?: string;
  isCustomising?: boolean;
}

export function Tasks({
  className = "",
  isCustomising = false,
}: ComponentProps) {
  const { region } = useRegion();
  const bankData = getBankAccountData("everydaySavings", region);

  const taskItems = [
    {
      id: 1,
      count: 20,
      title: "Items to be reconciled",
      subtitle: bankData
        ? `${bankData.accountName} • ${bankData.accountNumber}`
        : "Business Bank • 01-1301-5494812-22",
    },
    {
      id: 2,
      count: 6,
      title: "Overdue Invoices",
      isUrgent: true,
    },
    {
      id: 3,
      count: 3,
      title: "Invoices awaiting approval",
    },
    {
      id: 4,
      count: 2,
      title: "Bills awaiting approval",
    },
    {
      id: 5,
      count: 2,
      title: "Overdue bills",
      isUrgent: true,
    },
  ];

  return (
    <CustomizationOverlay isCustomising={isCustomising}>
      <div
        className={`relative flex h-auto min-h-[251px] overflow-hidden lg:h-[251px] w-[440px] lg:min-w-[440px] flex-col items-start rounded-xl bg-white transition-all duration-100 ease-in-out ${
          isCustomising ? "pointer-events-none" : ""
        } ${className}`}
      >
        <div className="relative flex w-full items-center justify-between overflow-hidden pb-1 pl-6 pr-[10px] pt-4">
          <h3 className="text-[17px]/[28px] font-bold">Tasks</h3>
        </div>
        <ul className="absolute bottom-0 top-[54px] w-full overflow-y-auto">
          {taskItems.map((item) => (
            <li key={item.id}>
              <button
                className={`group relative flex w-full items-center justify-between border-t border-background-tertiary pl-6 pr-4 text-[13px]/[20px] transition-all duration-200 ease-in-out hover:bg-background-secondary ${
                  item.isUrgent
                    ? "before:absolute before:-bottom-px before:-top-px before:left-0 before:w-[3px] before:bg-[#DE0E40]"
                    : ""
                }`}
                type="button"
              >
                <div className="flex py-2">
                  <span className="inline-flex w-8 font-bold">
                    {item.count}
                  </span>
                  <span
                    className={`flex flex-col items-start ${
                      item.subtitle ? "" : "group-hover:underline"
                    }`}
                  >
                    <span className="group-hover:underline">{item.title}</span>
                    {item.subtitle ? (
                      <span className="text-content-secondary group-hover:underline">
                        {item.subtitle}
                      </span>
                    ) : null}
                  </span>
                </div>
                <div className="flex size-8 items-center justify-center py-1">
                  <Arrow className="text-brand-primary group-hover:text-brand-secondary" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </CustomizationOverlay>
  );
}

export default Tasks;
