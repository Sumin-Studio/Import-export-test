import { imgLogo, imgIcon, imgResizer } from "../../imports/svg-0wnny";

function Logo() {
  return (
    <div className="h-[16.221px] relative shrink-0 w-[56.001px]" data-name="logo">
      <img className="block max-w-none size-full" src={imgLogo} />
    </div>
  );
}

function XeroLogo() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 h-10 items-center justify-center px-3 py-0 relative rounded-[20px] shrink-0" data-name="Xero logo">
      <Logo />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute inset-[35.94%_25%]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon} />
    </div>
  );
}

function Container() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-3 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
      <Container />
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
    </div>
  );
}

function ComponentNavigationNavIcons() {
  return (
    <div className="h-1.5 relative shrink-0 w-2.5" data-name="Component/Navigation/_nav icons">
      <Icon1 />
    </div>
  );
}

function Organisation() {
  return (
    <div className="bg-[#1c5dc5] box-border content-stretch flex gap-3 items-center justify-start overflow-clip px-4 py-2 relative rounded-[6px] shrink-0" data-name="Organisation">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] max-w-[246px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="[text-overflow:inherit] leading-[24px] overflow-inherit whitespace-pre">
          <span className="show-abbreviated">HE</span>
          <span className="show-full">Hornblower Enterprises</span>
        </p>
      </div>
      <ComponentNavigationNavIcons />
    </div>
  );
}

export { XeroLogo, Organisation };