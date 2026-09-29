import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, ArrowLeft, Circle, Square } from 'lucide-react';
import { ScreenRoute, UserSession, AppSettings } from '../types';
import { SimLoginScreen } from './screens/SimLoginScreen';
import { SimSignupScreen } from './screens/SimSignupScreen';
import { SimDashboardScreen } from './screens/SimDashboardScreen';
import { SimProfileScreen } from './screens/SimProfileScreen';
import { SimSettingsScreen } from './screens/SimSettingsScreen';

interface Props {
  currentRoute: ScreenRoute;
  stack: ScreenRoute[];
  session: UserSession;
  settings: AppSettings;
  onNavigate: (route: ScreenRoute, popUpTo?: ScreenRoute | 0, inclusive?: boolean) => void;
  onPopBackStack: () => void;
  onUpdateSession: (updated: Partial<UserSession>) => void;
  onUpdateSettings: (updated: Partial<AppSettings>) => void;
  onLogout: () => void;
  registeredAccounts: Record<string, { name: string; phone: string; pass: string }>;
  onAccountCreated: (account: { name: string; email: string; phone: string; pass: string }) => void;
}

export const AndroidDevice: React.FC<Props> = ({
  currentRoute,
  stack,
  session,
  settings,
  onNavigate,
  onPopBackStack,
  onUpdateSession,
  onUpdateSettings,
  onLogout,
  registeredAccounts,
  onAccountCreated
}) => {
  const [time, setTime] = useState('09:41');
  const [navigationMode, setNavigationMode] = useState<'3-button' | 'gesture'>('3-button');
  const [systemBackFeedback, setSystemBackFeedback] = useState(false);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSystemBack = () => {
    setSystemBackFeedback(true);
    setTimeout(() => setSystemBackFeedback(false), 300);
    onPopBackStack();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Device Body Container */}
      <div className="relative w-[340px] sm:w-[365px] h-[720px] rounded-[44px] p-3.5 bg-slate-900 border-[7px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10 flex flex-col justify-between">
        
        {/* Device Volume / Power Buttons Visual Accents */}
        <div className="absolute -left-[10px] top-28 w-[3px] h-12 bg-slate-700 rounded-l-md" />
        <div className="absolute -left-[10px] top-44 w-[3px] h-12 bg-slate-700 rounded-l-md" />
        <div className="absolute -right-[10px] top-32 w-[3px] h-16 bg-slate-700 rounded-r-md" />

        {/* Screen Bezel Area */}
        <div className={`relative w-full h-full rounded-[34px] overflow-hidden flex flex-col shadow-inner transition-colors duration-200 ${
          settings.darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}>
          
          {/* Android Status Bar */}
          <div className={`shrink-0 h-10 px-6 flex items-center justify-between z-30 select-none text-[11px] font-medium transition-colors ${
            settings.darkMode ? 'bg-slate-900/90 text-slate-300' : 'bg-white/90 text-slate-700'
          }`}>
            <span className="font-semibold">{time}</span>

            {/* Front Camera Cutout (Punch hole) */}
            <div className="w-4 h-4 rounded-full bg-black border border-slate-800/80 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950/60" />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Active Screen Viewport (Simulated Jetpack Compose NavHost) */}
          <div className="flex-1 overflow-hidden relative">
            {currentRoute === 'login' && (
              <SimLoginScreen
                onLoginSuccess={(newSession) => {
                  onUpdateSession(newSession);
                  // Pop login screen so user cannot back to it
                  onNavigate('dashboard', 'login', true);
                }}
                onNavigateToSignup={() => onNavigate('signup')}
                darkMode={settings.darkMode}
                registeredAccounts={registeredAccounts}
              />
            )}

            {currentRoute === 'signup' && (
              <SimSignupScreen
                onSignupSuccess={(acc) => {
                  onAccountCreated(acc);
                  // Return to login after registration
                  onPopBackStack();
                }}
                onNavigateToLogin={() => onPopBackStack()}
                darkMode={settings.darkMode}
              />
            )}

            {currentRoute === 'dashboard' && (
              <SimDashboardScreen
                session={session}
                onNavigateToProfile={() => onNavigate('profile')}
                onNavigateToSettings={() => onNavigate('settings')}
                onLogoutConfirmed={onLogout}
                darkMode={settings.darkMode}
              />
            )}

            {currentRoute === 'profile' && (
              <SimProfileScreen
                session={session}
                onNavigateBack={onPopBackStack}
                onNavigateToSettings={() => onNavigate('settings')}
                onUpdateSession={onUpdateSession}
                darkMode={settings.darkMode}
              />
            )}

            {currentRoute === 'settings' && (
              <SimSettingsScreen
                settings={settings}
                onUpdateSettings={onUpdateSettings}
                onNavigateBack={onPopBackStack}
                currentStack={stack}
                darkMode={settings.darkMode}
              />
            )}
          </div>

          {/* Android Navigation Bar (3-Button or Gesture) */}
          <div className={`shrink-0 h-11 flex items-center justify-around border-t select-none transition-colors ${
            settings.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {navigationMode === '3-button' ? (
              <>
                {/* System Back Button ◀ */}
                <button
                  onClick={handleSystemBack}
                  className={`p-2 rounded-full transition-transform active:scale-90 ${
                    systemBackFeedback ? 'bg-indigo-500/20 text-indigo-500 scale-95' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Android System Back Button (Hardware/OS Back)"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Home Button ⌂ */}
                <button
                  onClick={() => {
                    // Minimizes or does nothing in single app
                  }}
                  className="p-2 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 active:scale-90 transition-transform"
                  title="Android System Home"
                >
                  <Circle className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Recents Button ▢ */}
                <button
                  className="p-2 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 active:scale-90 transition-transform"
                  title="Android System Recents / Overview"
                >
                  <Square className="w-4 h-4 stroke-[2.5]" />
                </button>
              </>
            ) : (
              // Gesture Navigation Bar Pill
              <div 
                onClick={handleSystemBack}
                className="w-32 h-1 rounded-full bg-slate-400 dark:bg-slate-600 hover:bg-slate-500 cursor-pointer"
                title="Android Gesture Bar (Swipe / Tap for Back)"
              />
            )}
          </div>
        </div>
      </div>

      {/* Device Controls Bar below phone */}
      <div className="mt-3 flex items-center gap-3">
        <span className="text-[11px] text-slate-400">Nav Style:</span>
        <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
          <button
            onClick={() => setNavigationMode('3-button')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              navigationMode === '3-button' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            3-Button (◀ ⌂ ▢)
          </button>
          <button
            onClick={() => setNavigationMode('gesture')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              navigationMode === 'gesture' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Gesture Bar
          </button>
        </div>
      </div>
    </div>
  );
};
