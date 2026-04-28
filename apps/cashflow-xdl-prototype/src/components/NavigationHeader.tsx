import { useState } from 'react';
import { XeroLogo, Organisation } from './navigation/DesktopNavigation';
import { SbMenuItems } from './navigation/NavigationMenu';
import { GlobalTools } from './navigation/GlobalTools';
import { MobileLeft, MobileGlobalTools } from './navigation/MobileNavigation';
import { NavigationDropdown, menuContent } from './NavigationDropdown';
import { UserDropdown } from './navigation/UserDropdown';
import { CreateNewDropdown } from './navigation/CreateNewDropdown';
import { SideDrawer } from './SideDrawer';

function Left({ isOpen, onMenuClick, selectedNavItem, onNavItemClick, activeDropdown }: { 
  isOpen: boolean, 
  onMenuClick: (menu: string, event: React.MouseEvent) => void,
  selectedNavItem: string,
  onNavItemClick: (item: string) => void,
  activeDropdown: string | null
}) {
  return (
    <div className="box-border content-stretch flex gap-1 items-center justify-start pl-2 pr-0 py-0 relative shrink-0 flex-col md:flex-row" data-name="Left">
      <div className="flex gap-1 items-center">
        <XeroLogo />
        <Organisation />
      </div>
      <SbMenuItems isOpen={isOpen} onMenuClick={onMenuClick} selectedNavItem={selectedNavItem} onNavItemClick={onNavItemClick} activeDropdown={activeDropdown} />
    </div>
  );
}

interface NavigationHeaderProps {
  selectedNavItem?: string;
  onNavItemSelect?: (item: string) => void;
}

export function NavigationHeader({ selectedNavItem: externalSelectedNavItem, onNavItemSelect }: NavigationHeaderProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [internalSelectedNavItem, setInternalSelectedNavItem] = useState<string>('Home');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userDropdownPosition, setUserDropdownPosition] = useState({ top: 0, left: 0 });
  const [isCreateNewOpen, setIsCreateNewOpen] = useState(false);
  const [createNewPosition, setCreateNewPosition] = useState({ top: 0, left: 0 });
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const selectedNavItem = externalSelectedNavItem || internalSelectedNavItem;

  const handleMenuClick = (menu: string, event: React.MouseEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    
    // If clicking the same menu that's already open, close it
    // If clicking a different menu, close current and open the new one
    // If no menu is open, open the clicked menu
    if (activeDropdown === menu) {
      setActiveDropdown(null); // Close if same menu clicked
    } else {
      setActiveDropdown(menu); // Open new menu (closes any existing one)
    }
  };

  const handleNavItemClick = (item: string) => {
    // Set as selected page and close any open dropdowns
    if (onNavItemSelect) {
      onNavItemSelect(item);
    } else {
      setInternalSelectedNavItem(item);
    }
    setActiveDropdown(null);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleUserClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    setUserDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    
    // Close navigation dropdown if open and toggle user dropdown
    setActiveDropdown(null);
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const closeUserDropdown = () => {
    setIsUserDropdownOpen(false);
  };

  const handleCreateNewClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    setCreateNewPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX - 100, // Offset to center the dropdown better
    });
    
    // Close other dropdowns and toggle create new dropdown
    setActiveDropdown(null);
    setIsUserDropdownOpen(false);
    setIsCreateNewOpen(!isCreateNewOpen);
  };

  const closeCreateNewDropdown = () => {
    setIsCreateNewOpen(false);
  };

  const handleIconClick = () => {
    // Close any open dropdowns when opening side drawer
    setActiveDropdown(null);
    setIsUserDropdownOpen(false);
    setIsCreateNewOpen(false);
    setIsSideDrawerOpen(true);
  };

  const closeSideDrawer = () => {
    setIsSideDrawerOpen(false);
  };

  return (
    <nav className="bg-[#1f68dd] w-full relative">
      <div className="max-w-full">
        {/* Mobile Navigation (≤1280px) */}
        <div className="show-mobile items-center justify-between relative size-full" data-name="Component/XB navigation">
          <MobileLeft onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          <MobileGlobalTools onUserClick={handleUserClick} onIconClick={handleIconClick} />
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#1f68dd] border-t border-white/20 pb-4 z-50">
              <div className="px-4 py-4">
                <SbMenuItems isOpen={true} onMenuClick={handleMenuClick} selectedNavItem={selectedNavItem} onNavItemClick={handleNavItemClick} activeDropdown={activeDropdown} />
              </div>
              <div className="px-4 py-2 border-t border-white/20">
                <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 flex-col md:flex-row" data-name="overflow">
                  {/* Mobile overflow items would go here */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tablet Navigation (1280px-1440px) */}
        <div className="show-tablet items-center justify-between w-full px-4">
          <Left isOpen={false} onMenuClick={handleMenuClick} selectedNavItem={selectedNavItem} onNavItemClick={handleNavItemClick} activeDropdown={activeDropdown} />
          <GlobalTools isOpen={false} onUserClick={handleUserClick} onCreateNewClick={handleCreateNewClick} isCreateNewActive={isCreateNewOpen} onIconClick={handleIconClick} />
        </div>

        {/* Desktop Navigation (≥1440px) */}
        <div className="show-desktop items-center justify-between w-full">
          <Left isOpen={false} onMenuClick={handleMenuClick} selectedNavItem={selectedNavItem} onNavItemClick={handleNavItemClick} activeDropdown={activeDropdown} />
          <GlobalTools isOpen={false} onUserClick={handleUserClick} onCreateNewClick={handleCreateNewClick} isCreateNewActive={isCreateNewOpen} onIconClick={handleIconClick} />
        </div>
      </div>

      {/* Navigation Dropdown */}
      {activeDropdown && menuContent[activeDropdown as keyof typeof menuContent] && (
        <NavigationDropdown
          isOpen={true}
          onClose={closeDropdown}
          section={menuContent[activeDropdown as keyof typeof menuContent]}
          position={dropdownPosition}
        />
      )}

      {/* User Dropdown */}
      <UserDropdown
        isOpen={isUserDropdownOpen}
        onClose={closeUserDropdown}
        position={userDropdownPosition}
      />

      {/* Create New Dropdown */}
      <CreateNewDropdown
        isOpen={isCreateNewOpen}
        onClose={closeCreateNewDropdown}
        position={createNewPosition}
      />

      {/* Side Drawer */}
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={closeSideDrawer}
      />
    </nav>
  );
}