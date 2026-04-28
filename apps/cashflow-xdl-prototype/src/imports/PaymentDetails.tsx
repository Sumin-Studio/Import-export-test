import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import svgPaths from "./svg-cwouv49jeg";
import { suppliers, Supplier } from '../data/suppliers';
import InteractiveDatePicker from '../components/InteractiveDatePicker';
import { BankDropdown } from '../components/BankDropdown';
import { Bank, banks } from '../data/banks';
import { DeliveryMethod } from '../components/DeliveryMethod';
import { DeliveryMethodsPanel } from '../components/DeliveryMethodsPanel';
import { PaymentPageHeader } from '../components/PaymentPageHeader';

function XeroWhite() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-[56px]" data-name="Xero_white (4) 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 15">
        <g id="Logos">
          <path d={svgPaths.p1dc62c60} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.pb8ad800} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p29385300} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p26961e70} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p155adff0} fill="var(--fill-0, white)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-[35.94%] left-1/4 overflow-clip right-1/4 top-[35.94%]" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0012 5.625">
          <path d={svgPaths.p95b0600} fill="var(--fill-0, white)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">Home</p>
    </div>
  );
}

function Menu1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">Sales</p>
    </div>
  );
}

function Menu2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">Purchases</p>
    </div>
  );
}

function Menu3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">Reporting</p>
    </div>
  );
}

function Menu4() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">Payroll</p>
    </div>
  );
}

function Menu5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">Accounting</p>
    </div>
  );
}

function Menu6() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">Tax</p>
    </div>
  );
}

function Menu7() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">Contacts</p>
    </div>
  );
}

function Menu8() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">Projects</p>
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex gap-[4px] items-center pl-[8px] relative shrink-0" data-name="Left">
      <div className="content-stretch flex flex-col h-[40px] items-center justify-center px-[12px] relative rounded-[6px] shrink-0" data-name="Xero logo">
        <XeroWhite />
      </div>
      <div className="bg-[#1c5dc5] content-stretch flex gap-[4px] items-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Organisation">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] max-w-[246px] not-italic overflow-hidden relative shrink-0 text-[15px] text-ellipsis text-white whitespace-nowrap">Foxglove Studios</p>
        <div className="content-stretch flex items-center justify-center relative shrink-0 size-[20px]" data-name="Icon/Caret">
          <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="resizer" />
            </svg>
          </div>
          <Container />
          <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="resizer" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="SB Menu Items">
        <div className="content-stretch flex items-center justify-center py-[12px] relative shrink-0" data-name="Home">
          <div aria-hidden="true" className="absolute border-[#eff0f3] border-b-4 border-solid inset-0 pointer-events-none" />
          <Menu />
        </div>
        <div className="content-stretch flex items-center justify-center py-[12px] relative shrink-0" data-name="Sales">
          <Menu1 />
        </div>
        <div className="content-stretch flex items-center justify-center py-[12px] relative shrink-0" data-name="Purchases">
          <Menu2 />
        </div>
        <div className="content-stretch flex items-center justify-center py-[12px] relative shrink-0" data-name="Reporting">
          <Menu3 />
        </div>
        <div className="content-stretch flex items-center justify-center py-[12px] relative shrink-0" data-name="Payroll">
          <Menu4 />
        </div>
        <div className="content-stretch flex items-center justify-center py-[12px] relative shrink-0" data-name="Accounting">
          <Menu5 />
        </div>
        <div className="content-stretch flex items-center justify-center py-[12px] relative shrink-0" data-name="Tax">
          <Menu6 />
        </div>
        <div className="content-stretch flex items-center justify-center py-[12px] relative shrink-0" data-name="Contacts">
          <Menu7 />
        </div>
        <div className="content-stretch flex items-center justify-center py-[12px] relative shrink-0" data-name="Projects">
          <Menu8 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[18.75%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6625 16.6625">
          <path d={svgPaths.pb661180} fill="var(--fill-0, white)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[18.994px] left-1/2 overflow-clip top-1/2 w-[18.999px]" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.9994 18.9944">
          <path d={svgPaths.p21490c00} fill="var(--fill-0, white)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[12.5%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 19.995">
          <path d={svgPaths.p212c31c0} fill="var(--fill-0, white)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-[14.06%] left-1/4 overflow-clip right-1/4 top-[14.06%]" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.33 19.1619">
          <path d={svgPaths.p2b696580} fill="var(--fill-0, white)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[10.94%_12.5%]" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.995 20.8281">
          <path d={svgPaths.p3db91b00} fill="var(--fill-0, white)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[18.75%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6625 16.6625">
          <path d={svgPaths.p3903d100} fill="var(--fill-0, white)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[12px] relative shrink-0 w-full" data-name="top">
      <div className="bg-white h-[8px] shrink-0 w-full" data-name="Spacer" />
    </div>
  );
}

function PageTitleFrame() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0" data-name="Page title frame">
      <div className="content-center flex flex-wrap gap-y-[10px] items-center relative shrink-0" data-name="Page Title">
        <div className="flex flex-col font-['National_2:Bold',sans-serif] justify-end leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1e3145] text-[24px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.15]">Pay a contractor</p>
        </div>
      </div>
    </div>
  );
}

function SubtitleFrame({ selectedDate, paymentAmount }: { selectedDate: Date | null; paymentAmount: string }) {
  if (!selectedDate || !paymentAmount || parseFloat(paymentAmount.replace(/[$,]/g, '')) <= 0) {
    return null;
  }

  const formatDateForDisplay = (date: Date): string => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Total available cash (you can adjust this value as needed)
  const totalAvailableCash = 50000;
  const paymentAmountNumber = parseFloat(paymentAmount.replace(/[$,]/g, ''));
  const remainingCash = totalAvailableCash - paymentAmountNumber;
  const formattedRemainingCash = `$${remainingCash.toFixed(2)}`;

  return (
    <div className="content-stretch flex flex-col h-[32px] items-start justify-center relative shrink-0" data-name="Subtitle frame">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Subtitle">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-end leading-[0] not-italic overflow-hidden relative shrink-0 text-[#616b7a] text-[22px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.15] overflow-hidden text-[15px] px-[0px] pt-[4px] pb-[0px]">Available cash on {formatDateForDisplay(selectedDate)}: <span className="text-[#0f7b3d]">{formattedRemainingCash}</span></p>
        </div>
      </div>
    </div>
  );
}

function SubtitleAndPicker({ selectedDate, paymentAmount }: { selectedDate: Date | null; paymentAmount: string }) {
  if (!selectedDate || !paymentAmount || parseFloat(paymentAmount.replace(/[$,]/g, '')) <= 0) {
    return null;
  }

  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center relative shrink-0" data-name="Subtitle and picker">
      <SubtitleFrame selectedDate={selectedDate} paymentAmount={paymentAmount} />
    </div>
  );
}

