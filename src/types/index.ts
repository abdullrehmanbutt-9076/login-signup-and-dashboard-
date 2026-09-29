export type ScreenRoute = 'login' | 'signup' | 'dashboard' | 'profile' | 'settings';

export interface UserSession {
  isLoggedIn: boolean;
  name: string;
  email: string;
  phone: string;
}

export interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  biometrics: boolean;
}

export interface NavigationLogEntry {
  id: string;
  timestamp: string;
  action: 'NAVIGATE' | 'POP_BACK' | 'LOGOUT_POP_TO_ROOT' | 'RESTORE_SESSION';
  from: ScreenRoute | 'INIT';
  to: ScreenRoute;
  stackSnapshot: ScreenRoute[];
  detail: string;
}
