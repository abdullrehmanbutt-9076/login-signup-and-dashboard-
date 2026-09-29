import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
  onSignupSuccess: (account: { name: string; email: string; phone: string; pass: string }) => void;
  onNavigateToLogin: () => void;
  darkMode: boolean;
}

export const SimSignupScreen: React.FC<Props> = ({
  onSignupSuccess,
  onNavigateToLogin,
  darkMode
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setErrorMessage('Full Name cannot be empty.');
      return;
    }
    if (!trimmedEmail) {
      setErrorMessage('Email address cannot be empty.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email format (e.g. name@domain.com).');
      return;
    }
    if (!trimmedPhone) {
      setErrorMessage('Phone number cannot be empty.');
      return;
    }
    if (!password) {
      setErrorMessage('Password cannot be empty.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignupSuccess({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        pass: password
      });
    }, 700);
  };

  return (
    <div className={`h-full flex flex-col justify-between overflow-y-auto transition-colors duration-200 ${
      darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top App Bar with Standard Back Arrow */}
      <div className={`sticky top-0 z-10 flex items-center px-4 py-3 border-b backdrop-blur-md transition-colors ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <button
          onClick={onNavigateToLogin}
          className="p-1.5 -ml-1 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          title="Back to Login"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-base ml-2 tracking-tight">Create Account</span>
      </div>

      <div className="flex-1 px-6 py-4 max-w-sm mx-auto w-full">
        <div className="mb-4">
          <h2 className="text-xl font-bold tracking-tight">Join NovaSecure</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Fill in the details below to register a new user profile
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Full Name *
            </label>
            <div className={`relative flex items-center rounded-xl border transition-all ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-300'
            }`}>
              <div className="pl-3.5 text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setErrorMessage(null); }}
                placeholder="Sarah Connor"
                className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Email Address *
            </label>
            <div className={`relative flex items-center rounded-xl border transition-all ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-300'
            }`}>
              <div className="pl-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMessage(null); }}
                placeholder="sarah@example.com"
                className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Phone Number *
            </label>
            <div className={`relative flex items-center rounded-xl border transition-all ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-300'
            }`}>
              <div className="pl-3.5 text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrorMessage(null); }}
                placeholder="+1 (555) 789-0123"
                className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Password * <span className="font-normal text-slate-400">(min 6 chars)</span>
            </label>
            <div className={`relative flex items-center rounded-xl border transition-all ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-300'
            }`}>
              <div className="pl-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMessage(null); }}
                placeholder="Create password"
                className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Confirm Password *
            </label>
            <div className={`relative flex items-center rounded-xl border transition-all ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-300'
            }`}>
              <div className="pl-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrorMessage(null); }}
                placeholder="Repeat password"
                className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-md shadow-indigo-600/25 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Register Account</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center py-4 px-6 border-t border-slate-200/60 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
