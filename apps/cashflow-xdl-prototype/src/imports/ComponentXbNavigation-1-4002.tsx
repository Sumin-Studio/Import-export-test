import { imgIcon, imgResizer, imgLogo, imgIcon1, imgIcon2 } from "./svg-9uynj";

function Icon1() {
  return (
    <div className="absolute inset-[21.88%_15.63%]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon} />
    </div>
  );
}

function Container() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
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
    <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
      <Icon2 />
    </div>
  );
}

function Hamburger() {
  return (
    <div className="bg-[#1c5dc5] box-border content-stretch flex flex-col gap-2.5 items-center justify-center overflow-clip p-[20px] relative shrink-0" data-name="Hamburger">
      <ComponentNavigationNavIcons />
    </div>
  );
}

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

function Left() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-name="Left">
      <Hamburger />
      <XeroLogo />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute inset-[18.75%]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon1} />
    </div>
  );
}

function Container1() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <Icon3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
      <Container1 />
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
    </div>
  );
}

function ComponentNavigationNavIcons1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
      <Icon4 />
    </div>
  );
}

function CreateNew() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Create new">
      <ComponentNavigationNavIcons1 />
    </div>
  );
}

function Overflow() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-name="overflow">
      <CreateNew />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute inset-[18.75%_43.75%]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon2} />
    </div>
  );
}

function Container2() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
      <Container2 />
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
    </div>
  );
}

function ComponentNavigationNavIcons2() {
  return (
    <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
      <Icon6 />
    </div>
  );
}

function Overflow1() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Overflow">
      <ComponentNavigationNavIcons2 />
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

function User() {
  return (
    <div className="relative shrink-0 size-10" data-name="user">
      <Avatar />
    </div>
  );
}

function GlobalTools() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-end px-3 py-0 relative shrink-0" data-name="Global tools">
      <Overflow />
      <Overflow1 />
      <User />
    </div>
  );
}

export default function ComponentXbNavigation() {
  return (
    <div className="bg-[#1f68dd] content-stretch flex items-center justify-between relative size-full" data-name="Component/XB navigation">
      <Left />
      <GlobalTools />
    </div>
  );
}