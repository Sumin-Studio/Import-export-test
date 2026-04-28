import { imgIcon1, imgIcon2, imgIcon3, imgIcon4, imgIcon5, imgIcon6, imgIcon7 } from "../../imports/svg-0wnny";
import { useState, useRef } from 'react';
import { CreateNewDropdown } from './CreateNewDropdown';

// Right side components with responsive icon containers
function IconContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0 ${className}`} data-name="container">
      {children}
    </div>
  );
}

function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={`box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0 hover:bg-[#1C5DC5] transition-colors cursor-pointer`}>
      <div className={`relative shrink-0 size-6`}>
        <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
          {children}
        </div>
      </div>
    </div>
  );
}

function CreateNew({ onClick, isActive, buttonRef }: { 
  onClick: () => void; 
  isActive: boolean;
  buttonRef?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div 
      ref={buttonRef}
      onClick={onClick}
      className={`box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0 transition-colors cursor-pointer ${
        isActive ? 'bg-[#1C5DC5]' : 'hover:bg-[#1C5DC5]'
      }`}
    >
      <div className={`relative shrink-0 size-6`}>
        <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <div className={`aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0`} data-name="container">
            <div className="absolute inset-[18.75%]">
              <img className="block max-w-none size-full" src={imgIcon1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Search({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick}>
      <IconWrapper>
        <IconContainer>
          <div className="absolute inset-[12.5%]">
            <img className="block max-w-none size-full" src={imgIcon2} />
          </div>
        </IconContainer>
      </IconWrapper>
    </div>
  );
}

function Jax({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick}>
      <IconWrapper>
        <IconContainer className="max-h-[30px] max-w-[30px]">
          <div className="absolute h-[18.994px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[18.999px]">
            <img className="block max-w-none size-full" src={imgIcon3} />
          </div>
        </IconContainer>
      </IconWrapper>
    </div>
  );
}

function Help({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick}>
      <IconWrapper>
        <IconContainer>
          <div className="absolute bottom-[14.06%] left-1/4 right-1/4 top-[14.06%]">
            <img className="block max-w-none size-full" src={imgIcon4} />
          </div>
        </IconContainer>
      </IconWrapper>
    </div>
  );
}

function SetupGuide({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick}>
      <IconWrapper>
        <IconContainer>
          <div className="absolute inset-[15.625%]">
            <img className="block max-w-none size-full" src={imgIcon5} />
          </div>
        </IconContainer>
      </IconWrapper>
    </div>
  );
}

function Notifications({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick}>
      <IconWrapper>
        <IconContainer>
          <div className="absolute inset-[10.94%_12.5%]">
            <img className="block max-w-none size-full" src={imgIcon6} />
          </div>
        </IconContainer>
      </IconWrapper>
    </div>
  );
}

function Apps({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick}>
      <IconWrapper>
        <IconContainer>
          <div className="absolute inset-[18.75%]">
            <img className="block max-w-none size-full" src={imgIcon7} />
          </div>
        </IconContainer>
      </IconWrapper>
    </div>
  );
}

function Overflow({ isOpen, onCreateNewClick, isCreateNewActive, createNewRef, onIconClick }: { 
  isOpen: boolean; 
  onCreateNewClick: () => void; 
  isCreateNewActive: boolean;
  createNewRef?: React.RefObject<HTMLDivElement>;
  onIconClick?: () => void;
}) {
  return (
    <div className={`content-stretch flex gap-2 items-center justify-start relative shrink-0 ${isOpen ? 'flex-col md:flex-row' : 'hidden md:flex'}`} data-name="overflow">
      <CreateNew onClick={onCreateNewClick} isActive={isCreateNewActive} buttonRef={createNewRef} />
      <Search onClick={onIconClick} />
      <Jax onClick={onIconClick} />
      <Help onClick={onIconClick} />
      <SetupGuide onClick={onIconClick} />
      <Notifications onClick={onIconClick} />
      <Apps onClick={onIconClick} />
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

function GlobalTools({ 
  isOpen, 
  onUserClick, 
  onCreateNewClick, 
  isCreateNewActive,
  onIconClick
}: { 
  isOpen: boolean, 
  onUserClick?: (event: React.MouseEvent) => void,
  onCreateNewClick?: (event: React.MouseEvent) => void,
  isCreateNewActive?: boolean,
  onIconClick?: () => void
}) {
  const createNewRef = useRef<HTMLDivElement>(null);

  const handleCreateNewClick = (event: React.MouseEvent) => {
    if (onCreateNewClick) {
      onCreateNewClick(event);
    }
  };

  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-start px-3 py-0 relative shrink-0 flex-col md:flex-row" data-name="Global tools">
      <Overflow 
        isOpen={isOpen} 
        onCreateNewClick={handleCreateNewClick}
        isCreateNewActive={isCreateNewActive || false}
        createNewRef={createNewRef}
        onIconClick={onIconClick}
      />
      <User onClick={onUserClick} />
      

    </div>
  );
}

export { GlobalTools };