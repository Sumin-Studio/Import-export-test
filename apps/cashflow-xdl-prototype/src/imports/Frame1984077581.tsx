import svgPaths from "./svg-rsmav65mln";
import imgImage1 from "figma:asset/5a08bf5b884307f6dd6bf7c5f0cbb884343cf4cd.png";
import { imgTotal } from "./svg-29f5e";
import { BankDropdown } from '../components/BankDropdown';
import { Bank } from '../data/banks';

function ContentMiddle() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[10px] items-center max-w-[312px] min-h-[32px] min-w-px relative self-stretch" data-name="_content middle">
      <p className="flex-[1_0_0] font-['National_2:Bold',sans-serif] leading-[1.15] max-w-[312px] min-h-px min-w-px not-italic overflow-hidden relative text-[#1e3145] text-[22px] text-ellipsis whitespace-nowrap">Connect to Melio</p>
    </div>
  );
}

function ContentLeft() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-start min-h-px min-w-px relative" data-name="content left">
      <ContentMiddle />
    </div>
  );
}

function Container() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[26.99%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.20494 9.20496">
          <path d={svgPaths.p1e185e80} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="icon">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 size-[32px] top-1/2" data-name="icon">
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
  );
}

function ContentRight({ onClose }: { onClose?: () => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="content right">
      <button
        onClick={onClose}
        className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[32px] hover:bg-[#f0f0f0] transition-colors cursor-pointer"
        data-name="Close"
        aria-label="Close modal"
      >
        <Icon />
      </button>
    </div>
  );
}

function ContentTop({ onClose }: { onClose?: () => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="content top">
      <div className="content-stretch flex gap-[8px] items-start pl-[12px] pr-[8px] relative w-full">
        <ContentLeft />
        <ContentRight onClose={onClose} />
      </div>
    </div>
  );
}

function SidePanelSidePanelHeader({ onClose }: { onClose?: () => void }) {
  return (
    <div className="bg-white relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full" data-name="Side panel/Side panel Header">
      <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
        <ContentTop onClose={onClose} />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[6px] relative rounded-[20px] shrink-0 w-full" data-name="container">
      <div className="absolute inset-px" data-name="border">
        <div className="absolute inset-[-25%_-0.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 298 6">
            <path d={svgPaths.p39e70500} fill="var(--fill-0, #CFD1D5)" id="border" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#cfd1d5] inset-px mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0%] mask-size-[100%_100%] rounded-[20px]" data-name="total" style={{ maskImage: `url('${imgTotal}')` }}>
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[21px]" />
      </div>
      <div className="absolute inset-px mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0%] mask-size-[100%_100%]" data-name="progress" style={{ maskImage: `url('${imgTotal}')` }}>
        <div className="absolute bg-[#1f68dd] inset-[0_0%_0_0] rounded-[4px] shadow-[0px_0px_0px_1px_white]" data-name="bar" />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[47px] mt-0 place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[49px]">
        <div className="absolute inset-[-4.08%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
            <circle cx="26.5" cy="26.5" fill="var(--fill-0, black)" id="Ellipse 1287" r="25.5" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[12px] mt-[12px] relative row-1 size-[25px]" data-name="image 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[199.6%] left-[-50.4%] max-w-none top-[-50.5%] w-[200%]" src={imgImage1} />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[49px]" data-name="Xero Logo">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 49">
          <g id="Group">
            <path clipRule="evenodd" d={svgPaths.p1154ab00} fill="var(--fill-0, #13B5EA)" fillRule="evenodd" id="Fill 24" />
            <path clipRule="evenodd" d={svgPaths.p2185c00} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 25" />
            <path clipRule="evenodd" d={svgPaths.p1674b898} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 26" />
            <path clipRule="evenodd" d={svgPaths.p3d84c060} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 27" />
            <path clipRule="evenodd" d={svgPaths.p2c463c80} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 28" />
            <path clipRule="evenodd" d={svgPaths.p2ea57c00} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 29" />
          </g>
        </svg>
      </div>
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group2 />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[6.25%_12.5%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0019 17.5">
          <path d={svgPaths.p2f0c1480} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px pt-[6px] relative">
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium h-[67px] leading-[1.45] min-h-px min-w-px not-italic relative text-[0px] text-[13px] text-black">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold mb-[10px]">Connect in seconds</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal">Thousands of apps trust Plaid to quickly connect to financial institutions</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Icon/Suggestion">
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
      <Frame6 />
    </div>
  );
}

function Container3() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[9.38%_15.63%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.75 16.25">
          <path d={svgPaths.p24ec3680} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px pt-[6px] relative">
      <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium h-[67px] leading-[1.45] min-h-px min-w-px not-italic relative text-[0px] text-[13px] text-black">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold mb-[10px]">Keep your data safe</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal">Plaid uses best-in-class encryption to help protect your data</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Icon/Shield">
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
      <Frame7 />
    </div>
  );
}

function PanelBodySlot() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Panel Body Slot">
      <div className="content-stretch flex flex-col gap-[20px] items-start relative rounded-[6px] shrink-0 w-full" data-name="Content">
        <Frame4 />
        <Frame5 />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="body">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <PanelBodySlot />
      </div>
    </div>
  );
}

