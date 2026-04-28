import { imgVector, imgVector1, imgVector2, imgVector3, imgVector4, imgVector5, imgVector6, imgVector7, imgComponentGlobalNavigationDivider, imgVector8, imgVector9, imgVector10 } from "../../imports/svg-5njtt";

function UserHeader() {
  return (
    <div className="bg-[#fcfcfc] relative shrink-0 w-full" data-name="Component/Global Navigation/Header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-start px-5 py-2 relative w-full">
          <div className="basis-0 font-['Helvetica_Neue:Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[11px] uppercase">
            <p className="leading-[16px] font-[700]">sally brown</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileIcon() {
  return (
    <div className="absolute contents left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="absolute left-1/2 size-[7.383px] translate-x-[-50%] translate-y-[-50%]" data-name="Vector" style={{ top: "calc(50% - 1.582px)" }}>
        <div className="absolute inset-[-6.772%]">
          <img className="block max-w-none size-full" src={imgVector} />
        </div>
      </div>
      <div className="absolute h-[2.022px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[9.721px]" data-name="Vector" style={{ top: "calc(50% + 5.23px)" }}>
        <div className="absolute inset-[-24.72%_-5.14%]">
          <img className="block max-w-none size-full" src={imgVector1} />
        </div>
      </div>
      <div className="absolute left-1/2 size-[15.82px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Vector">
        <div className="absolute inset-[-3.16%]">
          <img className="block max-w-none size-full" src={imgVector2} />
        </div>
      </div>
    </div>
  );
}

function AccountIcon() {
  return (
    <div className="absolute contents left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Group">
      <div className="absolute left-1/2 size-[15.82px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Vector">
        <div className="absolute inset-[-3.16%]">
          <img className="block max-w-none size-full" src={imgVector2} />
        </div>
      </div>
      <div className="absolute h-0 translate-x-[-50%] translate-y-[-50%] w-[4.043px]" data-name="Vector" style={{ top: "calc(50% + 2.637px)", left: "calc(50% + 2.725px)" }}>
        <div className="absolute inset-[-0.5px_-12.37%]">
          <img className="block max-w-none size-full" src={imgVector3} />
        </div>
      </div>
      <div className="absolute h-0 translate-x-[-50%] translate-y-[-50%] w-[1.934px]" data-name="Vector" style={{ top: "calc(50% + 2.637px)", left: "calc(50% - 3.779px)" }}>
        <div className="absolute inset-[-0.5px_-25.86%]">
          <img className="block max-w-none size-full" src={imgVector4} />
        </div>
      </div>
      <div className="absolute size-[3.516px] translate-x-[-50%] translate-y-[-50%]" data-name="Vector" style={{ top: "calc(50% + 2.637px)", left: "calc(50% - 1.055px)" }}>
        <div className="absolute inset-[-14.222%]">
          <img className="block max-w-none size-full" src={imgVector5} />
        </div>
      </div>
      <div className="absolute h-0 translate-x-[-50%] translate-y-[-50%] w-[6.152px]" data-name="Vector" style={{ top: "calc(50% - 2.637px)", left: "calc(50% - 1.67px)" }}>
        <div className="absolute inset-[-0.5px_-8.13%]">
          <img className="block max-w-none size-full" src={imgVector6} />
        </div>
      </div>
      <div className="absolute size-[3.516px] translate-x-[-50%] translate-y-[-50%]" data-name="Vector" style={{ top: "calc(50% - 2.637px)", left: "calc(50% + 3.164px)" }}>
        <div className="absolute inset-[-14.222%]">
          <img className="block max-w-none size-full" src={imgVector7} />
        </div>
      </div>
    </div>
  );
}

function LogoutIcon() {
  return (
    <div className="absolute contents translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% + 0.382px)", left: "calc(50% - 0.09px)" }}>
      <div className="absolute h-0 translate-x-[-50%] translate-y-[-50%] w-[11.073px]" data-name="Vector" style={{ top: "calc(50% + 0.386px)", left: "calc(50% + 2.283px)" }}>
        <div className="absolute inset-[-0.5px_-4.52%]">
          <img className="block max-w-none size-full" src={imgVector8} />
        </div>
      </div>
      <div className="absolute h-[5.273px] translate-x-[-50%] translate-y-[-50%] w-[2.636px]" data-name="Vector" style={{ top: "calc(50% + 0.385px)", left: "calc(50% + 6.502px)" }}>
        <div className="absolute inset-[-9.48%_-18.96%]">
          <img className="block max-w-none size-full" src={imgVector9} />
        </div>
      </div>
      <div className="absolute h-[14.764px] translate-x-[-50%] translate-y-[-50%] w-[10.548px]" data-name="Vector" style={{ top: "calc(50% + 0.382px)", left: "calc(50% - 2.726px)" }}>
        <div className="absolute inset-[-3.39%_-4.74%]">
          <img className="block max-w-none size-full" src={imgVector10} />
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-[#fcfcfc] relative shrink-0 w-full hover:bg-gray-50 transition-colors" 
      data-name="Component/Global Navigation/_menu item"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-3 py-0 relative w-full">
          <div className="relative shrink-0 size-9" data-name="Component/Global Navigation/_Left content">
            <div className="absolute inset-0 overflow-clip" data-name="menu icons">
              {icon}
            </div>
          </div>
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Label">
            <div className="flex flex-row items-center justify-center relative size-full">
              <div className="box-border content-stretch flex gap-2.5 items-center justify-center pl-1 pr-2 py-2 relative w-full">
                <div className="basis-0 font-['Helvetica_Neue:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[15px]">
                  <p className="leading-[20px]">{label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function Divider() {
  return (
    <div className="h-6 relative shrink-0 w-full" data-name="Component/Global Navigation/Divider">
      <img className="block max-w-none size-full" src={imgComponentGlobalNavigationDivider} />
    </div>
  );
}

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

export function UserDropdown({ isOpen, onClose, position }: UserDropdownProps) {
  if (!isOpen) return null;

  const handleProfileClick = () => {
    onClose();
  };

  const handleAccountClick = () => {
    onClose();
  };

  const handleLogoutClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div 
        className="absolute z-50 w-[200px]"
        style={{ 
          top: position.top + 8, 
          left: position.left - 180, // Position to the left of the avatar
        }}
      >
        <div className="bg-[#fcfcfc] box-border content-stretch flex flex-col items-start justify-start px-0 py-3 relative rounded-[8px] size-full" data-name="Component/Global Navigation/XPH User">
          <div aria-hidden="true" className="absolute border border-[#ccced2] border-solid inset-[-1px] pointer-events-none rounded-[9px] shadow-[0px_3px_6px_0px_rgba(0,10,30,0.204)]" />
          <UserHeader />
          <MenuItem 
            icon={<ProfileIcon />} 
            label="Profile" 
            onClick={handleProfileClick}
          />
          <MenuItem 
            icon={<AccountIcon />} 
            label="Account" 
            onClick={handleAccountClick}
          />
          <Divider />
          <MenuItem 
            icon={<LogoutIcon />} 
            label="Log out" 
            onClick={handleLogoutClick}
          />
        </div>
      </div>
    </>
  );
}