import svgPaths from '../imports/svg-1h276y9108';
import IconSparkleColourSmall from '../imports/IconSparkleColourSmall';
import imgBankOfAmerica from "figma:asset/ddbc62e5b7754c1d8c06f674ac115af059a3b567.png";

function Container11() {
  return (
    <div className="aspect-[20/20] flex-[1_0_0] max-h-[30px] max-w-[30px] min-h-[20px] min-w-[20px] relative" data-name="container">
      <div className="absolute inset-[12.5%] overflow-clip" data-name="icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
          <path d={svgPaths.p102b6960} fill="var(--fill-0, #1E3145)" id="vector" />
        </svg>
      </div>
    </div>
  );
}

interface DeliveryMethodProps {
  selectedMethod: 'jax' | 'manual' | null;
  onMethodSelect: (method: 'jax' | 'manual') => void;
  onManualSetupClick?: () => void;
  manualBankDetails?: {
    accountNumber: string;
    routingNumber: string;
  } | null;
}

export function DeliveryMethod({ selectedMethod, onMethodSelect, onManualSetupClick, manualBankDetails }: DeliveryMethodProps) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <p className="font-['National_2:Bold',sans-serif] leading-[1.15] not-italic relative shrink-0 text-[#1e3145] text-[22px] w-[475px]">How your supplier will receive the money</p>
      
      {/* Delivery method (required) label */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="TextInput/Text Input Default">
        <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="label wrap">
          <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center leading-[1.3] min-h-px min-w-px not-italic pb-[4px] relative text-[#424f60] text-[12px] whitespace-nowrap" data-name="label">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0">Delivery method</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0">(required)</p>
          </div>
        </div>
        
        {/* Let JAX take it from here option */}
        <div 
          className="bg-white relative rounded-[6px] shrink-0 w-full cursor-pointer mt-2" 
          data-name="Content Block Item"
          onClick={() => onMethodSelect('jax')}
        >
          <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
          <div className="content-stretch flex gap-[12px] items-start pl-[16px] relative w-full">
            <div className="max-h-[56px] min-h-[48px] relative self-stretch shrink-0" data-name="left content">
              <div className="flex flex-row items-center justify-center max-h-[inherit] min-h-[inherit] size-full">
                <div className="content-stretch flex h-full items-center justify-center max-h-[inherit] min-h-[inherit] px-[4px] py-[12px] relative">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-[24px]" data-name="checkbox">
                    {/* Radio button */}
                    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="content">
                      <div className="bg-white relative rounded-[100px] shrink-0 size-[24px]" data-name="radio">
                        <div aria-hidden="true" className={`absolute border-2 border-solid inset-0 pointer-events-none rounded-[100px] ${selectedMethod === 'jax' ? 'border-[#1f68dd]' : 'border-[#cfd1d5]'}`} />
                        {selectedMethod === 'jax' && (
                          <div className="absolute inset-[4px] bg-[#1f68dd] rounded-[100px]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="main content">
              <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="main content">
                <div className="flex flex-col justify-center size-full">
                  <div className="content-stretch flex flex-col items-start justify-center pr-[16px] py-[12px] relative w-full">
                    <div className="relative shrink-0 w-full" data-name="headings">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-center flex flex-wrap gap-[0px_12px] items-center pr-[12px] relative w-full">
                          <div className="h-[24px] relative shrink-0 w-[24px]" data-name="icon-sparkle-colour-small">
                            <IconSparkleColourSmall />
                          </div>
                          <div className="content-stretch flex items-center relative shrink-0">
                            <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e3145] text-[15px] whitespace-nowrap">
                              <p className="leading-[1.45]">Let JAX take it from here</p>
                            </div>
                            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Icon/CircleInformation">
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
                    {selectedMethod === 'jax' ? (
                      <div className="bg-[#F0F9FE] rounded-[8px] p-[8px] mt-[4px] w-full">
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic text-[#424f60] text-[13px]">
                          <strong>JAX is on it.</strong> You can schedule this payment now. We'll send the funds when Rick submits the requested W-9 and direct deposit info
                        </p>
                      </div>
                    ) : (
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#424f60] text-[13px] w-full">JAX will contact Rick to securely collect their W-9 and direct deposit info, then update their profile automatically.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-[48px] relative self-stretch shrink-0 w-[68px]" data-name="right content">
              <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
                <div className="content-stretch flex items-center justify-end min-h-[inherit] px-[8px] py-[4px] size-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Set-up manually option */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Methods">
        <div 
          className="bg-white relative rounded-[6px] shrink-0 w-full cursor-pointer" 
          data-name="Content Block Item"
          onClick={() => {
            onMethodSelect('manual');
            if (onManualSetupClick) {
              onManualSetupClick();
            }
          }}
        >
          <div aria-hidden="true" className="absolute border border-[#cfd1d5] border-solid inset-0 pointer-events-none rounded-[6px]" />
          <div className="content-stretch flex gap-[12px] items-start pl-[16px] relative w-full">
            <div className="max-h-[56px] min-h-[48px] relative self-stretch shrink-0" data-name="left content">
              <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
                <div className="content-stretch flex h-full items-center max-h-[inherit] min-h-[inherit] py-[8px] relative">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-[32px]" data-name="avatar">
                    {/* Radio button */}
                    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="content">
                      <div className="bg-white relative rounded-[100px] shrink-0 size-[24px]" data-name="radio">
                        <div aria-hidden="true" className={`absolute border-2 border-solid inset-0 pointer-events-none rounded-[100px] ${selectedMethod === 'manual' ? 'border-[#1f68dd]' : 'border-[#cfd1d5]'}`} />
                        {selectedMethod === 'manual' && (
                          <div className="absolute inset-[4px] bg-[#1f68dd] rounded-[100px]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {manualBankDetails && (
              <div className="max-h-[56px] min-h-[48px] relative self-stretch shrink-0" data-name="left content">
                <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
                  <div className="content-stretch flex h-full items-center max-h-[inherit] min-h-[inherit] py-[8px] relative">
                    <div className="relative shrink-0 size-[32px]" data-name="avatar">
                      <img alt="Bank of America" className="w-8 h-8 object-contain" src={imgBankOfAmerica} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="main content">
              <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="main content">
                <div className="flex flex-col justify-center size-full">
                  <div className="content-stretch flex flex-col items-start justify-center pr-[16px] py-[12px] relative w-full">
                    <div className="relative shrink-0 w-full" data-name="headings">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-center flex flex-wrap gap-[0px_12px] items-center pr-[12px] relative w-full">
                          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-h-[24px] not-italic relative shrink-0 text-[#1e3145] text-[15px] whitespace-nowrap">
                            <p className="leading-[1.45]">{manualBankDetails ? 'ACH transfer' : 'Set-up manually'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {manualBankDetails ? (
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#424f60] text-[13px] w-full">
                        Bank of America account •••{manualBankDetails.accountNumber.slice(-4)}
                      </p>
                    ) : (
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.45] not-italic relative shrink-0 text-[#424f60] text-[13px] w-full">Upload W-9. Enter or request direct deposit info</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-[48px] relative self-stretch shrink-0 w-[175px]" data-name="right content">
              <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
                <div className="content-stretch flex items-center justify-end min-h-[inherit] px-[8px] py-[4px] size-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}