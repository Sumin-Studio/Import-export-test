"use client";

interface DashboardGreetingProps {
  /** When true, shows "Loading..." instead of region-specific last login text */
  isLoading?: boolean;
}

export function DashboardGreeting({
  isLoading = false,
}: DashboardGreetingProps) {
  return (
    <div className="mb-7 overflow-hidden bg-white py-5">
      <div className="mx-auto overflow-x-auto scroll-smooth px-5 lg:overflow-x-visible">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mb-1 flex items-center gap-3.5 md:mb-0">
            <h1 className="text-[21px]/[26px] font-bold md:text-[24px]/[32px]">
              Good morning, Lucy
            </h1>
            <span className="text-content-secondary border-content-secondary cursor-default rounded-[3px] border px-1 text-[13px]/[20px] font-normal">
              Prototype
            </span>
          </div>
          <div className="text-content-secondary text-[13px]/[20px]">
            Last login:{" "}
            {isLoading ? (
              "Loading..."
            ) : (
              <span className="text-brand-primary">
                1 hour ago from New Zealand
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
