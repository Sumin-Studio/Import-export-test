import { X, CreditCard, FileText } from 'lucide-react';
import svgPaths from '../imports/svg-11c844sczt';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface DeliveryMethodsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (details: { accountNumber: string; routingNumber: string }) => void;
}

export function DeliveryMethodsPanel({ isOpen, onClose, onSave }: DeliveryMethodsPanelProps) {
  const [isAchExpanded, setIsAchExpanded] = useState(false);
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [savedAccountNumber, setSavedAccountNumber] = useState('');

  const handleAddAchDetails = () => {
    if (routingNumber && accountNumber) {
      setSavedAccountNumber(accountNumber);
      setIsAchExpanded(false);
    }
  };

  const getMaskedAccountNumber = () => {
    if (savedAccountNumber.length >= 4) {
      const lastFour = savedAccountNumber.slice(-4);
      return `Account •••${lastFour}`;
    }
    return '';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Side Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-[64px] bottom-0 w-[600px] bg-white z-50"
            style={{ boxShadow: '0 0 24px 0 rgba(0, 0, 0, 0.16)' }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="border-b border-[#e1e2e5] p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 max-w-[312px]">
                    <h2 className="font-['National_2:Bold',sans-serif] text-[#1e3145] text-[22px] leading-[1.15]">
                      Delivery methods
                    </h2>
                  </div>
                  <button 
                    onClick={onClose}
                    className="flex items-center justify-center rounded-[6px] shrink-0 size-[32px] hover:bg-[#f6f6f8]"
                  >
                    <X className="size-4 text-[#1e3145]" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-[552px] mx-auto">
                  {/* ACH transfer */}
                  <div className="mb-3">
                    <div className="bg-white relative rounded-[6px] border border-[#cfd1d5] overflow-hidden">
                      {/* Header - Clickable */}
                      <button
                        onClick={() => setIsAchExpanded(!isAchExpanded)}
                        className="w-full flex gap-3 items-start pl-4 pr-2 hover:bg-[#fafafa] transition-colors"
                      >
                        {/* Icon */}
                        <div className="flex items-center min-h-[48px] py-2">
                          <div className="flex items-center justify-center size-[32px]">
                            <svg className="size-4" fill="none" viewBox="0 0 15 16.25">
                              <path d={svgPaths.p135f6200} fill="#1E3145" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-h-[48px] flex items-center py-3">
                          <div className="flex flex-wrap gap-[0px_12px] items-center leading-[0] w-full">
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[15px] leading-[1.45]">
                              ACH transfer
                            </p>
                            {savedAccountNumber && (
                              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1e3145] text-[15px] leading-[1.45]">
                                {getMaskedAccountNumber()}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Action - Only show when collapsed */}
                        {!isAchExpanded && (
                          <div className="flex items-center min-h-[48px] py-1">
                            <div className="flex gap-1 items-center justify-center min-h-[32px] px-2 py-1 rounded-[6px]">
                              <svg className="size-4" fill="none" viewBox="0 0 12.5 12.5">
                                <path d={svgPaths.p3cb1cf00} fill="#1E3145" />
                              </svg>
                              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1e3145] text-[13px] leading-none">
                                Add details
                              </span>
                            </div>
                          </div>
                        )}
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence initial={false}>
                        {isAchExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            {/* Description */}
                            <div className="pl-[64px] pr-4 pb-3">
                              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1e3145] text-[14px] leading-[1.3]">
                                Transfer funds to you vendor by ACH
                              </p>
                            </div>

                            {/* Input Fields */}
                            <div className="px-6 pb-5">
                              <div className="flex gap-5">
                                {/* Routing Number */}
                                <div className="flex-1">
                                  <div className="flex gap-2 items-baseline pb-1">
                                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#424f60] text-[12px] leading-[1.3]">
                                      Routing number
                                    </p>
                                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#424f60] text-[12px] leading-[1.3]">
                                      (required)
                                    </p>
                                  </div>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      value={routingNumber}
                                      onChange={(e) => setRoutingNumber(e.target.value)}
                                      className="w-full h-[40px] bg-white border border-[#cfd1d5] rounded-[8px] px-3 font-['Inter:Regular',sans-serif] font-normal text-[#1e3145] text-[15px] leading-[1.45] focus:outline-none focus:border-[#1f68dd]"
                                      placeholder=""
                                    />
                                  </div>
                                </div>

                                {/* Account Number */}
                                <div className="flex-1">
                                  <div className="flex gap-2 items-baseline pb-1">
                                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#424f60] text-[12px] leading-[1.3]">
                                      Account number
                                    </p>
                                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#424f60] text-[12px] leading-[1.3]">
                                      (required)
                                    </p>
                                  </div>
                                  <div className="relative">
                                    <input
                                      type="password"
                                      value={accountNumber}
                                      onChange={(e) => setAccountNumber(e.target.value)}
                                      className="w-full h-[40px] bg-white border border-[#cfd1d5] rounded-[8px] px-3 font-['Inter:Regular',sans-serif] font-normal text-[#1e3145] text-[15px] leading-[1.45] focus:outline-none focus:border-[#1f68dd]"
                                      placeholder=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="border-t border-[#e1e2e5] p-5 flex justify-end gap-3">
                              <button
                                onClick={() => setIsAchExpanded(false)}
                                className="bg-white border border-[#cfd1d5] rounded-[8px] px-3 py-2 min-h-[40px] hover:bg-[#fafafa]"
                              >
                                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1e3145] text-[14px] leading-none">
                                  Cancel
                                </span>
                              </button>
                              <button
                                disabled={!routingNumber || !accountNumber}
                                onClick={handleAddAchDetails}
                                className="bg-[#828995] disabled:bg-[#828995] enabled:bg-[#1f68dd] enabled:hover:bg-[#1558c7] rounded-[8px] px-3 py-2 min-h-[40px]"
                              >
                                <span className="font-['Inter:Medium',sans-serif] font-medium text-white text-[14px] leading-none">
                                  Add
                                </span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Wire transfer */}
                  <div className="mb-3">
                    <div className="bg-white relative rounded-[6px] border border-[#cfd1d5]">
                      <div className="flex gap-3 items-start pl-4 pr-2">
                        {/* Icon */}
                        <div className="flex items-center min-h-[48px] py-2">
                          <div className="flex items-center justify-center size-[32px]">
                            <svg className="size-4" fill="none" viewBox="0 0 16.875 11.25">
                              <path d={svgPaths.p26589a00} fill="#1E3145" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-h-[48px] flex items-center py-3">
                          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[15px] leading-[1.45]">
                            Wire transfer
                          </p>
                        </div>
                        
                        {/* Action */}
                        <div className="flex items-center min-h-[48px] py-1">
                          <button className="flex gap-1 items-center justify-center min-h-[32px] px-2 py-1 rounded-[6px] hover:bg-[#f6f6f8]">
                            <svg className="size-4" fill="none" viewBox="0 0 12.5 12.5">
                              <path d={svgPaths.p3cb1cf00} fill="#1E3145" />
                            </svg>
                            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1e3145] text-[13px] leading-none">
                              Add details
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Virtual card */}
                  <div className="mb-3">
                    <div className="bg-white relative rounded-[6px] border border-[#cfd1d5]">
                      <div className="flex gap-3 items-start pl-4 pr-2">
                        {/* Icon */}
                        <div className="flex items-center min-h-[48px] py-2">
                          <div className="flex items-center justify-center size-[32px]">
                            <CreditCard className="size-4 text-[#1e3145]" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-h-[48px] flex items-center py-3">
                          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[15px] leading-[1.45]">
                            Virtual card
                          </p>
                        </div>
                        
                        {/* Action */}
                        <div className="flex items-center min-h-[48px] py-1">
                          <button className="flex gap-1 items-center justify-center min-h-[32px] px-2 py-1 rounded-[6px] hover:bg-[#f6f6f8]">
                            <svg className="size-4" fill="none" viewBox="0 0 12.5 12.5">
                              <path d={svgPaths.p3cb1cf00} fill="#1E3145" />
                            </svg>
                            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1e3145] text-[13px] leading-none">
                              Add details
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Paper check */}
                  <div className="mb-6">
                    <div className="bg-white relative rounded-[6px] border border-[#cfd1d5]">
                      <div className="flex gap-3 items-start pl-4 pr-2">
                        {/* Icon */}
                        <div className="flex items-center min-h-[48px] py-2">
                          <div className="flex items-center justify-center size-[32px]">
                            <FileText className="size-4 text-[#1e3145]" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-h-[48px] flex items-center py-3">
                          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[15px] leading-[1.45]">
                            paper check
                          </p>
                        </div>
                        
                        {/* Action */}
                        <div className="flex items-center min-h-[48px] py-1">
                          <button className="flex gap-1 items-center justify-center min-h-[32px] px-2 py-1 rounded-[6px] hover:bg-[#f6f6f8]">
                            <svg className="size-4" fill="none" viewBox="0 0 12.5 12.5">
                              <path d={svgPaths.p3cb1cf00} fill="#1E3145" />
                            </svg>
                            <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1e3145] text-[13px] leading-none">
                              Add details
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Not sure section */}
                  <div className="bg-[#f0f9fe] rounded-[8px] p-4">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#1e3145] text-[15px] leading-[1.45] mb-1">
                      Not sure? Ask your supplier instead.
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#424f60] text-[13px] leading-[1.45] mb-3">
                      Once this vendor is saved, we'll email them to ask how they prefer to receive payments from you.
                    </p>
                    <button className="bg-white border border-[#cfd1d5] rounded-[8px] px-3 py-2 min-h-[40px] hover:bg-[#fafafa]">
                      <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1e3145] text-[14px] leading-none">
                        Send request
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#e1e2e5] p-6">
                <div className="flex gap-3 justify-end">
                  <button 
                    onClick={onClose}
                    className="bg-white border border-[#cfd1d5] rounded-[8px] px-3 py-2 min-h-[40px] hover:bg-[#fafafa]"
                  >
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1e3145] text-[14px] leading-none">
                      Cancel
                    </span>
                  </button>
                  <button 
                    onClick={() => {
                      if (onSave && savedAccountNumber) {
                        onSave({
                          accountNumber: savedAccountNumber,
                          routingNumber: routingNumber
                        });
                      }
                    }}
                    className="bg-[#1f68dd] rounded-[8px] px-3 py-2 min-h-[40px] hover:bg-[#1558c7]"
                  >
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-white text-[14px] leading-none">
                      Save
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}