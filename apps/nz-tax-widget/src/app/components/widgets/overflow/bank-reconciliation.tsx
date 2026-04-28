interface ComponentProps {
  selectedFilter: "all" | "selected";
  onFilterChange: (filter: "all" | "selected") => void;
}

export default function BankReconciliationOverflow({
  selectedFilter,
  onFilterChange,
}: ComponentProps) {
  return (
    <div className="flex flex-col overflow-clip">
      <div className="flex flex-col bg-white">
        {/* Filter separator */}
        <div className="px-5 py-2">
          <p className="text-[13px] leading-[20px] font-normal text-[#59606d]">
            Filter
          </p>
        </div>

        {/* All clients */}
        <button
          className="relative flex w-full items-center gap-2 bg-white px-5 py-2 text-left hover:bg-gray-50"
          type="button"
          onClick={() => onFilterChange("all")}
        >
          <div className="flex flex-1 flex-wrap gap-4">
            <div className="flex flex-col justify-center">
              <p
                className={`text-[15px] leading-[24px] whitespace-pre ${
                  selectedFilter === "all" ? "text-[#0078c8]" : "text-[#000a1e]"
                }`}
              >
                All clients
              </p>
            </div>
          </div>
          {selectedFilter === "all" && (
            <div className="absolute inset-y-0 left-0 w-[3px] bg-[#0078c8]" />
          )}
        </button>

        {/* Selected clients */}
        <button
          className="relative flex w-full items-center gap-2 bg-white px-5 py-2 text-left hover:bg-gray-50"
          type="button"
          onClick={() => onFilterChange("selected")}
        >
          <div className="flex flex-1 flex-wrap gap-4">
            <div className="flex flex-col justify-center">
              <p
                className={`text-[15px] leading-[24px] whitespace-pre ${
                  selectedFilter === "selected"
                    ? "text-[#0078c8]"
                    : "text-[#000a1e]"
                }`}
              >
                Filtered clients
              </p>
            </div>
          </div>
          <p className="text-right text-[15px] leading-[24px] whitespace-pre text-[#0078c8]">
            Edit
          </p>
          {selectedFilter === "selected" && (
            <div className="absolute inset-y-0 left-0 w-[3px] bg-[#0078c8]" />
          )}
        </button>
      </div>
    </div>
  );
}