function TagFrame({ paymentAmount, selectedDate }: { paymentAmount: string; selectedDate: Date | null }) {
  if (!selectedDate || !paymentAmount || parseFloat(paymentAmount) <= 0) {
    return null;
  }

  // Total available cash (you can adjust this value as needed)
  const totalAvailableCash = 50000;
  const paymentAmountNumber = parseFloat(paymentAmount);
  const remainingCash = totalAvailableCash - paymentAmountNumber;
  const formattedAmount = `$${remainingCash.toFixed(2)}`;
  
  return (
    <div className="content-center flex flex-wrap h-[32px] items-center relative shrink-0" data-name="Tag frame">
      <div className="bg-[#f0fbf3] content-stretch flex h-[16px] items-center justify-center min-w-[40px] px-[8px] relative rounded-[12px] shrink-0" data-name="Tag">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#0f7b3d] text-[12px] text-center whitespace-nowrap">{formattedAmount}</p>
      </div>
    </div>
  );
}

function TitleRow({ paymentAmount, selectedDate }: { paymentAmount: string; selectedDate: Date | null }) {
  return (
    <div className="content-center flex flex-wrap gap-y-[8px] items-center justify-between relative shrink-0 w-full" data-name="titleRow">
      <div className="content-start flex flex-wrap gap-[8px] h-[32px] items-start relative shrink-0" data-name="Page Title Group">
        <PageTitleFrame />
        <SubtitleAndPicker selectedDate={selectedDate} paymentAmount={paymentAmount} />
      </div>
    </div>
  );
}

function Bottom() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[12px] relative shrink-0 w-full" data-name="bottom">
      <div className="bg-white h-[8px] shrink-0 w-full" data-name="Spacer" />
    </div>
  );
}

function PoweredByHelveticaNeue() {
  return (
    <div className="h-[6.723px] relative shrink-0 w-[69.65px]" data-name="POWERED BY – Helvetica Neue 9/10">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69.6495 6.7231">
        <g id="POWERED BY â Helvetica Neue 9/10">
          <path d={svgPaths.p21429d80} fill="var(--fill-0, #556070)" id="Vector" />
          <path d={svgPaths.p12176730} fill="var(--fill-0, #556070)" id="Vector_2" />
          <path d={svgPaths.p1f077880} fill="var(--fill-0, #556070)" id="Vector_3" />
          <path d={svgPaths.pfcee080} fill="var(--fill-0, #556070)" id="Vector_4" />
          <path d={svgPaths.p39477800} fill="var(--fill-0, #556070)" id="Vector_5" />
          <path d={svgPaths.p8fbba70} fill="var(--fill-0, #556070)" id="Vector_6" />
          <path d={svgPaths.p3cd5ee80} fill="var(--fill-0, #556070)" id="Vector_7" />
          <path d={svgPaths.p233e9c00} fill="var(--fill-0, #556070)" id="Vector_8" />
          <path d={svgPaths.p15153b80} fill="var(--fill-0, #556070)" id="Vector_9" />
        </g>
      </svg>
    </div>
  );
}

function LogoWrapper() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Logo wrapper">
      <div className="h-[20px] overflow-clip relative shrink-0 w-[48px]" data-name="logo/melio">
        <div className="absolute inset-[21.99%_43.84%_18.36%_33.02%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1109 11.9303">
            <path d={svgPaths.p2ca7bf00} fill="var(--fill-0, #6D40FF)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[0_35.68%_20.6%_59.16%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.47507 15.8807">
            <path d={svgPaths.pb3de340} fill="var(--fill-0, #6D40FF)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[5.46%_25.61%_82.89%_67.27%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.41794 2.33003">
            <path d={svgPaths.p3753a600} fill="var(--fill-0, #6D40FF)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[24.24%_26.59%_20.59%_68.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.47507 11.0326">
            <path d={svgPaths.p12149800} fill="var(--fill-0, #6D40FF)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[22.88%_69.61%_20.59%_0]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5876 11.3057">
            <path d={svgPaths.p12de9d00} fill="var(--fill-0, #6D40FF)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[88.35%_8.23%_0_84.65%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.41703 2.33003">
            <path d={svgPaths.p15d8b580} fill="var(--fill-0, #6D40FF)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[21.99%_0_18.36%_76.65%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2092 11.9303">
            <path d={svgPaths.p31f45400} fill="var(--fill-0, #6D40FF)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function EmbeddedAppsLogoPoweredByLockupLightBackground() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-center p-[8px] relative shrink-0 w-[141.65px]" data-name="Embedded Apps Logo/Powered by lockup/Light background">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Embedded Apps logo/Powered by frame/Light background">
        <PoweredByHelveticaNeue />
      </div>
      <LogoWrapper />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-center justify-center relative shrink-0">
      <EmbeddedAppsLogoPoweredByLockupLightBackground />
    </div>
  );
}

function LabelWrap() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="label wrap">
      <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center leading-[1.3] min-h-px min-w-px not-italic pb-[4px] relative text-[#424f60] text-[12px] whitespace-nowrap" data-name="label">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0">Supplier business name</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0">(required)</p>
      </div>
    </div>
  );
}

function Content({ selectedSupplier }: { selectedSupplier: Supplier | null }) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[4px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px overflow-clip py-[0.5px] relative" data-name="inputText">
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[15px] whitespace-nowrap ${
              selectedSupplier ? 'text-[#1e3145]' : 'text-[#616b7a]'
            }`}>
              {selectedSupplier ? selectedSupplier.name : 'Select a supplier...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container7({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-[35.94%] left-1/4 overflow-clip right-1/4 top-[35.94%]" data-name="icon">
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
  );
}

function RightElement({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="content-stretch flex items-center justify-center py-[4px] relative shrink-0" data-name="rightElement">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="chevron">
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
        <Container7 isOpen={isOpen} />
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function InputWrap({ 
  selectedSupplier, 
  isOpen, 
  onToggle, 
  onSelect 
}: { 
  selectedSupplier: Supplier | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (supplier: Supplier | null) => void;
}) {
  return (
    <div className="relative w-full">
      <div 
        className="bg-white h-[40px] min-h-[40px] relative rounded-[6px] shrink-0 w-full cursor-pointer" 
        data-name="input wrap"
        onClick={onToggle}
      >
        <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="content-stretch flex gap-[4px] items-start min-h-[inherit] px-[8px] relative size-full">
          <Content selectedSupplier={selectedSupplier} />
          <RightElement isOpen={isOpen} />
        </div>
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={onToggle}
          />
          
          {/* Menu */}
          <div className="absolute z-[101] mt-1 w-full bg-white border border-[#cfd1d5] rounded-[6px] shadow-lg max-h-[300px] overflow-y-auto">
            {selectedSupplier && (
              <div 
                className="px-4 py-3 hover:bg-[#f7f8f9] cursor-pointer border-b border-[#e1e2e5] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(null);
                  onToggle();
                }}
              >
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[15px] text-[#616b7a] leading-[1.45]">
                  Clear selection
                </p>
              </div>
            )}
            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                className={`px-4 py-3 hover:bg-[#f7f8f9] cursor-pointer transition-colors ${
                  selectedSupplier?.id === supplier.id ? 'bg-[#e8f4ff]' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(supplier);
                  onToggle();
                }}
              >
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[15px] text-[#1e3145] leading-[1.45]">
                  {supplier.name}
                </p>
                {supplier.email && (
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#616b7a] leading-[1.3] mt-1">
                    {supplier.email}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Content1({ track1099 }: { track1099: boolean }) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="content">
      <div 
        className={`content-stretch flex h-[24px] items-center overflow-clip p-[2px] relative rounded-[100px] shrink-0 w-[40px] transition-all ${
          track1099 ? 'bg-[#1f68dd] justify-end' : 'bg-[#cfd1d5] justify-start'
        }`} 
        data-name="switch"
      >
        <div className="aspect-[18/18] h-full relative shrink-0" data-name="switch">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="switch" r="10" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[15px]">Track for 1099 reporting</p>
    </div>
  );
}

function LabelWrap1() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="label wrap">
      <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center leading-[1.3] min-h-px min-w-px not-italic pb-[4px] relative text-[#424f60] text-[12px] whitespace-nowrap" data-name="label">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0">Payment amount</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0">(required)</p>
      </div>
    </div>
  );
}

