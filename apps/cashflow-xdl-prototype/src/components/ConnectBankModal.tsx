import { useState } from 'react';
import Frame8 from '../imports/Frame1984077581';
import Frame4Step2 from '../imports/Frame1984077581-12-1891';
import Frame2Success from '../imports/Frame1984077581-13-4352';
import { Bank } from '../data/banks';
import { ChaseLoginModal } from './ChaseLoginModal';

interface ConnectBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBank: Bank | null;
  onBankSelect: (bank: Bank | null) => void;
  onBankConnected?: () => void;
}

export function ConnectBankModal({ isOpen, onClose, selectedBank, onBankSelect, onBankConnected }: ConnectBankModalProps) {
  const [step, setStep] = useState(1);
  const [showChaseLogin, setShowChaseLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1); // Reset to step 1 when closing
    setShowChaseLogin(false);
    setShowSuccess(false);
    onClose();
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleStep2Continue = () => {
    setShowChaseLogin(true);
  };

  const handleChaseLoginSuccess = () => {
    // Show success modal instead of closing
    setShowChaseLogin(false);
    setShowSuccess(true);
  };

  const handleDone = () => {
    // Mark bank as connected
    if (onBankConnected) {
      onBankConnected();
    }
    // Close everything and return to payment details page
    handleClose();
  };

  // Show Chase login modal (full screen takeover)
  if (showChaseLogin) {
    return <ChaseLoginModal onClose={() => setShowChaseLogin(false)} onSuccess={handleChaseLoginSuccess} />;
  }

  // Show success modal
  if (showSuccess) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={handleDone}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Modal Content */}
        <div 
          className="relative z-10 max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Frame2Success onClose={handleClose} onDone={handleDone} />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Modal Content */}
      <div 
        className="relative z-10 max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 1 ? (
          <Frame8 
            onClose={handleClose} 
            selectedBank={selectedBank} 
            onBankSelect={onBankSelect}
            onContinue={handleContinue}
          />
        ) : (
          <Frame4Step2 
            onClose={handleClose}
            onBack={handleBack}
            onContinue={handleStep2Continue}
          />
        )}
      </div>
    </div>
  );
}