import { useState, useRef, useEffect, useMemo } from 'react';
import svgPaths from "./svg-3vpsillcoa";
import imgImage from "figma:asset/051d62cda66230c87a7a9d181331d66fc0d04789.png";
import { InteractiveCashFlowChart, useCashFlowStats, generateCashFlowData, computeImpactData } from '../components/InteractiveCashFlowChart';
import { CASH_FLOW_TASKS, SEVERITY_COLOR, getTaskDate, type TaskAction } from '../data/cashFlowTasks';


function Group1() {
  return (
    <div className="h-[16.221px] relative shrink-0 w-[56px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56.0005 16.221">
        <g id="Group 427319438">
          <path clipRule="evenodd" d={svgPaths.p844a800} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p22790840} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[6px] left-1/2 top-1/2 w-[10px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
        <g id="Group 427320763">
          <path d={svgPaths.p15e94c00} fill="var(--fill-0, white)" id="Polygon 6" />
        </g>
      </svg>
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[11px] relative rounded-[20px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Home</p>
    </div>
  );
}

function Menu1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[11px] relative rounded-[20px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Sales</p>
    </div>
  );
}

function Menu2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[11px] relative rounded-[20px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Purchases</p>
    </div>
  );
}

function Menu3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[11px] relative rounded-[20px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Reporting</p>
    </div>
  );
}

function Menu4() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[11px] relative rounded-[20px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Payroll</p>
    </div>
  );
}

function Menu5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[11px] relative rounded-[20px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Accounting</p>
    </div>
  );
}

function Menu6() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[11px] relative rounded-[20px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Tax</p>
    </div>
  );
}

function Menu7() {
  return (
    <div className="content-stretch flex items-center justify-center px-[12px] py-[11px] relative rounded-[20px] shrink-0" data-name="Menu">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Contacts</p>
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pl-[12px] relative shrink-0" data-name="Left">
      <div className="content-stretch flex flex-col h-[40px] items-center justify-center px-[12px] relative rounded-[20px] shrink-0" data-name="_Xero logo">
        <Group1 />
      </div>
      <div className="bg-[#1c5dc5] content-stretch flex gap-[12px] items-center overflow-clip px-[16px] py-[11px] relative rounded-[6px] shrink-0" data-name="Organisation menu button">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.3] max-w-[246px] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-white whitespace-nowrap">Hornblower Enterprises</p>
        <div className="h-[6px] relative shrink-0 w-[10px]" data-name="_nav icons">
          <Group7 />
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_Primary navigation menu">
        <div className="content-stretch flex h-[64px] items-center justify-center py-[12px] relative shrink-0" data-name="Home">
          <div aria-hidden="true" className="absolute border-[#eff0f3] border-b-4 border-solid inset-0 pointer-events-none" />
          <Menu />
        </div>
        <div className="content-stretch flex h-[64px] items-center justify-center py-[12px] relative shrink-0" data-name="Sales">
          <Menu1 />
        </div>
        <div className="content-stretch flex h-[64px] items-center justify-center py-[12px] relative shrink-0" data-name="Purchases">
          <Menu2 />
        </div>
        <div className="content-stretch flex h-[64px] items-center justify-center py-[12px] relative shrink-0" data-name="Reporting">
          <Menu3 />
        </div>
        <div className="content-stretch flex h-[64px] items-center justify-center py-[12px] relative shrink-0" data-name="Payroll">
          <Menu4 />
        </div>
        <div className="content-stretch flex h-[64px] items-center justify-center py-[12px] relative shrink-0" data-name="Accounting">
          <Menu5 />
        </div>
        <div className="content-stretch flex h-[64px] items-center justify-center py-[12px] relative shrink-0" data-name="Tax">
          <Menu6 />
        </div>
        <div className="content-stretch flex h-[64px] items-center justify-center py-[12px] relative shrink-0" data-name="Contacts">
          <Menu7 />
        </div>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2">
      <div className="absolute inset-[-4.06%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.3 17.3">
          <g id="Group 427320783">
            <path d="M8.65 0.65L8.65 16.65" id="Line 1744" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.3" />
            <path d="M16.65 8.65L0.65 8.65" id="Line 1745" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2">
      <div className="absolute inset-[-4.06%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.2999 17.3">
          <g id="Group 427320549">
            <path d={svgPaths.p26158900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
            <path d={svgPaths.p3503da80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[18.545px] left-[calc(50%-0.5px)] top-[calc(50%+0.27px)] w-[17px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0003 18.5453">
        <g id="Group 427320553">
          <path d={svgPaths.p2c82d600} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[16px] left-1/2 top-1/2 w-[8px]">
      <div className="absolute inset-[-4.06%_-8.12%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.30038 17.2999">
          <g id="Group 427320550">
            <path d={svgPaths.p3ff28fc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
            <path d={svgPaths.pab51960} id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="1.3" />
            <path d={svgPaths.p27c42100} id="Vector_3" stroke="var(--stroke-0, white)" strokeWidth="1.3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function TaskListCheck2StreamlineUltimateSvg() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18px] top-1/2" data-name="Task-List-Check-2--Streamline-Ultimate.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_15159)" id="Task-List-Check-2--Streamline-Ultimate.svg">
          <path d={svgPaths.paefdd80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p17366000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1965c200} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_15159">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-1/2 top-1/2">
      <TaskListCheck2StreamlineUltimateSvg />
    </div>
  );
}

function Group6() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[18px] left-[calc(50%+0.2px)] top-1/2 w-[14.401px]">
      <div className="absolute inset-[-3.61%_-4.51%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7006 19.3001">
          <g id="Group 427320757">
            <path d={svgPaths.p24c3ea80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
            <path d="M7.85027 2.45007V0.65" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
            <path d={svgPaths.pc19b740} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[16.5px] left-[calc(50%+0.25px)] top-[calc(50%+0.25px)] w-[16.499px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4985 16.5003">
        <g id="Group 427320418">
          <ellipse cx="15.0426" cy="1.45583" fill="var(--fill-0, white)" id="Ellipse 880" rx="1.45583" ry="1.45583" />
          <ellipse cx="8.24983" cy="1.45583" fill="var(--fill-0, white)" id="Ellipse 881" rx="1.45583" ry="1.45583" />
          <ellipse cx="1.45589" cy="1.45583" fill="var(--fill-0, white)" id="Ellipse 882" rx="1.45583" ry="1.45583" />
          <ellipse cx="1.45583" cy="8.24758" fill="var(--fill-0, white)" id="Ellipse 883" rx="1.45583" ry="1.45583" />
          <ellipse cx="8.24983" cy="8.24758" fill="var(--fill-0, white)" id="Ellipse 884" rx="1.45583" ry="1.45583" />
          <ellipse cx="15.0426" cy="8.24758" fill="var(--fill-0, white)" id="Ellipse 885" rx="1.45583" ry="1.45583" />
          <ellipse cx="15.0427" cy="15.0445" fill="var(--fill-0, white)" id="Ellipse 886" rx="1.45583" ry="1.45583" />
          <ellipse cx="8.24983" cy="15.0445" fill="var(--fill-0, white)" id="Ellipse 887" rx="1.45583" ry="1.45583" />
          <ellipse cx="1.4559" cy="15.0445" fill="var(--fill-0, white)" id="Ellipse 888" rx="1.45583" ry="1.45583" />
        </g>
      </svg>
    </div>
  );
}

function OrganisationName() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center justify-center min-h-px min-w-px relative" data-name="Organisation name">
      <div className="bg-[#a8eed5] overflow-clip relative rounded-[3.2px] shrink-0 size-[40px]" data-name="avatar">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Helvetica_Neue:Bold',sans-serif] justify-center leading-[0] left-0 not-italic right-0 text-[#1c4d3c] text-[17px] text-center top-1/2">
          <p className="leading-[28px]">AIT</p>
        </div>
        <div className="absolute inset-0" data-name="image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
        </div>
      </div>
      <p className="flex-[1_0_0] font-['National_2:Bold',sans-serif] leading-[1.05] min-h-px min-w-px not-italic overflow-hidden relative text-[#1e3145] text-[32px] text-ellipsis whitespace-nowrap">Hornblower Enterprises</p>
    </div>
  );
}

function LoginDetails() {
  return (
    <div className="content-stretch flex items-center justify-end overflow-clip pl-[40px] relative shrink-0" data-name="Login details">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#000a1e] text-[0px] text-[13px] text-right whitespace-nowrap">
        <span className="leading-[1.45] text-[#616b7a]">Last login:</span>
        <span className="leading-[1.45] text-[#1f65d6]">{` 1 hour ago from California`}</span>
      </p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex items-center justify-center py-[28px] relative shrink-0 w-full" data-name="content">
      <OrganisationName />
      <LoginDetails />
    </div>
  );
}

function BusinessOverviewHeader() {
  return <div className="absolute h-[32px] left-0 top-0 w-[1360px]" data-name="Business overview header" />;
}

function Frame31() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[-1px] top-[803px]">
      <p className="font-['National_2:Bold',sans-serif] leading-[1.15] not-italic relative shrink-0 text-[#1e3145] text-[28px] whitespace-nowrap">Business overview</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[-1px] top-[24px]">
      <p className="font-['National_2:Bold',sans-serif] leading-[1.15] not-italic relative shrink-0 text-[#1e3145] text-[28px] whitespace-nowrap">Available cash</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute h-[17.995px] left-[3px] top-[3px] w-[18px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 17.9953">
        <g id="Group 1321320797">
          <mask height="18" id="mask0_1_15128" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="18" x="0" y="0">
            <path d={svgPaths.p1387800} fill="var(--fill-0, white)" id="Vector" />
          </mask>
          <g mask="url(#mask0_1_15128)">
            <g id="Group 1321320798">
              <mask height="42" id="mask1_1_15128" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="43" x="-17" y="-11">
                <path d={svgPaths.p1aea2c40} fill="var(--fill-0, #0C5CD0)" id="Rectangle 334" />
              </mask>
              <g mask="url(#mask1_1_15128)">
                <path d={svgPaths.p1aea2c40} fill="var(--fill-0, #0C5CD0)" id="Rectangle 331" />
                <g filter="url(#filter0_f_1_15128)" id="Ellipse 2">
                  <ellipse cx="25.8413" cy="14.1935" fill="var(--fill-0, #0CC3FF)" rx="25.8413" ry="14.1935" transform="matrix(0.816003 0.578048 -0.578242 0.815866 -1.44234 -18.7744)" />
                </g>
                <g filter="url(#filter1_f_1_15128)" id="Ellipse 6">
                  <ellipse cx="9.82585" cy="17.3513" fill="var(--fill-0, #0E5CD0)" rx="9.82585" ry="17.3513" transform="matrix(0.948918 -0.315522 0.359712 0.933063 -16.8424 -12.6898)" />
                </g>
                <g filter="url(#filter2_f_1_15128)" id="Ellipse 1">
                  <ellipse cx="9.82585" cy="17.3513" fill="var(--fill-0, #2C2CE2)" rx="9.82585" ry="17.3513" transform="matrix(0.948918 -0.315522 0.359712 0.933063 -16.3033 -10.6003)" />
                </g>
                <g filter="url(#filter3_f_1_15128)" id="Ellipse 5">
                  <ellipse cx="9.92136" cy="17.1867" fill="var(--fill-0, #1A1A88)" rx="9.92136" ry="17.1867" transform="matrix(0.217017 0.976168 -0.985772 0.168089 2.01144 -23.2275)" />
                </g>
                <g filter="url(#filter4_f_1_15128)" id="Ellipse 3">
                  <ellipse cx="9.57683" cy="11.9421" fill="var(--fill-0, #79ACFF)" rx="9.57683" ry="11.9421" transform="matrix(0.944548 0.328374 -0.30216 0.953257 2.41183 7.91862)" />
                </g>
                <g filter="url(#filter5_f_1_15128)" id="Ellipse 4">
                  <ellipse cx="9.89575" cy="14.0701" fill="var(--fill-0, #D3EFFF)" rx="9.89575" ry="14.0701" transform="matrix(0.870127 0.492827 -0.483845 0.875154 19.5616 4.0319)" />
                </g>
              </g>
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="50.2694" id="filter0_f_1_15128" width="57.734" x="-17.43" y="-17.3917">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_15128" stdDeviation="3.11673" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="44.3256" id="filter1_f_1_15128" width="33.7941" x="-18.174" y="-21.763">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_15128" stdDeviation="2.83787" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="44.3256" id="filter2_f_1_15128" width="33.7941" x="-17.635" y="-19.6735">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_15128" stdDeviation="2.83787" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="32.6019" id="filter3_f_1_15128" width="46.544" x="-36.0496" y="-26.9547">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_15128" stdDeviation="3.09585" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="36.0099" id="filter4_f_1_15128" width="31.8665" x="-8.08405" y="4.44232">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_15128" stdDeviation="3.09585" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="36.8148" id="filter5_f_1_15128" width="32.2737" x="5.22751" y="2.8149">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_1_15128" stdDeviation="2.57988" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-end leading-[1.45] min-h-px min-w-px not-italic relative text-ellipsis whitespace-nowrap" data-name="Title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold overflow-hidden relative shrink-0 text-[#1e3145] text-[17px]">Suggestions</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal overflow-hidden relative shrink-0 text-[#616b7a] text-[15px]">1 of 2</p>
    </div>
  );
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

function Container1() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[21.87%_15.62%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.75 11.2501">
          <path d={svgPaths.p3510c00} fill="var(--fill-0, #1E3145)" id="vector" />
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

function Frame47() {
  return (
    <div className="content-stretch cursor-pointer flex gap-[4px] items-center justify-end relative shrink-0">
      <button className="bg-white content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[32px]" data-name="Icon Button">
        <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <Icon />
      </button>
      <button className="bg-white content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[32px]" data-name="Icon Button">
        <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <Icon1 />
      </button>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Header">
      <div className="relative shrink-0 size-[32px]" data-name="icon-sparkle-colour-small">
        <Group15 />
        <div className="absolute inset-[8.33%_70.83%_70.84%_8.33%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66499">
            <path d={svgPaths.p8625600} fill="var(--fill-0, #1758FF)" id="Vector" />
          </svg>
        </div>
      </div>
      <Title />
      <Frame47 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[15px] whitespace-nowrap">Higher than usual bills due next week</p>
    </div>
  );
}

function Words() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Words">
      <Frame46 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-w-full not-italic relative shrink-0 text-[#424f60] text-[15px] w-[min-content]">3 bills totalling 6,500.00 are due next week which is higher than usual and will impact cash flow. Consider discussing payment terms with suppliers.</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[18.75%_43.75%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 12.5">
          <path d={svgPaths.p1c449a00} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="icon">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-1/2 size-[32px] top-1/2" data-name="icon">
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
  );
}

function SpotlightOverflow() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Spotlight overflow">
      <button className="absolute content-stretch cursor-pointer flex items-center justify-center left-0 rounded-[6px] size-[32px] top-0" data-name="Icon Button">
        <Icon2 />
      </button>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <div className="bg-[#1f68dd] content-stretch flex gap-[4px] items-center justify-center min-h-[32px] px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Button">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">Open bills</p>
      </div>
      <div className="bg-white content-stretch flex gap-[4px] items-center justify-center min-h-[32px] px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Open bills">
        <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[13px] text-center whitespace-nowrap">Discuss with JAX</p>
      </div>
      <SpotlightOverflow />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col h-[160px] items-start justify-between pt-[4px] relative shrink-0 w-full" data-name="Content">
      <Words />
      <Actions />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-end min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic overflow-hidden relative shrink-0 text-[#1e3145] text-[17px] text-ellipsis whitespace-nowrap">Available today</p>
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[25px] items-center left-[20px] top-[16px] w-[400px]" data-name="Header">
      <Title1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[18.75%_43.75%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 12.5">
          <path d={svgPaths.p1c449a00} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function LabelValue() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-between leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[13px] w-full whitespace-nowrap" data-name="Label value">
      <p className="relative shrink-0">Chase Business Checking</p>
      <p className="relative shrink-0 text-right">27,102.50</p>
    </div>
  );
}

function LabelValue1() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-between leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[13px] w-full whitespace-nowrap" data-name="Label value">
      <p className="relative shrink-0">Bank of America Savings</p>
      <p className="relative shrink-0 text-right">10,670.35</p>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start py-[13px] relative shrink-0 w-full" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
      <LabelValue />
      <LabelValue1 />
    </div>
  );
}