function Content2({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const formatCurrency = (val: string): string => {
    if (!val) return '';
    // Remove any non-numeric characters except decimal point
    const cleanVal = val.replace(/[^0-9.]/g, '');
    if (!cleanVal) return '';
    const num = parseFloat(cleanVal);
    if (isNaN(num)) return '';
    // Use template literal to ensure proper concatenation
    return `$${num.toFixed(2)}`;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    if (!inputValue || inputValue === '$') {
      onChange('');
      return;
    }
    // Add $ at the beginning if not present
    let valueToFormat = inputValue;
    if (!inputValue.startsWith('$')) {
      valueToFormat = '$' + inputValue;
    }
    const formatted = formatCurrency(valueToFormat);
    if (formatted) {
      onChange(formatted);
    } else {
      // If formatting failed, try to preserve what we have
      onChange(inputValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    // If completely empty, allow it
    if (!inputVal) {
      onChange('');
      return;
    }
    // Ensure $ is always at the start
    const cleaned = inputVal.replace(/[^0-9.$]/g, '');
    onChange(cleaned);
  };

  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[0.5px] relative" data-name="inputText">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="$0.00"
              className="w-full bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic text-[#1e3145] text-[15px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InputWrap1({ value, onChange, onClear }: { value: string; onChange: (value: string) => void; onClear: () => void }) {
  return (
    <div className="bg-white h-[40px] min-h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="input wrap">
      <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center min-h-[inherit] px-[8px] relative size-full">
          <Content2 value={value} onChange={onChange} />
          {value && (
            <button
              onClick={onClear}
              className="flex items-center justify-center shrink-0 w-[20px] h-[20px] rounded-full hover:bg-[#f0f0f0] transition-colors cursor-pointer"
              aria-label="Clear amount"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9 3L3 9M3 3L9 9" stroke="#424f60" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function LabelWrap2() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="label wrap">
      <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center leading-[1.3] min-h-px min-w-px not-italic pb-[4px] relative text-[#424f60] text-[12px] whitespace-nowrap" data-name="label">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0">Delivery date</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0">(required)</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[10.94%_15.63%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.75 15.625">
          <path d={svgPaths.p39eff70} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function LeftElement() {
  return (
    <div className="content-stretch flex items-center justify-center py-[4px] relative shrink-0" data-name="leftElement">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="leftIcon">
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
        <Container8 />
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content3({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="content">
      <div className="content-stretch flex items-start px-[4px] py-[8px] relative w-full">
        <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[0.5px] relative" data-name="inputText">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' || e.key === 'Delete') {
                onChange('');
              }
            }}
            placeholder=""
            className="w-full bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic text-[#1e3145] text-[15px]"
          />
        </div>
      </div>
    </div>
  );
}

function InputWrap2({ 
  selectedDate, 
  isDatePickerOpen, 
  onToggleDatePicker, 
  onDateSelect,
  onDateInputChange,
  formatDate 
}: { 
  selectedDate: Date | null;
  isDatePickerOpen: boolean;
  onToggleDatePicker: () => void;
  onDateSelect: (date: Date) => void;
  onDateInputChange: (value: string) => void;
  formatDate: (date: Date | null) => string;
}) {
  return (
    <div className="bg-white h-[40px] min-h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="input wrap">
      <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center min-h-[inherit] size-full cursor-pointer" onClick={onToggleDatePicker}>
        <div className="content-stretch flex gap-[4px] items-center min-h-[inherit] px-[8px] relative size-full">
          <LeftElement />
          <Content3 value={formatDate(selectedDate)} onChange={onDateInputChange} />
        </div>
      </div>
      {isDatePickerOpen && (
        <InteractiveDatePicker 
          selectedDate={selectedDate}
          onSelect={onDateSelect}
          onClose={onToggleDatePicker}
        />
      )}
    </div>
  );
}

function Frame3({ 
  paymentAmount,
  selectedDate,
  isDatePickerOpen,
  onAmountChange,
  onClearAmount,
  onDateSelect,
  onDateInputChange,
  onToggleDatePicker,
  formatDate
}: { 
  paymentAmount: string;
  selectedDate: Date | null;
  isDatePickerOpen: boolean;
  onAmountChange: (value: string) => void;
  onClearAmount: () => void;
  onDateSelect: (date: Date) => void;
  onDateInputChange: (value: string) => void;
  onToggleDatePicker: () => void;
  formatDate: (date: Date | null) => string;
}) {
  return (
    <div className="content-stretch flex gap-[20px] h-[60px] items-start relative shrink-0 w-[552px]">
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="TextInput/Text Input Default">
        <LabelWrap1 />
        <InputWrap1 
          value={paymentAmount}
          onChange={onAmountChange}
          onClear={onClearAmount}
        />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Date Input">
        <LabelWrap2 />
        <InputWrap2 
          selectedDate={selectedDate}
          isDatePickerOpen={isDatePickerOpen}
          onToggleDatePicker={onToggleDatePicker}
          onDateSelect={onDateSelect}
          onDateInputChange={onDateInputChange}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute h-[17.995px] left-[3px] top-[3px] w-[18px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 17.9953">
        <g id="Group 1321320797">
          <mask height="18" id="mask0_1_28997" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="18" x="0" y="0">
            <path d={svgPaths.p1387800} fill="var(--fill-0, white)" id="Vector" />
          </mask>
          <g mask="url(#mask0_1_28997)">
            <g id="Group 1321320798">
              <mask height="25" id="mask1_1_28997" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="-10" y="-3">
                <path d={svgPaths.p24cc6c80} fill="var(--fill-0, #0C5CD0)" id="Rectangle 334" />
              </mask>
              <g mask="url(#mask1_1_28997)">
                <path d={svgPaths.p24cc6c80} fill="var(--fill-0, #0C5CD0)" id="Rectangle 331" />
                <g filter="url(#filter0_f_1_28997)" id="Ellipse 2">
                  <ellipse cx="17.9086" cy="8.96228" fill="var(--fill-0, #0CC3FF)" rx="17.9086" ry="8.96228" transform="matrix(0.88309 0.469204 -0.686816 0.726832 1.16824 -6.62346)" />
                </g>
                <g filter="url(#filter1_f_1_28997)" id="Ellipse 6">
                  <ellipse cx="7.20714" cy="10.2399" fill="var(--fill-0, #0E5CD0)" rx="7.20714" ry="10.2399" transform="matrix(0.970281 -0.241982 0.457144 0.889393 -10.3818 -3.20067)" />
                </g>
                <g filter="url(#filter2_f_1_28997)" id="Ellipse 1">
                  <ellipse cx="7.20714" cy="10.2399" fill="var(--fill-0, #2C2CE2)" rx="7.20714" ry="10.2399" transform="matrix(0.970281 -0.241982 0.457144 0.889393 -9.9775 -2.02526)" />
                </g>
                <g filter="url(#filter3_f_1_28997)" id="Ellipse 5">
                  <ellipse cx="5.68234" cy="12.8101" fill="var(--fill-0, #1A1A88)" rx="5.68234" ry="12.8101" transform="matrix(0.284184 0.95877 -0.991921 0.12686 3.75858 -9.12848)" />
                </g>
                <g filter="url(#filter4_f_1_28997)" id="Ellipse 3">
                  <ellipse cx="7.01118" cy="6.95216" fill="var(--fill-0, #79ACFF)" rx="7.01118" ry="6.95216" transform="matrix(0.967645 0.252316 -0.389277 0.921121 4.05887 8.39217)" />
                </g>
                <g filter="url(#filter5_f_1_28997)" id="Ellipse 4">
                  <ellipse cx="7.01648" cy="8.60516" fill="var(--fill-0, #D3EFFF)" rx="7.01648" ry="8.60516" transform="matrix(0.920393 0.390994 -0.593343 0.80495 16.9212 6.20578)" />
                </g>
              </g>
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="33.732" id="filter0_f_1_28997" width="46.4172" x="-12.3809" y="-8.57259">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_28997" stdDeviation="3.11673" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29.9004" id="filter1_f_1_28997" width="28.1834" x="-12.7995" y="-10.7876">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_28997" stdDeviation="2.83787" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="29.9004" id="filter2_f_1_28997" width="28.1834" x="-12.3952" y="-9.61217">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_28997" stdDeviation="2.83787" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="23.7569" id="filter3_f_1_28997" width="38.0038" x="-26.3352" y="-13.9338">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_28997" stdDeviation="3.09585" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="25.674" id="filter4_f_1_28997" width="26.9957" x="-5.36097" y="3.72797">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_28997" stdDeviation="3.09585" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="25.2239" id="filter5_f_1_28997" width="26.7852" x="4.8807" y="3.26394">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_28997" stdDeviation="2.57988" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function FileUploaderButton() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] items-start ml-[51.5px] mt-[22px] relative row-1" data-name="_FileUploader/Button">
      <div className="content-stretch flex gap-[4px] items-center justify-center min-h-[32px] px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Button">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#1e3145] text-[13px] text-center whitespace-nowrap">
          <span className="leading-none">{`Drag and drop your file here, or `}</span>
          <span className="leading-none">browse and upload</span>
        </p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="col-1 font-['Inter:Regular',sans-serif] font-normal leading-[1.45] ml-0 mt-0 not-italic relative row-1 text-[#424f60] text-[15px] text-center w-[435px]">Let JAX extract the details. All you have to do is review.</p>
      <FileUploaderButton />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] h-[148px] items-center justify-center py-[17px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#a6aab1] border-dashed inset-[-0.5px] pointer-events-none" />
      <div className="h-[18.001px] relative shrink-0 w-[24px]" data-name="icon-sparkle-colour-small">
        <Group2 />
        <div className="absolute inset-[8.33%_70.83%_70.84%_8.33%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 3.74926">
            <path d={svgPaths.p39900f70} fill="var(--fill-0, #1758FF)" id="Vector" />
          </svg>
        </div>
      </div>
      <Group1 />
    </div>
  );
}

function FileUploaderDropzoneInput() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative shrink-0 w-full" data-name="_File Uploader/Dropzone Input">
      <Frame1 />
    </div>
  );
}

function FileUploaderFileInput() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="_File Uploader/File Input">
      <div className="content-stretch flex items-center pb-[4px] relative shrink-0" data-name="input label">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[#424f60] text-[17px] whitespace-nowrap">Start from a bill or invoice</p>
      </div>
      <FileUploaderDropzoneInput />
    </div>
  );
}

function FileUploader({ isBankConnected }: { isBankConnected: boolean }) {
  if (isBankConnected) {
    return null;
  }
  
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="File Uploader">
      <FileUploaderFileInput />
    </div>
  );
}

function Frame2({ 
  selectedSupplier, 
  isDropdownOpen, 
  track1099,
  paymentAmount,
  selectedDate,
  isDatePickerOpen,
  onToggleDropdown, 
  onSelectSupplier,
  onToggle1099,
  onAmountChange,
  onClearAmount,
  onDateSelect,
  onDateInputChange,
  onToggleDatePicker,
  formatDate
}: { 
  selectedSupplier: Supplier | null;
  isDropdownOpen: boolean;
  track1099: boolean;
  paymentAmount: string;
  selectedDate: Date | null;
  isDatePickerOpen: boolean;
  onToggleDropdown: () => void;
  onSelectSupplier: (supplier: Supplier | null) => void;
  onToggle1099: () => void;
  onAmountChange: (value: string) => void;
  onClearAmount: () => void;
  onDateSelect: (date: Date) => void;
  onDateInputChange: (value: string) => void;
  onToggleDatePicker: () => void;
  formatDate: (date: Date | null) => string;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <p className="font-['National_2:Bold',sans-serif] leading-[1.15] not-italic relative shrink-0 text-[#1e3145] text-[22px] w-[552px]">Payment details</p>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[552px]" data-name="Single Select">
        <LabelWrap />
        <InputWrap 
          selectedSupplier={selectedSupplier}
          isOpen={isDropdownOpen}
          onToggle={onToggleDropdown}
          onSelect={onSelectSupplier}
        />
      </div>
      <div 
        className="content-stretch cursor-pointer flex flex-col h-[24px] items-start justify-center relative shrink-0 w-[552px]" 
        data-name="Switch"
        onClick={onToggle1099}
      >
        <Content1 track1099={track1099} />
      </div>
      <Frame3 
        paymentAmount={paymentAmount}
        selectedDate={selectedDate}
        isDatePickerOpen={isDatePickerOpen}
        onAmountChange={onAmountChange}
        onClearAmount={onClearAmount}
        onDateSelect={onDateSelect}
        onDateInputChange={onDateInputChange}
        onToggleDatePicker={onToggleDatePicker}
        formatDate={formatDate}
      />
    </div>
  );
}

function LabelWrap3() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="label wrap">
      <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center leading-[1.3] min-h-px min-w-px not-italic pb-[4px] relative text-[#424f60] text-[12px] whitespace-nowrap" data-name="label">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0">Funding method</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0">(required)</p>
      </div>
    </div>
  );
}

function Wrapper() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Wrapper">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Wrapper">
          <path d={svgPaths.pcf33700} fill="var(--fill-0, #1279CD)" id="Vector" />
          <path d={svgPaths.pf91ca00} fill="var(--fill-0, #1279CD)" id="Vector_2" />
          <path d={svgPaths.p12443700} fill="var(--fill-0, #1279CD)" id="Vector_3" />
          <path d={svgPaths.p2454a200} fill="var(--fill-0, #1279CD)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-[35.94%] content-stretch flex items-start left-1/4 right-1/4 top-[35.94%]" data-name="icon">
        <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="🤍 Brand - Symbol">
          <Wrapper />
        </div>
      </div>
    </div>
  );
}

function Headings() {
  return (
    <div className="relative shrink-0 w-full" data-name="headings">
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap gap-[0px_12px] items-center pr-[12px] relative w-full">
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-h-[24px] not-italic relative shrink-0 text-[#1e3145] text-[15px] whitespace-nowrap">
            <p className="leading-[1.45]">Chase bank account •••7134</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="main content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pr-[16px] py-[12px] relative w-full">
          <Headings />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#424f60] text-[13px] w-full">My private checking account</p>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-[35.94%] left-1/4 overflow-clip right-1/4 top-[35.94%]" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0012 5.625">
          <path d={svgPaths.p95b0600} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function IconRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon right">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 size-[32px] top-1/2" data-name="rightIcon">
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
        <Container10 />
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Action() {
  return (
    <div className="content-stretch flex items-center justify-end px-[8px] relative shrink-0" data-name="action">
      <div className="content-stretch flex gap-[4px] items-center justify-center min-h-[32px] px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Button">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[13px] text-center whitespace-nowrap">&nbsp;</p>
        <IconRight />
      </div>
    </div>
  );
}

function Group({ onBankSelect }: { onBankSelect: (bank: Bank | null) => void }) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <p className="col-1 font-['National_2:Bold',sans-serif] leading-[1.15] ml-0 mt-0 not-italic relative row-1 text-[#1e3145] text-[22px] w-[552px]">How you pay your supplier</p>
      <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-[45px] relative row-1 w-[552px]" data-name="Methods">
        <LabelWrap3 />
        <div className="relative w-full">
          <BankDropdown onSelect={onBankSelect} />
        </div>
      </div>
    </div>
  );
}

function Frame4({ onBankSelect }: { onBankSelect: (bank: Bank | null) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[552px]">
      <Group onBankSelect={onBankSelect} />
    </div>
  );
}

function Frame({ 
  selectedSupplier, 
  isDropdownOpen, 
  track1099,
  paymentAmount,
  selectedDate,
  isDatePickerOpen,
  onToggleDropdown, 
  onSelectSupplier,
  onToggle1099,
  onAmountChange,
  onClearAmount,
  onDateSelect,
  onDateInputChange,
  onToggleDatePicker,
  formatDate,
  onBankSelect,
  deliveryMethod,
  onDeliveryMethodSelect,
  onManualSetupClick,
  manualBankDetails
}: { 
  selectedSupplier: Supplier | null;
  isDropdownOpen: boolean;
  track1099: boolean;
  paymentAmount: string;
  selectedDate: Date | null;
  isDatePickerOpen: boolean;
  onToggleDropdown: () => void;
  onSelectSupplier: (supplier: Supplier | null) => void;
  onToggle1099: () => void;
  onAmountChange: (value: string) => void;
  onClearAmount: () => void;
  onDateSelect: (date: Date) => void;
  onDateInputChange: (value: string) => void;
  onToggleDatePicker: () => void;
  formatDate: (date: Date | null) => string;
  onBankSelect: (bank: Bank | null) => void;
  deliveryMethod: 'jax' | 'manual' | null;
  onDeliveryMethodSelect: (method: 'jax' | 'manual') => void;
  onManualSetupClick: () => void;
  manualBankDetails: { accountNumber: string; routingNumber: string } | null;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame2 
        selectedSupplier={selectedSupplier}
        isDropdownOpen={isDropdownOpen}
        track1099={track1099}
        paymentAmount={paymentAmount}
        selectedDate={selectedDate}
        isDatePickerOpen={isDatePickerOpen}
        onToggleDropdown={onToggleDropdown}
        onSelectSupplier={onSelectSupplier}
        onToggle1099={onToggle1099}
        onAmountChange={onAmountChange}
        onClearAmount={onClearAmount}
        onDateSelect={onDateSelect}
        onDateInputChange={onDateInputChange}
        onToggleDatePicker={onToggleDatePicker}
        formatDate={formatDate}
      />
      <Frame4 onBankSelect={onBankSelect} />
      <DeliveryMethod 
        selectedMethod={deliveryMethod}
        onMethodSelect={onDeliveryMethodSelect}
        onManualSetupClick={onManualSetupClick}
        manualBankDetails={manualBankDetails}
      />
    </div>
  );
}

function RightContent({ isFormValid, onConnectBank }: { isFormValid: boolean; onConnectBank: () => void }) {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative rounded-[4px] shrink-0" data-name="right-content">
      <div className="bg-white content-stretch flex gap-[4px] items-center justify-center min-h-[40px] px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Secondary">
        <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[14px] text-center whitespace-nowrap">Cancel</p>
      </div>
      <button 
        disabled={!isFormValid}
        onClick={isFormValid ? onConnectBank : undefined}
        className={`content-stretch flex gap-[4px] items-center justify-center min-h-[40px] px-[12px] py-[8px] relative rounded-[8px] shrink-0 transition-colors ${
          isFormValid 
            ? 'bg-[#1f68dd] cursor-pointer hover:bg-[#1757c2]' 
            : 'bg-[#e1e2e5] cursor-not-allowed'
        }`}
        data-name="Primary"
      >
        <p className={`font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[14px] text-center whitespace-nowrap ${
          isFormValid ? 'text-white' : 'text-[#a6aab1]'
        }`}>
          Confirm and pay
        </p>
      </button>
    </div>
  );
}

function FormStackedTemplate({ 
  selectedSupplier, 
  isDropdownOpen, 
  track1099,
  paymentAmount,
  selectedDate,
  isDatePickerOpen,
  onToggleDropdown, 
  onSelectSupplier,
  onToggle1099,
  onAmountChange,
  onClearAmount,
  onDateSelect,
  onDateInputChange,
  onToggleDatePicker,
  formatDate,
  onBankSelect,
  isFormValid,
  onConnectBank,
  deliveryMethod,
  onDeliveryMethodSelect,
  onManualSetupClick,
  manualBankDetails
}: { 
  selectedSupplier: Supplier | null;
  isDropdownOpen: boolean;
  track1099: boolean;
  paymentAmount: string;
  selectedDate: Date | null;
  isDatePickerOpen: boolean;
  onToggleDropdown: () => void;
  onSelectSupplier: (supplier: Supplier | null) => void;
  onToggle1099: () => void;
  onAmountChange: (value: string) => void;
  onClearAmount: () => void;
  onDateSelect: (date: Date) => void;
  onDateInputChange: (value: string) => void;
  onToggleDatePicker: () => void;
  formatDate: (date: Date | null) => string;
  onBankSelect: (bank: Bank | null) => void;
  isFormValid: boolean;
  onConnectBank: () => void;
  deliveryMethod: 'jax' | 'manual' | null;
  onDeliveryMethodSelect: (method: 'jax' | 'manual') => void;
  onManualSetupClick: () => void;
  manualBankDetails: { accountNumber: string; routingNumber: string } | null;
}) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full min-h-[800px]" data-name="Form/Stacked (Template)">
      <Frame 
        selectedSupplier={selectedSupplier}
        isDropdownOpen={isDropdownOpen}
        track1099={track1099}
        paymentAmount={paymentAmount}
        selectedDate={selectedDate}
        isDatePickerOpen={isDatePickerOpen}
        onToggleDropdown={onToggleDropdown}
        onSelectSupplier={onSelectSupplier}
        onToggle1099={onToggle1099}
        onAmountChange={onAmountChange}
        onClearAmount={onClearAmount}
        onDateSelect={onDateSelect}
        onDateInputChange={onDateInputChange}
        onToggleDatePicker={onToggleDatePicker}
        formatDate={formatDate}
        onBankSelect={onBankSelect}
        deliveryMethod={deliveryMethod}
        onDeliveryMethodSelect={onDeliveryMethodSelect}
        onManualSetupClick={onManualSetupClick}
        manualBankDetails={manualBankDetails}
      />
      <div className="flex-1" style={{ minHeight: '150px' }} />
      <div className="content-stretch flex items-start justify-end relative rounded-[4px] shrink-0 w-full" data-name="Actions (Inline)">
        <RightContent isFormValid={isFormValid} onConnectBank={onConnectBank} />
      </div>
    </div>
  );
}