function LabelWrap() {
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

function Container4() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-[35.94%] content-stretch flex items-start left-1/4 right-1/4 top-[35.94%]" data-name="icon">
        <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name=" Brand - Symbol">
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

function Container5() {
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
        <Container5 />
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

function Frame() {
  return (
    <div className="bg-white h-[33px] relative rounded-[12px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center py-[18px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-h-px min-w-px not-italic relative text-[#5e5e5e] text-[0px] text-[13px] text-center">
            <span className="leading-[1.45]">{`By continuing, you agree to Plaid's `}</span>
            <span className="decoration-solid leading-[1.45] underline">Privacy Policy</span>
            <span className="leading-[1.45]">{` and to receiving updates on plaid.com`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function PaymentMethod({ selectedBank, onBankSelect }: { selectedBank: Bank | null; onBankSelect: (bank: Bank | null) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0 w-full" data-name="Payment method">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#18191b] text-[17px] text-center w-full">
        <p className="leading-[1.45] mt-[-45px]">Connect your Xero account with Plaid</p>
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Panel">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-start px-[25px] py-[26px] relative w-full">
            <Body />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e1e2e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Methods">
        <LabelWrap />
        <BankDropdown 
          onSelect={onBankSelect}
        />
      </div>
    </div>
  );
}

function Frame3({ onContinue }: { onContinue?: () => void }) {
  return (
    <button
      onClick={onContinue}
      className="bg-black h-[57px] relative rounded-[8px] shrink-0 w-full hover:bg-[#333] transition-colors cursor-pointer"
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[27px] py-[16px] relative size-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">Continue</p>
        </div>
      </div>
    </button>
  );
}

function PrivacyAndContinueGroup({ onContinue }: { onContinue?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full gap-[16px]">
      <Frame />
      <Frame3 onContinue={onContinue} />
    </div>
  );
}

function Frame2({ selectedBank, onBankSelect, onContinue }: { selectedBank: Bank | null; onBankSelect: (bank: Bank | null) => void; onContinue?: () => void }) {
  return (
    <div className="content-stretch flex flex-col h-[609px] items-start justify-between relative shrink-0 w-full">
      <PaymentMethod selectedBank={selectedBank} onBankSelect={onBankSelect} />
      <PrivacyAndContinueGroup onContinue={onContinue} />
    </div>
  );
}

function Frame1({ selectedBank, onBankSelect, onContinue }: { selectedBank: Bank | null; onBankSelect: (bank: Bank | null) => void; onContinue?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[41px] items-center relative shrink-0 w-[439px] h-full justify-between">
      <div className="content-stretch flex flex-col gap-[41px] items-center px-[30px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-[298px]" data-name="Progress Linear">
          <Container1 />
        </div>
        <Group4 />
      </div>
      <div className="content-stretch flex flex-col px-[30px] relative shrink-0 w-full">
        <Frame2 selectedBank={selectedBank} onBankSelect={onBankSelect} onContinue={onContinue} />
      </div>
    </div>
  );
}

export default function Frame8({ onClose, selectedBank, onBankSelect, onContinue }: { onClose?: () => void; selectedBank: Bank | null; onBankSelect: (bank: Bank | null) => void; onContinue?: () => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-center relative rounded-[12px] shadow-[0px_8px_16px_0px_rgba(0,10,30,0.2)] w-full h-[906px]">
      <SidePanelSidePanelHeader onClose={onClose} />
      <div className="flex-1 content-stretch flex flex-col pb-[30px] relative shrink-0 w-full">
        <Frame1 selectedBank={selectedBank} onBankSelect={onBankSelect} onContinue={onContinue} />
      </div>
    </div>
  );
}