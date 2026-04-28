import React from 'react';

function Menu({ isActive }: { isActive: boolean }) {
  return (
    <div className={`box-border content-stretch flex gap-2.5 items-center justify-center px-3 py-2 relative rounded-[6px] shrink-0 ${isActive ? 'bg-[#184390]' : ''}`} data-name="Menu">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Home</p>
      </div>
    </div>
  );
}

function ComponentNavigationMenuButton() {
  return <div className="absolute bg-[#eff0f3] bottom-0 h-1 left-0 right-0" data-name="Component/Navigation/_Menu button" />;
}

function Home({ isSelected, onClick }: { isSelected: boolean, onClick?: (event: React.MouseEvent) => void }) {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-16 items-center justify-center px-0 py-3 relative shrink-0" data-name="Home">
      <button onClick={onClick} className="relative">
        <Menu isActive={false} />
      </button>
      {isSelected && <ComponentNavigationMenuButton />}
    </div>
  );
}

function MenuButton({ onClick, isActive, label }: { onClick?: (event: React.MouseEvent) => void, isActive?: boolean, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`box-border content-stretch flex gap-2.5 items-center justify-center px-3 py-2 relative rounded-[6px] shrink-0 hover:bg-[#1C5DC5] transition-colors ${isActive ? 'bg-[#184390]' : ''}`}
      data-name="Menu"
    >
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">{label}</p>
      </div>
    </button>
  );
}

function NavItem({ onClick, isActive, isSelected, label }: { 
  onClick?: (event: React.MouseEvent) => void, 
  isActive?: boolean, 
  isSelected?: boolean, 
  label: string 
}) {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-16 items-center justify-center px-0 py-3 relative shrink-0" data-name={label}>
      <MenuButton onClick={onClick} isActive={isActive} label={label} />
      {(isActive || isSelected) && <ComponentNavigationMenuButton />}
    </div>
  );
}

function SbMenuItems({ isOpen, onMenuClick, selectedNavItem, onNavItemClick, activeDropdown }: { 
  isOpen: boolean, 
  onMenuClick: (menu: string, event: React.MouseEvent) => void,
  selectedNavItem: string,
  onNavItemClick: (item: string) => void,
  activeDropdown: string | null
}) {
  const menuItems = ['Sales', 'Purchases', 'Reporting', 'Payroll', 'Accounting', 'Tax', 'Contacts'];

  return (
    <div className={`content-stretch flex gap-2 items-center justify-start relative shrink-0 ${isOpen ? 'flex-col md:flex-row' : 'hidden md:flex'}`} data-name="SB Menu Items">
      <Home 
        isSelected={selectedNavItem === 'Home'} 
        onClick={() => onNavItemClick('Home')} 
      />
      {menuItems.map((item) => (
        <NavItem
          key={item}
          onClick={(e) => onMenuClick(item, e)} 
          isActive={activeDropdown === item}
          isSelected={selectedNavItem === item}
          label={item}
        />
      ))}
    </div>
  );
}

export { SbMenuItems };