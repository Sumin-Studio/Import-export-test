export type OrganisationsTabType = "clients" | "organisations";
export type ClientFilterType =
  | "all"
  | "groups"
  | "saved_filters"
  | "favourite"
  | "selected";
export type ClientColumnType =
  | "trading_name"
  | "email"
  | "phone"
  | "business_number"
  | "business_structure"
  | "financial_year";
export type OrgColumnType =
  | "last_accessed"
  | "staff_access"
  | "subscription_type"
  | "bank_feed_expiry"
  | "industry_classification"
  | "connected_banks"
  | "unreconciled_items"
  | "bank_feed_deprecation";

interface ComponentProps {
  className?: string;
  activeTab: OrganisationsTabType;
  onTabChange: (tab: OrganisationsTabType) => void;
  clientFilter: ClientFilterType;
  onClientFilterChange: (filter: ClientFilterType) => void;
  selectedClientColumns: Set<ClientColumnType>;
  onClientColumnToggle: (column: ClientColumnType) => void;
  selectedOrgColumns: Set<OrgColumnType>;
  onOrgColumnToggle: (column: OrgColumnType) => void;
}

function OrganisationsOverflow({
  className = "",
  activeTab,
  onTabChange,
  clientFilter,
  onClientFilterChange,
  selectedClientColumns,
  onClientColumnToggle,
  selectedOrgColumns,
  onOrgColumnToggle,
}: ComponentProps) {
  const clientColumns: Array<{ value: ClientColumnType; label: string }> = [
    { value: "trading_name", label: "Trading / Legal name" },
    { value: "email", label: "Email address" },
    { value: "phone", label: "Phone number" },
    { value: "business_number", label: "Business number" },
    { value: "business_structure", label: "Business structure" },
    { value: "financial_year", label: "Financial year" },
  ];

  const orgColumns: Array<{ value: OrgColumnType; label: string }> = [
    { value: "last_accessed", label: "Last accessed" },
    { value: "staff_access", label: "Staff access" },
    { value: "subscription_type", label: "Subscription type" },
    { value: "bank_feed_expiry", label: "Bank feed expiry" },
    { value: "industry_classification", label: "Industry classification" },
    { value: "connected_banks", label: "Connected banks" },
    { value: "unreconciled_items", label: "Unreconciled items" },
    { value: "bank_feed_deprecation", label: "Bank feed deprecation" },
  ];

  const clientFilters: Array<{ value: ClientFilterType; label: string }> = [
    { value: "all", label: "All clients" },
    { value: "groups", label: "Groups" },
    { value: "saved_filters", label: "Saved filters" },
    { value: "favourite", label: "Favourite organisations" },
    { value: "selected", label: "Selected clients" },
  ];

  return (
    <div className={className}>
      {/* Tabs */}
      <nav className="text-[15px]/[24px]">
        <button
          className={`hover:bg-background-primary flex w-full justify-between px-5 py-2 text-left ${
            activeTab === "clients"
              ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
              : ""
          }`}
          type="button"
          onClick={() => onTabChange("clients")}
        >
          Clients
        </button>
        <button
          className={`hover:bg-background-primary flex w-full justify-between px-5 py-2 text-left ${
            activeTab === "organisations"
              ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
              : ""
          }`}
          type="button"
          onClick={() => onTabChange("organisations")}
        >
          Organisations
        </button>
      </nav>

      {/* Divider */}
      <div className="border-border-primary border-t" />

      {/* Filter Section */}
      <h3 className="text-content-secondary px-5 py-2 text-[13px]/[20px]">
        Filter
      </h3>
      <nav className="text-[15px]/[24px]">
        {clientFilters.map((filter) => (
          <button
            key={filter.value}
            className={`hover:bg-background-primary flex w-full justify-between px-5 py-2 text-left ${
              clientFilter === filter.value
                ? "text-content-interactive relative shadow-[3px_0px_0px_0px_inset_#0078c8]"
                : ""
            }`}
            type="button"
            onClick={() => onClientFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-border-primary border-t" />

      {/* Client Columns Section */}
      <h3 className="text-content-secondary px-5 py-2 pt-3 text-[13px]/[20px]">
        Client
      </h3>
      <div className="text-[15px]/[24px]">
        {clientColumns.map((column) => (
          <div
            key={column.value}
            className="hover:bg-background-primary flex w-full items-center gap-2 px-5 py-2"
          >
            <input
              type="checkbox"
              id={`client-${column.value}`}
              className="h-4 w-4 cursor-pointer"
              checked={selectedClientColumns.has(column.value)}
              onChange={(e) => {
                if (e.target.checked) {
                  selectedClientColumns.add(column.value);
                } else {
                  selectedClientColumns.delete(column.value);
                }
                onClientColumnToggle(column.value);
              }}
            />
            <label
              htmlFor={`client-${column.value}`}
              className="cursor-pointer"
            >
              {column.label}
            </label>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-border-primary border-t" />

      {/* Organisation Columns Section */}
      <h3 className="text-content-secondary px-5 py-2 pt-3 text-[13px]/[20px]">
        Organisation
      </h3>
      <div className="text-[15px]/[24px]">
        {orgColumns.map((column) => (
          <div
            key={column.value}
            className="hover:bg-background-primary flex w-full items-center gap-2 px-5 py-2"
          >
            <input
              type="checkbox"
              id={`org-${column.value}`}
              className="h-4 w-4 cursor-pointer"
              checked={selectedOrgColumns.has(column.value)}
              onChange={(e) => {
                if (e.target.checked) {
                  selectedOrgColumns.add(column.value);
                } else {
                  selectedOrgColumns.delete(column.value);
                }
                onOrgColumnToggle(column.value);
              }}
            />
            <label htmlFor={`org-${column.value}`} className="cursor-pointer">
              {column.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrganisationsOverflow;
