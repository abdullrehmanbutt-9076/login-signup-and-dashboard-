import React from 'react';
import { Layers, ArrowRight, CornerDownLeft, LogOut, CheckCircle2, History, RotateCcw } from 'lucide-react';
import { ScreenRoute, NavigationLogEntry } from '../types';

interface Props {
  currentRoute: ScreenRoute;
  stack: ScreenRoute[];
  logs: NavigationLogEntry[];
  onTriggerScenario: (scenario: 'new_user' | 'deep_nav' | 'back' | 'logout' | 'reset') => void;
}

export const NavigationStackInspector: React.FC<Props> = ({
  currentRoute,
  stack,
  logs,
  onTriggerScenario
}) => {
  const routes: { id: ScreenRoute; label: string; desc: string }[] = [
    { id: 'login', label: 'Login', desc: 'Entry point (Unauthenticated)' },
    { id: 'signup', label: 'Signup', desc: 'Registration (Unauthenticated)' },
    { id: 'dashboard', label: 'Dashboard', desc: 'Main Hub (Authenticated Root)' },
    { id: 'profile', label: 'Profile', desc: 'Secondary Screen (Child of Dashboard)' },
    { id: 'settings', label: 'Settings', desc: 'Secondary Screen (Child of Profile or Dashboard)' }
  ];

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Live Back-Stack Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Jetpack NavBackStack</h3>
              <p className="text-[11px] text-slate-400">Current entries inside NavHost</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Stack Depth: {stack.length}
          </span>
        </div>

        {/* Stack items */}
        <div className="space-y-2">
          {stack.length === 0 ? (
            <div className="p-3 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
              Empty back stack
            </div>
          ) : (
            stack.map((route, idx) => {
              const isTop = idx === stack.length - 1;
              return (
                <div
                  key={`${route}-${idx}`}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    isTop
                      ? 'bg-indigo-600/15 border-indigo-500/50 text-white shadow-sm ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-mono flex items-center justify-center text-slate-400">
                      {idx}
                    </span>
                    <span className="font-mono text-xs font-semibold uppercase">{route}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isTop ? (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-500 text-white">
                        ACTIVE TOP
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">
                        In Back Stack
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pop explanation */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Back Action:</span>
          <span className="font-mono text-indigo-400">
            {stack.length > 1 ? `popBackStack() -> returns to ${stack[stack.length - 2]}` : 'At root destination'}
          </span>
        </div>
      </div>

      {/* Interactive Flow Automation Tests */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
          <span>Quick Scenario Testers</span>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onTriggerScenario('new_user')}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-slate-700 text-left transition-colors group"
          >
            <span className="font-semibold text-white block group-hover:text-indigo-400 transition-colors">
              New User Flow
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Login → Signup → Login
            </span>
          </button>

          <button
            onClick={() => onTriggerScenario('deep_nav')}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-slate-700 text-left transition-colors group"
          >
            <span className="font-semibold text-white block group-hover:text-indigo-400 transition-colors">
              Deep Multi-level
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Dashboard → Profile → Settings
            </span>
          </button>

          <button
            onClick={() => onTriggerScenario('back')}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-slate-700 text-left transition-colors group"
          >
            <span className="font-semibold text-amber-400 block">
              Simulate Back Press ◀
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              popBackStack()
            </span>
          </button>

          <button
            onClick={() => onTriggerScenario('logout')}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-slate-700 text-left transition-colors group"
          >
            <span className="font-semibold text-rose-400 block">
              Test Logout Pop
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              popUpTo(0) inclusive
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Graph Visualizer */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
          Navigation Graph Nodes
        </h3>

        <div className="space-y-1.5">
          {routes.map((r) => {
            const isActive = currentRoute === r.id;
            const isInStack = stack.includes(r.id);
            return (
              <div
                key={r.id}
                className={`flex items-center justify-between p-2 rounded-xl border text-xs transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 border-indigo-500/60 text-white'
                    : isInStack
                    ? 'bg-slate-950/40 border-slate-800 text-slate-300'
                    : 'bg-transparent border-slate-900 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-indigo-400 animate-pulse' : isInStack ? 'bg-emerald-500' : 'bg-slate-700'
                  }`} />
                  <span className="font-mono font-semibold uppercase">{r.id}</span>
                </div>
                <span className="text-[11px] text-slate-400">{r.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Events Log */}
      <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg backdrop-blur-md flex flex-col min-h-[160px]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <History className="w-3.5 h-3.5" />
            <span>Navigation Event Log</span>
          </div>
          <button
            onClick={() => onTriggerScenario('reset')}
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 max-h-48 pr-1 font-mono text-[11px]">
          {logs.slice(-6).reverse().map((entry) => (
            <div
              key={entry.id}
              className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80 text-slate-300"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span className="text-indigo-400 font-bold">{entry.action}</span>
                <span>{entry.timestamp}</span>
              </div>
              <p className="mt-0.5 text-slate-300">{entry.detail}</p>
              <div className="mt-1 text-[10px] text-slate-500 flex items-center gap-1">
                <span>Stack:</span>
                <span className="text-slate-400">[{entry.stackSnapshot.join(' → ')}]</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
