interface CreateNewDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

interface CreateNewItem {
  label: string;
  onClick?: () => void;
}

const createNewItems: CreateNewItem[] = [
  { label: "Invoice" },
  { label: "Payment link" },
  { label: "Bill" },
  { label: "Contact" },
  { label: "Quote" },
  { label: "Purchase order" },
  { label: "Manual journal" },
  { label: "Spend money" },
  { label: "Receive money" },
  { label: "Transfer money" },
];

function CreateNewHeader() {
  return (
    <div className="bg-[#fcfcfc] relative shrink-0 w-full px-5 py-2">
      <div className="font-['Helvetica_Neue:Bold',_sans-serif] leading-[0] not-italic text-[#002a46] text-[13px]">
        <p className="leading-[20px] uppercase tracking-wider">CREATE NEW</p>
      </div>
    </div>
  );
}

function CreateNewMenuItem({ label, onClick }: CreateNewItem) {
  return (
    <div 
      className="bg-[#fcfcfc] relative shrink-0 w-full cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
      data-name="Create New Item"
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

export function CreateNewDropdown({ isOpen, onClose, position }: CreateNewDropdownProps) {
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
        className="absolute z-50 min-w-[220px]"
        style={{
          top: position.top,
          left: position.left,
        }}
        data-name="Create New Dropdown"
      >
        <div className="bg-[#fcfcfc] box-border content-stretch flex flex-col items-start justify-start px-0 py-3 relative rounded-[8px] size-full" data-name="Component/Global Navigation/Create New Dropdown">
          <div aria-hidden="true" className="absolute border border-[#ccced2] border-solid inset-[-1px] pointer-events-none rounded-[9px] shadow-[0px_3px_6px_0px_rgba(0,10,30,0.204)]" />
          
          <CreateNewHeader />
          
          {createNewItems.map((item, index) => (
            <CreateNewMenuItem 
              key={index} 
              label={item.label} 
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}