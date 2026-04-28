function Avatar() {
  return null;
}

function OrganisationName() {
  return (
    <div className="basis-0 content-stretch flex gap-4 grow items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Organisation name">
      <Avatar />
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 text-nowrap">
        <p className="overflow-hidden text-[var(--Text-Standard,#000A1E)] font-['Inter'] text-[24px] font-[700] leading-[32px] [font-feature-settings:'liga'_off,'clig'_off] overflow-ellipsis font-normal">Hornblower Enterprises</p>
      </div>
    </div>
  );
}

function LoginDetails() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-end overflow-clip pl-10 pr-0 py-0 relative shrink-0" data-name="Login details">
      <div className="font-['Helvetica_Neue:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000a1e] text-[0px] text-nowrap text-right">
        <p className="font-['Helvetica_Neue:Regular',_sans-serif] leading-[20px] text-[13px] whitespace-pre">
          <span className="text-[#59606d]">{`Last `}</span>
          <span className="text-[#59606d]">login:</span>
          <span className="text-[#002a46]"> </span>
          <span className="text-[#0078c8]">{`1 hour ago `}</span>
          <span className="text-[#0078c8]">from</span>
          <span className="text-[#0078c8]">{` Australia`}</span>
        </p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-center px-6 py-5 relative w-full bg-[rgba(255,255,255,1)]">
          <OrganisationName />
          <LoginDetails />
        </div>
      </div>
    </div>
  );
}

export function PageHeader() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-2.5 items-center justify-start relative size-full" data-name="Homepage header _ to depricate">
      <Content />
    </div>
  );
}