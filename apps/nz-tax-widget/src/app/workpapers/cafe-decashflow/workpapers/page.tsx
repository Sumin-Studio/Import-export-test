"use client";

import { useRegion } from "@/app/contexts/RegionContext";

import Image from "next/image";

import WorkpapersWorkpapersAUNZ from "@/app/assets/images/workpapers/aunz/workpapers-workpapers.svg";
import WorkpapersWorkpapersROW from "@/app/assets/images/workpapers/row/workpapers-workpapers.svg";
import WorkpapersWorkpapersUK from "@/app/assets/images/workpapers/uk/workpapers-workpapers.svg";

import Link from "next/link";

export default function CageDecashflowPage() {
  const { region } = useRegion();

  const getWorkpapersImage = () => {
    if (region === "AU" || region === "NZ") {
      return WorkpapersWorkpapersAUNZ;
    } else if (region === "USA") {
      return WorkpapersWorkpapersROW;
    } else if (region === "UK") {
      return WorkpapersWorkpapersUK;
    }
    return WorkpapersWorkpapersAUNZ; // default fallback
  };

  return (
    <div>
      <div className="">
        <div className="bg-neutral-0 flex flex-col gap-2 border-b border-[#E1E2E5] bg-white px-5 pt-3">
          <div>
            <ul className="flex items-center gap-1">
              <li className="text-[12px]/[130%] text-[#616B7A]">
                <Link href="/workpapers">Workpapers</Link>
              </li>
              <li className="text-[12px]/[130%] text-[#616B7A]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="16"
                  fill="none"
                >
                  <path
                    stroke="#A6AAB1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m3 5 2.859 2.859a.2.2 0 0 1 0 .282L3 11"
                  ></path>
                </svg>
              </li>
            </ul>

            <div className="flex items-center justify-between gap-2">
              <h1 className="flex items-center gap-2">
                <span className="font-inter flex size-6 flex-none items-center justify-center rounded bg-[#ABB4F9] text-[11px]/[100%] font-semibold text-[#27276F]">
                  CC
                </span>
                <span className="font-national text-[24px]/[115%] font-bold">
                  Cafe DeCashflow
                </span>
                <span className="font-inter text-[22px]/[115%] text-[#616B7A]">
                  2025 workpapers
                </span>
                <span className="flex size-5 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="6"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      fill="#616B7A"
                      d="M9.817 1.255 5.442 5.629a.625.625 0 0 1-.884 0L.183 1.255A.625.625 0 0 1 1.067.37L5 4.304 8.933.37a.625.625 0 1 1 .884.884"
                    ></path>
                  </svg>
                </span>
                <span className="font-inter flex h-4 items-center rounded-xl bg-[#F0F9FE] px-2 text-[12px]/[12px] font-medium text-[#1F68DD]">
                  In progress
                </span>
              </h1>
              <div className="flex items-center gap-2">
                <button
                  className="group relative flex h-8 w-14 cursor-pointer rounded-[120px] border border-[#CFD1D5] bg-white p-[3px] ease-in-out focus:not-data-focus:outline-none data-checked:border-[#3467d5] data-checked:bg-[#3467d5] data-focus:outline data-focus:outline-white"
                  id="headlessui-switch-«r5b»"
                  role="switch"
                  type="button"
                  aria-checked="false"
                  data-headlessui-state=""
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-flex size-6 translate-x-0 items-center justify-center rounded-full border border-[#CFD1D5] bg-white ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-6 group-data-checked:border-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="17"
                      fill="none"
                    >
                      <path
                        fill="#1E3145"
                        fill-rule="evenodd"
                        d="M2 4c0-4 4-4 4-4s4 0 4 4H8c0-2-2-2-2-2S4 2 4 4v3h7c1 0 1 1 1 1v8s0 1-1 1H1c-1 0-1-1-1-1V8s0-1 1-1h1zm5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </button>
                <div data-headlessui-state="">
                  <button
                    className="flex size-8 items-center justify-center rounded-[6px] border border-[#CFD1D5] hover:bg-[#eff0f3] data-open:bg-[#eff0f3]"
                    type="button"
                    aria-expanded="false"
                    data-headlessui-state=""
                    id="headlessui-popover-button-«r5e»"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="16"
                      fill="none"
                    >
                      <path
                        fill="#1E3145"
                        d="M13.875 11.125v2.5c0 1.036-.84 1.875-1.875 1.875H2a1.875 1.875 0 0 1-1.875-1.875v-2.5a.625.625 0 0 1 1.25 0v2.5c0 .345.28.625.625.625h10c.345 0 .625-.28.625-.625v-2.5a.625.625 0 1 1 1.25 0M2.808 5.317c.244.244.64.244.884 0l2.683-2.683v9.116a.625.625 0 1 0 1.25 0V2.634l2.683 2.683a.625.625 0 0 0 .884-.884L7.442.683a.625.625 0 0 0-.884 0l-3.75 3.75a.625.625 0 0 0 0 .884"
                      ></path>
                    </svg>
                  </button>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="239"
                  height="32"
                  fill="none"
                >
                  <mask id="a" fill="#fff">
                    <path d="M0 6a6 6 0 0 1 6-6h84a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z"></path>
                  </mask>
                  <path
                    fill="#fff"
                    d="M0 6a6 6 0 0 1 6-6h84a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z"
                  ></path>
                  <path
                    fill="#CFD1D5"
                    d="M6 0v1h84v-2H6zm90 6h-1v20h2V6zm-6 26v-1H6v2h84zM0 26h1V6h-2v20zm6 6v-1a5 5 0 0 1-5-5h-2a7 7 0 0 0 7 7zm90-6h-1a5 5 0 0 1-5 5v2a7 7 0 0 0 7-7zM90 0v1a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7zM6 0v-1a7 7 0 0 0-7 7h2a5 5 0 0 1 5-5z"
                    mask="url(#a)"
                  ></path>
                  <path
                    fill="#1E3145"
                    d="M9.493 20.5v-9.454h3.37q1.098 0 1.823.378.73.379 1.09 1.048.36.665.36 1.537 0 .868-.365 1.528-.36.655-1.09 1.02-.723.366-1.823.365h-2.553v-1.228h2.424q.693 0 1.126-.198.44-.2.642-.577.204-.38.203-.91 0-.535-.207-.928a1.34 1.34 0 0 0-.642-.6q-.435-.212-1.14-.212h-1.792V20.5zm4.667-4.266 2.336 4.266h-1.625l-2.29-4.266zm6.568 4.41q-1.048 0-1.805-.449a3.04 3.04 0 0 1-1.163-1.27q-.407-.821-.407-1.924 0-1.09.407-1.92a3.16 3.16 0 0 1 1.145-1.298q.739-.465 1.726-.466.6 0 1.164.198.563.199 1.01.623.45.425.707 1.104.258.674.258 1.639v.489h-5.636v-1.034h4.284q0-.545-.222-.965a1.7 1.7 0 0 0-.623-.67 1.74 1.74 0 0 0-.933-.244 1.8 1.8 0 0 0-1.015.286 1.9 1.9 0 0 0-.665.739q-.23.453-.23.983v.808q0 .71.248 1.21.255.498.707.761.452.26 1.057.259.392 0 .716-.111a1.49 1.49 0 0 0 .919-.9l1.306.235a2.37 2.37 0 0 1-.564 1.011q-.4.43-1.01.67a3.8 3.8 0 0 1-1.38.235Zm7.949-7.235v1.108h-4.008v-1.108zM25.768 20.5v-7.913q0-.664.291-1.103.29-.443.771-.66.48-.222 1.043-.222.415 0 .711.07.295.064.439.12l-.323 1.117a7 7 0 0 0-.25-.065 1.4 1.4 0 0 0-.369-.041q-.503 0-.72.249-.213.249-.213.72V20.5zm4.333 0v-7.09h1.334v1.126h.074q.194-.573.683-.9.495-.333 1.117-.333a6 6 0 0 1 .587.032v1.32a3 3 0 0 0-.296-.05 3 3 0 0 0-.425-.033q-.49 0-.872.208a1.54 1.54 0 0 0-.822 1.39v4.33zm7.791.143q-1.047 0-1.805-.448a3.04 3.04 0 0 1-1.163-1.27q-.406-.821-.406-1.924 0-1.09.406-1.92a3.16 3.16 0 0 1 1.145-1.298q.738-.465 1.726-.466.6 0 1.164.198.563.199 1.01.623.45.425.707 1.104.258.674.258 1.639v.489h-5.636v-1.034h4.284q0-.545-.222-.965a1.7 1.7 0 0 0-.623-.67 1.74 1.74 0 0 0-.933-.244 1.8 1.8 0 0 0-1.015.286 1.9 1.9 0 0 0-.665.739q-.23.453-.23.983v.808q0 .71.249 1.21.253.498.706.761.453.26 1.057.259.393 0 .716-.111a1.48 1.48 0 0 0 .919-.9l1.306.235a2.37 2.37 0 0 1-.563 1.011 2.7 2.7 0 0 1-1.011.67 3.8 3.8 0 0 1-1.38.235Zm9.888-5.503-1.252.222a1.5 1.5 0 0 0-.249-.457 1.2 1.2 0 0 0-.452-.356q-.287-.138-.716-.138-.586 0-.978.263-.393.258-.393.67 0 .354.263.572.264.217.85.355l1.126.259q.98.226 1.459.697t.48 1.223q0 .638-.37 1.136-.364.494-1.02.776-.65.28-1.51.281-1.19 0-1.943-.508-.752-.512-.923-1.454l1.334-.203q.124.521.513.79.387.262 1.01.262.68 0 1.085-.281.407-.285.407-.697a.72.72 0 0 0-.25-.559q-.244-.225-.752-.341l-1.2-.264q-.993-.225-1.468-.72-.471-.494-.471-1.25 0-.629.35-1.1a2.3 2.3 0 0 1 .97-.733q.62-.268 1.417-.268 1.15 0 1.81.498.66.494.873 1.325m3.036 1.15v4.21h-1.38v-9.454h1.362v3.517h.087q.249-.572.762-.91.513-.336 1.339-.336.729 0 1.274.3.55.3.85.895.304.591.304 1.478v4.51h-1.38v-4.344q0-.78-.402-1.21-.402-.434-1.117-.434-.49 0-.877.208a1.5 1.5 0 0 0-.605.61q-.217.396-.217.96m12.535 4.349a2.75 2.75 0 0 1-1.533-.44q-.67-.442-1.052-1.26-.38-.82-.379-1.97 0-1.15.383-1.967.389-.817 1.062-1.251.675-.434 1.528-.434.66 0 1.062.221.405.217.628.508.226.291.35.513h.084v-3.513h1.38V20.5h-1.348v-1.103h-.115q-.124.225-.36.517a2 2 0 0 1-.638.508q-.405.216-1.052.216Zm.305-1.178q.595 0 1.006-.314.415-.318.628-.881.216-.564.217-1.311 0-.74-.213-1.293a1.9 1.9 0 0 0-.623-.863q-.41-.31-1.015-.31-.624 0-1.04.323a2 2 0 0 0-.627.882 3.6 3.6 0 0 0-.208 1.26q0 .71.213 1.28.211.567.627.9.42.327 1.035.327m7.242 1.196q-.675 0-1.219-.25a2.05 2.05 0 0 1-.863-.733q-.314-.48-.314-1.178 0-.6.23-.987.231-.389.624-.614.392-.226.877-.342.484-.116.988-.175l1.034-.12q.397-.051.577-.162t.18-.36v-.033q0-.604-.341-.937-.337-.332-1.007-.332-.696 0-1.099.31-.396.304-.549.678l-1.297-.296q.23-.645.674-1.043a2.7 2.7 0 0 1 1.03-.582 4 4 0 0 1 1.223-.184q.424 0 .9.101.48.097.895.36.42.264.688.753.268.485.268 1.26V20.5h-1.348v-.97h-.055q-.135.268-.402.527a2.1 2.1 0 0 1-.688.43q-.42.17-1.006.17m.3-1.108q.572 0 .979-.226.41-.226.623-.591a1.54 1.54 0 0 0 .217-.79v-.914q-.075.075-.286.139a5 5 0 0 1-.476.106l-.522.079-.424.055a3.4 3.4 0 0 0-.734.17 1.26 1.26 0 0 0-.527.347q-.194.222-.194.59 0 .514.379.777.378.258.965.258m8.348-6.14v1.108h-3.874v-1.108zM76.71 11.71h1.38v6.708q0 .402.12.605.12.198.31.272.194.07.42.07.165 0 .29-.024.125-.022.195-.037l.249 1.14a2.7 2.7 0 0 1-.896.148 2.4 2.4 0 0 1-1.015-.194 1.74 1.74 0 0 1-.762-.627q-.291-.425-.291-1.067zm6.425 8.947q-.675 0-1.219-.25a2.05 2.05 0 0 1-.863-.733q-.314-.48-.314-1.178 0-.6.23-.987.232-.389.624-.614.393-.226.877-.342.485-.116.988-.175l1.034-.12q.397-.051.577-.162t.18-.36v-.033q0-.604-.341-.937-.337-.332-1.007-.332-.696 0-1.098.31-.397.304-.55.678l-1.297-.296q.231-.645.674-1.043a2.7 2.7 0 0 1 1.03-.582 4 4 0 0 1 1.223-.184q.425 0 .9.101.48.097.896.36.42.264.688.753.267.485.267 1.26V20.5h-1.348v-.97h-.055q-.134.268-.402.527a2.1 2.1 0 0 1-.688.43q-.42.17-1.006.17m.3-1.108q.573 0 .979-.226.41-.226.623-.591.217-.37.217-.79v-.914q-.075.075-.286.139a5 5 0 0 1-.476.106l-.521.079-.425.055a3.4 3.4 0 0 0-.734.17 1.26 1.26 0 0 0-.526.347q-.194.222-.194.59 0 .514.378.777.379.258.965.258"
                  ></path>
                  <path
                    fill="#1F68DD"
                    d="M104 6a6 6 0 0 1 6-6h83a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-83a6 6 0 0 1-6-6z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M113.928 20.5h-1.514l3.402-9.454h1.648l3.403 9.454h-1.514l-2.673-7.737h-.074zm.254-3.702h4.912v1.2h-4.912zm10.479 3.84a2.75 2.75 0 0 1-1.532-.438q-.669-.444-1.053-1.26-.378-.822-.378-1.972t.383-1.966q.387-.818 1.062-1.251.673-.434 1.528-.434.66 0 1.062.221.406.217.627.508.227.291.351.513h.083v-3.513h1.381V20.5h-1.348v-1.103h-.116a3.6 3.6 0 0 1-.36.517 2 2 0 0 1-.637.508q-.407.216-1.053.216m.305-1.177q.596 0 1.007-.314.416-.318.627-.881.217-.564.217-1.311 0-.74-.212-1.293-.212-.554-.623-.863-.411-.31-1.016-.31-.623 0-1.039.323a1.97 1.97 0 0 0-.627.882 3.6 3.6 0 0 0-.208 1.26q0 .71.212 1.28.213.567.628.9.42.327 1.034.327m7.833 1.178a2.75 2.75 0 0 1-1.532-.44q-.67-.442-1.053-1.26-.379-.82-.379-1.97t.384-1.967q.387-.818 1.061-1.251.675-.434 1.528-.434.66 0 1.062.221.406.217.628.508.227.291.351.513h.083v-3.513h1.38V20.5h-1.348v-1.103h-.115a3.6 3.6 0 0 1-.36.517 2 2 0 0 1-.637.508q-.406.216-1.053.216Zm.305-1.178q.595 0 1.006-.314.416-.318.628-.881.217-.564.217-1.311 0-.74-.212-1.293a1.9 1.9 0 0 0-.624-.863q-.41-.31-1.015-.31-.624 0-1.039.323-.415.324-.628.882a3.6 3.6 0 0 0-.207 1.26q0 .71.212 1.28.213.567.628.9.42.327 1.034.327m9.999-3.171v4.21h-1.38v-7.09h1.325v1.153h.087q.245-.563.767-.905.526-.34 1.325-.341.725 0 1.269.304.545.3.845.896.3.595.3 1.473v4.51h-1.38v-4.344q0-.771-.402-1.205-.401-.439-1.103-.439-.48 0-.854.208a1.5 1.5 0 0 0-.586.61q-.213.396-.213.96m9.445 4.353q-1.047 0-1.805-.448a3.04 3.04 0 0 1-1.163-1.27q-.406-.821-.406-1.924 0-1.09.406-1.92a3.16 3.16 0 0 1 1.145-1.298q.738-.465 1.727-.466.6 0 1.163.198.563.199 1.011.623.448.425.706 1.104.26.674.259 1.639v.489h-5.637v-1.034h4.284q0-.545-.221-.965a1.7 1.7 0 0 0-.624-.67 1.74 1.74 0 0 0-.932-.244 1.8 1.8 0 0 0-1.016.286 1.9 1.9 0 0 0-.665.739 2.1 2.1 0 0 0-.23.983v.808q0 .71.249 1.21.254.498.706.761.453.26 1.057.259.392 0 .716-.111a1.5 1.5 0 0 0 .919-.9l1.306.235a2.37 2.37 0 0 1-.563 1.011q-.402.43-1.011.67a3.8 3.8 0 0 1-1.381.235m6.099-.143-2.087-7.09h1.427l1.389 5.206h.069l1.395-5.207h1.426l1.385 5.184h.069l1.381-5.184h1.426l-2.082 7.091h-1.408l-1.44-5.12h-.106l-1.441 5.12z"
                  ></path>
                  <g clip-path="url(#b)">
                    <path
                      fill="#fff"
                      d="m185.818 14.254-4.375 4.375a.625.625 0 0 1-.884 0l-4.375-4.375a.625.625 0 0 1 .442-1.066h8.75c.555 0 .834.673.442 1.066"
                    ></path>
                  </g>
                  <mask id="c" fill="#fff">
                    <path d="M207 6a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-20a6 6 0 0 1-6-6z"></path>
                  </mask>
                  <path
                    fill="#fff"
                    d="M207 6a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-20a6 6 0 0 1-6-6z"
                  ></path>
                  <path
                    fill="#CFD1D5"
                    d="M213 0v1h20v-2h-20zm26 6h-1v20h2V6zm-6 26v-1h-20v2h20zm-26-6h1V6h-2v20zm6 6v-1a5 5 0 0 1-5-5h-2a7 7 0 0 0 7 7zm26-6h-1a5 5 0 0 1-5 5v2a7 7 0 0 0 7-7zm-6-26v1a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7zm-20 0v-1a7 7 0 0 0-7 7h2a5 5 0 0 1 5-5z"
                    mask="url(#c)"
                  ></path>
                  <g clip-path="url(#d)">
                    <path
                      fill="#1E3145"
                      d="M221.75 11a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0m1.25 3.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m0 5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="b">
                      <path
                        fill="#fff"
                        d="M176 13.188h10.001v5.624H176z"
                      ></path>
                    </clipPath>
                    <clipPath id="d">
                      <path fill="#fff" d="M221.75 9.75h2.5v12.5h-2.5z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div
              className="flex items-center gap-4 text-[14px]/[130%] text-[#424F60] *:cursor-pointer *:pb-2 *:outline-none"
              role="tablist"
              aria-orientation="horizontal"
            >
              <Link
                className="border-b-2 border-transparent hover:border-[#1F65D6] hover:text-[#1F65D6] data-selected:border-[#1F65D6] data-selected:text-[#1F65D6]"
                id="headlessui-tabs-tab-«r5k»"
                role="tab"
                type="button"
                href="/workpapers/cafe-decashflow/"
              >
                Working trial balance
              </Link>
              <Link
                className="border-b-2 border-transparent hover:border-[#1F65D6] hover:text-[#1F65D6] data-selected:border-[#1F65D6] data-selected:text-[#1F65D6]"
                id="headlessui-tabs-tab-«r5i»"
                role="tab"
                type="button"
                aria-selected="true"
                data-headlessui-state="selected"
                data-selected=""
                aria-controls="headlessui-tabs-panel-«r5q»"
                href="/workpapers/cafe-decashflow/workpapers"
              >
                Workpapers
              </Link>
              <button
                className="border-b-2 border-transparent hover:border-[#1F65D6] hover:text-[#1F65D6] data-selected:border-[#1F65D6] data-selected:text-[#1F65D6]"
                id="headlessui-tabs-tab-«r5m»"
                role="tab"
                type="button"
                aria-selected="false"
                data-headlessui-state="disabled"
                data-disabled=""
              >
                Manual journals
              </button>
              <button
                className="border-b-2 border-transparent hover:border-[#1F65D6] hover:text-[#1F65D6] data-selected:border-[#1F65D6] data-selected:text-[#1F65D6]"
                id="headlessui-tabs-tab-«r5o»"
                role="tab"
                type="button"
                aria-selected="false"
                data-headlessui-state="disabled"
                data-disabled=""
              >
                Tax mapping
              </button>
            </div>
            <p className="font-inter mt-0.5 text-[12px]/[12px] text-[#616B7A]">
              Last refreshed 12 Nov 2025, 8:43am
            </p>
          </div>
        </div>
      </div>
      <div className="relative mb-10">
        <Image
          src={getWorkpapersImage()}
          alt="Workpapers dashboard home"
          width={1402}
          className="relative mx-auto w-[1440px] max-w-[1440px] min-w-[1440px]"
        />
      </div>
    </div>
  );
}
