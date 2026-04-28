export default function PageHeaderInline1() {
  return (
    <div className="bg-white relative border-b border-[rgba(0,10,30,0.204)] w-full h-16" data-name="page header/inline">
      <div className="absolute bottom-2.5 box-border content-stretch flex gap-3 items-start justify-end px-4 py-0 right-0" data-name="Edit Dashboard button">
        <div className="box-border content-stretch flex gap-3 items-start justify-end px-0 py-1 relative shrink-0" data-name="actions">
          <div className="bg-[#1f68dd] content-stretch flex flex-col items-center justify-start relative rounded-[6px] shrink-0" data-name="button">
            <div className="box-border content-stretch flex flex-col items-center justify-start px-3 py-1.5 relative rounded-[3px] shrink-0" data-name="_basic">
              <div className="font-['Helvetica_Neue:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[13px] text-nowrap text-white">
                <p className="leading-[20px] whitespace-pre">Edit dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-3 items-center justify-start left-4 top-4" data-name="_content left">
        <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0" data-name="_content left">
          <div className="font-['Helvetica_Neue:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000a1e] text-[17px] text-nowrap">
            <p className="leading-[28px] whitespace-pre">Hornblower Enterprises</p>
          </div>
        </div>
        <div className="bg-white box-border content-stretch flex flex-col items-center justify-start px-1.5 py-0 relative rounded-[6px] shrink-0" data-name="tag">
          <div aria-hidden="true" className="absolute border border-[rgba(0,10,30,0.5)] border-solid inset-0 pointer-events-none rounded-[6px]" />
          <div className="font-['Helvetica_Neue:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[13px] text-[rgba(0,10,30,0.75)] text-center text-nowrap">
            <p className="leading-[20px] whitespace-pre">Starter kit</p>
          </div>
        </div>
      </div>
      <div className="absolute font-['Helvetica_Neue:Bold',_sans-serif] leading-[0] not-italic right-[166px] text-[#000a1e] text-[0px] text-nowrap text-right top-5">
        <p className="font-['Helvetica_Neue:Regular',_sans-serif] leading-[20px] text-[13px] whitespace-pre">
          <span className="text-[#59606d]">Last </span>
          <span className="text-[#59606d]">login:</span>
          <span className="text-[#002a46]"> </span>
          <span className="text-[#0078c8]">1 hour ago </span>
          <span className="text-[#0078c8]">from</span>
          <span className="text-[#0078c8]"> Australia</span>
        </p>
      </div>
    </div>
  );
}