function PanelBodySlot({ 
  selectedSupplier, 
  isDropdownOpen, 
  track1099,
  paymentAmount,
  selectedDate,
  isDatePickerOpen,
  onToggleDropdown, 
  onSelectSupplier,
  onToggle1099,
  onAmountChange,
  onClearAmount,
  onDateSelect,
  onDateInputChange,
  onToggleDatePicker,
  formatDate,
  onBankSelect,
  isFormValid,
  onConnectBank,
  deliveryMethod,
  onDeliveryMethodSelect,
  onManualSetupClick,
  manualBankDetails
}: { 
  selectedSupplier: Supplier | null;
  isDropdownOpen: boolean;
  track1099: boolean;
  paymentAmount: string;
  selectedDate: Date | null;
  isDatePickerOpen: boolean;
  onToggleDropdown: () => void;
  onSelectSupplier: (supplier: Supplier | null) => void;
  onToggle1099: () => void;
  onAmountChange: (value: string) => void;
  onClearAmount: () => void;
  onDateSelect: (date: Date) => void;
  onDateInputChange: (value: string) => void;
  onToggleDatePicker: () => void;
  formatDate: (date: Date | null) => string;
  onBankSelect: (bank: Bank | null) => void;
  isFormValid: boolean;
  onConnectBank: () => void;
  deliveryMethod: 'jax' | 'manual' | null;
  onDeliveryMethodSelect: (method: 'jax' | 'manual') => void;
  onManualSetupClick: () => void;
  manualBankDetails: { accountNumber: string; routingNumber: string } | null;
}) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Panel Body Slot">
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Content">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col items-center p-[24px] relative w-full">
            <FormStackedTemplate 
              selectedSupplier={selectedSupplier}
              isDropdownOpen={isDropdownOpen}
              track1099={track1099}
              paymentAmount={paymentAmount}
              selectedDate={selectedDate}
              isDatePickerOpen={isDatePickerOpen}
              onToggleDropdown={onToggleDropdown}
              onSelectSupplier={onSelectSupplier}
              onToggle1099={onToggle1099}
              onAmountChange={onAmountChange}
              onClearAmount={onClearAmount}
              onDateSelect={onDateSelect}
              onDateInputChange={onDateInputChange}
              onToggleDatePicker={onToggleDatePicker}
              formatDate={formatDate}
              onBankSelect={onBankSelect}
              isFormValid={isFormValid}
              onConnectBank={onConnectBank}
              deliveryMethod={deliveryMethod}
              onDeliveryMethodSelect={onDeliveryMethodSelect}
              onManualSetupClick={onManualSetupClick}
              manualBankDetails={manualBankDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Body({ 
  selectedSupplier, 
  isDropdownOpen, 
  track1099,
  paymentAmount,
  selectedDate,
  isDatePickerOpen,
  onToggleDropdown, 
  onSelectSupplier,
  onToggle1099,
  onAmountChange,
  onClearAmount,
  onDateSelect,
  onDateInputChange,
  onToggleDatePicker,
  formatDate,
  onBankSelect,
  isFormValid,
  onConnectBank,
  deliveryMethod,
  onDeliveryMethodSelect,
  onManualSetupClick,
  manualBankDetails
}: { 
  selectedSupplier: Supplier | null;
  isDropdownOpen: boolean;
  track1099: boolean;
  paymentAmount: string;
  selectedDate: Date | null;
  isDatePickerOpen: boolean;
  onToggleDropdown: () => void;
  onSelectSupplier: (supplier: Supplier | null) => void;
  onToggle1099: () => void;
  onAmountChange: (value: string) => void;
  onClearAmount: () => void;
  onDateSelect: (date: Date) => void;
  onDateInputChange: (value: string) => void;
  onToggleDatePicker: () => void;
  formatDate: (date: Date | null) => string;
  onBankSelect: (bank: Bank | null) => void;
  isFormValid: boolean;
  onConnectBank: () => void;
  deliveryMethod: 'jax' | 'manual' | null;
  onDeliveryMethodSelect: (method: 'jax' | 'manual') => void;
  onManualSetupClick: () => void;
  manualBankDetails: { accountNumber: string; routingNumber: string } | null;
}) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="body">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <PanelBodySlot 
          selectedSupplier={selectedSupplier}
          isDropdownOpen={isDropdownOpen}
          track1099={track1099}
          paymentAmount={paymentAmount}
          selectedDate={selectedDate}
          isDatePickerOpen={isDatePickerOpen}
          onToggleDropdown={onToggleDropdown}
          onSelectSupplier={onSelectSupplier}
          onToggle1099={onToggle1099}
          onAmountChange={onAmountChange}
          onClearAmount={onClearAmount}
          onDateSelect={onDateSelect}
          onDateInputChange={onDateInputChange}
          onToggleDatePicker={onToggleDatePicker}
          formatDate={formatDate}
          onBankSelect={onBankSelect}
          isFormValid={isFormValid}
          onConnectBank={onConnectBank}
          deliveryMethod={deliveryMethod}
          onDeliveryMethodSelect={onDeliveryMethodSelect}
          onManualSetupClick={onManualSetupClick}
          manualBankDetails={manualBankDetails}
        />
      </div>
    </div>
  );
}

