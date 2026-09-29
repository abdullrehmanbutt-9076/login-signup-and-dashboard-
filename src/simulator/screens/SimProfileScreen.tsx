import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Settings, ChevronRight, Edit3, Check, X, ShieldCheck } from 'lucide-react';
import { UserSession } from '../../types';

interface Props {
  session: UserSession;
  onNavigateBack: () => void;
  onNavigateToSettings: () => void;
  onUpdateSession: (updated: Partial<UserSession>) => void;
  darkMode: boolean;
}

export const SimProfileScreen: React.FC<Props> = ({
  session,
  onNavigateBack,
  onNavigateToSettings,
  onUpdateSession,
  darkMode
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session.name);
  const [phone, setPhone] = useState(session.phone);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSession({ name, phone });
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

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
          <span className="font-bold text-base tracking-tight">User Profile</span>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 transition-colors text-xs font-semibold flex items-center gap-1"
        >
          {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          <span>{isEditing ? 'Cancel' : 'Edit'}</span>
        </button>
      </div>

      {/* Main Profile Body */}
      <div className="flex-1 px-4 py-6 space-y-5">
        {/* Avatar & Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md shadow-indigo-600/20">
            <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-2xl text-white ${
              darkMode ? 'bg-slate-900' : 'bg-slate-100'
            }`}>
              {session.name ? session.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          <h3 className="mt-3 text-lg font-bold">{session.name || 'User'}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {session.email || 'user@example.com'}
          </p>
        </div>

        {/* Success Toast */}
        {savedToast && (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Profile successfully updated in DataStore.</span>
          </div>
        )}

        {/* Profile Details or Edit Form */}
        {!isEditing ? (
          <div className={`rounded-2xl border p-4 space-y-3.5 ${
            darkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] text-slate-400 block">Full Name</span>
                <span className="text-sm font-semibold">{session.name || 'Not provided'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] text-slate-400 block">Email Address</span>
                <span className="text-sm font-semibold">{session.email || 'user@example.com'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] text-slate-400 block">Phone Number</span>
                <span className="text-sm font-semibold">{session.phone || '+1 (555) 234-5678'}</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'
                }`}
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>
        )}

        {/* Multi-level Navigation Link: Profile -> Settings */}
        <div className="pt-2">
          <button
            onClick={onNavigateToSettings}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
              darkMode ? 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800' : 'bg-slate-100/70 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-indigo-500" />
              <div className="text-left">
                <span className="text-xs font-bold block">Application Settings</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Dashboard → Profile → Settings (Multi-level back stack)
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Back action reminder at bottom */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800 text-center">
        <button
          onClick={onNavigateBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard (navController.popBackStack())</span>
        </button>
      </div>
    </div>
  );
};
