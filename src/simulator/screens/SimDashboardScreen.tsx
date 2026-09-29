import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Shield, 
  Activity, 
  Database, 
  Bell, 
  Sparkles,
  Lock
} from 'lucide-react';
import { UserSession } from '../../types';

interface Props {
  session: UserSession;
  onNavigateToProfile: () => void;
  onNavigateToSettings: () => void;
  onLogoutConfirmed: () => void;
  darkMode: boolean;
}

export const SimDashboardScreen: React.FC<Props> = ({
  session,
  onNavigateToProfile,
  onNavigateToSettings,
  onLogoutConfirmed,
  darkMode
}) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const featureCards = [
    {
      title: 'Security Health',
      desc: '98% Protected • Biometrics & DataStore secure',
      icon: Shield,
      badge: 'Active',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Activity Analytics',
      desc: '14 session handshakes • 0 security alerts',
      icon: Activity,
      badge: 'Live',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Encrypted Vault',
      desc: '42 items safely encrypted in your personal cloud',
      icon: Database,
      badge: 'Syncing',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Access Shield',
      desc: 'Role-based MVVM navigation safeguards active',
      icon: Bell,
      badge: 'Guarded',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <div className={`h-full flex flex-col justify-between overflow-y-auto transition-colors duration-200 ${
      darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top App Bar with Logo and Action Icons */}
      <div className={`sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b backdrop-blur-md transition-colors ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight block leading-tight">NovaSecure</span>
            <span className="text-[10px] text-slate-400 font-mono">Dashboard Hub</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Profile Navigation Button */}
          <button
            onClick={onNavigateToProfile}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Open Profile (navController.navigate('profile'))"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Settings Navigation Button */}
          <button
            onClick={onNavigateToSettings}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Open Settings (navController.navigate('settings'))"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Logout Trigger */}
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Welcome Card Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-5 text-white shadow-lg shadow-indigo-600/20">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/15 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Authenticated Session
            </span>
            <span className="text-[10px] text-indigo-200 font-mono">DataStore: Active</span>
          </div>

          <h2 className="text-xl font-bold tracking-tight">
            Welcome back, {session.name || 'User'}!
          </h2>
          <p className="text-xs text-indigo-100/80 mt-0.5 font-mono">
            {session.email || 'user@example.com'}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/15">
            <button
              onClick={onNavigateToProfile}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-medium transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>View Profile</span>
            </button>
            <button
              onClick={onNavigateToSettings}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-medium transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>App Settings</span>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Security Services
            </h3>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">4 Modules</span>
          </div>

          <div className="space-y-2.5">
            {featureCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${
                    darkMode 
                      ? 'bg-slate-800/80 border-slate-700/70 hover:border-slate-600' 
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Explicit Logout Button at bottom of Dashboard */}
        <div className="pt-2">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out of NovaSecure</span>
          </button>
        </div>
      </div>

      {/* Jetpack Compose Material 3 AlertDialog replica */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className={`w-full max-w-xs rounded-2xl p-5 shadow-2xl border transition-colors ${
            darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Sign Out?</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Confirmation dialog</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              Are you sure you want to log out? Your session data will be cleared from DataStore and the entire navigation back-stack will be popped to prevent Back navigation.
            </p>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutDialog(false);
                  onLogoutConfirmed();
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-sm"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
