import { imgComponentGlobalNavigationDivider } from "./svg-vd8pp";

function Label() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px px-0 py-2 relative shrink-0" data-name="Label">
      <div className="basis-0 font-['Helvetica_Neue:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[15px]">
        <p className="leading-[24px]">Item</p>
      </div>
    </div>
  );
}

function TaxManager() {
  return (
    <div className="bg-[#fcfcfc] relative shrink-0 w-full" data-name="Tax manager">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-5 pr-3 py-0 relative w-full">
          <Label />
        </div>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px px-0 py-2 relative shrink-0" data-name="Label">
      <div className="basis-0 font-['Helvetica_Neue:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[15px]">
        <p className="leading-[24px]">Item</p>
      </div>
    </div>
  );
}

function CompanyAccountsTax() {
  return (
    <div className="bg-[#fcfcfc] relative shrink-0 w-full" data-name="Company accounts & tax">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-5 pr-3 py-0 relative w-full">
          <Label1 />
        </div>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px px-0 py-2 relative shrink-0" data-name="Label">
      <div className="basis-0 font-['Helvetica_Neue:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[15px]">
        <p className="leading-[24px]">Item</p>
      </div>
    </div>
  );
}

function SoleTraderAccounts() {
  return (
    <div className="bg-[#fcfcfc] relative shrink-0 w-full" data-name="Sole trader accounts">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-5 pr-3 py-0 relative w-full">
          <Label2 />
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px px-0 py-2 relative shrink-0" data-name="Label">
      <div className="basis-0 font-['Helvetica_Neue:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[15px]">
        <p className="leading-[24px]">Item</p>
      </div>
    </div>
  );
}

function PartnershipTax() {
  return (
    <div className="bg-[#fcfcfc] relative shrink-0 w-full" data-name="Partnership tax">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-5 pr-3 py-0 relative w-full">
          <Label3 />
        </div>
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px px-0 py-2 relative shrink-0" data-name="Label">
      <div className="basis-0 font-['Helvetica_Neue:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[15px]">
        <p className="leading-[24px]">Item</p>
      </div>
    </div>
  );
}

function PersonalTax() {
  return (
    <div className="bg-[#fcfcfc] relative shrink-0 w-full" data-name="Personal Tax">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-5 pr-3 py-0 relative w-full">
          <Label4 />
        </div>
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px px-0 py-2 relative shrink-0" data-name="Label">
      <div className="basis-0 font-['Helvetica_Neue:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[15px]">
        <p className="leading-[24px]">Item</p>
      </div>
    </div>
  );
}

function Vat() {
  return (
    <div className="bg-[#fcfcfc] relative shrink-0 w-full" data-name="VAT">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-5 pr-3 py-0 relative w-full">
          <Label5 />
        </div>
      </div>
    </div>
  );
}

function ComponentGlobalNavigationDivider() {
  return (
    <div className="h-6 relative shrink-0 w-full" data-name="Component/Global Navigation/Divider">
      <img className="block max-w-none size-full" src={imgComponentGlobalNavigationDivider} />
    </div>
  );
}

function Label6() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px px-0 py-2 relative shrink-0" data-name="Label">
      <div className="basis-0 font-['Helvetica_Neue:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#002a46] text-[15px]">
        <p className="leading-[20px]">Settings</p>
      </div>
    </div>
  );
}

function AccountingSettings() {
  return (
    <div className="bg-[#fcfcfc] relative shrink-0 w-full" data-name="Accounting settings">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pl-5 pr-3 py-0 relative w-full">
          <Label6 />
        </div>
      </div>
    </div>
  );
}

export default function ComponentGlobalNavigationXphTax() {
  return (
    <div className="bg-[#fcfcfc] box-border content-stretch flex flex-col items-start justify-start px-0 py-3 relative rounded-[8px] size-full" data-name="Component/Global Navigation/XPH Tax">
      <div aria-hidden="true" className="absolute border border-[#ccced2] border-solid inset-[-1px] pointer-events-none rounded-[9px] shadow-[0px_3px_6px_0px_rgba(0,10,30,0.204)]" />
      <TaxManager />
      <CompanyAccountsTax />
      <SoleTraderAccounts />
      <PartnershipTax />
      <PersonalTax />
      <Vat />
      <ComponentGlobalNavigationDivider />
      <AccountingSettings />
    </div>
  );
}