function LayoutGuidesInsertContentHere({ 
  selectedSupplier, 
  isDropdownOpen, 
  track1099,
  paymentAmount,
  selectedDate,
  isDatePickerOpen,
  onToggleDropdown, 
  onSelectSupplier,
  onToggle1099,
  onAmountChange,
  onClearAmount,
  onDateSelect,
  onDateInputChange,
  onToggleDatePicker,
  formatDate,
  onBankSelect,
  isFormValid,
  onConnectBank,
  deliveryMethod,
  onDeliveryMethodSelect,
  onManualSetupClick,
  manualBankDetails
}: { 
  selectedSupplier: Supplier | null;
  isDropdownOpen: boolean;
  track1099: boolean;
  paymentAmount: string;
  selectedDate: Date | null;
  isDatePickerOpen: boolean;
  onToggleDropdown: () => void;
  onSelectSupplier: (supplier: Supplier | null) => void;
  onToggle1099: () => void;
  onAmountChange: (value: string) => void;
  onClearAmount: () => void;
  onDateSelect: (date: Date) => void;
  onDateInputChange: (value: string) => void;
  onToggleDatePicker: () => void;
  formatDate: (date: Date | null) => string;
  onBankSelect: (bank: Bank | null) => void;
  isFormValid: boolean;
  onConnectBank: () => void;
  deliveryMethod: 'jax' | 'manual' | null;
  onDeliveryMethodSelect: (method: 'jax' | 'manual') => void;
  onManualSetupClick: () => void;
  manualBankDetails: { accountNumber: string; routingNumber: string } | null;
}) {
  return (
    <div className="flex-[1_0_0] max-w-[1300px] min-h-px min-w-[1300px] relative" data-name="Layout guides (insert content here)">
      <div className="flex flex-col items-center max-w-[inherit] min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center max-w-[inherit] min-w-[inherit] px-[20px] py-[48px] relative w-full">
          <div className="bg-white max-w-[600px] relative rounded-[8px] shrink-0 w-full z-0" data-name="Panel">
            <div className="content-stretch flex items-start max-w-[inherit] p-px relative rounded-[inherit] w-full">
              <Body 
                selectedSupplier={selectedSupplier}
                isDropdownOpen={isDropdownOpen}
                track1099={track1099}
                paymentAmount={paymentAmount}
                selectedDate={selectedDate}
                isDatePickerOpen={isDatePickerOpen}
                onToggleDropdown={onToggleDropdown}
                onSelectSupplier={onSelectSupplier}
                onToggle1099={onToggle1099}
                onAmountChange={onAmountChange}
                onClearAmount={onClearAmount}
                onDateSelect={onDateSelect}
                onDateInputChange={onDateInputChange}
                onToggleDatePicker={onToggleDatePicker}
                formatDate={formatDate}
                onBankSelect={onBankSelect}
                isFormValid={isFormValid}
                onConnectBank={onConnectBank}
                deliveryMethod={deliveryMethod}
                onDeliveryMethodSelect={onDeliveryMethodSelect}
                onManualSetupClick={onManualSetupClick}
                manualBankDetails={manualBankDetails}
              />
            </div>
            <div aria-hidden="true" className="absolute border border-[#a6aab1] border-solid inset-0 pointer-events-none rounded-[8px] z-[-1]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LayoutWrapperDoNotRemove({ 
  selectedSupplier, 
  isDropdownOpen, 
  track1099,
  paymentAmount,
  selectedDate,
  isDatePickerOpen,
  onToggleDropdown, 
  onSelectSupplier,
  onToggle1099,
  onAmountChange,
  onClearAmount,
  onDateSelect,
  onDateInputChange,
  onToggleDatePicker,
  formatDate,
  onBankSelect,
  isFormValid,
  onConnectBank,
  deliveryMethod,
  onDeliveryMethodSelect,
  onManualSetupClick,
  manualBankDetails
}: { 
  selectedSupplier: Supplier | null;
  isDropdownOpen: boolean;
  track1099: boolean;
  paymentAmount: string;
  selectedDate: Date | null;
  isDatePickerOpen: boolean;
  onToggleDropdown: () => void;
  onSelectSupplier: (supplier: Supplier | null) => void;
  onToggle1099: () => void;
  onAmountChange: (value: string) => void;
  onClearAmount: () => void;
  onDateSelect: (date: Date) => void;
  onDateInputChange: (value: string) => void;
  onToggleDatePicker: () => void;
  formatDate: (date: Date | null) => string;
  onBankSelect: (bank: Bank | null) => void;
  isFormValid: boolean;
  onConnectBank: () => void;
  deliveryMethod: 'jax' | 'manual' | null;
  onDeliveryMethodSelect: (method: 'jax' | 'manual') => void;
  onManualSetupClick: () => void;
  manualBankDetails: { accountNumber: string; routingNumber: string } | null;
}) {
  return (
    <div className="content-stretch flex items-start justify-center min-w-[320px] relative shrink-0 w-[1580px]" data-name="Layout wrapper (do not remove)">
      <LayoutGuidesInsertContentHere 
        selectedSupplier={selectedSupplier}
        isDropdownOpen={isDropdownOpen}
        track1099={track1099}
        paymentAmount={paymentAmount}
        selectedDate={selectedDate}
        isDatePickerOpen={isDatePickerOpen}
        onToggleDropdown={onToggleDropdown}
        onSelectSupplier={onSelectSupplier}
        onToggle1099={onToggle1099}
        onAmountChange={onAmountChange}
        onClearAmount={onClearAmount}
        onDateSelect={onDateSelect}
        onDateInputChange={onDateInputChange}
        onToggleDatePicker={onToggleDatePicker}
        formatDate={formatDate}
        onBankSelect={onBankSelect}
        isFormValid={isFormValid}
        onConnectBank={onConnectBank}
        deliveryMethod={deliveryMethod}
        onDeliveryMethodSelect={onDeliveryMethodSelect}
        onManualSetupClick={onManualSetupClick}
        manualBankDetails={manualBankDetails}
      />
    </div>
  );
}

