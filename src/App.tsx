import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Code2, 
  Layers, 
  BookOpen, 
  Download, 
  ShieldCheck, 
  Moon, 
  Sun, 
  RotateCcw,
  Sparkles,
  Github
} from 'lucide-react';
import { AndroidDevice } from './simulator/AndroidDevice';
import { NavigationStackInspector } from './components/NavigationStackInspector';
import { CodeExplorer } from './components/CodeExplorer';
import { GuideTab } from './components/GuideTab';
import { ScreenRoute, UserSession, AppSettings, NavigationLogEntry } from './types';
import confetti from 'canvas-confetti';

const STORAGE_SESSION_KEY = 'novasecure_android_session';
const STORAGE_ACCOUNTS_KEY = 'novasecure_android_accounts';
const STORAGE_SETTINGS_KEY = 'novasecure_android_settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'guide'>('simulator');
  
  // Persistent session state (simulating Jetpack DataStore Preferences)
  const [session, setSession] = useState<UserSession>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SESSION_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return {
      isLoggedIn: true,
      name: 'Alex Morgan',
      email: 'alex@example.com',
      phone: '+1 (555) 234-5678'
    };
  });

  // App settings state
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SETTINGS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return {
      darkMode: true,
      notifications: true,
      biometrics: false
    };
  });

  // Registered accounts
  const [registeredAccounts, setRegisteredAccounts] = useState<Record<string, { name: string; phone: string; pass: string }>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return {
      'alex@example.com': { name: 'Alex Morgan', phone: '+1 (555) 234-5678', pass: 'Password123!' }
    };
  });

  // Navigation Stack state
  const [stack, setStack] = useState<ScreenRoute[]>(() => {
    return session.isLoggedIn ? ['dashboard'] : ['login'];
  });

  const [logs, setLogs] = useState<NavigationLogEntry[]>([
    {
      id: 'init-1',
      timestamp: 'Just now',
      action: 'RESTORE_SESSION',
      from: 'INIT',
      to: session.isLoggedIn ? 'dashboard' : 'login',
      stackSnapshot: session.isLoggedIn ? ['dashboard'] : ['login'],
      detail: session.isLoggedIn 
        ? 'Restored active authenticated session from DataStore. Initialized NavHost at Screen.Dashboard.'
        : 'No active session. Initialized NavHost at Screen.Login.'
    }
  ]);

  // Sync session to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.error(e);
    }
  }, [session]);

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Sync registered accounts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(registeredAccounts));
    } catch (e) {
      console.error(e);
    }
  }, [registeredAccounts]);

  const currentRoute = stack[stack.length - 1] || 'login';

  const addLog = (
    action: NavigationLogEntry['action'],
    from: ScreenRoute,
    to: ScreenRoute,
    newStack: ScreenRoute[],
    detail: string
  ) => {
    const entry: NavigationLogEntry = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action,
      from,
      to,
      stackSnapshot: newStack,
      detail
    };
    setLogs(prev => [...prev, entry]);
  };

  /**
   * Jetpack Navigation forward navigation simulation
   */
  const handleNavigate = (route: ScreenRoute, popUpTo?: ScreenRoute | 0, inclusive?: boolean) => {
    setStack((prevStack) => {
      let newStack = [...prevStack];

      if (popUpTo === 0 && inclusive) {
        // Clear entire back stack (used during logout)
        newStack = [route];
      } else if (popUpTo && inclusive) {
        // Pop up to the specified route inclusive
        const index = newStack.lastIndexOf(popUpTo);
        if (index !== -1) {
          newStack = newStack.slice(0, index);
        }
        newStack.push(route);
      } else {
        // Forward navigation
        // Avoid duplicate consecutive screens
        if (newStack[newStack.length - 1] !== route) {
          newStack.push(route);
        }
      }

      addLog(
        popUpTo ? 'LOGOUT_POP_TO_ROOT' : 'NAVIGATE',
        prevStack[prevStack.length - 1] || 'login',
        route,
        newStack,
        `navController.navigate("${route}")${popUpTo ? ` { popUpTo(${popUpTo}) { inclusive = ${inclusive} } }` : ''}`
      );

      return newStack;
    });
  };

  /**
   * Jetpack Navigation popBackStack() simulation
   */
  const handlePopBackStack = () => {
    setStack((prevStack) => {
      if (prevStack.length <= 1) {
        addLog(
          'POP_BACK',
          prevStack[0] || 'login',
          prevStack[0] || 'login',
          prevStack,
          'Already at root destination of back stack. Android system back minimizes or retains root.'
        );
        return prevStack;
      }

      const popped = prevStack[prevStack.length - 1];
      const newStack = prevStack.slice(0, -1);
      const destination = newStack[newStack.length - 1];

      addLog(
        'POP_BACK',
        popped,
        destination,
        newStack,
        `navController.popBackStack() -> popped "${popped}", returned to "${destination}"`
      );

      return newStack;
    });
  };

  const handleUpdateSession = (updated: Partial<UserSession>) => {
    setSession(prev => ({ ...prev, ...updated }));
  };

  const handleUpdateSettings = (updated: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updated }));
  };

  const handleLogout = () => {
    setSession({
      isLoggedIn: false,
      name: '',
      email: '',
      phone: ''
    });
    // Pop entire stack to root
    handleNavigate('login', 0, true);
  };

  const handleAccountCreated = (acc: { name: string; email: string; phone: string; pass: string }) => {
    setRegisteredAccounts(prev => ({
      ...prev,
      [acc.email.toLowerCase()]: { name: acc.name, phone: acc.phone, pass: acc.pass }
    }));
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleTriggerScenario = (scenario: 'new_user' | 'deep_nav' | 'back' | 'logout' | 'reset') => {
    switch (scenario) {
      case 'new_user':
        // Move to signup
        setStack(['login', 'signup']);
        addLog('NAVIGATE', 'login', 'signup', ['login', 'signup'], 'Tested Flow: Navigated to SignupScreen');
        break;
      case 'deep_nav':
        // Ensure logged in and build stack: dashboard -> profile -> settings
        setSession({
          isLoggedIn: true,
          name: 'Alex Morgan',
          email: 'alex@example.com',
          phone: '+1 (555) 234-5678'
        });
        setStack(['dashboard', 'profile', 'settings']);
        addLog('NAVIGATE', 'profile', 'settings', ['dashboard', 'profile', 'settings'], 'Tested Deep Flow: Stack is [dashboard, profile, settings]');
        break;
      case 'back':
        handlePopBackStack();
        break;
      case 'logout':
        handleLogout();
        break;
      case 'reset':
        setSession({
          isLoggedIn: true,
          name: 'Alex Morgan',
          email: 'alex@example.com',
          phone: '+1 (555) 234-5678'
        });
        setStack(['dashboard']);
        setLogs([
          {
            id: `log-${Date.now()}`,
            timestamp: 'Reset',
            action: 'RESTORE_SESSION',
            from: 'INIT',
            to: 'dashboard',
            stackSnapshot: ['dashboard'],
            detail: 'Navigation stack and session reset to default authenticated state.'
          }
        ]);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 ring-1 ring-white/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  NovaSecure
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Android Jetpack Compose
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Kotlin • Navigation Compose • Material 3 • MVVM Architecture
              </p>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Live Device</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span className="hidden sm:inline">Android Codebase</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'guide'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Setup Guide</span>
            </button>
          </div>

          {/* Right Status Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-mono">Session:</span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                session.isLoggedIn 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${session.isLoggedIn ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                {session.isLoggedIn ? `Logged in (${session.name || 'User'})` : 'Logged out'}
              </span>
            </div>

            <button
              onClick={() => handleUpdateSettings({ darkMode: !settings.darkMode })}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Toggle Device Dark Mode"
            >
              {settings.darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Android Device Frame */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="mb-2 text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                  Active Screen: <strong className="text-white">{currentRoute}</strong>
                </span>
              </div>

              <AndroidDevice
                currentRoute={currentRoute}
                stack={stack}
                session={session}
                settings={settings}
                onNavigate={handleNavigate}
                onPopBackStack={handlePopBackStack}
                onUpdateSession={handleUpdateSession}
                onUpdateSettings={handleUpdateSettings}
                onLogout={handleLogout}
                registeredAccounts={registeredAccounts}
                onAccountCreated={handleAccountCreated}
              />
            </div>

            {/* Right Column: Navigation Stack Inspector & Scenario Controls */}
            <div className="lg:col-span-6">
              <NavigationStackInspector
                currentRoute={currentRoute}
                stack={stack}
                logs={logs}
                onTriggerScenario={handleTriggerScenario}
              />
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <CodeExplorer />
        )}

        {activeTab === 'guide' && (
          <GuideTab />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        <p>
          Android Jetpack Compose & Navigation Compose Architecture Suite • Compliant with Material 3 & Android 15 (API 35)
        </p>
      </footer>
    </div>
  );
}
