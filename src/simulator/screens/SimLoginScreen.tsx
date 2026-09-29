import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { UserSession } from '../../types';

interface Props {
  onLoginSuccess: (session: UserSession) => void;
  onNavigateToSignup: () => void;
  darkMode: boolean;
  registeredAccounts: Record<string, { name: string; phone: string; pass: string }>;
}

export const SimLoginScreen: React.FC<Props> = ({
  onLoginSuccess,
  onNavigateToSignup,
  darkMode,
  registeredAccounts
}) => {
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState<string | null>(null);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setForgotPasswordMsg(null);

    const trimmedEmail = email.trim();
    const trimmedPass = password.trim();

    if (!trimmedEmail) {
      setErrorMessage('Email address cannot be empty.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!trimmedPass) {
      setErrorMessage('Password cannot be empty.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const registered = registeredAccounts[trimmedEmail.toLowerCase()];
      if (registered) {
        if (registered.pass !== trimmedPass) {
          setErrorMessage('Incorrect password. Please try again.');
          return;
        }
        onLoginSuccess({
          isLoggedIn: true,
          name: registered.name,
          email: trimmedEmail,
          phone: registered.phone
        });
      } else {
        // Allow demo login
        const defaultName = trimmedEmail.split('@')[0];
        const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
        onLoginSuccess({
          isLoggedIn: true,
          name: formattedName,
          email: trimmedEmail,
          phone: '+1 (555) 234-5678'
        });
      }
    }, 700);
  };

  return (
    <div className={`h-full flex flex-col justify-between overflow-y-auto px-6 py-6 transition-colors duration-200 ${
      darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full my-auto">
        {/* App Logo & Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 shadow-inner">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">NovaSecure</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Jetpack Compose Material 3 Mobile Client
          </p>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Forgot Password Feedback */}
        {forgotPasswordMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5 text-xs text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-200">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{forgotPasswordMsg}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleLogin} className="space-y-3.5">
          {/* Email TextField */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className={`relative flex items-center rounded-xl border transition-all ${
              darkMode 
                ? 'bg-slate-800/80 border-slate-700 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20' 
                : 'bg-white border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/20'
            }`}>
              <div className="pl-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="name@company.com"
                className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password TextField */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotPasswordMsg(`Reset link dispatched to ${email || 'your email'}`)}
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className={`relative flex items-center rounded-xl border transition-all ${
              darkMode 
                ? 'bg-slate-800/80 border-slate-700 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20' 
                : 'bg-white border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/20'
            }`}>
              <div className="pl-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Enter password"
                className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-md shadow-indigo-600/25 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Hint Tag */}
        <div className="mt-4 p-2.5 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Demo credentials preloaded: <span className="font-mono text-indigo-600 dark:text-indigo-400">alex@example.com</span>
          </p>
        </div>
      </div>

      {/* Sign Up Footer Link */}
      <div className="text-center pt-4 border-t border-slate-200/60 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToSignup}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