function PageBody({ 
  selectedSupplier, 
  isDropdownOpen, 
  track1099,
  paymentAmount,
  selectedDate,
  isDatePickerOpen,
  onToggleDropdown, 
  onSelectSupplier,
  onToggle1099,
  onAmountChange,
  onClearAmount,
  onDateSelect,
  onDateInputChange,
  onToggleDatePicker,
  formatDate,
  onBankSelect,
  isFormValid,
  onConnectBank,
  deliveryMethod,
  onDeliveryMethodSelect,
  onManualSetupClick,
  manualBankDetails
}: { 
  selectedSupplier: Supplier | null;
  isDropdownOpen: boolean;
  track1099: boolean;
  paymentAmount: string;
  selectedDate: Date | null;
  isDatePickerOpen: boolean;
  onToggleDropdown: () => void;
  onSelectSupplier: (supplier: Supplier | null) => void;
  onToggle1099: () => void;
  onAmountChange: (value: string) => void;
  onClearAmount: () => void;
  onDateSelect: (date: Date) => void;
  onDateInputChange: (value: string) => void;
  onToggleDatePicker: () => void;
  formatDate: (date: Date | null) => string;
  onBankSelect: (bank: Bank | null) => void;
  isFormValid: boolean;
  onConnectBank: () => void;
  deliveryMethod: 'jax' | 'manual' | null;
  onDeliveryMethodSelect: (method: 'jax' | 'manual') => void;
  onManualSetupClick: () => void;
  manualBankDetails: { accountNumber: string; routingNumber: string } | null;
}) {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[1580px]" data-name="Page body">
      <LayoutWrapperDoNotRemove 
        selectedSupplier={selectedSupplier}
        isDropdownOpen={isDropdownOpen}
        track1099={track1099}
        paymentAmount={paymentAmount}
        selectedDate={selectedDate}
        isDatePickerOpen={isDatePickerOpen}
        onToggleDropdown={onToggleDropdown}
        onSelectSupplier={onSelectSupplier}
        onToggle1099={onToggle1099}
        onAmountChange={onAmountChange}
        onClearAmount={onClearAmount}
        onDateSelect={onDateSelect}
        onDateInputChange={onDateInputChange}
        onToggleDatePicker={onToggleDatePicker}
        formatDate={formatDate}
        onBankSelect={onBankSelect}
        isFormValid={isFormValid}
        onConnectBank={onConnectBank}
        deliveryMethod={deliveryMethod}
        onDeliveryMethodSelect={onDeliveryMethodSelect}
        onManualSetupClick={onManualSetupClick}
        manualBankDetails={manualBankDetails}
      />
    </div>
  );
}

