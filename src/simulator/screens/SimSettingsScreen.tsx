import React from 'react';
import { ArrowLeft, Moon, Bell, Fingerprint, Info, Layers, CheckCircle2 } from 'lucide-react';
import { AppSettings, ScreenRoute } from '../../types';

interface Props {
  settings: AppSettings;
  onUpdateSettings: (updated: Partial<AppSettings>) => void;
  onNavigateBack: () => void;
  currentStack: ScreenRoute[];
  darkMode: boolean;
}

export const SimSettingsScreen: React.FC<Props> = ({
  settings,
  onUpdateSettings,
  onNavigateBack,
  currentStack,
  darkMode
}) => {
  const previousScreen = currentStack.length >= 2 ? currentStack[currentStack.length - 2] : 'previous screen';

  return (
    <div className={`h-full flex flex-col justify-between overflow-y-auto transition-colors duration-200 ${
      darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top App Bar with Standard Back Arrow */}
      <div className={`sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b backdrop-blur-md transition-colors ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateBack}
            className="p-1.5 -ml-1 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Back Arrow (navController.popBackStack())"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-base tracking-tight">Settings</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500">
          Secondary
        </span>
      </div>

      {/* Main Settings Body */}
      <div className="flex-1 px-4 py-5 space-y-4">
        {/* Navigation context banner */}
        <div className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
          darkMode ? 'bg-indigo-950/40 border-indigo-800/60 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-800'
        }`}>
          <Layers className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
          <div>
            <span className="font-bold block">Back Stack Context:</span>
            <span>
              Pressing Back Arrow will return to <strong className="uppercase font-mono">{previousScreen}</strong> via <code className="bg-black/10 dark:bg-white/10 px-1 rounded">navController.popBackStack()</code> without recreating screens.
            </span>
          </div>
        </div>

        {/* Preferences Section */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-1">
            Preferences & Appearance
          </h4>

          <div className={`rounded-2xl border divide-y overflow-hidden ${
            darkMode ? 'bg-slate-800/70 border-slate-700/80 divide-slate-700/80' : 'bg-white border-slate-200 divide-slate-100'
          }`}>
            {/* Dark Mode Switch */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Dark Theme</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Material 3 Dynamic Dark Palette
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => onUpdateSettings({ darkMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Notifications Switch */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Push Notifications</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Receive security and login alerts
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => onUpdateSettings({ notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Biometric Switch */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Biometric Unlock</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Face Unlock & Fingerprint prompt
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.biometrics}
                  onChange={(e) => onUpdateSettings({ biometrics: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Architecture Spec Card */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-1">
            Navigation Architecture
          </h4>
          <div className={`p-4 rounded-2xl border space-y-2.5 ${
            darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Jetpack Navigation Compose 2.8.5</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Single NavHost with type-safe Screen routes</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Physical Android Back & Back Arrow synchronized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800 text-center">
        <button
          onClick={onNavigateBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to {previousScreen} (popBackStack)</span>
        </button>
      </div>
    </div>
  );
};
