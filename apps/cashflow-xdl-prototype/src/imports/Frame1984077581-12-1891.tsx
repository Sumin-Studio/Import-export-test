import svgPaths from "./svg-jsv4fkgiy1";
import imgImage77 from "figma:asset/ab125cdabec81a4dee9e8d811ca885692c2b2f24.png";
import imgImage78 from "figma:asset/2c17a66e5db5bd5cd143babf2a95ff8bb0f3c4ef.png";
import { imgTotal } from "./svg-qyjfj";

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

function Icon({ onBack }: { onBack?: () => void }) {
  return (
    <button
      onClick={onBack}
      className="h-[16px] relative shrink-0 w-[20px] cursor-pointer hover:opacity-70 transition-opacity"
      data-name="icon"
      aria-label="Go back"
    >
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
    </button>
  );
}

function ContentMiddle() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[10px] items-center max-w-[312px] min-h-[32px] min-w-px relative self-stretch" data-name="_content middle">
      <p className="flex-[1_0_0] font-['National_2:Bold',sans-serif] leading-[1.15] max-w-[312px] min-h-px min-w-px not-italic overflow-hidden relative text-[#1e3145] text-[22px] text-ellipsis whitespace-nowrap">Connect to Melio</p>
    </div>
  );
}

function ContentLeft({ onBack }: { onBack?: () => void }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-start min-h-px min-w-px relative" data-name="content left">
      <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[32px]" data-name="Icon Button">
        <Icon onBack={onBack} />
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
        className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[32px] hover:bg-[#f0f0f0] transition-colors cursor-pointer"
        data-name="Close"
        aria-label="Close modal"
      >
        <Icon1 />
      </button>
    </div>
  );
}

function ContentTop({ onClose, onBack }: { onClose?: () => void; onBack?: () => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="content top">
      <div className="content-stretch flex gap-[8px] items-start pl-[12px] pr-[8px] relative w-full">
        <ContentLeft onBack={onBack} />
        <ContentRight onClose={onClose} />
      </div>
    </div>
  );
}

function SidePanelSidePanelHeader({ onClose, onBack }: { onClose?: () => void; onBack?: () => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[16px] py-[12px] relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full" data-name="Side panel/Side panel Header">
      <ContentTop onClose={onClose} onBack={onBack} />
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
        <div className="absolute bg-[#1f68dd] inset-[0_40%_0_0] rounded-[4px] shadow-[0px_0px_0px_1px_white]" data-name="bar" />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[119.54px] mt-[50px] place-items-start relative row-1">
      <div className="col-1 h-[58.419px] ml-0 mt-0 relative row-1 w-[58.915px]" data-name="image 77">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage77} />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[40.5px] mt-0 place-items-start relative row-1">
      <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[298px]" data-name="Progress Linear">
        <Container2 />
      </div>
      <Group />
    </div>
  );
}

function Frame2() {
  return <div className="h-[168px] shrink-0 w-[379px]" />;
}

function PaymentMethod() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[128px] items-start relative shrink-0 w-[379px]" data-name="Payment method">
      <div className="flex flex-col font-['National_2:Bold',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#18191b] text-[22px] text-center w-[min-content]">
        <p className="leading-[1.15]">Log in at Chase</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#18191b] text-[17px] text-center w-[min-content]">
        <p className="whitespace-pre-wrap">
          <span className="leading-[1.45]">{`After logging into `}</span>
          <span className="leading-[1.45] text-[#1e3145]">{`Chase `}</span>
          <span className="leading-[1.45]">
            {`make `}
            <br aria-hidden="true" />
            sure you check all these boxes
          </span>
        </p>
      </div>
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[341.581px] items-center ml-0 mt-[152.42px] relative row-1">
      <PaymentMethod />
      <div className="h-[140px] relative shrink-0 w-[314px]" data-name="image 78">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage78} />
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group1 />
      <Frame3 />
    </div>
  );
}

function Container3() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[12.5%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
          <path d={svgPaths.p37fc15c0} fill="var(--fill-0, white)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame1({ onContinue }: { onContinue?: () => void }) {
  return (
    <button
      onClick={onContinue}
      className="bg-black h-[57px] relative rounded-[8px] shrink-0 w-full hover:bg-[#333] transition-colors cursor-pointer"
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center px-[27px] py-[16px] relative size-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">Continue to login</p>
          <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Icon/External">
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
      </div>
    </button>
  );
}

function Frame({ onContinue }: { onContinue?: () => void }) {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-between relative shrink-0 w-[439px]">
      <div className="content-stretch flex flex-col items-center px-[30px] relative shrink-0 w-full">
        <Group2 />
      </div>
      <div className="content-stretch flex flex-col px-[30px] relative shrink-0 w-full">
        <Frame1 onContinue={onContinue} />
      </div>
    </div>
  );
}

export default function Frame4({ onClose, onBack, onContinue }: { onClose?: () => void; onBack?: () => void; onContinue?: () => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-center relative rounded-[12px] shadow-[0px_8px_16px_0px_rgba(0,10,30,0.2)] w-full h-[906px]">
      <SidePanelSidePanelHeader onClose={onClose} onBack={onBack} />
      <div className="flex-1 content-stretch flex flex-col pb-[30px] relative shrink-0 w-full">
        <Frame onContinue={onContinue} />
      </div>
    </div>
  );
}