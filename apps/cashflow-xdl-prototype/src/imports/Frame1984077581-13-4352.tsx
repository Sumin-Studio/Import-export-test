import svgPaths from "./svg-sxo7spyw40";
import imgImage75 from "figma:asset/1fb2f0a2813d6ff64070713b00b396d3529dc9ad.png";
import { imgTotal } from "./svg-kbf2x";

interface Frame2Props {
  onClose?: () => void;
  onDone?: () => void;
}

function Container() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[21.87%_15.63%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.75 11.2501">
          <path d={svgPaths.p3b787b00} fill="var(--fill-0, #1E3145)" id="vector" />
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
      <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[32px]" data-name="Icon Button">
        <Icon />
      </div>
      <ContentMiddle />
    </div>
  );
}

function Container1() {
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

function Icon1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="icon">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 size-[32px] top-1/2" data-name="icon">
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
  );
}

function ContentRight({ onClose }: { onClose?: () => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="content right">
      <button
        onClick={onClose}
        className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[32px] hover:bg-gray-100 transition-colors cursor-pointer"
        data-name="Close"
      >
        <Icon1 />
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
    <div className="bg-white content-stretch flex flex-col items-start py-[12px] relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full" data-name="Side panel/Side panel Header">
      <ContentTop onClose={onClose} />
    </div>
  );
}

function Container2() {
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
        <div className="absolute bg-[#1f68dd] inset-0 rounded-[4px] shadow-[0px_0px_0px_1px_white]" data-name="bar" />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[148.5px] mt-[47px] place-items-start relative row-1">
      <div className="col-1 h-[56.292px] ml-0 mt-0 relative row-1 w-[82px]" data-name="image 75">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage75} />
      </div>
    </div>
  );
}

function PaymentMethod() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[36px] items-start ml-0 mt-[144.29px] not-italic relative row-1 text-[#18191b] text-center w-[379px]" data-name="Payment method">
      <div className="flex flex-col font-['National_2:Bold',sans-serif] justify-center relative shrink-0 text-[22px] w-full">
        <p className="leading-[1.15]">Success!</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[17px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">
          {`You’re account has been successfully `}
          <br aria-hidden="true" />
          connect to Melio.
        </p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 content-stretch flex flex-col items-start ml-[40.5px] mt-0 relative row-1 w-[298px]" data-name="Progress Linear">
        <Container2 />
      </div>
      <Group />
      <PaymentMethod />
    </div>
  );
}

function Frame1({ onDone }: { onDone?: () => void }) {
  return (
    <button
      onClick={onDone}
      className="bg-black h-[57px] relative rounded-[8px] shrink-0 w-full hover:bg-gray-900 transition-colors cursor-pointer"
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[27px] py-[16px] relative size-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">Done</p>
        </div>
      </div>
    </button>
  );
}

function Frame({ onClose, onDone }: { onClose?: () => void; onDone?: () => void }) {
  return (
    <div className="flex-1 content-stretch flex flex-col items-center justify-between min-h-px min-w-px px-[30px] pb-[30px] relative w-[439px]">
      <Group1 />
      <Frame1 onDone={onDone} />
    </div>
  );
}

export default function Frame2({ onClose, onDone }: Frame2Props) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-center relative rounded-[12px] shadow-[0px_8px_16px_0px_rgba(0,10,30,0.2)] w-full h-[906px]">
      <SidePanelSidePanelHeader onClose={onClose} />
      <Frame onClose={onClose} onDone={onDone} />
    </div>
  );
}