export default function PaymentDetails() {
  const navigate = useNavigate();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [track1099, setTrack1099] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'jax' | 'manual' | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [manualBankDetails, setManualBankDetails] = useState<{
    accountNumber: string;
    routingNumber: string;
  } | null>(null);

  // Set default bank (Chase) on mount
  useEffect(() => {
    const defaultBank = banks.find(b => b.id === '1'); // Chase bank
    if (defaultBank) {
      setSelectedBank(defaultBank);
    }
  }, []);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectSupplier = (supplier: Supplier | null) => {
    setSelectedSupplier(supplier);
    if (supplier) {
      setTrack1099(supplier.track1099);
    } else {
      setTrack1099(false);
    }
  };

  const handleToggle1099 = () => {
    setTrack1099(!track1099);
  };

  const handleBankSelect = (bank: Bank | null) => {
    setSelectedBank(bank);
  };

  const handleAmountChange = (value: string) => {
    setPaymentAmount(value);
  };

  const handleClearAmount = () => {
    setPaymentAmount('');
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  const handleDateInputChange = (value: string) => {
    if (value === '') {
      setSelectedDate(null);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Check if all required fields are filled
  const isFormValid = Boolean(
    selectedSupplier && 
    paymentAmount && 
    parseFloat(paymentAmount.replace(/[$,]/g, '')) > 0 &&
    selectedDate &&
    deliveryMethod !== null
  );

  const handleConnectBank = () => {
    // Navigate to confirmation page with payment data
    const formatDateForDisplay = (date: Date | null): string => {
      if (!date) return '';
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    };

    const paymentData = {
      supplier: selectedSupplier?.name || '',
      billNumber: '00199291',
      paymentMethod: selectedBank ? `${selectedBank.name} bank account ${selectedBank.accountNumber}` : '',
      fundingMethod: selectedBank ? {
        bankName: selectedBank.name,
        accountNumber: selectedBank.accountNumber,
        accountType: selectedBank.accountType
      } : null,
      debitDate: formatDateForDisplay(selectedDate),
      deliveryMethod: deliveryMethod || 'jax',
      deliveryDate: formatDateForDisplay(selectedDate),
      amount: paymentAmount.replace(/[$,]/g, ''), // Strip $ and commas for numeric storage
      w9Required: track1099,
      manualBankDetails: manualBankDetails,
    };

    // Store in localStorage as backup
    localStorage.setItem('paymentData', JSON.stringify(paymentData));

    navigate('/payment-confirmation', {
      state: paymentData
    });
  };

  return (
    <>
      <div className="bg-[#f6f6f8] content-stretch flex flex-col items-center relative size-full" data-name="Payment details">
      <div className="bg-[#1f68dd] content-stretch flex items-center justify-between min-w-[1440px] relative shrink-0 w-full" data-name="Navigation">
        <Left />
        <div className="content-stretch flex gap-[8px] items-center px-[12px] relative shrink-0" data-name="Global tools">
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0" data-name="Create new">
            <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[40px]" data-name="Icon/Addition">
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
              <Container1 />
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0" data-name="JAX">
            <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[40px]" data-name="Icon/AI">
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
              <Container2 />
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0" data-name="Search">
            <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[40px]" data-name="Icon/Search">
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
              <Container3 />
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0" data-name="Help">
            <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[40px]" data-name="Icon/Question">
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
              <Container4 />
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0" data-name="Notifications">
            <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[40px]" data-name="Icon/Notification">
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
              <Container5 />
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0" data-name="Apps">
            <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[40px]" data-name="Icon/Grid">
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
              <Container6 />
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
            </div>
          </div>
          <div className="relative shrink-0 size-[40px]" data-name="user">
            <div className="absolute bg-[#a4eefe] inset-0 overflow-clip rounded-[100px]" data-name="Avatar">
              <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-0 not-italic right-0 text-[#0a353e] text-[17px] text-center top-1/2">
                <p className="leading-[1.45]">AX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentPageHeader paymentAmount={paymentAmount} selectedDate={selectedDate} />
      <PageBody 
        selectedSupplier={selectedSupplier}
        isDropdownOpen={isDropdownOpen}
        track1099={track1099}
        paymentAmount={paymentAmount}
        selectedDate={selectedDate}
        isDatePickerOpen={isDatePickerOpen}
        onToggleDropdown={handleToggleDropdown}
        onSelectSupplier={handleSelectSupplier}
        onToggle1099={handleToggle1099}
        onAmountChange={handleAmountChange}
        onClearAmount={handleClearAmount}
        onDateSelect={handleDateSelect}
        onDateInputChange={handleDateInputChange}
        onToggleDatePicker={() => setIsDatePickerOpen(!isDatePickerOpen)}
        formatDate={formatDate}
        onBankSelect={handleBankSelect}
        isFormValid={isFormValid}
        onConnectBank={handleConnectBank}
        deliveryMethod={deliveryMethod}
        onDeliveryMethodSelect={(method) => {
          setDeliveryMethod(method);
          if (method === 'jax') setIsPanelOpen(false);
        }}
        onManualSetupClick={() => setIsPanelOpen(true)}
        manualBankDetails={manualBankDetails}
      />
      </div>
      
      <DeliveryMethodsPanel 
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSave={(details) => {
          setManualBankDetails(details);
          setIsPanelOpen(false);
        }}
      />
    </>
  );
}