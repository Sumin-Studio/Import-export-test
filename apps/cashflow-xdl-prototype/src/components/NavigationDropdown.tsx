import { imgComponentGlobalNavigationDivider } from "../imports/svg-vd8pp";
import { Settings } from 'lucide-react';

interface MenuItem {
  label: string;
  onClick?: () => void;
}

interface MenuSection {
  items: MenuItem[];
  settingsLabel?: string;
}

interface NavigationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  section: MenuSection;
  position?: { top: number; left: number };
}

function MenuItemComponent({ label, onClick }: MenuItem) {
  return (
    <div 
      className="bg-[#fcfcfc] relative shrink-0 w-full cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
      data-name="Menu Item"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-5 pr-3 py-0 relative w-full">
          <div className="basis-0 box-border content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px px-0 py-2 relative shrink-0" data-name="Label">
            <div className="basis-0 font-['Helvetica_Neue:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[15px]">
              <p className="leading-[24px]">{label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-6 relative shrink-0 w-full" data-name="Component/Global Navigation/Divider">
      <img className="block max-w-none size-full" src={imgComponentGlobalNavigationDivider} />
    </div>
  );
}

function SettingsItem({ label }: { label: string }) {
  return (
    <div className="bg-[#fcfcfc] relative shrink-0 w-full cursor-pointer hover:bg-gray-50 transition-colors" data-name="Settings">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-5 pr-3 py-0 relative w-full">
          <div className="basis-0 box-border content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px px-0 py-2 relative shrink-0" data-name="Label">
            <Settings className="w-4 h-4 text-[#002a46] shrink-0" />
            <div className="basis-0 font-['Helvetica_Neue:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[15px]">
              <p className="leading-[20px]">{label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavigationDropdown({ isOpen, onClose, section, position }: NavigationDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop to close dropdown when clicking outside */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div 
        className="absolute z-50 min-w-[300px]"
        style={{
          top: position?.top || 0,
          left: position?.left || 0,
        }}
        data-name="Navigation Dropdown"
      >
        <div className="bg-[#fcfcfc] box-border content-stretch flex flex-col items-start justify-start px-0 py-3 relative rounded-[8px] size-full" data-name="Component/Global Navigation/Dropdown">
          <div aria-hidden="true" className="absolute border border-[#ccced2] border-solid inset-[-1px] pointer-events-none rounded-[9px] shadow-[0px_3px_6px_0px_rgba(0,10,30,0.204)]" />
          
          {section.items.map((item, index) => (
            <MenuItemComponent 
              key={index} 
              label={item.label} 
              onClick={item.onClick}
            />
          ))}
          
          {section.settingsLabel && (
            <>
              <Divider />
              <SettingsItem label={section.settingsLabel} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

// Menu content definitions for each navigation section
export const menuContent = {
  Sales: {
    items: [
      { label: "Sales overview" },
      { label: "Invoices" },
      { label: "Payment links" },
      { label: "Online payments" },
      { label: "Quotes" },
      { label: "Products and services" },
      { label: "Customers" },
    ],
    settingsLabel: "Sales settings",
  },
  Purchases: {
    items: [
      { label: "Purchases overview" },
      { label: "Bills" },
      { label: "Purchase orders" },
      { label: "Expenses" },
      { label: "Suppliers" },
    ],
    settingsLabel: "Purchases settings",
  },
  Reporting: {
    items: [
      { label: "All reports" },
      { label: "Dashboards" },
      { label: "Cash flow manager" },
      { label: "Visualisations" },
      { label: "Aged Payables Summary" },
      { label: "Aged Receivables Summary" },
      { label: "Balance Sheet" },
      { label: "Profit and Loss" },
      { label: "Short-term cash flow" },
      { label: "Business snapshot" },
    ],
    settingsLabel: "Reporting settings",
  },
  Payroll: {
    items: [
      { label: "Payroll overview" },
      { label: "Employees" },
      { label: "Leave" },
      { label: "Timesheets" },
      { label: "Pay employees" },
      { label: "Superannuation" },
      { label: "Single Touch Payroll" },
      { label: "Payroll history" },
    ],
    settingsLabel: "Payroll settings",
  },
  Accounting: {
    items: [
      { label: "Bank accounts" },
      { label: "Bank rules" },
      { label: "Chart of accounts" },
      { label: "Fixed assets" },
      { label: "Manual journals" },
      { label: "Find and recode" },
      { label: "Assurance dashboard" },
      { label: "History and notes" },
    ],
    settingsLabel: "Accounting settings",
  },
  Tax: {
    items: [
      { label: "Activity statements" },
      { label: "Taxable payments annual report" },
    ],
    settingsLabel: "Tax settings",
  },
  Contacts: {
    items: [
      { label: "All contacts" },
      { label: "Customers" },
      { label: "Suppliers" },
      { label: "Follow up" },
      { label: "New people" },
      { label: "VIP Customers" },
      { label: "Xerocon" },
      { label: "XPAC" },
    ],
    settingsLabel: "Contact settings",
  },
};