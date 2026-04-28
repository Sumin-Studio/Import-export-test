const { useState, useEffect } = React;

// Initial data structure
const getInitialData = () => ({
  businessAllocation: 100,
  allocationMethod: "BUSINESS", // or "OPTIONS"
  trackingOptions: [
    { id: 1, name: "Kingsland Road", allocation: 100 },
    { id: 2, name: "High St Flat", allocation: 100 },
    { id: 99, name: "Unassigned", allocation: 100, isUnassigned: true }
  ]
});

// Helper function to deep clone data
const cloneData = (data) => JSON.parse(JSON.stringify(data));

// Percentage Input Component
const PercentageInput = ({ value, onChange, readOnly = false }) => {
  const handleChange = (e) => {
    let val = e.target.value;
    
    // Allow empty string for clearing
    if (val === '') {
      onChange('');
      return;
    }
    
    // Remove any non-numeric characters except decimal point
    val = val.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = val.split('.');
    if (parts.length > 2) {
      val = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      val = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    // Parse and validate range
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      if (numVal > 100) {
        onChange('100');
        return;
      }
      if (numVal < 0) {
        onChange('0');
        return;
      }
    }
    
    onChange(val);
  };

  return (
    <div className="relative inline-flex items-center">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        className={`w-24 px-3 py-2 pr-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-xero-blue ${
          readOnly ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'
        }`}
        placeholder="0"
      />
      <span className="absolute right-3 text-gray-500 pointer-events-none">%</span>
    </div>
  );
};

// Tracking Option Row Component
const TrackingOptionRow = ({ option, allocation, onAllocationChange, readOnly, onDelete, showDelete }) => {
  return (
    <div className="py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-medium text-gray-900">{option.name}</div>
          {option.isUnassigned && (
            <div className="text-sm text-gray-500 mt-1">
              Transactions without a specific tracking option will use this allocation percentage.
            </div>
          )}
        </div>
        
        {!readOnly && (
          <div className="flex items-center gap-4">
            <PercentageInput
              value={allocation}
              onChange={onAllocationChange}
              readOnly={readOnly}
            />
            {showDelete && !option.isUnassigned && (
              <button
                onClick={onDelete}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Delete tracking option"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Confirm allocation changes
        </h2>
        <p className="text-gray-600 mb-6">
          This will update your settings and recalculate the taxable portion of all transactions 
          in the current open tax year. This cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-xero-dark-blue text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Component
const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center gap-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );
};

// Developer Panel Component
const DeveloperPanel = ({ onResetToFresh, onLoadComplexScenario, onSimulateDirtyState }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isExpanded ? (
        <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-4 w-72">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-sm">Developer Tools</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            <button
              onClick={onResetToFresh}
              className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
            >
              Reset to Fresh
            </button>
            <button
              onClick={onLoadComplexScenario}
              className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
            >
              Load Complex Scenario
            </button>
            <button
              onClick={onSimulateDirtyState}
              className="w-full px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm transition-colors"
            >
              Simulate Dirty State
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          title="Developer Tools"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentData, setCurrentData] = useState(getInitialData());
  const [savedData, setSavedData] = useState(cloneData(getInitialData()));
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Check if there are unsaved changes
  const hasChanges = () => {
    return JSON.stringify(currentData) !== JSON.stringify(savedData);
  };

  // Handle allocation method change
  const handleMethodChange = (method) => {
    setCurrentData(prev => ({
      ...prev,
      allocationMethod: method
    }));
  };

  // Handle business allocation change
  const handleBusinessAllocationChange = (value) => {
    setCurrentData(prev => ({
      ...prev,
      businessAllocation: value
    }));
  };

  // Handle tracking option allocation change
  const handleOptionAllocationChange = (optionId, value) => {
    setCurrentData(prev => ({
      ...prev,
      trackingOptions: prev.trackingOptions.map(opt =>
        opt.id === optionId ? { ...opt, allocation: value } : opt
      )
    }));
  };

  // Handle delete tracking option
  const handleDeleteOption = (optionId) => {
    setCurrentData(prev => ({
      ...prev,
      trackingOptions: prev.trackingOptions.filter(opt => opt.id !== optionId)
    }));
  };

  // Handle save
  const handleSave = () => {
    if (hasChanges()) {
      setShowModal(true);
    } else {
      setShowToast(true);
    }
  };

  // Confirm save
  const confirmSave = () => {
    setSavedData(cloneData(currentData));
    setShowModal(false);
    setShowToast(true);
  };

  // Developer tools functions
  const resetToFresh = () => {
    const freshData = getInitialData();
    setCurrentData(freshData);
    setSavedData(cloneData(freshData));
  };

  const loadComplexScenario = () => {
    const complexData = {
      businessAllocation: 100,
      allocationMethod: "OPTIONS",
      trackingOptions: [
        { id: 1, name: "Kingsland Road", allocation: 50 },
        { id: 2, name: "High St Flat", allocation: 100 },
        { id: 99, name: "Unassigned", allocation: 100, isUnassigned: true }
      ]
    };
    setCurrentData(complexData);
    setSavedData(cloneData(complexData));
  };

  const simulateDirtyState = () => {
    setCurrentData(prev => ({
      ...prev,
      businessAllocation: prev.businessAllocation === 100 ? 75 : 100
    }));
  };

  const isBusinessMethod = currentData.allocationMethod === "BUSINESS";

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Transaction Allocation Settings</h1>
        
        {/* UK Property Card */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6">
            {/* Card Header with Save Button */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-900">UK property</h2>
              <button
                onClick={handleSave}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  hasChanges()
                    ? 'bg-xero-dark-blue text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Save
              </button>
            </div>

            {/* Radio Buttons */}
            <div className="space-y-3 mb-6">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="allocationMethod"
                  checked={isBusinessMethod}
                  onChange={() => handleMethodChange("BUSINESS")}
                  className="w-4 h-4 text-xero-dark-blue focus:ring-xero-blue"
                />
                <span className="ml-3 text-gray-900 font-medium group-hover:text-xero-dark-blue">
                  Apply to whole business
                </span>
              </label>
              
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="allocationMethod"
                  checked={!isBusinessMethod}
                  onChange={() => handleMethodChange("OPTIONS")}
                  className="w-4 h-4 text-xero-dark-blue focus:ring-xero-blue"
                />
                <span className="ml-3 text-gray-900 font-medium group-hover:text-xero-dark-blue">
                  Apply to tracking options
                </span>
              </label>
            </div>

            {/* Business-level allocation input */}
            {isBusinessMethod && (
              <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-100">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Transaction allocation
                </label>
                <PercentageInput
                  value={currentData.businessAllocation}
                  onChange={handleBusinessAllocationChange}
                />
              </div>
            )}

            {/* Tracking Options List */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Tracking Options
              </h3>
              <div className="border border-gray-200 rounded-md bg-white">
                <div className="divide-y divide-gray-200">
                  {currentData.trackingOptions.map(option => (
                    <div key={option.id} className="px-4">
                      <TrackingOptionRow
                        option={option}
                        allocation={option.allocation}
                        onAllocationChange={(value) => handleOptionAllocationChange(option.id, value)}
                        readOnly={isBusinessMethod}
                        onDelete={() => handleDeleteOption(option.id)}
                        showDelete={!isBusinessMethod}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmSave}
      />

      {/* Toast Notification */}
      <Toast
        message="Settings saved successfully"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Developer Panel */}
      <DeveloperPanel
        onResetToFresh={resetToFresh}
        onLoadComplexScenario={loadComplexScenario}
        onSimulateDirtyState={simulateDirtyState}
      />
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