function LabelValue2() {
  return (
    <div className="absolute content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-between leading-[1.45] left-[22px] not-italic text-[#1e3145] text-[13px] top-[193px] w-[392px] whitespace-nowrap" data-name="Label value">
      <p className="relative shrink-0">PayPal</p>
      <p className="relative shrink-0 text-right">4,227.15</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path clipRule="evenodd" d={svgPaths.p18d9ee80} fill="var(--fill-0, #0F7B3D)" fillRule="evenodd" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-[20px] top-[93px] w-[392px]">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Widget/Trend indicator">
        <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0f7b3d] text-[13px] whitespace-nowrap">Up 5% from this time last month</p>
      </div>
      <Icon3 />
    </div>
  );
}

function SpotlightWidget() {
  return (
    <div className="absolute bg-white h-[251px] left-0 rounded-[12px] top-[74px] w-[440px]" data-name="Spotlight widget">
      <Header1 />
      <div className="absolute content-stretch flex items-center justify-center left-[400px] size-[32px] top-[14px]" data-name="Icon/Overflow">
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
      <div className="absolute content-stretch flex flex-col items-start left-[-2px] px-[24px] top-[126px] w-[440px]" data-name="label value data">
        <Data />
      </div>
      <LabelValue2 />
      <Frame36 />
    </div>
  );
}

function StatAndIcon() {
  return (
    <div className="absolute content-stretch flex gap-[3px] items-end left-[19px] top-[125px] w-[241.5px]" data-name="Stat and icon">
      <p className="font-['National_2:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#1e3145] text-[32px] whitespace-nowrap">42,757</p>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="flex-[1_0_0] font-['Helvetica_Neue:Bold',sans-serif] leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#000a1e] text-[22px] text-ellipsis whitespace-nowrap">
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45]">Cash projection </span>
        <span className="font-['Helvetica_Neue:Regular',sans-serif] leading-[24px]">{`• `}</span>
        <span className="font-['Helvetica_Neue:Regular',sans-serif] leading-[24px]">Next 30 days</span>
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[24px] relative shrink-0 w-[21px]">
      <div className="-translate-y-1/2 absolute left-[4px] size-[32px] top-1/2" data-name="icon only button">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13px] left-[calc(50%-0.5px)] top-[calc(50%+0.5px)] w-[3px]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 13">
            <path clipRule="evenodd" d={svgPaths.p2e3e30e0} fill="var(--fill-0, #59606D)" fillRule="evenodd" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RightElements() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pl-[8px] relative shrink-0" data-name="Right elements">
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Title2 />
      <RightElements />
    </div>
  );
}

function StatAndIcon1({ value }: { value: number }) {
  const formattedValue = value >= 0 ? value.toLocaleString() : value.toLocaleString();
  return (
    <div className="content-stretch flex gap-[3px] items-end relative shrink-0 w-full" data-name="Stat and icon">
      <p className="font-['National_2:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[#1e3145] text-[17px] whitespace-nowrap">${formattedValue}</p>
    </div>
  );
}

function StatAndIcon2({ value }: { value: number }) {
  const formattedValue = value >= 0 ? value.toLocaleString() : value.toLocaleString();
  return (
    <div className="content-stretch flex gap-[3px] items-end relative shrink-0 w-full" data-name="Stat and icon">
      <p className="font-['National_2:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[#1e3145] text-[17px] whitespace-nowrap">${formattedValue}</p>
    </div>
  );
}

function StatAndIcon3({ value }: { value: number }) {
  const formattedValue = value >= 0 ? value.toLocaleString() : value.toLocaleString();
  return (
    <div className="content-stretch flex gap-[3px] items-end relative shrink-0 w-full" data-name="Stat and icon">
      <p className="font-['National_2:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[#1e3145] text-[17px] whitespace-nowrap">${formattedValue}</p>
    </div>
  );
}

const BANKS = [
  { id: 'chase', name: 'Chase', balance: 18420 },
  { id: 'bofa', name: 'Bank of America', balance: 15302 },
  { id: 'wells', name: 'Wells Fargo', balance: 8327 },
];

