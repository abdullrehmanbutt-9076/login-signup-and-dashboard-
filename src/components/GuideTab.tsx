import React from 'react';
import { 
  Terminal, 
  Layers, 
  CheckCircle, 
  Smartphone, 
  BookOpen, 
  FolderTree, 
  Cpu, 
  Database,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const GuideTab: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2">
      {/* Hero Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Android Studio Implementation Manual</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Production Architecture & Setup Guide
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Comprehensive step-by-step instructions to create, build, and run this Kotlin & Jetpack Compose project inside Android Studio with full Navigation Compose and persistent DataStore session management.
        </p>
      </div>

      {/* Step by Step Setup */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <span>1. Creating the Project in Android Studio</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold text-sm flex items-center justify-center mb-3">
              1
            </div>
            <h4 className="text-sm font-bold text-white mb-1">New Empty Activity</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open Android Studio, select <strong className="text-slate-200">New Project → Empty Activity</strong> (the Compose template). Name the application <code className="text-indigo-300">MyApp</code> with package <code className="text-indigo-300">com.example.myapp</code>.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold text-sm flex items-center justify-center mb-3">
              2
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Select Language & SDK</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose <strong className="text-slate-200">Kotlin</strong> as the programming language and <strong className="text-slate-200">Minimum SDK 24 (Android 7.0)</strong> or higher. Target SDK is 35 (Android 15). Choose Kotlin DSL (<code className="text-indigo-300">build.gradle.kts</code>).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold text-sm flex items-center justify-center mb-3">
              3
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Sync Dependencies</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste the <code className="text-indigo-300">app/build.gradle.kts</code> dependencies from the Code tab, click <strong className="text-slate-200">Sync Now</strong> in the top-right banner, and build the project cleanly.
            </p>
          </div>
        </div>
      </div>

      {/* Directory Organization breakdown */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-emerald-400" />
          <span>2. Project File Structure & Locations</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Create packages and files under <code className="text-indigo-300">app/src/main/java/com/example/myapp/</code> as follows:
        </p>

        <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-1 overflow-x-auto">
          <div>app/</div>
          <div className="pl-4">├── build.gradle.kts <span className="text-slate-500">// Compose, Navigation, DataStore dependencies</span></div>
          <div className="pl-4">└── src/main/</div>
          <div className="pl-8">├── AndroidManifest.xml <span className="text-slate-500">// Launcher activity & app metadata</span></div>
          <div className="pl-8">└── java/com/example/myapp/</div>
          <div className="pl-12">├── MainActivity.kt <span className="text-indigo-400">// Root Activity with MyAppTheme & AppNavigation</span></div>
          <div className="pl-12">├── navigation/</div>
          <div className="pl-16">└── AppNavigation.kt <span className="text-indigo-400">// Centralized NavHost & Screen sealed class</span></div>
          <div className="pl-12">├── screens/</div>
          <div className="pl-16">├── LoginScreen.kt <span className="text-indigo-400">// Email/pass validation & signup link</span></div>
          <div className="pl-16">├── SignupScreen.kt <span className="text-indigo-400">// Full registration & password match</span></div>
          <div className="pl-16">├── DashboardScreen.kt <span className="text-indigo-400">// Authenticated hub with cards & logout</span></div>
          <div className="pl-16">├── ProfileScreen.kt <span className="text-indigo-400">// TopAppBar back arrow & edit details</span></div>
          <div className="pl-16">└── SettingsScreen.kt <span className="text-indigo-400">// TopAppBar back arrow & preferences</span></div>
          <div className="pl-12">├── components/</div>
          <div className="pl-16">├── CustomButton.kt <span className="text-indigo-400">// Rounded Material 3 button with loader</span></div>
          <div className="pl-16">├── CustomTextField.kt <span className="text-indigo-400">// Rounded OutlinedTextField + eye toggle</span></div>
          <div className="pl-16">└── AppTopBar.kt <span className="text-indigo-400">// Standardized TopAppBar with Back Arrow</span></div>
          <div className="pl-12">├── viewmodel/</div>
          <div className="pl-16">└── AuthViewModel.kt <span className="text-indigo-400">// MVVM StateFlow, validation, async state</span></div>
          <div className="pl-12">├── data/</div>
          <div className="pl-16">└── SessionManager.kt <span className="text-indigo-400">// Jetpack DataStore Preferences persistence</span></div>
          <div className="pl-12">└── ui/theme/</div>
          <div className="pl-16">├── Color.kt, Theme.kt, Type.kt <span className="text-indigo-400">// Material 3 styling</span></div>
        </div>
      </div>

      {/* Navigation Rules Deep-dive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Navigation Pop logic */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Back Arrow & Hardware Back</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Secondary screens (<code className="text-indigo-300">ProfileScreen</code>, <code className="text-indigo-300">SettingsScreen</code>) contain an <code className="text-indigo-300">AppTopBar</code> whose navigation icon triggers:
          </p>
          <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-indigo-300">
{`// Secondary screen back arrow
navController.popBackStack()`}
          </pre>
          <p className="text-xs text-slate-400 leading-relaxed">
            Because this uses standard Jetpack Navigation Compose, pressing the physical Android Back button triggers the exact same back stack pop without duplicate screens.
          </p>
        </div>

        {/* Logout PopUpTo logic */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Logout & Back Stack Clearance</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            When logging out, the session is cleared in DataStore and the entire navigation graph is cleared so pressing Back never returns to Dashboard:
          </p>
          <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-rose-300">
{`// Clear entire authenticated stack
navController.navigate(Screen.Login.route) {
    popUpTo(0) { inclusive = true }
    launchSingleTop = true
}`}
          </pre>
          <p className="text-xs text-slate-400 leading-relaxed">
            Similarly, logging in pops the login screen with <code className="text-slate-200">popUpTo(Screen.Login.route) &#123; inclusive = true &#125;</code>.
          </p>
        </div>
      </div>

      {/* Session Persistence Details */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-400" />
          <span>3. Persistent Session with Jetpack DataStore</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The app replaces legacy SharedPreferences with modern <strong className="text-slate-200">Jetpack DataStore Preferences</strong>:
        </p>
        <ul className="space-y-2 text-xs text-slate-400">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong className="text-slate-200">Thread-safe & Asynchronous:</strong> Uses Kotlin Coroutines and Flows for reactive state collection without blocking UI.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong className="text-slate-200">App Startup Session Check:</strong> <code className="text-indigo-300">MainActivity</code> observes <code className="text-indigo-300">isLoggedIn</code>. If true, <code className="text-indigo-300">NavHost</code> boots directly into <code className="text-indigo-300">Screen.Dashboard</code>; otherwise <code className="text-indigo-300">Screen.Login</code>.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong className="text-slate-200">Clean State Disposal:</strong> Logout calls <code className="text-indigo-300">sessionManager.clearSession()</code> atomically.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
