import { useState } from 'react';
import svgPaths from "../imports/svg-cwouv49jeg";

interface DropdownItem {
  id: string;
  label: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

interface GlobalDropdownProps {
  items: DropdownItem[];
  placeholder: string;
  onSelect: (item: DropdownItem | null) => void;
  defaultSelectedId?: string;
  allowClear?: boolean;
}

export function GlobalDropdown({ 
  items, 
  placeholder, 
  onSelect, 
  defaultSelectedId,
  allowClear = true 
}: GlobalDropdownProps) {
  const defaultItem = items.find(item => item.id === defaultSelectedId) || null;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(defaultItem);

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  const handleClear = () => {
    setSelectedItem(null);
    setIsOpen(false);
    onSelect(null);
  };

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <div 
        className="bg-white min-h-[40px] relative rounded-[6px] shrink-0 w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="content-stretch flex gap-[4px] items-center px-[24px] py-[24px] relative w-full">
          {/* Content */}
          <div className="flex-[1_0_0] min-h-px min-w-px relative">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center px-[4px] relative w-full">
                {selectedItem?.icon && (
                  <div className="shrink-0">
                    {selectedItem.icon}
                  </div>
                )}
                <div className="content-stretch flex flex-col flex-[1_0_0] min-h-px min-w-px overflow-clip relative gap-[2px]">
                  <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[15px] whitespace-nowrap ${
                    selectedItem ? 'text-[#1e3145]' : 'text-[#616b7a]'
                  }`}>
                    {selectedItem ? selectedItem.label : placeholder}
                  </p>
                  {selectedItem?.subtitle && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#616b7a] leading-[1.3]">
                      {selectedItem.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chevron */}
          <div className="content-stretch flex items-center justify-center py-[4px] relative shrink-0">
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]">
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
              <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative">
                <div className="absolute bottom-[35.94%] left-1/4 overflow-clip right-1/4 top-[35.94%]">
                  <svg 
                    className="absolute block size-full transition-transform" 
                    fill="none" 
                    preserveAspectRatio="none" 
                    viewBox="0 0 10.0012 5.625"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <path d={svgPaths.p95b0600} fill="var(--fill-0, #1E3145)" id="vector" />
                  </svg>
                </div>
              </div>
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute z-20 mt-1 w-full bg-white border border-[#cfd1d5] rounded-[6px] shadow-lg max-h-[300px] overflow-y-auto">
            {allowClear && selectedItem && (
              <div 
                className="px-4 py-3 hover:bg-[#f7f8f9] cursor-pointer border-b border-[#e1e2e5] transition-colors"
                onClick={handleClear}
              >
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[15px] text-[#616b7a] leading-[1.45]">
                  Clear selection
                </p>
              </div>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                className={`px-4 py-3 hover:bg-[#f7f8f9] cursor-pointer transition-colors flex gap-3 items-center ${
                  selectedItem?.id === item.id ? 'bg-[#e8f4ff]' : ''
                }`}
                onClick={() => handleSelect(item)}
              >
                {item.icon && (
                  <div className="shrink-0">
                    {item.icon}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[15px] text-[#1e3145] leading-[1.45]">
                    {item.label}
                  </p>
                  {item.subtitle && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#616b7a] leading-[1.3] mt-1">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}