function BankAccountsDropdown({ selectedIds, onToggle }: { selectedIds: Set<string>; onToggle: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="flex items-center justify-center size-[22px] rounded-[5px] border border-[#cfd1d5] bg-white hover:bg-[#f6f6f8] transition-colors"
        onClick={() => setOpen(true)}
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="#59606d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-[4px] bg-white border border-[#e6e7e9] rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.10)] z-10 w-[260px] py-[8px]">
          {BANKS.map((bank, i) => {
            const checked = selectedIds.has(bank.id);
            return (
              <button
                key={bank.id}
                className={`w-full text-left flex items-center gap-[14px] px-[16px] py-[12px] hover:bg-[#f6f6f8] ${i > 0 ? 'border-t border-[#f0f0f2]' : ''}`}
                onMouseDown={(e) => { e.stopPropagation(); onToggle(bank.id); }}
              >
                <div className={`shrink-0 size-[20px] rounded-[4px] border flex items-center justify-center transition-colors ${checked ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[#cfd1d5] bg-white'}`}>
                  {checked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="flex flex-col gap-[1px] min-w-0 flex-1">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[14px] leading-[1.3]">{bank.name}</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[#59606d] text-[13px] leading-[1.3]">${bank.balance.toLocaleString()}</p>
                </div>
              </button>
            );
          })}
          <div className="border-t border-[#e6e7e9] mt-[4px] pt-[4px]">
            <button
              className="w-full text-left flex items-center gap-[10px] px-[16px] py-[12px] hover:bg-[#f6f6f8]"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#59606d" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1e3145] text-[14px] leading-[1.3]">Add bank account</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionsImpactDropdown({ selectedIds, onToggle }: { selectedIds: Set<string>; onToggle: (id: string) => void }) {
  const [open, setOpen] = useState(false);

  const triggerLabel = selectedIds.size === 0
    ? 'None selected'
    : `${selectedIds.size} task${selectedIds.size > 1 ? 's' : ''}`;

  return (
    <div className="relative shrink-0" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }} tabIndex={-1}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[12px] leading-[1.3] mb-[4px]">Actions impact</p>
      <button
        className="flex items-center gap-[6px] bg-white border border-[#cfd1d5] rounded-[6px] px-[10px] py-[5px] text-[13px] font-['Inter:Regular',sans-serif] text-[#1e3145] cursor-pointer min-w-[140px] justify-between"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{triggerLabel}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#59606d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-[4px] bg-white border border-[#e6e7e9] rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.10)] z-10 w-[320px] py-[8px]">
          {CASH_FLOW_TASKS.map((task, i) => {
            const checked = selectedIds.has(task.id);
            const actionLabel = (task.actions.find((a) => a.variant === 'primary') ?? task.actions[0])?.label;
            return (
              <button
                key={task.id}
                className={`w-full text-left flex items-center gap-[14px] px-[16px] py-[12px] hover:bg-[#f6f6f8] ${i > 0 ? 'border-t border-[#f0f0f2]' : ''}`}
                onMouseDown={() => onToggle(task.id)}
              >
                <div className={`shrink-0 size-[20px] rounded-[4px] border flex items-center justify-center transition-colors ${checked ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[#cfd1d5] bg-white'}`}>
                  {checked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="flex flex-col gap-[2px] min-w-0">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[14px] leading-[1.3]">{task.title}</p>
                  {actionLabel && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#59606d] text-[13px] leading-[1.3]">{actionLabel}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DataZone({ todayBalance = 42757, lowestProjected = 19500, balance30Days = 51000, toleranceInput = '', onToleranceChange = () => {}, selectedBankIds, onBankToggle, impactStats }: { todayBalance?: number; lowestProjected?: number; balance30Days?: number; toleranceInput?: string; onToleranceChange?: (v: string) => void; selectedBankIds: Set<string>; onBankToggle: (id: string) => void; impactStats?: { potentialBoost: number; safetyNet: number; avgDailyCushion: number } | null } = {} as any) {
  const availableToday = BANKS.filter((b) => selectedBankIds.has(b.id)).reduce((sum, b) => sum + b.balance, 0);

  const fmtImpact = (v: number) => `+$${v.toLocaleString()}`;

  return (
    <div className="bg-white flex items-center pb-0 relative shrink-0 w-full" data-name="Data zone 3">
      <div className="flex items-center flex-1 pl-[24px]">
        <div className="content-stretch flex flex-col gap-[2px] items-start shrink-0" data-name="Stat 2">
          <StatAndIcon1 value={availableToday} />
          <div className="flex items-center gap-[6px]">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative shrink-0 text-[#404756] text-[12px]">Available today - {selectedBankIds.size} {selectedBankIds.size === 1 ? 'bank' : 'banks'}</p>
            <BankAccountsDropdown selectedIds={selectedBankIds} onToggle={onBankToggle} />
          </div>
        </div>
        <div className="flex items-center self-stretch px-[24px] shrink-0" data-name="Widget/Separator">
          <div aria-hidden="true" className="w-px h-[38px] bg-[#e6e7e9]" />
        </div>
        <div className="content-stretch flex flex-col gap-[2px] items-start shrink-0" data-name="Stat 3">
          <StatAndIcon2 value={lowestProjected} />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative shrink-0 text-[#404756] text-[12px]">Lowest projected</p>
        </div>
        <div className="flex items-center self-stretch px-[24px] shrink-0" data-name="Widget/Separator">
          <div aria-hidden="true" className="w-px h-[38px] bg-[#e6e7e9]" />
        </div>
        <div className="content-stretch flex flex-col gap-[2px] items-start shrink-0" data-name="Stat 4">
          <StatAndIcon3 value={balance30Days} />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative shrink-0 text-[#59606d] text-[12px]">In 30 days</p>
        </div>
        {impactStats && (
          <>
            <div className="flex items-center self-stretch px-[24px] shrink-0">
              <div aria-hidden="true" className="w-px h-[38px] bg-[#e6e7e9]" />
            </div>
            <div className="content-stretch flex flex-col gap-[2px] items-start shrink-0">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#5A2364] text-[17px] leading-[1.3]">{fmtImpact(impactStats.potentialBoost)}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9B59B6] text-[12px] leading-[1.3]">Potential boost</p>
            </div>
            <div className="flex items-center self-stretch px-[24px] shrink-0">
              <div aria-hidden="true" className="w-px h-[38px] bg-[#e6e7e9]" />
            </div>
            <div className="content-stretch flex flex-col gap-[2px] items-start shrink-0">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#5A2364] text-[17px] leading-[1.3]">{fmtImpact(impactStats.safetyNet)}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9B59B6] text-[12px] leading-[1.3]">Safety net</p>
            </div>
            <div className="flex items-center self-stretch px-[24px] shrink-0">
              <div aria-hidden="true" className="w-px h-[38px] bg-[#e6e7e9]" />
            </div>
            <div className="content-stretch flex flex-col gap-[2px] items-start shrink-0">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#5A2364] text-[17px] leading-[1.3]">{fmtImpact(impactStats.avgDailyCushion)}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#9B59B6] text-[12px] leading-[1.3]">Avg. Daily Cushion</p>
            </div>
          </>
        )}
      </div>
      {/* Tolerance threshold input — hidden, preserved for later reinstatement
      <div className="flex items-end gap-[12px] shrink-0 pr-[24px]">
        <div className="flex flex-col">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[12px] leading-[1.3] mb-[4px]">Tolerance threshold</p>
          <input
            type="text"
            value={toleranceInput}
            onChange={(e) => onToleranceChange(e.target.value)}
            placeholder="input value"
            className="flex items-center bg-white border border-[#cfd1d5] rounded-[6px] px-[10px] py-[5px] text-[13px] font-['Inter:Regular',sans-serif] text-[#1e3145] w-[120px] outline-none focus:border-[#6683A5] placeholder:text-[#9ca3af]"
          />
        </div>
      </div>
      */}
    </div>
  );
}

function Frame4() {
  return (
    <div className="-translate-y-1/2 absolute h-[16px] left-0 right-px top-[calc(50%+29.5px)]">
      <div className="absolute flex h-0 items-center justify-center left-[32px] right-0 top-[9px]">
        <div className="-scale-y-100 flex-none h-0 w-[819px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 819 1.00005">
                <path d={svgPaths.p5c4e800} id="Line 1974" stroke="var(--stroke-0, #E6E7E9)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] left-[24px] not-italic text-[#59606d] text-[11px] text-right top-[8px] w-[31px]">
        <p className="leading-none">20K</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="-translate-y-1/2 absolute h-[16px] left-0 right-px top-[calc(50%+79.5px)]">
      <div className="absolute flex h-0 items-center justify-center left-[32px] right-0 top-[9px]">
        <div className="-scale-y-100 flex-none h-0 w-[819px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 819 1.00005">
                <path d={svgPaths.p5c4e800} id="Line 1974" stroke="var(--stroke-0, #E6E7E9)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] left-[24px] not-italic text-[#59606d] text-[11px] text-right top-[8px] w-[31px]">
        <p className="leading-none">10K</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="-translate-y-1/2 absolute h-[16px] left-0 right-px top-[calc(50%+129.5px)]">
      <div className="absolute flex h-0 items-center justify-center left-[32px] right-0 top-[9px]">
        <div className="-scale-y-100 flex-none h-0 w-[819px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 819 1.00005">
                <path d={svgPaths.p5c4e800} id="Line 1974" stroke="var(--stroke-0, #6683A5)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] left-[24px] not-italic text-[#59606d] text-[11px] text-right top-[8px] w-[31px]">
        <p className="leading-none">0</p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="-translate-y-1/2 absolute h-[16px] left-0 right-px top-[calc(50%-20.5px)]">
      <div className="absolute flex h-0 items-center justify-center left-[32px] right-0 top-[9px]">
        <div className="-scale-y-100 flex-none h-0 w-[819px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 819 1.00005">
                <path d={svgPaths.p5c4e800} id="Line 1974" stroke="var(--stroke-0, #E6E7E9)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] left-[24px] not-italic text-[#59606d] text-[11px] text-right top-[8px] w-[31px]">
        <p className="leading-none">30K</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[16px] left-0 right-px top-[50px]">
      <div className="absolute flex h-0 items-center justify-center left-[32px] right-0 top-[8px]">
        <div className="-scale-y-100 flex-none h-0 w-[819px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 819 1.00005">
                <path d={svgPaths.p167a7700} id="Line 1975" stroke="var(--stroke-0, #E6E7E9)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] left-[23.78px] not-italic text-[#59606d] text-[11px] text-right top-[8px] w-[30.779px]">
        <p className="leading-none">40K</p>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute h-[16px] left-0 right-px top-0">
      <div className="absolute flex h-0 items-center justify-center left-[32px] right-0 top-[8px]">
        <div className="-scale-y-100 flex-none h-0 w-[819px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 819 1.00005">
                <path d={svgPaths.p167a7700} id="Line 1975" stroke="var(--stroke-0, #E6E7E9)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] left-[23.78px] not-italic text-[#59606d] text-[11px] text-right top-[8px] w-[30.779px]">
        <p className="leading-none">50K</p>
      </div>
    </div>
  );
}

function Chart() {
  return (
    <div className="h-[275px] relative shrink-0 w-full" data-name="Chart">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex gap-[12px] items-end pl-[50px] pr-[18px] relative size-full">
          <Frame4 />
          <Frame19 />
          <Frame21 />
          <Frame20 />
          <Frame2 />
          <Frame22 />
        </div>
      </div>
    </div>
  );
}

function Labels() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[16px] items-start justify-center leading-[0] not-italic pr-[18px] pt-[4px] relative shrink-0 text-[#59606d] text-[11px] text-right w-[855px]" data-name="Labels">
      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[119px]">
        <p className="leading-none">Feb 10 2026</p>
      </div>
      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[120px]">
        <p className="leading-none">Feb 17 2026</p>
      </div>
      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[119px]">
        <p className="leading-none">Feb 24 2026</p>
      </div>
      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[119px]">
        <p className="leading-none">Mar 01 2026</p>
      </div>
      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[120px]">
        <p className="leading-none">Mar 07 2026</p>
      </div>
      <div className="flex flex-col h-[16px] justify-center relative shrink-0 w-[119px]">
        <p className="leading-none">Mar 14 2026</p>
      </div>
    </div>
  );
}

function Chart12ColumnChart() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Chart/12 Column chart">
      <div className="content-stretch flex flex-col items-start px-[24px] relative size-full">
        <Chart />
        <Labels />
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[10px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #13A972)" id="Ellipse 869" r="5" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#59606d] text-[11px] text-right whitespace-nowrap">
        <p className="leading-none">Positive balance</p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[10px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #DE0E40)" id="Ellipse 868" r="4.5" stroke="var(--stroke-0, #DE0E40)" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#59606d] text-[11px] text-right whitespace-nowrap">
        <p className="leading-none">Negative balance</p>
      </div>
    </div>
  );
}

function TaskActionButton({ action }: { action: TaskAction }) {
  const isPrimary = action.variant === 'primary';
  return (
    <button
      className={`flex items-center gap-[6px] px-[14px] py-[8px] rounded-[8px] border text-[14px] font-['Inter:Medium',sans-serif] font-medium ${
        isPrimary
          ? 'border-[#1f68dd] bg-[#1f68dd] text-white'
          : 'border-[#cfd1d5] bg-white text-[#1e3145]'
      }`}
    >
      {action.label}
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M2 11L11 2M11 2H6.5M11 2V6.5" stroke={isPrimary ? 'white' : '#1e3145'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function CashFlowTaskList({ onTaskHover }: { onTaskHover: (id: string | null) => void }) {
  const potentialBoost = CASH_FLOW_TASKS.reduce((sum, t) => sum + t.impactDelta, 0);

  const fmtImpact = (v: number) => {
    const abs = Math.abs(v).toLocaleString();
    return v < 0 ? `-$${abs}` : `+$${abs}`;
  };

  return (
    <div className="flex flex-col w-full">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[13px] leading-[1.3] mb-[10px]">JAX actions</p>
      <div className="border border-[#e6e7e9] rounded-[12px] bg-white overflow-hidden">
        {CASH_FLOW_TASKS.map((task, i) => (
          <div
            key={task.id}
            className={`flex items-center gap-[10px] px-[16px] py-[13px] cursor-default transition-colors hover:bg-[#f6f7f8] ${i > 0 ? 'border-t border-[#e6e7e9]' : ''}`}
            onMouseEnter={() => onTaskHover(task.id)}
            onMouseLeave={() => onTaskHover(null)}
          >
            <div className="shrink-0 mt-[1px]">
              <div className="size-[10px] rounded-full" style={{ backgroundColor: SEVERITY_COLOR[task.severity] }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1e3145] text-[14px] leading-[1.3]">{task.title}</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#59606d] text-[13px] leading-[1.3] mt-[2px]">{task.dateLabel ?? getTaskDate(task.weekOffset)}</p>
            </div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[14px] leading-[1.3] shrink-0">
              {fmtImpact(task.impactDelta)}
            </p>
          </div>
        ))}
        <div className="flex items-center justify-between px-[16px] py-[13px] border-t border-[#e6e7e9] bg-[#f6f7f8]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[14px] leading-[1.3]">Potential boost</p>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[14px] leading-[1.3]">{fmtImpact(potentialBoost)}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-[8px] mt-[32px]">
        <button className="flex items-center gap-[6px] px-[14px] py-[8px] rounded-[8px] border border-[#cfd1d5] text-[#1e3145] text-[13px] font-['Inter:Medium',sans-serif] font-medium leading-none whitespace-nowrap cursor-pointer hover:bg-[#f6f6f8] transition-colors">
          View plan details
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 11L11 2M11 2H6.5M11 2V6.5" stroke="#1e3145" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="px-[14px] py-[8px] rounded-[8px] bg-[#1e6aff] text-white text-[13px] font-['Inter:Medium',sans-serif] font-medium leading-none whitespace-nowrap cursor-pointer hover:bg-[#1a5ee0] transition-colors">
          Approve tasks
        </button>
      </div>
    </div>
  );
}

function WidgetChart1({ activeTaskId, selectedTaskIds, toleranceValue, todayBalance }: { activeTaskId: string | null; selectedTaskIds: Set<string>; toleranceValue: number | null; todayBalance?: number }) {
  return (
    <div className="bg-white flex flex-col flex-1 min-h-[200px] pb-[16px] relative w-full" data-name="Widget/Chart">
      <InteractiveCashFlowChart activeTaskId={activeTaskId} selectedTaskIds={selectedTaskIds} toleranceValue={toleranceValue} todayBalance={todayBalance} />
    </div>
  );
}

function WidgetChart({ chartRef }: { chartRef?: React.RefObject<HTMLDivElement> }) {
  const [selectedBankIds, setSelectedBankIds] = useState<Set<string>>(new Set(BANKS.map((b) => b.id)));
  const toggleBank = (id: string) => setSelectedBankIds((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const availableToday = BANKS.filter((b) => selectedBankIds.has(b.id)).reduce((sum, b) => sum + b.balance, 0);

  const stats = useCashFlowStats(availableToday);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [viewImpact, setViewImpact] = useState(false);
  const selectedImpactIds = useMemo(() =>
    viewImpact ? new Set(CASH_FLOW_TASKS.map((t) => t.id)) : new Set<string>(),
    [viewImpact]
  );
  const [selectedRange, setSelectedRange] = useState<'1m' | '2m' | '6m' | '1y'>('1m');
  const [toleranceInput, setToleranceInput] = useState('');
  const dataZoneRef = useRef<HTMLDivElement>(null);
  const [dataZoneHeight, setDataZoneHeight] = useState(0);
  useEffect(() => {
    const el = dataZoneRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDataZoneHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const taskTitleRef = useRef<HTMLParagraphElement>(null);
  const [taskTitleHeight, setTaskTitleHeight] = useState(0);
  useEffect(() => {
    if (taskTitleRef.current) setTaskTitleHeight(taskTitleRef.current.offsetHeight);
  }, []);
  const toleranceValue = toleranceInput.trim() !== '' ? parseFloat(toleranceInput.replace(/,/g, '')) : null;

  const impactStats = useMemo(() => {
    if (selectedImpactIds.size === 0) return null;
    const selectedTasks = CASH_FLOW_TASKS.filter((t) => selectedImpactIds.has(t.id));
    const potentialBoost = selectedTasks.reduce((sum, t) => sum + t.impactDelta, 0);
    const baseData = generateCashFlowData(undefined, undefined, availableToday);
    const impacted = computeImpactData(baseData, selectedImpactIds);
    // Lowest projected balance index (from today, index 7 onwards)
    let lowestIdx = 7;
    for (let i = 8; i < baseData.length; i++) {
      if (baseData[i].balance < baseData[lowestIdx].balance) lowestIdx = i;
    }
    const safetyNet = Math.round((impacted[lowestIdx] ?? baseData[lowestIdx].balance) - baseData[lowestIdx].balance);
    let cushionSum = 0;
    let cushionDays = 0;
    for (let i = 7; i < baseData.length; i++) {
      const iv = impacted[i];
      if (iv !== null) {
        cushionSum += iv - baseData[i].balance;
        cushionDays++;
      }
    }
    const avgDailyCushion = cushionDays > 0 ? Math.round(cushionSum / cushionDays) : 0;
    return { potentialBoost, safetyNet, avgDailyCushion };
  }, [selectedImpactIds, availableToday]);

  return (
    <div ref={chartRef} className="absolute bg-white flex flex-col left-0 overflow-hidden rounded-[12px] top-[74px] w-full pb-[20px] min-h-[573px]" data-name="Widget/Chart">
      {/* Full-width header */}
      <div className="bg-white relative shrink-0 w-full" data-name="Widget/Header">
        <div className="content-stretch flex flex-col gap-[5px] items-start pb-[11px] pt-[18px] px-[24px] relative w-full">
          <Frame1 />
        </div>
      </div>
      {/* Task list + chart row */}
      <div className="flex flex-row">
        <div className="flex flex-col shrink-0 w-[456px] pl-[24px] pr-0 pb-[16px]">
          <div className="flex flex-col gap-[12px]" style={{ paddingTop: Math.max(0, dataZoneHeight - taskTitleHeight - 16) + 25 }}>
            <div ref={taskTitleRef} className="flex items-center justify-between">
              <p className="font-['National_2:Semi_Bold',sans-serif] font-semibold leading-[1.3] text-[#1e3145] text-[17px]">Cashflow plan</p>
              <button
                onClick={() => setViewImpact((v) => !v)}
                className={`px-[12px] py-[6px] rounded-[99px] border text-[13px] font-['Inter:Medium',sans-serif] font-medium leading-none cursor-pointer transition-colors ${
                  viewImpact
                    ? 'bg-white border-[#1e6aff] text-[#1e6aff]'
                    : 'bg-white border-[#cfd1d5] text-[#59606d]'
                }`}
              >
                View impact
              </button>
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#424f60] text-[14px] leading-[1.45]">
              JAX has identified ways to increase your available cash. It can <strong>make 2 large payments</strong> and <strong>collect 3 overdue invoices</strong> for you.
            </p>
            <CashFlowTaskList onTaskHover={setActiveTaskId} />
          </div>
        </div>
        <div className="flex flex-col flex-1 min-w-0 pl-[20px]">
          <div ref={dataZoneRef}>
            <DataZone
              todayBalance={stats.todayBalance}
              lowestProjected={stats.lowestProjected}
              balance30Days={stats.balance30Days}
              toleranceInput={toleranceInput}
              onToleranceChange={setToleranceInput}
              selectedBankIds={selectedBankIds}
              onBankToggle={toggleBank}
              impactStats={impactStats}
            />
          </div>
          <WidgetChart1 activeTaskId={activeTaskId} selectedTaskIds={selectedImpactIds} toleranceValue={isNaN(toleranceValue as number) ? null : toleranceValue} todayBalance={availableToday} />
          <div className="relative shrink-0 w-full" data-name="Widget/CTA">
            <div className="flex items-center justify-between pb-[16px] pt-[8px] px-[24px]">
              <div className="flex items-center bg-[#f0f1f3] rounded-[8px] p-[3px] gap-[2px]">
                {(['1m', '2m', '6m', '1y'] as const).map((range) => {
                  const label = { '1m': '1 month', '2m': '2 months', '6m': '6 months', '1y': '1 year' }[range];
                  const active = selectedRange === range;
                  return (
                    <button
                      key={range}
                      onClick={() => setSelectedRange(range)}
                      className={`px-[12px] py-[5px] rounded-[6px] text-[13px] leading-none whitespace-nowrap cursor-pointer transition-all ${
                        active
                          ? 'bg-white text-[#1e3145] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.10)]'
                          : 'bg-transparent text-[#59606d] font-medium hover:text-[#1e3145]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setSelectedRange('1m')}
                className="px-[12px] py-[5px] rounded-[6px] text-[13px] font-medium text-[#1e3145] leading-none whitespace-nowrap bg-white border border-[#cfd1d5] hover:bg-[#f6f6f8] cursor-pointer transition-colors"
              >
                Reset chart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="absolute bg-[#f6f6f8] h-[18px] left-[597px] rounded-[99px] top-[420px] w-[70px]" data-name="Label">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[37.5px] not-italic text-[#59606d] text-[11px] text-center top-[8.5px] whitespace-nowrap">
        <p className="leading-none">Actual</p>
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents left-[591px] top-[413px]">
      <Label />
      <div className="absolute flex items-center justify-center left-[591px] size-[32px] top-[413px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative size-[32px]" data-name="icon/arrow-small">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.25px] left-1/2 top-[calc(50%+0.75px)] w-[7px]" data-name="vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4.25">
                <path clipRule="evenodd" d={svgPaths.p8145d70} fill="var(--fill-0, #59606D)" fillRule="evenodd" id="vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute bg-[#f6f6f8] h-[18px] left-[677px] rounded-[99px] top-[420px] w-[80px]" data-name="Label">
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[62px] not-italic text-[#59606d] text-[11px] text-right top-[8.5px] whitespace-nowrap">
        <p className="leading-none">{`Projected `}</p>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents left-[677px] top-[413px]">
      <Label1 />
      <div className="absolute flex items-center justify-center left-[731px] size-[32px] top-[413px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="relative size-[32px]" data-name="icon/arrow-small">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.25px] left-1/2 top-[calc(50%+0.75px)] w-[7px]" data-name="vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4.25">
                <path clipRule="evenodd" d={svgPaths.p8145d70} fill="var(--fill-0, #59606D)" fillRule="evenodd" id="vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents left-[543px] top-[192px]">
      <div className="absolute h-[254px] left-[543px] top-[203px] w-[761px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 761 254">
          <path d={svgPaths.p130d5700} fill="url(#paint0_linear_1_14959)" fillOpacity="0.8" id="Vector 158" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_14959" x1="380.5" x2="380.5" y1="0" y2="254">
              <stop stopColor="#C8F4E4" />
              <stop offset="0.88" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute flex h-[265px] items-center justify-center left-[671px] top-[192px] w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[265px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 265 1">
                <line id="Line 261" stroke="var(--stroke-0, #6683A5)" strokeDasharray="2 2" x2="265" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[14px] left-[543px] top-[233px] w-[127px]">
        <div className="absolute inset-[-4.79%_-0.27%_-5.36%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 127.337 15.4202">
            <path d={svgPaths.p38440200} id="Vector 159" stroke="var(--stroke-0, #13A972)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[144.5px] left-[670px] top-[202px] w-[634px]">
        <div className="absolute inset-[-0.37%_0_-0.52%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 634.922 145.79">
            <path d={svgPaths.p322b5d00} id="Vector 160" stroke="var(--stroke-0, #13A972)" strokeDasharray="3 3" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <Group11 />
      <Group12 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents left-[460px] top-[74px]">
      <WidgetChart />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[460px] top-[74px]">
      <Group13 />
    </div>
  );
}

function Left1() {
  return (
    <div className="absolute content-stretch flex items-center left-[20px] overflow-clip py-[3.5px] top-0 w-[220px]" data-name="left">
      <p className="flex-[1_0_0] font-['Helvetica_Neue:Bold',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[#0078c8] text-[17px]">Get paid</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-1/4 left-[35.94%] overflow-clip right-[35.94%] top-1/4" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.62498 10.0001">
          <path d={svgPaths.p14a5e00} fill="var(--fill-0, #404756)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] relative rounded-[50px] shrink-0 size-[32px]" data-name="icon">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Icon/Arrow-right">
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
  );
}

function Right() {
  return (
    <div className="absolute content-stretch flex items-center left-[281px] top-0" data-name="right">
      <Icon4 />
    </div>
  );
}

function Header3() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="header">
      <Left1 />
      <Right />
    </div>
  );
}

function Content2() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="content-stretch flex items-start px-[20px] relative w-full">
        <p className="flex-[1_0_0] font-['Helvetica_Neue:Regular',sans-serif] leading-[24px] min-h-px min-w-px not-italic relative text-[#404756] text-[15px]">Send an invoice and get paid online</p>
      </div>
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="top">
      <Header3 />
      <Content2 />
    </div>
  );
}

function Header2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pb-[8px] pt-[12px] top-0 w-[300px]" data-name="header">
      <Top />
    </div>
  );
}

function GetPaidCard({ promptTop = 667 }: { promptTop?: number }) {
  return (
    <div className="absolute bg-white h-[96px] left-[-2px] overflow-clip rounded-[12px] w-[324px]" style={{ top: promptTop }} data-name="Get paid card">
      <Header2 />
    </div>
  );
}

function Left2() {
  return (
    <div className="absolute content-stretch flex items-center left-[20px] overflow-clip py-[3.5px] top-0 w-[220px]" data-name="left">
      <p className="flex-[1_0_0] font-['Helvetica_Neue:Bold',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[#0078c8] text-[17px]">Pay a contractor</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-1/4 left-[35.94%] overflow-clip right-[35.94%] top-1/4" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.62498 10.0001">
          <path d={svgPaths.p14a5e00} fill="var(--fill-0, #404756)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] relative rounded-[50px] shrink-0 size-[32px]" data-name="icon">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Icon/Arrow-right">
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

function Right1() {
  return (
    <div className="absolute content-stretch flex items-center left-[281px] top-0" data-name="right">
      <Icon5 />
    </div>
  );
}

function Header5() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="header">
      <Left2 />
      <Right1 />
    </div>
  );
}

function Content3() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="content-stretch flex items-start px-[20px] relative w-full">
        <p className="flex-[1_0_0] font-['Helvetica_Neue:Regular',sans-serif] leading-[24px] min-h-px min-w-px not-italic relative text-[#404756] text-[15px]">Pay online and stay compliant</p>
      </div>
    </div>
  );
}

function Top1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="top">
      <Header5 />
      <Content3 />
    </div>
  );
}

function Header4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pb-[8px] pt-[12px] top-0 w-[300px]" data-name="header">
      <Top1 />
    </div>
  );
}

function PayAContractorCard({ promptTop = 667 }: { promptTop?: number }) {
  return (
    <div className="absolute bg-white h-[96px] left-[690px] overflow-clip rounded-[12px] w-[324px]" style={{ top: promptTop }} data-name="Pay a contractor card">
      <Header4 />
    </div>
  );
}

function Left3() {
  return (
    <div className="absolute content-stretch flex items-center left-[20px] overflow-clip py-[3.5px] top-0 w-[220px]" data-name="left">
      <p className="flex-[1_0_0] font-['Helvetica_Neue:Bold',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[#0078c8] text-[17px]">Pay a supplier</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-1/4 left-[35.94%] overflow-clip right-[35.94%] top-1/4" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.62498 10.0001">
          <path d={svgPaths.p14a5e00} fill="var(--fill-0, #404756)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] relative rounded-[50px] shrink-0 size-[32px]" data-name="icon">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Icon/Arrow-right">
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
  );
}

function Right2() {
  return (
    <div className="absolute content-stretch flex items-center left-[281px] top-0" data-name="right">
      <Icon6 />
    </div>
  );
}

function Header7() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="header">
      <Left3 />
      <Right2 />
    </div>
  );
}

function Content4() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="content-stretch flex items-start px-[20px] relative w-full">
        <p className="flex-[1_0_0] font-['Helvetica_Neue:Regular',sans-serif] leading-[24px] min-h-px min-w-px not-italic relative text-[#404756] text-[15px]">Pay a bill online</p>
      </div>
    </div>
  );
}

function Top2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="top">
      <Header7 />
      <Content4 />
    </div>
  );
}

function Header6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pb-[8px] pt-[12px] top-0 w-[300px]" data-name="header">
      <Top2 />
    </div>
  );
}

function PayAVendorCard({ promptTop = 667 }: { promptTop?: number }) {
  return (
    <div className="absolute bg-white h-[96px] left-[344px] overflow-clip rounded-[12px] w-[324px]" style={{ top: promptTop }} data-name="Pay a vendor card">
      <Header6 />
    </div>
  );
}

function Left4() {
  return (
    <div className="absolute content-stretch flex items-center left-[20px] overflow-clip py-[3.5px] top-0 w-[220px]" data-name="left">
      <p className="flex-[1_0_0] font-['Helvetica_Neue:Bold',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[#0078c8] text-[17px]">Pay employees</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute bottom-1/4 left-[35.94%] overflow-clip right-[35.94%] top-1/4" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.62498 10.0001">
          <path d={svgPaths.p14a5e00} fill="var(--fill-0, #404756)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] relative rounded-[50px] shrink-0 size-[32px]" data-name="icon">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Icon/Arrow-right">
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
        <Container7 />
        <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="resizer" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Right3() {
  return (
    <div className="absolute content-stretch flex items-center left-[281px] top-0" data-name="right">
      <Icon7 />
    </div>
  );
}

function Header9() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="header">
      <Left4 />
      <Right3 />
    </div>
  );
}

function Content5() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="content-stretch flex items-start px-[20px] relative w-full">
        <p className="flex-[1_0_0] font-['Helvetica_Neue:Regular',sans-serif] leading-[24px] min-h-px min-w-px not-italic relative text-[#404756] text-[15px]">Run or schedule payroll</p>
      </div>
    </div>
  );
}

function Top3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="top">
      <Header9 />
      <Content5 />
    </div>
  );
}

function Header8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pb-[8px] pt-[12px] top-0 w-[300px]" data-name="header">
      <Top3 />
    </div>
  );
}

function PayEmployeesCard({ promptTop = 667 }: { promptTop?: number }) {
  return (
    <div className="absolute bg-white h-[96px] left-[1036px] overflow-clip rounded-[12px] w-[324px]" style={{ top: promptTop }} data-name="Pay employees card">
      <Header8 />
    </div>
  );
}

function BusinessOverview({ onPromptTopChange }: { onPromptTopChange: (top: number) => void }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [promptTop, setPromptTop] = useState(667);
  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const next = el.offsetTop + el.offsetHeight + 20;
      setPromptTop(next);
      onPromptTopChange(next);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [onPromptTopChange]);

  return (
    <div className="absolute h-[2266px] left-0 top-[4px] w-[1360px]" data-name="Business overview">
      <BusinessOverviewHeader />
      <Frame32 />

      <WidgetChart chartRef={chartRef} />
      <GetPaidCard promptTop={promptTop} />
      <PayAContractorCard promptTop={promptTop} />
      <PayAVendorCard promptTop={promptTop} />
      <PayEmployeesCard promptTop={promptTop} />
    </div>
  );
}

function Header10() {
  return (
    <div className="content-stretch flex gap-[12px] items-baseline not-italic relative shrink-0 whitespace-nowrap" data-name="header">
      <p className="font-['National_2:Bold',sans-serif] leading-[1.15] relative shrink-0 text-[#1e3145] text-[28px]">Apps that connect with Xero</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] relative shrink-0 text-[#1f68dd] text-[13px]">Explore more apps</p>
    </div>
  );
}

function WidgetTitle() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Widget title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[17px] whitespace-nowrap">Westpac Everyday Savings</p>
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-h-px min-w-px py-[4px] relative" data-name="title">
      <WidgetTitle />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#616b7a] text-[13px] whitespace-nowrap">03-1301-0494812-22</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[18.75%_43.75%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 12.5">
          <path d={svgPaths.p1c449a00} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function LabelValue3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 text-[#1f68dd] w-[172px]" data-name="label value">
      <p className="font-['National_2:Regular',sans-serif] leading-[1.3] relative shrink-0 text-[22px] w-full">20</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] relative shrink-0 text-[13px] w-full">Items to reconcile</p>
    </div>
  );
}

function Separator() {
  return (
    <div className="h-[46px] relative shrink-0 w-0" data-name="separator">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 46">
          <g id="separator">
            <path d="M0.5 4L0.5 42" id="separator_2" stroke="var(--stroke-0, #E1E2E5)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LabelValue4() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 w-[172px]" data-name="label value">
      <p className="font-['National_2:Regular',sans-serif] leading-[1.3] relative shrink-0 text-[#1e3145] text-[22px] w-full">623.11</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] relative shrink-0 text-[#616b7a] text-[13px] w-full">Balance difference</p>
    </div>
  );
}

function LabelValue5() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-between leading-[1.45] not-italic relative shrink-0 text-[13px] w-full whitespace-nowrap" data-name="Label value">
      <p className="relative shrink-0 text-[#1f68dd]">Balance in Xero</p>
      <p className="relative shrink-0 text-[#1e3145] text-right">14,140.11</p>
    </div>
  );
}

function LabelValue6() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-between leading-[1.45] not-italic relative shrink-0 text-[13px] w-full whitespace-nowrap" data-name="Label value">
      <p className="relative shrink-0 text-[#1f68dd]">Statement balance (10 July)</p>
      <p className="relative shrink-0 text-[#1e3145] text-right">14,763.22</p>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start py-[13px] relative shrink-0 w-full" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
      <LabelValue5 />
      <LabelValue6 />
    </div>
  );
}

function WidgetTitle1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Widget title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[17px] whitespace-nowrap">Recent invoice payments</p>
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-h-px min-w-px py-[4px] relative" data-name="title">
      <WidgetTitle1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[18.75%_43.75%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 12.5">
          <path d={svgPaths.p1c449a00} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[3px] items-baseline leading-[0] not-italic right-0 text-[13px] text-right top-[73px] whitespace-nowrap">
      <div className="flex flex-col justify-center relative shrink-0 text-[#616b7a]">
        <p className="leading-[1.45]">USD</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#1e3145]">
        <p className="leading-[1.45]">4,326</p>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="h-[215px] relative shrink-0 w-[392px]" data-name="table">
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[51.63%_0_37.21%_85.97%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px] text-right">
        <p className="leading-[1.45]">1,320</p>
      </div>
      <Frame35 />
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[71.16%_0_19.53%_94.39%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[1.45]">550</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[88.84%_0_0_88.27%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px] text-right">
        <p className="leading-[1.45]">1,155</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[15.35%_46.94%_75.35%_20.66%] justify-center leading-[0] not-italic overflow-hidden text-[#1e3145] text-[13px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.45] overflow-hidden">Quantum Consultants</p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0_69.13%_92.56%_20.66%] leading-[1.3] not-italic text-[#616b7a] text-[12px] whitespace-nowrap">Contact</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0_0_92.56%_90.05%] leading-[1.3] not-italic text-[#616b7a] text-[12px] text-right whitespace-nowrap">Amount</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0_22.45%_92.56%_60.2%] leading-[1.3] not-italic text-[#616b7a] text-[12px] whitespace-nowrap">Date received</p>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[14.42%_0_74.42%_88.27%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px] text-right">
        <p className="leading-[1.45]">5,995</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[15.35%_29.59%_75.35%_60.2%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px] whitespace-nowrap">
        <p className="leading-[1.45]">26 Jun</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[33.95%_29.59%_56.74%_60.2%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px] whitespace-nowrap">
        <p className="leading-[1.45]">17 Jun</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[52.56%_31.38%_38.14%_60.2%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px] whitespace-nowrap">
        <p className="leading-[1.45]">6 Jun</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[71.16%_31.38%_19.53%_60.2%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px] whitespace-nowrap">
        <p className="leading-[1.45]">8 Jun</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[89.77%_31.38%_0.93%_60.2%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px] whitespace-nowrap">
        <p className="leading-[1.45]">1 Jun</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[33.95%_46.43%_56.74%_20.66%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px]">
        <p className="leading-[1.45]">Rex Media Group</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[52.56%_46.43%_38.14%_20.66%] justify-center leading-[0] not-italic overflow-hidden text-[#1e3145] text-[13px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.45] overflow-hidden">Hamilton Smith Pty</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[71.16%_46.43%_19.53%_20.66%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px]">
        <p className="leading-[1.45]">Portal project</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[89.77%_46.43%_0.93%_20.66%] justify-center leading-[0] not-italic text-[#1e3145] text-[13px]">
        <p className="leading-[1.45]">{`Kinnet & Jones`}</p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0_88.52%_92.56%_0] leading-[1.3] not-italic text-[#616b7a] text-[12px] whitespace-nowrap">Invoice #</p>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[15.35%_85.2%_75.35%_0] justify-center leading-[0] not-italic text-[#1f68dd] text-[13px] whitespace-nowrap">
        <p className="leading-[1.45]">ORC1015</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[33.95%_85.2%_56.74%_0] justify-center leading-[0] not-italic text-[#1f68dd] text-[13px] whitespace-nowrap">
        <p className="leading-[1.45]">ORC1019</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[52.56%_85.2%_38.14%_0] justify-center leading-[0] not-italic text-[#1f68dd] text-[13px] whitespace-nowrap">
        <p className="leading-[1.45]">ORC1016</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[71.16%_85.2%_19.53%_0] justify-center leading-[0] not-italic text-[#1f68dd] text-[13px] whitespace-nowrap">
        <p className="leading-[1.45]">ORC1001</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[89.77%_85.2%_0.93%_0] justify-center leading-[0] not-italic text-[#1f68dd] text-[13px] whitespace-nowrap">
        <p className="leading-[1.45]">ORC1000</p>
      </div>
      <div className="absolute inset-[85.58%_0_14.42%_0]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1">
            <line id="Line 3218" stroke="var(--stroke-0, #E1E2E5)" x2="392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.98%_0_33.02%_0]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1">
            <line id="Line 3218" stroke="var(--stroke-0, #E1E2E5)" x2="392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[48.37%_0_51.63%_0]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1">
            <line id="Line 3218" stroke="var(--stroke-0, #E1E2E5)" x2="392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.77%_0_70.23%_0]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1">
            <line id="Line 3218" stroke="var(--stroke-0, #E1E2E5)" x2="392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[11.16%_0_88.84%_0]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1">
            <line id="Line 3218" stroke="var(--stroke-0, #E1E2E5)" x2="392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="body">
      <div className="content-stretch flex flex-col h-full items-start px-[24px] py-[4px] relative">
        <Table />
      </div>
    </div>
  );
}

function WidgetTitle2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic relative shrink-0 text-[#1e3145] text-[17px] w-full whitespace-nowrap" data-name="Widget title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] relative shrink-0">Net profit or loss</p>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[24px] relative shrink-0">•</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] relative shrink-0">Year to date</p>
    </div>
  );
}

function Title5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-h-px min-w-px py-[4px] relative" data-name="title">
      <WidgetTitle2 />
    </div>
  );
}

function Container10() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[18.75%_43.75%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 12.5">
          <path d={svgPaths.p1c449a00} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path clipRule="evenodd" d={svgPaths.p18d9ee80} fill="var(--fill-0, #0F7B3D)" fillRule="evenodd" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Widget/Trend indicator">
        <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#0f7b3d] text-[13px] whitespace-nowrap">Up 5% from 1 Jul 2022 – 17 May 2023</p>
      </div>
      <Icon8 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[16px] min-w-full not-italic relative shrink-0 text-[#424f60] text-[13px] w-[min-content]">1 Jul 2023 – 17 May 2024</p>
      <Frame37 />
    </div>
  );
}

function Interval8() {
  return (
    <div className="h-0 relative shrink-0 w-full z-[10]" data-name="Interval 09">
      <div className="flex flex-row items-end size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-end pl-[40px] relative size-full">
          <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
            <div className="flex-none rotate-180 w-full">
              <div className="h-0 relative w-full" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 352 1">
                    <line id="Line" stroke="var(--stroke-0, #E1E2E5)" x2="352" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[32px] not-italic overflow-hidden text-[#616b7a] text-[13px] text-ellipsis text-right top-[0.5px] tracking-[-0.39px] w-[32px] whitespace-nowrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
            <p className="leading-[1.3] overflow-hidden">150k</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Interval7() {
  return (
    <div className="h-0 relative shrink-0 w-full z-[9]" data-name="Interval 08">
      <div className="absolute inset-[0_0_-1px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1.00003">
          <g id="Interval 08">
            <line id="Line" stroke="var(--stroke-0, #E1E2E5)" x1="392" x2="40" y1="0.5" y2="0.500031" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Interval6() {
  return (
    <div className="h-0 relative shrink-0 w-full z-[8]" data-name="Interval 07">
      <div className="absolute inset-[0_0_-1px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1.00003">
          <g id="Interval 08">
            <line id="Line" stroke="var(--stroke-0, #E1E2E5)" x1="392" x2="40" y1="0.5" y2="0.500031" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Interval5() {
  return (
    <div className="h-0 relative shrink-0 w-full z-[7]" data-name="Interval 06">
      <div className="absolute inset-[0_0_-1px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1.00003">
          <g id="Interval 08">
            <line id="Line" stroke="var(--stroke-0, #E1E2E5)" x1="392" x2="40" y1="0.5" y2="0.500031" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Interval4() {
  return (
    <div className="h-0 relative shrink-0 w-full z-[6]" data-name="Interval 05">
      <div className="flex flex-row items-end size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-end pl-[40px] relative size-full">
          <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
            <div className="flex-none rotate-180 w-full">
              <div className="h-0 relative w-full" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 352 1">
                    <line id="Line" stroke="var(--stroke-0, #E1E2E5)" x2="352" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[32px] not-italic overflow-hidden text-[#616b7a] text-[13px] text-ellipsis text-right top-[0.5px] tracking-[-0.39px] w-[32px] whitespace-nowrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
            <p className="leading-[1.3] overflow-hidden">75k</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Interval3() {
  return (
    <div className="h-0 relative shrink-0 w-full z-[5]" data-name="Interval 04">
      <div className="absolute inset-[0_0_-1px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1.00003">
          <g id="Interval 08">
            <line id="Line" stroke="var(--stroke-0, #E1E2E5)" x1="392" x2="40" y1="0.5" y2="0.500031" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Interval2() {
  return (
    <div className="h-0 relative shrink-0 w-full z-[4]" data-name="Interval 03">
      <div className="absolute inset-[0_0_-1px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1.00003">
          <g id="Interval 08">
            <line id="Line" stroke="var(--stroke-0, #E1E2E5)" x1="392" x2="40" y1="0.5" y2="0.500031" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Interval1() {
  return (
    <div className="h-0 relative shrink-0 w-full z-[3]" data-name="Interval 02">
      <div className="absolute inset-[0_0_-1px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1.00003">
          <g id="Interval 08">
            <line id="Line" stroke="var(--stroke-0, #E1E2E5)" x1="392" x2="40" y1="0.5" y2="0.500031" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Interval() {
  return (
    <div className="h-0 relative shrink-0 w-full z-[2]" data-name="Interval 01">
      <div className="absolute inset-[0_0_-1px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 1.00003">
          <g id="Interval 08">
            <line id="Line" stroke="var(--stroke-0, #E1E2E5)" x1="392" x2="40" y1="0.5" y2="0.500031" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IntervalBottom() {
  return (
    <div className="h-0 relative shrink-0 w-full z-[1]" data-name="Interval Bottom">
      <div className="flex flex-row items-end size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-end pl-[40px] relative size-full">
          <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
            <div className="flex-none rotate-180 w-full">
              <div className="h-0 relative w-full" data-name="Line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 352 1">
                    <line id="Line" stroke="var(--stroke-0, #A6AAB1)" x2="352" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[32px] not-italic overflow-hidden text-[#616b7a] text-[13px] text-ellipsis text-right top-[0.5px] tracking-[-0.39px] w-[32px] whitespace-nowrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
            <p className="leading-[1.3] overflow-hidden">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function YAxis() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0_25px_0] isolate items-center justify-between" data-name="Y Axis">
      <Interval8 />
      <Interval7 />
      <Interval6 />
      <Interval5 />
      <Interval4 />
      <Interval3 />
      <Interval2 />
      <Interval1 />
      <Interval />
      <IntervalBottom />
    </div>
  );
}

function Bar() {
  return <div className="absolute bg-[#4482e6] inset-0 rounded-tl-[4px] rounded-tr-[4px]" data-name="bar" />;
}

function BarWrap() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Bar wrap">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-start justify-center px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-full min-h-px min-w-[8px] relative" data-name="1️⃣ bar 01">
            <Bar />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Label">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-[17px] leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#616b7a] text-[13px] text-center text-ellipsis tracking-[-0.39px] whitespace-nowrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
        <span className="leading-[1.3] text-[#1f68dd]">Income</span>
        <span className="leading-[1.3]">{` 120,000`}</span>
      </p>
    </div>
  );
}

function Bar10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-center max-w-[160px] min-h-px min-w-px relative" data-name="bar 01">
      <BarWrap />
      <Label3 />
    </div>
  );
}

function Bar1() {
  return (
    <div className="absolute bg-[#bad7f8] inset-[30%_0_0_0] rounded-tl-[4px] rounded-tr-[4px]" data-name="bar">
      <div aria-hidden="true" className="absolute border-[#4482e6] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function BarWrap1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Bar wrap">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-start justify-center px-[8px] relative size-full">
          <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="2️⃣ bar 02">
            <Bar1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Label">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal h-[17px] leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#616b7a] text-[13px] text-center text-ellipsis tracking-[-0.39px] whitespace-nowrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
        <span className="leading-[1.3] text-[#1f68dd]">Expenses</span>
        <span className="leading-[1.3]">{` 100,000`}</span>
      </p>
    </div>
  );
}

function Bar11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-center max-w-[160px] min-h-px min-w-px relative" data-name="bar 02">
      <BarWrap1 />
      <Label4 />
    </div>
  );
}

function Values() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Values">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] relative size-full">
          <Bar10 />
          <Bar11 />
        </div>
      </div>
    </div>
  );
}

function XAxis() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="X Axis">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pb-[4px] relative size-full">
          <Values />
        </div>
      </div>
    </div>
  );
}

function Area() {
  return (
    <div className="flex-[1_0_0] h-[300px] min-h-px min-w-px relative" data-name="Area">
      <div className="content-stretch flex flex-col items-start pl-[40px] relative size-full">
        <YAxis />
        <XAxis />
      </div>
    </div>
  );
}

function Wrap() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="wrap">
      <Area />
    </div>
  );
}

function BarChart() {
  return (
    <div className="content-stretch flex flex-col h-[332px] items-start justify-between pb-[20px] pt-[16px] px-[24px] relative shrink-0 w-[440px]" data-name="Bar Chart">
      <Wrap />
    </div>
  );
}

function NetProfitOrLoss() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[522px] items-start max-h-[522px] max-w-[440px] min-h-[522px] min-w-[400px] relative rounded-[12px] shrink-0 w-full" data-name="Net profit or loss">
      <div className="relative shrink-0 w-full" data-name="P1 widget header">
        <div className="content-stretch flex items-start justify-between pb-[7px] pl-[24px] pr-[8px] pt-[14px] relative w-full">
          <Title5 />
          <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="right content">
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
      </div>
      <div className="relative shrink-0 w-full" data-name="Stat with time period comparison">
        <div className="content-stretch flex flex-col gap-[2px] items-start pb-[12px] px-[24px] relative w-full">
          <p className="font-['National_2:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#1e3145] text-[22px] w-full">20,000</p>
          <Label2 />
        </div>
      </div>
      <BarChart />
      <div className="relative shrink-0 w-full" data-name="P1 widget footer">
        <div className="content-stretch flex gap-[8px] items-start pb-[20px] pt-[5px] px-[24px] relative w-full">
          <div className="bg-white content-stretch flex gap-[4px] items-center justify-center min-h-[32px] px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Button">
            <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[13px] text-center whitespace-nowrap">Go to business snapshot</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WidgetTitle3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Widget title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[17px] whitespace-nowrap">Tasks</p>
    </div>
  );
}

function Title6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-h-px min-w-px py-[4px] relative" data-name="title">
      <WidgetTitle3 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal items-start relative shrink-0 w-[299px]">
      <p className="leading-[1.45] relative shrink-0 text-[#1e3145] w-full">Items to reconcile</p>
      <p className="leading-[0] relative shrink-0 text-[#59606d] text-[#616b7a] text-[0px] w-full">
        <span className="leading-[1.45]">{`ANZ `}</span>
        <span className="leading-[1.45]">Business</span>
        <span className="leading-[1.45]">{` Premium Call • 23-4575-0024587-00`}</span>
      </p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px not-italic py-[6px] relative text-[13px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] relative shrink-0 text-[#1e3145] w-[20px]">14</p>
      <Frame38 />
    </div>
  );
}

function Container11() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[21.87%_15.63%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.75 11.2501">
          <path d={svgPaths.p3b787b00} fill="var(--fill-0, #1F68DD)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[299px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[13px] w-full">Overdue bills</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px py-[6px] relative">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[13px] w-[20px]">6</p>
      <Frame41 />
    </div>
  );
}

function Container12() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[21.87%_15.63%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.75 11.2501">
          <path d={svgPaths.p3b787b00} fill="var(--fill-0, #1F68DD)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[299px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[13px] w-full">Draft invoices to approve</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px py-[6px] relative">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[13px] w-[20px]">11</p>
      <Frame43 />
    </div>
  );
}

function Container13() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[21.87%_15.63%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.75 11.2501">
          <path d={svgPaths.p3b787b00} fill="var(--fill-0, #1F68DD)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[299px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[13px] w-full">Bills awaiting approval</p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px py-[6px] relative">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[13px] w-[20px]">4</p>
      <Frame45 />
    </div>
  );
}

function Container14() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[21.87%_15.63%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.75 11.2501">
          <path d={svgPaths.p3b787b00} fill="var(--fill-0, #1F68DD)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Tasks() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Tasks">
      <div className="bg-white relative shrink-0 w-full" data-name="P1 Task">
        <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[12px] items-start pl-[24px] pr-[15px] py-[4px] relative w-full">
          <Frame39 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="content-stretch flex items-center justify-center relative size-[32px]" data-name="Icon/Back">
                <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="resizer" />
                  </svg>
                </div>
                <Container11 />
                <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="resizer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="P1 Task">
        <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[12px] items-start pl-[24px] pr-[15px] py-[4px] relative w-full">
          <Frame40 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="content-stretch flex items-center justify-center relative size-[32px]" data-name="Icon/Back">
                <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="resizer" />
                  </svg>
                </div>
                <Container12 />
                <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="resizer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#c31230] bottom-0 left-0 top-0 w-[3px]" data-name="Indicator" />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="P1 Task">
        <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[12px] items-start pl-[24px] pr-[15px] py-[4px] relative w-full">
          <Frame42 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="content-stretch flex items-center justify-center relative size-[32px]" data-name="Icon/Back">
                <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="resizer" />
                  </svg>
                </div>
                <Container13 />
                <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="resizer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#c31230] bottom-0 left-0 top-0 w-[3px]" data-name="Indicator" />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="P1 Task">
        <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[12px] items-start pl-[24px] pr-[15px] py-[4px] relative w-full">
          <Frame44 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="content-stretch flex items-center justify-center relative size-[32px]" data-name="Icon/Back">
                <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="resizer" />
                  </svg>
                </div>
                <Container14 />
                <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="resizer" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column({ top }: { top: number }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-0 w-[440px]" style={{ top }} data-name="column 1">
      <div className="bg-white content-stretch flex flex-col items-start max-w-[440px] min-w-[440px] relative rounded-[12px] shrink-0 w-full" data-name="Bank account">
        <div className="relative shrink-0 w-full" data-name="P1 widget header">
          <div className="content-stretch flex items-start justify-between pb-[7px] pl-[24px] pr-[8px] pt-[14px] relative w-full">
            <Title3 />
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="right content">
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
        </div>
        <div className="relative shrink-0 w-full" data-name="P1 large number state">
          <div className="content-start flex flex-wrap gap-[12px_24px] items-start pb-[12px] px-[24px] relative w-full">
            <LabelValue3 />
            <Separator />
            <LabelValue4 />
            <div className="absolute bg-[#1f68dd] h-[38px] left-0 top-[4px] w-[3px]" data-name="Indicator" />
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="label value data">
          <div className="content-stretch flex flex-col items-start px-[24px] relative w-full">
            <Data1 />
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="P1 widget footer">
          <div className="content-stretch flex gap-[8px] items-start pb-[20px] pt-[5px] px-[24px] relative w-full">
            <div className="bg-[#1f68dd] content-stretch flex gap-[4px] items-center justify-center min-h-[32px] px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Button">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">Reconcile 20 items</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col h-[522px] items-start max-h-[522px] max-w-[440px] min-h-[522px] min-w-[440px] relative rounded-[12px] shrink-0 w-full" data-name="Recent invoice payments">
        <div className="relative shrink-0 w-full" data-name="P1 widget header">
          <div className="content-stretch flex items-start justify-between pb-[7px] pl-[24px] pr-[8px] pt-[14px] relative w-full">
            <Title4 />
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="right content">
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
              <Container9 />
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Body />
        <div className="relative shrink-0 w-full" data-name="P1 widget footer">
          <div className="content-stretch flex gap-[8px] items-start pb-[20px] pt-[5px] px-[24px] relative w-full">
            <div className="bg-white content-stretch flex gap-[4px] items-center justify-center min-h-[32px] px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Button">
              <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[13px] text-center whitespace-nowrap">View paid invoices</p>
            </div>
          </div>
        </div>
      </div>
      <NetProfitOrLoss />
      <div className="bg-white content-stretch flex flex-col items-start max-h-[251px] max-w-[440px] min-h-[251px] min-w-[440px] overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Tasks">
        <div className="relative shrink-0 w-full" data-name="P1 widget header">
          <div className="content-stretch flex items-start justify-between pb-[7px] pl-[24px] pr-[8px] pt-[14px] relative w-full">
            <Title6 />
          </div>
        </div>
        <Tasks />
      </div>
    </div>
  );
}

function WidgetTitle4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Widget title">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e3145] text-[17px] whitespace-nowrap">{`Invoices owed to you `}</p>
    </div>
  );
}

function Title7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-h-px min-w-px py-[4px] relative" data-name="title">
      <WidgetTitle4 />
    </div>
  );
}

function RightContent() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="right-content">
      <div className="overflow-clip relative shrink-0 size-[32px]" data-name="icon only button">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="state - none" />
        </svg>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13px] left-[calc(50%-0.5px)] top-[calc(50%+0.5px)] w-[3px]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 13">
            <path clipRule="evenodd" d={svgPaths.p2e3e30e0} fill="var(--fill-0, #1E3145)" fillRule="evenodd" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LabelValue7() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 w-[172px]" data-name="label value">
      <p className="font-['Helvetica_Neue:Light',sans-serif] leading-[28px] relative shrink-0 text-[#000a1e] text-[24px] w-full">82,010</p>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#1f65d6] text-[13px] w-full">26 awaiting payment</p>
    </div>
  );
}

function Separator1() {
  return (
    <div className="h-[46px] relative shrink-0 w-0" data-name="separator">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 46">
          <g id="separator">
            <path d="M0.5 4L0.5 42" id="separator_2" stroke="var(--stroke-0, #E1E2E5)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LabelValue8() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 w-[172px]" data-name="label value">
      <p className="font-['Helvetica_Neue:Light',sans-serif] leading-[28px] relative shrink-0 text-[#000a1e] text-[24px] w-full">12,200</p>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#c31230] text-[13px] w-full">6 of 26 overdue</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="-translate-y-1/2 absolute h-[16px] left-0 right-px top-[calc(50%+9.5px)]">
      <div className="absolute flex h-0 items-center justify-center left-[32px] right-[-1px] top-[9px]">
        <div className="-scale-y-100 flex-none h-0 w-[360px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1.00005">
                <path d={svgPaths.p2db6d080} id="Line 1974" stroke="var(--stroke-0, #E1E2E5)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Helvetica_Neue:Regular',sans-serif] h-[16px] justify-center leading-[0] left-[24px] not-italic text-[#616b7a] text-[11px] text-right top-[8px] w-[31px]">
        <p className="leading-[16px]">75k</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute h-[42px] left-0 right-[1.25px] top-[-11px]">
      <div className="absolute flex h-0 items-center justify-center left-[31px] right-[-1.25px] top-[20px]">
        <div className="-scale-y-100 flex-none h-0 w-[361px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 1.00005">
                <path d={svgPaths.pcc37340} id="Line 1975" stroke="var(--stroke-0, #E1E2E5)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Helvetica_Neue:Regular',sans-serif] justify-center leading-[0] left-[23px] not-italic text-[#616b7a] text-[11px] text-right top-[19px] whitespace-nowrap">
        <p className="leading-[16px]">150k</p>
      </div>
    </div>
  );
}

function Bar2() {
  return (
    <div className="bg-[#c31230] h-[59.26px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[55px]" data-name="Bar 1">
      <div aria-hidden="true" className="absolute border-[#c31230] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function Bar14() {
  return <div className="absolute bg-[#c31230] border-[#c31230] border-l border-r border-solid border-t h-[28.07px] left-0 top-[88.81px] w-[55px]" data-name="Bar 2.1" />;
}

function Bar3() {
  return (
    <div className="bg-[#bad7f8] h-[116.876px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[55px]" data-name="Bar 2">
      <div aria-hidden="true" className="absolute border-[#4482e6] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <Bar14 />
    </div>
  );
}

function Bar4() {
  return (
    <div className="bg-[#bad7f8] h-[217.286px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[55px]" data-name="Bar 3">
      <div aria-hidden="true" className="absolute border-[#4482e6] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function Bar5() {
  return (
    <div className="bg-[#bad7f8] h-[169.463px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[55px]" data-name="Bar 4">
      <div aria-hidden="true" className="absolute border-[#4482e6] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function Bar6() {
  return (
    <div className="bg-[#bad7f8] h-[81px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[55px]" data-name="Bar 5">
      <div aria-hidden="true" className="absolute border-[#4482e6] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-end left-0 top-[0.73px]">
      <Bar2 />
      <Bar3 />
      <Bar4 />
      <Bar5 />
      <Bar6 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute inset-[17.5px_11px_-1.5px_42px]">
      <Frame33 />
    </div>
  );
}

function BottomLine() {
  return (
    <div className="absolute bottom-[-2px] h-[12px] left-[9px] right-px" data-name="bottom line">
      <p className="-translate-x-full absolute font-['Helvetica_Neue:Regular',sans-serif] h-[16px] leading-[16px] left-[15px] not-italic text-[#616b7a] text-[11px] text-right top-0 w-[31px]">0</p>
      <div className="absolute flex h-0 items-center justify-center left-[23px] right-[-1px] top-[10px]">
        <div className="-scale-y-100 flex-none h-0 w-[360px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1.00005">
                <path d={svgPaths.p1e866680} id="Line 1976" stroke="var(--stroke-0, #A6AAB1)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[2]">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex gap-[12px] items-end pl-[50px] relative size-full">
          <Frame6 />
          <Frame3 />
          <Frame24 />
          <BottomLine />
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="font-['Helvetica_Neue:Regular',sans-serif] h-[36px] leading-[16px] min-h-[28px] not-italic relative shrink-0 text-[#616b7a] text-[13px] text-center w-full z-[1]">
      <p className="-translate-x-1/2 absolute left-[69.5px] top-[4px] w-[55px]">Overdue</p>
      <p className="-translate-x-1/2 absolute left-[140.5px] top-[4px] w-[55px]">Due this week</p>
      <p className="-translate-x-1/2 absolute left-[211.5px] top-[4px] w-[55px]">30 Jun–6 Jul</p>
      <p className="-translate-x-1/2 absolute left-[282.5px] top-[4px] w-[55px]">7–13 Jul</p>
      <p className="-translate-x-1/2 absolute left-[353.5px] top-[4px] w-[55px]">From 14 Jul</p>
    </div>
  );
}

function WidgetChartColumnAltNarrow() {
  return (
    <div className="flex-[1_0_0] h-[271px] min-h-[200px] min-w-px relative" data-name="Widget/Chart/Column Alt Narrow">
      <div className="content-stretch flex flex-col isolate items-start min-h-[inherit] px-[24px] relative size-full">
        <Frame5 />
        <Frame23 />
      </div>
    </div>
  );
}

function WidgetChart2() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[20px] relative shrink-0 w-full" data-name="Widget/Chart">
      <WidgetChartColumnAltNarrow />
    </div>
  );
}

function LabelValue9() {
  return (
    <div className="content-stretch flex font-['Helvetica_Neue:Regular',sans-serif] items-center justify-between leading-[16px] not-italic relative shrink-0 text-[13px] w-full whitespace-nowrap" data-name="Label value">
      <p className="relative shrink-0 text-[#1f65d6]">6 drafts</p>
      <p className="relative shrink-0 text-[#1e3145] text-right">8,960</p>
    </div>
  );
}

function LabelValue10() {
  return (
    <div className="content-stretch flex font-['Helvetica_Neue:Regular',sans-serif] items-center justify-between leading-[16px] not-italic relative shrink-0 text-[13px] w-full whitespace-nowrap" data-name="Label value">
      <p className="relative shrink-0 text-[#1f65d6]">3 awaiting approval</p>
      <p className="relative shrink-0 text-[#1e3145] text-right">2,900</p>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start py-[13px] relative shrink-0 w-full" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
      <LabelValue9 />
      <LabelValue10 />
    </div>
  );
}

function WidgetTitle5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Widget title">
      <p className="font-['Helvetica_Neue:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1e3145] text-[17px] whitespace-nowrap">{`Invoices owed to you `}</p>
    </div>
  );
}

function Title8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-h-px min-w-px py-[4px] relative" data-name="title">
      <WidgetTitle5 />
    </div>
  );
}

function RightContent1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="right-content">
      <div className="overflow-clip relative shrink-0 size-[32px]" data-name="icon only button">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="state - none" />
        </svg>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13px] left-[calc(50%-0.5px)] top-[calc(50%+0.5px)] w-[3px]" data-name="vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 13">
            <path clipRule="evenodd" d={svgPaths.p2e3e30e0} fill="var(--fill-0, #1E3145)" fillRule="evenodd" id="vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LabelValue11() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 w-[172px]" data-name="label value">
      <p className="font-['Helvetica_Neue:Light',sans-serif] leading-[28px] relative shrink-0 text-[#000a1e] text-[24px] w-full">82,010</p>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#1f65d6] text-[13px] w-full">26 awaiting payment</p>
    </div>
  );
}

function Separator2() {
  return (
    <div className="h-[46px] relative shrink-0 w-0" data-name="separator">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 46">
          <g id="separator">
            <path d="M0.5 4L0.5 42" id="separator_2" stroke="var(--stroke-0, #E1E2E5)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LabelValue12() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 w-[172px]" data-name="label value">
      <p className="font-['Helvetica_Neue:Light',sans-serif] leading-[28px] relative shrink-0 text-[#000a1e] text-[24px] w-full">12,200</p>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#c31230] text-[13px] w-full">6 of 26 overdue</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="-translate-y-1/2 absolute h-[16px] left-0 right-px top-[calc(50%+9.5px)]">
      <div className="absolute flex h-0 items-center justify-center left-[32px] right-[-1px] top-[9px]">
        <div className="-scale-y-100 flex-none h-0 w-[360px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1.00005">
                <path d={svgPaths.p2db6d080} id="Line 1974" stroke="var(--stroke-0, #E1E2E5)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Helvetica_Neue:Regular',sans-serif] h-[16px] justify-center leading-[0] left-[24px] not-italic text-[#616b7a] text-[11px] text-right top-[8px] w-[31px]">
        <p className="leading-[16px]">75k</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute h-[42px] left-0 right-[1.25px] top-[-11px]">
      <div className="absolute flex h-0 items-center justify-center left-[31px] right-[-1.25px] top-[20px]">
        <div className="-scale-y-100 flex-none h-0 w-[361px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 1.00005">
                <path d={svgPaths.pcc37340} id="Line 1975" stroke="var(--stroke-0, #E1E2E5)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Helvetica_Neue:Regular',sans-serif] justify-center leading-[0] left-[23px] not-italic text-[#616b7a] text-[11px] text-right top-[19px] whitespace-nowrap">
        <p className="leading-[16px]">150k</p>
      </div>
    </div>
  );
}

function Bar7() {
  return (
    <div className="bg-[#c31230] h-[59.26px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[55px]" data-name="Bar 1">
      <div aria-hidden="true" className="absolute border-[#c31230] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function Bar15() {
  return <div className="absolute bg-[#c31230] border-[#c31230] border-l border-r border-solid border-t h-[28.07px] left-0 top-[88.81px] w-[55px]" data-name="Bar 2.1" />;
}

function Bar8() {
  return (
    <div className="bg-[#bad7f8] h-[116.876px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[55px]" data-name="Bar 2">
      <div aria-hidden="true" className="absolute border-[#4482e6] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <Bar15 />
    </div>
  );
}

function Bar9() {
  return (
    <div className="bg-[#bad7f8] h-[217.286px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[55px]" data-name="Bar 3">
      <div aria-hidden="true" className="absolute border-[#4482e6] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function Bar12() {
  return (
    <div className="bg-[#bad7f8] h-[169.463px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[55px]" data-name="Bar 4">
      <div aria-hidden="true" className="absolute border-[#4482e6] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function Bar13() {
  return (
    <div className="bg-[#bad7f8] h-[81px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[55px]" data-name="Bar 5">
      <div aria-hidden="true" className="absolute border-[#4482e6] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-end left-0 top-[0.73px]">
      <Bar7 />
      <Bar8 />
      <Bar9 />
      <Bar12 />
      <Bar13 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute inset-[17.5px_11px_-1.5px_42px]">
      <Frame34 />
    </div>
  );
}

function BottomLine1() {
  return (
    <div className="absolute bottom-[-2px] h-[12px] left-[9px] right-px" data-name="bottom line">
      <p className="-translate-x-full absolute font-['Helvetica_Neue:Regular',sans-serif] h-[16px] leading-[16px] left-[15px] not-italic text-[#616b7a] text-[11px] text-right top-0 w-[31px]">0</p>
      <div className="absolute flex h-0 items-center justify-center left-[23px] right-[-1px] top-[10px]">
        <div className="-scale-y-100 flex-none h-0 w-[360px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1.00005">
                <path d={svgPaths.p1e866680} id="Line 1976" stroke="var(--stroke-0, #A6AAB1)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[2]">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex gap-[12px] items-end pl-[50px] relative size-full">
          <Frame8 />
          <Frame9 />
          <Frame25 />
          <BottomLine1 />
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="font-['Helvetica_Neue:Regular',sans-serif] h-[36px] leading-[16px] min-h-[28px] not-italic relative shrink-0 text-[#616b7a] text-[13px] text-center w-full z-[1]">
      <p className="-translate-x-1/2 absolute left-[69.5px] top-[4px] w-[55px]">Overdue</p>
      <p className="-translate-x-1/2 absolute left-[140.5px] top-[4px] w-[55px]">Due this week</p>
      <p className="-translate-x-1/2 absolute left-[211.5px] top-[4px] w-[55px]">30 Jun–6 Jul</p>
      <p className="-translate-x-1/2 absolute left-[282.5px] top-[4px] w-[55px]">7–13 Jul</p>
      <p className="-translate-x-1/2 absolute left-[353.5px] top-[4px] w-[55px]">From 14 Jul</p>
    </div>
  );
}

function WidgetChartColumnAltNarrow1() {
  return (
    <div className="flex-[1_0_0] h-[271px] min-h-[200px] min-w-px relative" data-name="Widget/Chart/Column Alt Narrow">
      <div className="content-stretch flex flex-col isolate items-start min-h-[inherit] px-[24px] relative size-full">
        <Frame7 />
        <Frame28 />
      </div>
    </div>
  );
}

function WidgetChart3() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[20px] relative shrink-0 w-full" data-name="Widget/Chart">
      <WidgetChartColumnAltNarrow1 />
    </div>
  );
}

function LabelValue13() {
  return (
    <div className="content-stretch flex font-['Helvetica_Neue:Regular',sans-serif] items-center justify-between leading-[16px] not-italic relative shrink-0 text-[13px] w-full whitespace-nowrap" data-name="Label value">
      <p className="relative shrink-0 text-[#1f65d6]">6 drafts</p>
      <p className="relative shrink-0 text-[#1e3145] text-right">8,960</p>
    </div>
  );
}

function LabelValue14() {
  return (
    <div className="content-stretch flex font-['Helvetica_Neue:Regular',sans-serif] items-center justify-between leading-[16px] not-italic relative shrink-0 text-[13px] w-full whitespace-nowrap" data-name="Label value">
      <p className="relative shrink-0 text-[#1f65d6]">3 awaiting approval</p>
      <p className="relative shrink-0 text-[#1e3145] text-right">2,900</p>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start py-[13px] relative shrink-0 w-full" data-name="Data">
      <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
      <LabelValue13 />
      <LabelValue14 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="row 1">
      <div className="bg-white content-stretch flex flex-col h-[522px] items-start max-w-[440px] min-w-[440px] overflow-clip relative rounded-[12px] shrink-0 w-[440px]" data-name="Invoices owed to you">
        <div className="relative shrink-0 w-full" data-name="P1 widget header">
          <div className="content-stretch flex items-start justify-between pb-[7px] pl-[24px] pr-[8px] pt-[14px] relative w-full">
            <Title7 />
            <div className="content-stretch flex items-center relative shrink-0" data-name="right content">
              <RightContent />
            </div>
          </div>
        </div>
        <div className="content-start flex flex-wrap gap-[12px_24px] items-start pb-[12px] px-[24px] relative shrink-0" data-name="P1 large number state">
          <LabelValue7 />
          <Separator1 />
          <LabelValue8 />
          <div className="absolute h-[38px] left-0 top-[4px] w-[3px]" data-name="Indicator" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px min-w-px relative w-[440px]" data-name="Invoices graph">
          <WidgetChart2 />
        </div>
        <div className="relative shrink-0 w-full" data-name="label value data">
          <div className="content-stretch flex flex-col items-start px-[24px] relative w-full">
            <Data2 />
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="P1 widget footer">
          <div className="content-stretch flex gap-[8px] items-start pb-[20px] pt-[5px] px-[24px] relative w-full">
            <div className="bg-white content-stretch flex h-[28px] items-center justify-center px-[10px] relative rounded-[6px] shrink-0" data-name="Phase 1 button">
              <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[13px] whitespace-nowrap">New invoice</p>
            </div>
            <div className="bg-white content-stretch flex h-[28px] items-center justify-center px-[10px] relative rounded-[6px] shrink-0" data-name="Phase 1 button">
              <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[13px] whitespace-nowrap">View all invoices</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col h-[522px] items-start max-w-[440px] min-w-[440px] overflow-clip relative rounded-[12px] shrink-0 w-[440px]" data-name="Invoices owed to you">
        <div className="relative shrink-0 w-full" data-name="P1 widget header">
          <div className="content-stretch flex items-start justify-between pb-[7px] pl-[24px] pr-[8px] pt-[14px] relative w-full">
            <Title8 />
            <div className="content-stretch flex items-center relative shrink-0" data-name="right content">
              <RightContent1 />
            </div>
          </div>
        </div>
        <div className="content-start flex flex-wrap gap-[12px_24px] items-start pb-[12px] px-[24px] relative shrink-0" data-name="P1 large number state">
          <LabelValue11 />
          <Separator2 />
          <LabelValue12 />
          <div className="absolute h-[38px] left-0 top-[4px] w-[3px]" data-name="Indicator" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px min-w-px relative w-[440px]" data-name="Invoices graph">
          <WidgetChart3 />
        </div>
        <div className="relative shrink-0 w-full" data-name="label value data">
          <div className="content-stretch flex flex-col items-start px-[24px] relative w-full">
            <Data3 />
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="P1 widget footer">
          <div className="content-stretch flex gap-[8px] items-start pb-[20px] pt-[5px] px-[24px] relative w-full">
            <div className="bg-white content-stretch flex h-[28px] items-center justify-center px-[10px] relative rounded-[6px] shrink-0" data-name="Phase 1 button">
              <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[13px] whitespace-nowrap">New invoice</p>
            </div>
            <div className="bg-white content-stretch flex h-[28px] items-center justify-center px-[10px] relative rounded-[6px] shrink-0" data-name="Phase 1 button">
              <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[13px] whitespace-nowrap">View all invoices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WidgetTitle6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic relative shrink-0 text-[#1e3145] text-[17px] w-full whitespace-nowrap" data-name="Widget title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] relative shrink-0">Cash in and out</p>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[24px] relative shrink-0">•</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] relative shrink-0">Last 6 months</p>
    </div>
  );
}

function Title9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-h-px min-w-px py-[4px] relative" data-name="title">
      <WidgetTitle6 />
    </div>
  );
}

function Container15() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[18.75%_43.75%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 12.5">
          <path d={svgPaths.p1c449a00} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function LabelValue15() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 w-[172px]" data-name="label value">
      <p className="font-['National_2:Regular',sans-serif] leading-[1.3] relative shrink-0 text-[#000a1e] text-[22px] w-full">212,460</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] relative shrink-0 text-[#616b7a] text-[13px] w-full">Cash in</p>
    </div>
  );
}

function Separator3() {
  return (
    <div className="h-[46px] relative shrink-0 w-0" data-name="separator">
      <div className="absolute inset-[0_-0.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 46">
          <g id="separator">
            <path d="M0.5 4L0.5 42" id="separator_2" stroke="var(--stroke-0, #E1E2E5)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LabelValue16() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 w-[172px]" data-name="label value">
      <p className="font-['National_2:Regular',sans-serif] leading-[1.3] relative shrink-0 text-[#1e3145] text-[22px] w-full">-190,900</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] relative shrink-0 text-[#616b7a] text-[13px] w-full">Cash out</p>
    </div>
  );
}

function LabelValue17() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 w-[172px]" data-name="label value">
      <p className="font-['National_2:Regular',sans-serif] leading-[1.3] relative shrink-0 text-[#1e3145] text-[22px] w-full">21,560</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] relative shrink-0 text-[#616b7a] text-[13px] w-full">Difference</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="-translate-y-1/2 absolute h-[16px] left-0 right-px top-[calc(50%+6px)]">
      <div className="absolute flex h-0 items-center justify-center left-[32px] right-0 top-[9px]">
        <div className="-scale-y-100 flex-none h-0 w-[819px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 819 1.00005">
                <path d={svgPaths.p5c4e800} id="Line 1974" stroke="var(--stroke-0, #E1E2E5)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Helvetica_Neue:Regular',sans-serif] h-[16px] justify-center leading-[0] left-[24px] not-italic text-[#616b7a] text-[11px] text-right top-[8px] w-[31px]">
        <p className="leading-[16px]">75k</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute h-[16px] left-0 right-px top-0">
      <div className="absolute flex h-0 items-center justify-center left-[32px] right-0 top-[8px]">
        <div className="-scale-y-100 flex-none h-0 w-[819px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 819 1.00005">
                <path d={svgPaths.p167a7700} id="Line 1975" stroke="var(--stroke-0, #E1E2E5)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Helvetica_Neue:Regular',sans-serif] h-[16px] justify-center leading-[0] left-[23.78px] not-italic text-[#616b7a] text-[11px] text-right top-[8px] w-[30.779px]">
        <p className="leading-[16px]">150k</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex gap-[8px] inset-[50.71%_86.66%_0_-0.13%] items-end">
      <div className="absolute flex inset-[17.31%_54.49%_0_0] items-center justify-center">
        <div className="flex-none h-[48.061px] rotate-90 w-[92.124px]">
          <div className="relative size-full">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 124.734 48.0613">
              <path d={svgPaths.p2a0d2570} fill="var(--fill-0, #4482E6)" id="Rectangle 3467409" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[0_1.4%_0_53.09%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.0613 150.841">
          <path d={svgPaths.pa0e8700} fill="var(--fill-0, #BAD7F8)" id="Rectangle 3467410" stroke="var(--stroke-0, #4482E6)" />
        </svg>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex gap-[7px] inset-[8.99%_69.3%_0_17.36%] items-end">
      <div className="absolute flex inset-[0_54.05%_0_0] items-center justify-center">
        <div className="flex-none h-[48.061px] rotate-90 w-[205.672px]">
          <div className="bg-[#4482e6] rounded-bl-[4px] rounded-tl-[4px] size-full" />
        </div>
      </div>
      <div className="absolute bottom-0 left-[52.65%] right-[1.4%] top-1/4">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.0613 208.857">
          <path d={svgPaths.peb38a00} fill="var(--fill-0, #BAD7F8)" id="Rectangle 3467412" stroke="var(--stroke-0, #4482E6)" />
        </svg>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute content-stretch flex gap-[8px] inset-[47.39%_51.94%_0_34.59%] items-end">
      <div className="absolute flex inset-[0_54.49%_0_0] items-center justify-center">
        <div className="flex-none h-[48.061px] rotate-90 w-[118.904px]">
          <div className="bg-[#4482e6] rounded-bl-[4px] rounded-tl-[4px] size-full" />
        </div>
      </div>
      <div className="absolute bg-[#bad7f8] inset-[28.83%_1.4%_0_53.09%] rounded-tl-[4px] rounded-tr-[4px]">
        <div aria-hidden="true" className="absolute border border-[#4482e6] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex gap-[7px] inset-[27.01%_34.72%_0_51.94%] items-end">
      <div className="absolute flex inset-[0_54.05%_0_0] items-center justify-center">
        <div className="flex-none h-[48.061px] rotate-90 w-[164.966px]">
          <div className="bg-[#4482e6] rounded-bl-[4px] rounded-tl-[4px] size-full" />
        </div>
      </div>
      <div className="absolute bg-[#bad7f8] inset-[32.47%_0.45%_0_53.61%] rounded-tl-[4px] rounded-tr-[4px]">
        <div aria-hidden="true" className="absolute border border-[#4482e6] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex gap-[8px] inset-[59.71%_17.23%_0_69.3%] items-end">
      <div className="absolute flex inset-[7.06%_54.49%_0_0] items-center justify-center">
        <div className="flex-none h-[48.061px] rotate-90 w-[84.625px]">
          <div className="bg-[#4482e6] rounded-bl-[4px] rounded-tl-[4px] size-full" />
        </div>
      </div>
      <div className="absolute bg-[#bad7f8] inset-[0_1.4%_0_53.09%] rounded-tl-[4px] rounded-tr-[4px]">
        <div aria-hidden="true" className="absolute border border-[#4482e6] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute content-stretch flex gap-[7px] inset-[22.74%_0_0_86.53%] items-end">
      <div className="absolute flex inset-[0_53.55%_0_0.95%] items-center justify-center">
        <div className="flex-none h-[48.061px] rotate-90 w-[174.607px]">
          <div className="bg-[#4482e6] rounded-bl-[4px] rounded-tl-[4px] size-full" />
        </div>
      </div>
      <div className="absolute bg-[#bad7f8] inset-[15.34%_-0.49%_0_54.99%] rounded-tl-[4px] rounded-tr-[4px]">
        <div aria-hidden="true" className="absolute border border-[#4482e6] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame17 />
    </div>
  );
}

function BottomLine2() {
  return (
    <div className="absolute bottom-[-28px] h-[38px] left-0 right-px" data-name="bottom line">
      <p className="-translate-x-full absolute font-['Helvetica_Neue:Regular',sans-serif] h-[16px] leading-[16px] left-[24px] not-italic text-[#616b7a] text-[11px] text-right top-0 w-[31px]">0</p>
      <div className="absolute flex h-px items-center justify-center left-[32px] right-0 top-[9px]">
        <div className="-scale-y-100 flex-none h-px w-[819px]">
          <div className="relative size-full" data-name="Line 1976 (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 819 1.00005">
              <path clipRule="evenodd" d={svgPaths.p23bb0f00} fill="var(--fill-0, #A6AAB1)" fillRule="evenodd" id="Line 1976 (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chart1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Chart">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex gap-[12px] items-end pl-[50px] pr-[18px] relative size-full">
          <Frame10 />
          <Frame11 />
          <Frame18 />
          <BottomLine2 />
        </div>
      </div>
    </div>
  );
}

function Labels1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Labels">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex font-['Helvetica_Neue:Regular',sans-serif] gap-[16px] items-start justify-center leading-[16px] not-italic pl-[50px] pr-[18px] pt-[4px] relative text-[#616b7a] text-[13px] text-center w-full">
          <p className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative">Dec</p>
          <p className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative">Jan</p>
          <p className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative">Feb</p>
          <p className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative">Mar</p>
          <p className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative">Apr</p>
          <p className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative">May</p>
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[10px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #4482E6)" id="Ellipse 869" r="5" />
        </svg>
      </div>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[13px] not-italic relative shrink-0 text-[#616b7a] text-[11px] whitespace-nowrap">Cash in</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[10px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #BAD7F8)" id="Ellipse 868" r="4.5" stroke="var(--stroke-0, #4482E6)" />
        </svg>
      </div>
      <p className="font-['Helvetica_Neue:Regular',sans-serif] leading-[13px] not-italic relative shrink-0 text-[#616b7a] text-[11px] whitespace-nowrap">Cash out</p>
    </div>
  );
}

function WidgetTitle7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Widget title">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] not-italic relative shrink-0 text-[#1e3145] text-[17px] whitespace-nowrap">Chart of accounts watchlist</p>
    </div>
  );
}

function Title10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-h-px min-w-px py-[4px] relative" data-name="title">
      <WidgetTitle7 />
    </div>
  );
}

function Container16() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[18.75%_43.75%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.5 12.5">
          <path d={svgPaths.p1c449a00} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

function Column1({ top }: { top: number }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[2166px] items-start left-[460px] w-[900px]" style={{ top }} data-name="column 2">
      <Row />
      <div className="bg-white content-stretch flex flex-col h-[522px] items-start max-h-[522px] max-w-[900px] min-h-[522px] min-w-[900px] relative rounded-[12px] shrink-0 w-[900px]" data-name="Cash in and out">
        <div className="relative shrink-0 w-full" data-name="P1 widget header">
          <div className="content-stretch flex items-start justify-between pb-[7px] pl-[24px] pr-[8px] pt-[14px] relative w-full">
            <Title9 />
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="right content">
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
              <Container15 />
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="content-start flex flex-wrap gap-[12px_24px] h-[62px] items-start pb-[12px] px-[24px] relative shrink-0" data-name="P1 large number state">
          <LabelValue15 />
          <Separator3 />
          <LabelValue16 />
          <LabelValue17 />
          <div className="absolute h-[38px] left-0 top-[4px] w-[3px]" data-name="Indicator" />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Widget/Chart">
          <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Chart/12 Column chart">
            <div className="content-stretch flex flex-col items-start px-[24px] relative size-full">
              <Chart1 />
              <Labels1 />
            </div>
          </div>
          <div className="relative shrink-0 w-full" data-name="Chart/Legend">
            <div className="flex flex-row items-center justify-end size-full">
              <div className="content-stretch flex gap-[24px] items-center justify-end pt-[10px] px-[24px] relative w-full">
                <Frame29 />
                <Frame30 />
              </div>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="P1 widget footer">
          <div className="content-stretch flex gap-[8px] items-start pb-[20px] pt-[5px] px-[24px] relative w-full">
            <div className="bg-white content-stretch flex gap-[4px] items-center justify-center min-h-[32px] px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Button">
              <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[13px] text-center whitespace-nowrap">Go to Bank Summary report</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col h-[522px] items-start max-h-[522px] max-w-[900px] min-h-[522px] min-w-[900px] relative rounded-[12px] shrink-0 w-[900px]" data-name="Chart of accounts watchlist">
        <div className="relative shrink-0 w-full" data-name="P1 widget header">
          <div className="content-stretch flex items-start justify-between pb-[7px] pl-[24px] pr-[8px] pt-[14px] relative w-full">
            <Title10 />
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="right content">
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
              <Container16 />
              <div className="h-0 max-w-[6.670000076293945px] relative shrink-0 w-[6.67px]" data-name="resizer">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="resizer" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] min-h-px min-w-[440px] relative w-[900px]" data-name="Widget/Table Column-based">
          <div className="min-w-[inherit] overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-start min-w-[inherit] pt-[3px] px-[24px] relative size-full">
              <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="_Table/Columns">
                <div className="content-stretch flex gap-[8px] items-start pb-[7px] pr-[24px] relative shrink-0" data-name="_Table cells">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative shrink-0 text-[#616b7a] text-[12px] whitespace-nowrap">Code</p>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-center size-full">
                    <div className="content-stretch flex items-start justify-center pb-[13px] pr-[24px] pt-[11px] relative w-full">
                      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">200</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-center size-full">
                    <div className="content-stretch flex items-start justify-center pb-[13px] pr-[24px] pt-[11px] relative w-full">
                      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">260</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-center size-full">
                    <div className="content-stretch flex items-start justify-center pb-[13px] pr-[24px] pt-[11px] relative w-full">
                      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">270</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-center size-full">
                    <div className="content-stretch flex items-start justify-center pb-[13px] pr-[24px] pt-[11px] relative w-full">
                      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">300</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-center size-full">
                    <div className="content-stretch flex items-start justify-center pb-[13px] pr-[24px] pt-[11px] relative w-full">
                      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">412</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-center size-full">
                    <div className="content-stretch flex items-start justify-center pb-[13px] pr-[24px] pt-[11px] relative w-full">
                      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">416</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-center size-full">
                    <div className="content-stretch flex items-start justify-center pb-[13px] pr-[24px] pt-[11px] relative w-full">
                      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">453</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-center size-full">
                    <div className="content-stretch flex items-start justify-center pb-[13px] pr-[24px] pt-[11px] relative w-full">
                      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">500</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-center size-full">
                    <div className="content-stretch flex items-start justify-center pb-[13px] pr-[24px] pt-[11px] relative w-full">
                      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">510</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="_Table/Columns">
                <div className="content-stretch flex gap-[8px] items-start pb-[7px] pr-[24px] relative shrink-0" data-name="_Table cells">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative shrink-0 text-[#616b7a] text-[12px] whitespace-nowrap">Account</p>
                </div>
                <div className="content-stretch flex items-start justify-center pb-[13px] pt-[11px] relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">Sales</p>
                </div>
                <div className="content-stretch flex items-start justify-center pb-[13px] pt-[11px] relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">Other Revenue</p>
                </div>
                <div className="content-stretch flex items-start justify-center pb-[13px] pt-[11px] relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">Interest Income</p>
                </div>
                <div className="content-stretch flex items-start justify-center pb-[13px] pt-[11px] relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">Purchases</p>
                </div>
                <div className="content-stretch flex items-start justify-center pb-[13px] pt-[11px] relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">{`Consulting & Accounting`}</p>
                </div>
                <div className="content-stretch flex items-start justify-center pb-[13px] pt-[11px] relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">Depreciation</p>
                </div>
                <div className="content-stretch flex items-start justify-center pb-[13px] pt-[11px] relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">Office Expenses</p>
                </div>
                <div className="content-stretch flex items-start justify-center pb-[13px] pt-[11px] relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">Bank fees</p>
                </div>
                <div className="content-stretch flex items-start justify-center pb-[13px] pt-[11px] relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.45] min-h-px min-w-px not-italic relative text-[#1e3145] text-[13px]">Inventory</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-end relative shrink-0 w-[24px]" data-name="_Table/Columns">
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div className="flex flex-col items-end size-full">
                    <div className="content-stretch flex flex-col items-end pb-[7px] pl-[24px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative shrink-0 text-[#616b7a] text-[12px] text-right whitespace-nowrap">Budget</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[24px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">350,652.00</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[24px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">12,560.00</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[24px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">5,987.40</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[24px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">20,000.00</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[24px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">10,582.00</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[24px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">12,500.52</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[24px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">9,582.00</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[24px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">560.23</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[24px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">184,500.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-end relative shrink-0 w-[66px]" data-name="_Table/Columns">
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[8px] items-start justify-end pb-[7px] pl-[128px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative shrink-0 text-[#616b7a] text-[12px] text-right whitespace-nowrap">This month</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">36,528.00</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">8,950.23</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">568.00</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">5,123.09</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">1,500.60</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">890.47</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">1,560.23</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">78.56</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">30,124.50</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-end relative shrink-0 w-[66px]" data-name="_Table/Columns">
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[8px] items-start justify-end pb-[7px] pl-[128px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative shrink-0 text-[#616b7a] text-[12px] text-right whitespace-nowrap">YTD</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">149,562.30</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">10,560.89</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">1,478.32</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">9,782.60</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">5,312.70</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">2,563.21</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">3,100.50</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">256.40</p>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full" data-name="_Table cells">
                  <div aria-hidden="true" className="absolute border-[#e1e2e5] border-solid border-t inset-0 pointer-events-none" />
                  <div className="flex flex-row justify-end size-full">
                    <div className="content-stretch flex gap-[4px] items-start justify-end pb-[13px] pl-[128px] pt-[11px] relative w-full">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#1f68dd] text-[13px] text-right whitespace-nowrap">78,952.50</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="P1 widget footer">
          <div className="content-stretch flex gap-[8px] items-start pb-[20px] pt-[5px] px-[24px] relative w-full">
            <div className="bg-white content-stretch flex gap-[4px] items-center justify-center min-h-[32px] px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Button">
              <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-none not-italic relative shrink-0 text-[#1e3145] text-[13px] text-center whitespace-nowrap">Go to full chart of accounts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group({ top }: { top: number }) {
  return (
    <div className="absolute left-0 w-[1360px]" style={{ top }} data-name="Group">
      <p className="font-['National_2:Bold',sans-serif] leading-[1.15] not-italic text-[#1e3145] text-[28px] whitespace-nowrap mb-[20px]">Business overview</p>
      <div className="relative">
        <Column top={0} />
        <Column1 top={0} />
      </div>
    </div>
  );
}

function PageContent() {
  const [promptTop, setPromptTop] = useState(667);
  const containersTop = promptTop + 96 + 32;

  return (
    <div className="h-[2182px] relative shrink-0 w-[1360px]" data-name="page content">
      <BusinessOverview onPromptTopChange={setPromptTop} />
      <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-0 top-[2330px] w-[1360px]" data-name="P1 Apps">
        <Header10 />
      </div>
      <Group top={containersTop} />
    </div>
  );
}

export default function CashFlowHomePagePayAVendor() {
  return (
    <div className="bg-[#eff0f3] content-stretch flex flex-col items-center relative size-full" data-name="Cash flow home page - Pay a vendor">
      <div className="bg-[#1f65d6] content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Xero Blue navigation">
        <Left />
        <div className="content-stretch flex gap-[8px] items-center px-[12px] relative shrink-0" data-name="_Global tools">
          <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Icon button">
            <div className="relative shrink-0 size-[24px]" data-name="_nav icons">
              <Group9 />
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Search">
            <div className="relative shrink-0 size-[24px]" data-name="_nav icons">
              <Group3 />
            </div>
          </div>
          <div className="bg-[#1f65d6] content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="JAX">
            <div className="relative shrink-0 size-[24px]" data-name="_nav icons">
              <Group5 />
            </div>
          </div>
          <div className="bg-[#1f65d6] content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Help">
            <div className="relative shrink-0 size-[24px]" data-name="_nav icons">
              <Group4 />
            </div>
          </div>
          <div className="bg-[#1f65d6] content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Setup guide">
            <div className="relative shrink-0 size-[24px]" data-name="_nav icons">
              <Group8 />
            </div>
          </div>
          <div className="bg-[#1f65d6] content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Notifications">
            <div className="relative shrink-0 size-[24px]" data-name="_nav icons">
              <Group6 />
            </div>
          </div>
          <div className="bg-[#1f65d6] content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Apps">
            <div className="relative shrink-0 size-[24px]" data-name="_nav icons">
              <Group2 />
            </div>
          </div>
          <div className="relative shrink-0 size-[36px]" data-name="User menu button">
            <div className="absolute bg-[#9eeefd] inset-0 overflow-clip rounded-[60px]" data-name="avatar">
              <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:SemiBold',sans-serif] justify-center leading-[0] left-0 not-italic right-0 text-[#154d58] text-[15px] text-center top-1/2">
                <p className="leading-[1.45]">NH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Homepage header">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col items-center px-[24px] relative w-full">
            <Content />
          </div>
        </div>
      </div>
      <PageContent />
    </div>
  );
}