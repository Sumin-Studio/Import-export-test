import { imgResizer } from "../../imports/svg-0wnny";
import { imgIcon as mobileHamburgerIcon, imgIcon1 as mobileCreateIcon, imgIcon2 as mobileOverflowIcon } from "../../imports/svg-9uynj";
import { XeroLogo } from './DesktopNavigation';

// Mobile Layout Components (1280px and below)
function MobileHamburgerIcon() {
  return (
    <div className="absolute inset-[21.88%_15.63%]" data-name="icon">
      <img className="block max-w-none size-full" src={mobileHamburgerIcon} />
    </div>
  );
}

function MobileHamburgerContainer() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <MobileHamburgerIcon />
    </div>
  );
}

function MobileHamburgerIconWrapper() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
      <MobileHamburgerContainer />
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
    </div>
  );
}

function MobileHamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#1c5dc5] box-border content-stretch flex flex-col gap-2.5 items-center justify-center overflow-clip p-[20px] relative shrink-0"
      data-name="Hamburger"
    >
      <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
        <MobileHamburgerIconWrapper />
      </div>
    </button>
  );
}

function MobileLeft({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-name="Left">
      <MobileHamburgerButton onClick={onMenuToggle} />
      <XeroLogo />
    </div>
  );
}

function MobileCreateNewIcon() {
  return (
    <div className="absolute inset-[18.75%]" data-name="icon">
      <img className="block max-w-none size-full" src={mobileCreateIcon} />
    </div>
  );
}

function MobileCreateNewContainer() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <MobileCreateNewIcon />
    </div>
  );
}

function MobileCreateNewIconWrapper() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
      <MobileCreateNewContainer />
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
    </div>
  );
}

function MobileCreateNew() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0 hover:bg-[#1C5DC5] transition-colors cursor-pointer" data-name="Create new">
      <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
        <MobileCreateNewIconWrapper />
      </div>
    </div>
  );
}

function MobileOverflowIcon() {
  return (
    <div className="absolute inset-[18.75%_43.75%]" data-name="icon">
      <img className="block max-w-none size-full" src={mobileOverflowIcon} />
    </div>
  );
}

function MobileOverflowContainer() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <MobileOverflowIcon />
    </div>
  );
}

function MobileOverflowIconWrapper() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
      <MobileOverflowContainer />
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
    </div>
  );
}

function MobileOverflowButton({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0 hover:bg-[#1C5DC5] transition-colors cursor-pointer" 
      data-name="Overflow"
    >
      <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
        <MobileOverflowIconWrapper />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="absolute bg-[#a4eefe] inset-0 overflow-clip rounded-[100px]" data-name="Avatar">
      <div className="absolute flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold justify-center leading-[0] left-0 not-italic right-0 text-[#0a353e] text-[17px] text-center top-1/2 translate-y-[-50%]">
        <p className="leading-[1.45]">SB</p>
      </div>
    </div>
  );
}

function User({ onClick }: { onClick?: (event: React.MouseEvent) => void }) {
  return (
    <button 
      onClick={onClick}
      className="relative shrink-0 size-10 hover:bg-[#1C5DC5] rounded-[6px] transition-colors cursor-pointer" 
      data-name="user"
    >
      <Avatar />
    </button>
  );
}

function MobileGlobalTools({ onUserClick, onIconClick }: { 
  onUserClick?: (event: React.MouseEvent) => void,
  onIconClick?: () => void 
}) {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-end px-3 py-0 relative shrink-0" data-name="Global tools">
      <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-name="overflow">
        <MobileCreateNew />
      </div>
      <MobileOverflowButton onClick={onIconClick} />
      <User onClick={onUserClick} />
    </div>
  );
}

export { MobileLeft, MobileGlobalTools };