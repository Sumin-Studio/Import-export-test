import { useNavigate } from 'react-router';
import svgPaths from "../imports/svg-cwouv49jeg";

function Top() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[12px] relative shrink-0 w-full" data-name="top">
      <div className="bg-white h-[8px] shrink-0 w-full" data-name="Spacer" />
    </div>
  );
}

function PageTitleFrame({ onClose }: { onClose: () => void }) {
  return (
    <div className="content-stretch flex h-[32px] items-center gap-[12px] relative shrink-0" data-name="Page title frame">
      <button
        onClick={onClose}
        className="flex items-center justify-center w-[24px] h-[24px] shrink-0 text-[#1e3145] hover:text-[#424f60] transition-colors"
        aria-label="Close"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
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

function TitleRow({ paymentAmount, selectedDate, onClose }: { paymentAmount: string; selectedDate: Date | null; onClose: () => void }) {
  return (
    <div className="content-center flex flex-wrap gap-y-[8px] items-center justify-between relative shrink-0 w-full" data-name="titleRow">
      <div className="content-start flex flex-wrap gap-[8px] h-[32px] items-start relative shrink-0" data-name="Page Title Group">
        <PageTitleFrame onClose={onClose} />
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
        <g id="POWERED BY â Helvetica Neue 9/10">
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

interface PaymentPageHeaderProps {
  paymentAmount: string;
  selectedDate: Date | null;
}

export function PaymentPageHeader({ paymentAmount, selectedDate }: PaymentPageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e1e2e5] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[30px] items-center pr-[20px] relative w-full">
          <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative" data-name="Header (Non-Dashboard)">
            <div className="content-stretch flex flex-col items-start px-[20px] relative w-full">
              <Top />
              <TitleRow paymentAmount={paymentAmount} selectedDate={selectedDate} onClose={() => navigate('/')} />
              <Bottom />
            </div>
          </div>
          <Frame5 />
        </div>
      </div>
    </div>
  );
}