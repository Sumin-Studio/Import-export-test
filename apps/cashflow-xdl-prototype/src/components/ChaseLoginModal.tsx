import { useState } from 'react';
import { Lock } from 'lucide-react';
import backgroundImage from 'figma:asset/49cca5e91be4098f0b59293e5d5b40c5e7fc61b6.png';
import chaseLogo from 'figma:asset/87b2a1eb57dd91fe0e1497d35a912d469fb448b4.png';

interface ChaseLoginModalProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export function ChaseLoginModal({ onClose, onSuccess }: ChaseLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [useToken, setUseToken] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const handleSignIn = () => {
    // Simulate successful login - no validation required
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (usernameError && value.trim()) {
      setUsernameError(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background with image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Chase Logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <img src={chaseLogo} alt="Chase" className="h-[31px] w-auto" />
      </div>

      {/* Login Card */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-[380px] p-8 mx-4">
        {/* Security Message */}
        <div className="flex items-start gap-3 mb-6 p-3 bg-gray-50 rounded">
          <Lock className="w-5 h-5 text-gray-700 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-700">
            Chase won't share your username or password.
          </p>
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded ${
                usernameError 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-300 bg-white'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder=""
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Keyboard"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="6" width="14" height="9" rx="1" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
                <rect x="5" y="8" width="1.5" height="1.5" fill="#9CA3AF"/>
                <rect x="7.5" y="8" width="1.5" height="1.5" fill="#9CA3AF"/>
                <rect x="10" y="8" width="1.5" height="1.5" fill="#9CA3AF"/>
                <rect x="12.5" y="8" width="1.5" height="1.5" fill="#9CA3AF"/>
                <rect x="5" y="10.5" width="1.5" height="1.5" fill="#9CA3AF"/>
                <rect x="7.5" y="10.5" width="1.5" height="1.5" fill="#9CA3AF"/>
                <rect x="10" y="10.5" width="1.5" height="1.5" fill="#9CA3AF"/>
                <rect x="12.5" y="10.5" width="1.5" height="1.5" fill="#9CA3AF"/>
                <rect x="6" y="13" width="8" height="1.5" fill="#9CA3AF"/>
              </svg>
            </button>
          </div>
          {usernameError && (
            <div className="flex items-center gap-1 mt-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#DC2626" strokeWidth="1.5" fill="none"/>
                <path d="M7 4v3.5M7 10h.01" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="text-xs text-red-600">Enter your username.</p>
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 pr-16 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
            <div className="absolute right-0 top-0 flex items-center h-full">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-sm font-semibold text-[#005BBB] hover:text-[#003d7a] transition-colors"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              <button
                type="button"
                className="px-3 border-l border-gray-300"
                aria-label="Keyboard"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="6" width="14" height="9" rx="1" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
                  <rect x="5" y="8" width="1.5" height="1.5" fill="#9CA3AF"/>
                  <rect x="7.5" y="8" width="1.5" height="1.5" fill="#9CA3AF"/>
                  <rect x="10" y="8" width="1.5" height="1.5" fill="#9CA3AF"/>
                  <rect x="12.5" y="8" width="1.5" height="1.5" fill="#9CA3AF"/>
                  <rect x="5" y="10.5" width="1.5" height="1.5" fill="#9CA3AF"/>
                  <rect x="7.5" y="10.5" width="1.5" height="1.5" fill="#9CA3AF"/>
                  <rect x="10" y="10.5" width="1.5" height="1.5" fill="#9CA3AF"/>
                  <rect x="12.5" y="10.5" width="1.5" height="1.5" fill="#9CA3AF"/>
                  <rect x="6" y="13" width="8" height="1.5" fill="#9CA3AF"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Use Token Checkbox */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useToken}
              onChange={(e) => setUseToken(e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded text-[#005BBB] focus:ring-2 focus:ring-[#005BBB]"
            />
            <span className="text-sm text-gray-700">Use token</span>
          </label>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-[#005BBB] hover:bg-[#003d7a] text-white font-semibold py-3 px-4 rounded transition-colors mb-4"
        >
          Sign in
        </button>

        {/* Footer Links */}
        <div className="space-y-2">
          <button className="flex items-center gap-1 text-sm font-semibold text-[#005BBB] hover:text-[#003d7a] transition-colors">
            <span>Forgot username/password?</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="flex items-center gap-1 text-sm font-semibold text-[#005BBB] hover:text-[#003d7a] transition-colors">
            <span>Not enrolled? Sign up now.</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}