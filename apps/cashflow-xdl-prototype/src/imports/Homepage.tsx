import { imgLogo, imgIcon, imgResizer, imgIcon1, imgIcon2, imgIcon3, imgIcon4, imgIcon5, imgIcon6, imgIcon7 } from "./svg-0wnny";

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
        <p className="[text-overflow:inherit] leading-[24px] overflow-inherit whitespace-pre">Hornblower Enterprises</p>
      </div>
      <ComponentNavigationNavIcons />
    </div>
  );
}

function Menu() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-3 py-2 relative rounded-[6px] shrink-0" data-name="Menu">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Home</p>
      </div>
    </div>
  );
}

function ComponentNavigationMenuButton() {
  return <div className="absolute bg-[#eff0f3] bottom-0 h-1 left-0 right-0" data-name="Component/Navigation/_Menu button" />;
}

function Home() {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-16 items-center justify-center px-0 py-3 relative shrink-0" data-name="Home">
      <Menu />
      <ComponentNavigationMenuButton />
    </div>
  );
}

function Menu1() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-3 py-2 relative rounded-[6px] shrink-0" data-name="Menu">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Sales</p>
      </div>
    </div>
  );
}

function Sales() {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-16 items-center justify-center px-0 py-3 relative shrink-0" data-name="Sales">
      <Menu1 />
    </div>
  );
}

function Menu2() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-3 py-2 relative rounded-[6px] shrink-0" data-name="Menu">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Purchases</p>
      </div>
    </div>
  );
}

function Purchases() {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-16 items-center justify-center px-0 py-3 relative shrink-0" data-name="Purchases">
      <Menu2 />
    </div>
  );
}

function Menu3() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-3 py-2 relative rounded-[6px] shrink-0" data-name="Menu">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Reporting</p>
      </div>
    </div>
  );
}

function Reporting() {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-16 items-center justify-center px-0 py-3 relative shrink-0" data-name="Reporting">
      <Menu3 />
    </div>
  );
}

function Menu4() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-3 py-2 relative rounded-[6px] shrink-0" data-name="Menu">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Payroll</p>
      </div>
    </div>
  );
}

function Payroll() {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-16 items-center justify-center px-0 py-3 relative shrink-0" data-name="Payroll">
      <Menu4 />
    </div>
  );
}

function Menu5() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-3 py-2 relative rounded-[6px] shrink-0" data-name="Menu">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Accounting</p>
      </div>
    </div>
  );
}

function Accounting() {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-16 items-center justify-center px-0 py-3 relative shrink-0" data-name="Accounting">
      <Menu5 />
    </div>
  );
}

function Menu6() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-3 py-2 relative rounded-[6px] shrink-0" data-name="Menu">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Tax</p>
      </div>
    </div>
  );
}

function Tax() {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-16 items-center justify-center px-0 py-3 relative shrink-0" data-name="Tax">
      <Menu6 />
    </div>
  );
}

function Menu7() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-3 py-2 relative rounded-[6px] shrink-0" data-name="Menu">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[15px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Contacts</p>
      </div>
    </div>
  );
}

function Contacts() {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-16 items-center justify-center px-0 py-3 relative shrink-0" data-name="Contacts">
      <Menu7 />
    </div>
  );
}

function SbMenuItems() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-name="SB Menu Items">
      <Home />
      <Sales />
      <Purchases />
      <Reporting />
      <Payroll />
      <Accounting />
      <Tax />
      <Contacts />
    </div>
  );
}

function Left() {
  return (
    <div className="box-border content-stretch flex gap-1 items-center justify-start pl-2 pr-0 py-0 relative shrink-0" data-name="Left">
      <XeroLogo />
      <Organisation />
      <SbMenuItems />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute inset-[18.75%]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon1} />
    </div>
  );
}

function Container1() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <Icon2 />
    </div>
  );
}

function Icon3() {
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
      <Icon3 />
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

function Icon4() {
  return (
    <div className="absolute inset-[12.5%]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon2} />
    </div>
  );
}

function Container2() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <Icon4 />
    </div>
  );
}

function Icon5() {
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
      <Icon5 />
    </div>
  );
}

function Search() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Search">
      <ComponentNavigationNavIcons2 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute h-[18.994px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[18.999px]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon3} />
    </div>
  );
}

function Container3() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-[30px] max-w-[30px] min-h-5 min-w-5 relative shrink-0" data-name="container">
      <Icon6 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-8 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <Container3 />
    </div>
  );
}

function ComponentNavigationNavIcons3() {
  return (
    <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
      <Icon7 />
    </div>
  );
}

function Jax() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="JAX">
      <ComponentNavigationNavIcons3 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute bottom-[14.06%] left-1/4 right-1/4 top-[14.06%]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon4} />
    </div>
  );
}

function Container4() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <Icon8 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
      <Container4 />
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
    </div>
  );
}

function ComponentNavigationNavIcons4() {
  return (
    <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
      <Icon9 />
    </div>
  );
}

function Help() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Help">
      <ComponentNavigationNavIcons4 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute inset-[15.625%]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon5} />
    </div>
  );
}

function Container5() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <Icon10 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
      <Container5 />
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
    </div>
  );
}

function ComponentNavigationNavIcons5() {
  return (
    <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
      <Icon11 />
    </div>
  );
}

function SetupGuide() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Setup guide">
      <ComponentNavigationNavIcons5 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute inset-[10.94%_12.5%]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon6} />
    </div>
  );
}

function Container6() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <Icon12 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
      <Container6 />
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
    </div>
  );
}

function ComponentNavigationNavIcons6() {
  return (
    <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
      <Icon13 />
    </div>
  );
}

function Notifications() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Notifications">
      <ComponentNavigationNavIcons6 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute inset-[18.75%]" data-name="icon">
      <img className="block max-w-none size-full" src={imgIcon7} />
    </div>
  );
}

function Container7() {
  return (
    <div className="aspect-[20/20] basis-0 grow max-h-9 max-w-9 min-h-6 min-w-6 relative shrink-0" data-name="container">
      <Icon14 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-1/2 size-[28.8px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="icon">
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
      <Container7 />
      <div className="h-0 max-w-[8.004px] relative shrink-0 w-[8.004px]" data-name="resizer">
        <img className="block max-w-none size-full" src={imgResizer} />
      </div>
    </div>
  );
}

function ComponentNavigationNavIcons7() {
  return (
    <div className="relative shrink-0 size-6" data-name="Component/Navigation/_nav icons">
      <Icon15 />
    </div>
  );
}

function Apps() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Apps">
      <ComponentNavigationNavIcons7 />
    </div>
  );
}

function Overflow() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-name="overflow">
      <CreateNew />
      <Search />
      <Jax />
      <Help />
      <SetupGuide />
      <Notifications />
      <Apps />
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
    <div className="box-border content-stretch flex gap-2 items-center justify-start px-3 py-0 relative shrink-0" data-name="Global tools">
      <Overflow />
      <User />
    </div>
  );
}

function ComponentXbNavigation() {
  return (
    <div className="absolute bg-[#1f68dd] content-stretch flex items-center justify-between left-0 top-0 w-[1440px]" data-name="Component/XB navigation">
      <Left />
      <GlobalTools />
    </div>
  );
}

export default function Homepage() {
  return (
    <div className="bg-white relative size-full" data-name="Homepage">
      <ComponentXbNavigation />
    </div>
  );
}