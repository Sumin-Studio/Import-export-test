import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Printer, Download } from 'lucide-react';
import imgPaid1 from "figma:asset/e666239705c377cde625b29156dc6551a09bb227.png";
import svgPaths from "../imports/svg-jylknpwub7";
import IconSparkleColourSmall from '../imports/IconSparkleColourSmall';
import { XeroNavigation } from '../components/XeroNavigation';
import { PaymentPageHeader } from '../components/PaymentPageHeader';

interface PaymentData {
  supplier: string;
  billNumber: string;
  paymentMethod: string;
  fundingMethod: {
    bankName: string;
    accountNumber: string;
    accountType: string;
  } | null;
  debitDate: string;
  deliveryMethod: 'jax' | 'manual';
  deliveryDate: string;
  amount: string;
  w9Required: boolean;
  manualBankDetails?: {
    accountNumber: string;
    routingNumber: string;
  } | null;
}

export default function PaymentConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get data from router state, fallback to localStorage
  let paymentData = location.state as PaymentData | null;
  
  if (!paymentData) {
    const stored = localStorage.getItem('paymentData');
    if (stored) {
      paymentData = JSON.parse(stored) as PaymentData;
    }
  }

  const formatCurrency = (value: string) => {
    if (!value || value === 'N/A') return '$0.00';
    // Remove any existing $ signs
    const cleanValue = value.replace(/\$/g, '');
    const num = parseFloat(cleanValue);
    if (isNaN(num)) return '$0.00';
    return `$${num.toFixed(2)}`;
  };

  // Don't redirect - just show what data we have
  // Default values for missing data
  const supplier = paymentData?.supplier || 'N/A';
  const billNumber = paymentData?.billNumber || 'N/A';
  const fundingMethod = paymentData?.fundingMethod;
  const debitDate = paymentData?.debitDate || 'N/A';
  const deliveryMethod = paymentData?.deliveryMethod || 'jax';
  const deliveryDate = paymentData?.deliveryDate || 'N/A';
  const amount = paymentData?.amount || '$0.00';
  const w9Required = paymentData?.w9Required || false;
  const manualBankDetails = paymentData?.manualBankDetails;

  const handleBackToHomepage = () => {
    // Dispatch custom event to refresh the chart
    window.dispatchEvent(new Event('paymentDataUpdated'));
    navigate('/');
  };

  // Parse delivery date string back to Date object for header
  const parseDateString = (dateStr: string): Date | null => {
    if (!dateStr || dateStr === 'N/A') return null;
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Try to parse "Mar 19, 2026" or "March 19, 2026" format
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      const monthStr = parts[0];
      const day = parseInt(parts[1].replace(',', ''));
      const year = parseInt(parts[2]);
      
      let monthIndex = monthNames.indexOf(monthStr);
      if (monthIndex === -1) {
        monthIndex = fullMonthNames.indexOf(monthStr);
      }
      
      if (monthIndex !== -1 && !isNaN(day) && !isNaN(year)) {
        return new Date(year, monthIndex, day);
      }
    }
    
    return null;
  };

  const selectedDateForHeader = parseDateString(deliveryDate);

  return (
    <div className="bg-[#f6f6f8] min-h-screen w-full">
      {/* Navigation bar - matching PaymentDetails */}
      <XeroNavigation />

      {/* Page header - matching PaymentDetails */}
      <PaymentPageHeader paymentAmount={amount} selectedDate={selectedDateForHeader} />

      {/* Main content */}
      <div className="flex justify-center pt-12 pb-20">
        <div className="bg-white rounded-[12px] border border-[#e1e2e5] p-12 w-[720px] shadow-sm">
          {/* Success illustration */}
          <div className="flex justify-center mb-6">
            <img 
              src={imgPaid1}
              alt="Payment scheduled"
              className="w-[116px] h-[96px] object-contain"
            />
          </div>

          {/* Payment scheduled heading */}
          <h2 className="font-['National_2:Bold',sans-serif] text-[#1e3145] text-[22px] leading-[1.15] text-center mb-6">
            Payment scheduled
          </h2>

          {/* Payment summary header */}
          <div className="flex items-start justify-between mb-8 bg-white">
            <div className="py-3">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1e3145] text-[15px] font-semibold leading-[1.45]">
                Payment summary
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[#424f60] text-[13px] leading-[1.45]">
                Payment ID 66481583
              </p>
            </div>
            <div className="flex gap-2 py-1">
              {/* Download button */}
              <button className="bg-white border border-[#cfd1d5] rounded-[8px] size-[40px] flex items-center justify-center hover:bg-[#fafafa]">
                <Download />
              </button>
              {/* Print button */}
              <button className="bg-white border border-[#cfd1d5] rounded-[8px] size-[40px] flex items-center justify-center hover:bg-[#fafafa]">
                <Printer />
              </button>
            </div>
          </div>

          {/* Payment amount */}
          <div className="mb-6">
            <p className="font-['National_2:Bold',sans-serif] text-black text-[32px] leading-[1.05]">
              {formatCurrency(amount)}
            </p>
          </div>

          {/* Payment details table */}
          <div className="mb-3">
            {/* Supplier Business name */}
            <div className="flex items-center h-[40px]">
              <div className="w-[202.5px] pl-2">
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1e3145] text-[13px] font-semibold leading-[1.45]">
                  Supplier Business name
                </p>
              </div>
              <div className="flex-1 pl-2">
                <p className="font-['Inter:Regular',sans-serif] text-[#1e3145] text-[13px] leading-[1.45]">
                  {supplier}
                </p>
              </div>
            </div>

            {/* Bill number */}
            <div className="flex items-center h-[40px]">
              <div className="w-[202.5px] pl-2">
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1e3145] text-[13px] font-semibold leading-[1.45]">
                  Bill number
                </p>
              </div>
              <div className="flex-1 pl-2">
                <p className="font-['Inter:Regular',sans-serif] text-[#1e3145] text-[13px] leading-[1.45]">
                  {billNumber}
                </p>
              </div>
            </div>

            {/* Funding method */}
            <div className="flex items-center h-[40px]">
              <div className="w-[202.5px] pl-2">
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1e3145] text-[13px] font-semibold leading-[1.45]">
                  Funding method
                </p>
              </div>
              <div className="flex-1 pl-2">
                <p className="font-['Inter:Regular',sans-serif] text-[#1e3145] text-[13px] leading-[1.45]">
                  {fundingMethod ? `${fundingMethod.bankName} account ${fundingMethod.accountNumber}` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Debit date */}
            <div className="flex items-center h-[40px]">
              <div className="w-[202.5px] pl-2">
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1e3145] text-[13px] font-semibold leading-[1.45]">
                  Debit date
                </p>
              </div>
              <div className="flex-1 pl-2">
                <p className="font-['Inter:Regular',sans-serif] text-[#1e3145] text-[13px] leading-[1.45]">
                  {debitDate}
                </p>
              </div>
            </div>

            {/* Delivery method */}
            <div className="flex items-center h-[40px]">
              <div className="w-[202.5px] pl-2">
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1e3145] text-[13px] font-semibold leading-[1.45]">
                  Delivery method
                </p>
              </div>
              <div className="flex-1 pl-2">
                {deliveryMethod === 'jax' ? (
                  <div className="inline-flex h-[34px] items-center justify-center gap-3 min-w-[40px] px-2 rounded-[12px] bg-[#F0F9FE]">
                    <div className="h-[16px] w-[16px] shrink-0">
                      <IconSparkleColourSmall />
                    </div>
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[#1f68dd] text-[12px] leading-none">
                      Requested by JAX
                    </p>
                  </div>
                ) : manualBankDetails ? (
                  <p className="font-['Inter:Regular',sans-serif] text-[#1e3145] text-[13px] leading-[1.45]">
                    Bank of America account •••{manualBankDetails.accountNumber.slice(-4)}
                  </p>
                ) : (
                  <div className="inline-flex h-[20px] items-center justify-center min-w-[40px] px-2 rounded-[12px] border border-[#e1e2e5] bg-white">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[#616b7a] text-[12px] leading-none">
                      Required
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery date */}
            <div className="flex items-center h-[40px]">
              <div className="w-[202.5px] pl-2">
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1e3145] text-[13px] font-semibold leading-[1.45]">
                  Delivery date
                </p>
              </div>
              <div className="flex-1 pl-2">
                <p className="font-['Inter:Regular',sans-serif] text-[#1e3145] text-[13px] leading-[1.45]">
                  {deliveryDate}
                </p>
              </div>
            </div>

            {/* Fees */}
            <div className="flex items-center h-[40px]">
              <div className="w-[202.5px] pl-2">
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1e3145] text-[13px] font-semibold leading-[1.45]">
                  Fees
                </p>
              </div>
              <div className="flex-1 pl-2">
                <p className="font-['Inter:Regular',sans-serif] text-[#1e3145] text-[13px] leading-[1.45]">
                  Pending
                </p>
              </div>
            </div>

            {/* W-9 status */}
            <div className="flex items-center h-[40px] border-b border-[#e1e2e5]">
              <div className="w-[202.5px] pl-2">
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1e3145] text-[13px] font-semibold leading-[1.45]">
                  W-9 status
                </p>
              </div>
              <div className="flex-1 pl-2">
                {deliveryMethod === 'jax' ? (
                  <div className="inline-flex h-[34px] items-center justify-center gap-3 min-w-[40px] px-2 rounded-[12px] bg-[#F0F9FE]">
                    <div className="h-[16px] w-[16px] shrink-0">
                      <IconSparkleColourSmall />
                    </div>
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[#1f68dd] text-[12px] leading-none">
                      Requested by JAX
                    </p>
                  </div>
                ) : (
                  <div className="inline-flex h-[20px] items-center justify-center min-w-[40px] px-2 rounded-[12px] border border-[#e1e2e5] bg-white">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[#616b7a] text-[12px] leading-none">
                      Required
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Total amount */}
          <div className="flex items-center h-[40px] border-b border-[#e1e2e5] mb-8">
            <div className="w-[183px] pl-2">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1e3145] text-[15px] font-semibold leading-[1.45]">
                Total amount
              </p>
            </div>
            <div className="flex-1 pl-2">
              <p className="font-['Inter:Regular',sans-serif] text-[#1e3145] text-[13px] leading-[1.45]">
                {formatCurrency(amount)}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-end">
            <button className="bg-white border border-[#cfd1d5] rounded-[8px] px-3 py-2 min-h-[40px] hover:bg-[#fafafa]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[#1e3145] text-[14px] leading-none">
                Review scheduled payment
              </p>
            </button>
            <button 
              onClick={handleBackToHomepage}
              className="bg-[#1f68dd] rounded-[8px] px-3 py-2 min-h-[40px] hover:bg-[#1558c7]"
            >
              <p className="font-['Inter:Medium',sans-serif] font-medium text-white text-[14px] leading-none">
                Back to homepage
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}