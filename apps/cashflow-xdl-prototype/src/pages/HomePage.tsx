import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import CashFlowHomePagePayAVendor from '../imports/CashFlowHomePagePayAVendor';

export default function HomePage() {
  const navigate = useNavigate();

  // Clear payment data when home page loads
  useEffect(() => {
    localStorage.removeItem('paymentData');
  }, []);

  const handlePaySupplierClick = () => {
    navigate('/payment');
  };

  return (
    <div 
      className="cursor-default"
      onClick={(e) => {
        // Check if the click target is within the "Pay a supplier" card
        const target = e.target as HTMLElement;
        const paySupplierCard = target.closest('[data-name="Pay a vendor card"]');
        
        if (paySupplierCard) {
          handlePaySupplierClick();
        }
      }}
      onMouseMove={(e) => {
        // Add cursor pointer when hovering over the "Pay a supplier" card
        const target = e.target as HTMLElement;
        const paySupplierCard = target.closest('[data-name="Pay a vendor card"]');
        
        if (paySupplierCard) {
          (paySupplierCard as HTMLElement).style.cursor = 'pointer';
        }
      }}
    >
      <CashFlowHomePagePayAVendor />
    </div>
  );
}