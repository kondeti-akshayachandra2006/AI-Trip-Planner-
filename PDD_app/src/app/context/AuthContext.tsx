import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { fetchJson } from '../lib/api';

type UserProfile = {
  id: string;
  name: string;
  email: string;
  age?: number | null;
  gender?: string;
  country?: string;
  travelStyle?: string;
  budget?: string;
  profilePhoto?: string;
  bio?: string;
  preferences?: string[];
};

type AuthContextValue = {
  user: UserProfile | null;
  token: string | null;
  isReady: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = 'pdd_web_token';
const USER_KEY = 'pdd_web_user';

function getStoredToken() {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
}

function getStoredUser() {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as UserProfile) : null;
}

function storeToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

function storeUser(user: UserProfile | null) {
  if (typeof window === 'undefined') return;
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(getStoredUser());
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    setToken(getStoredToken());
    setIsReady(true);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await fetchJson('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    const nextToken = data.token;
    const nextUser = data.user;
    setToken(nextToken);
    setUser(nextUser);
    storeToken(nextToken);
    storeUser(nextUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await fetchJson('/auth/signup', {
      method: 'POST',
      body: { name, email, password },
    });
    const nextToken = data.token;
    const nextUser = data.user;
    setToken(nextToken);
    setUser(nextUser);
    storeToken(nextToken);
    storeUser(nextUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    storeToken(null);
    storeUser(null);
  };

  const refreshProfile = async () => {
    if (!token) return;
    const data = await fetchJson('/auth/profile', { method: 'GET', authToken: token });
    setUser(data.user);
    storeUser(data.user);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!token) throw new Error('Not authenticated');
    const data = await fetchJson('/auth/profile', {
      method: 'PUT',
      authToken: token,
      body: updates,
    });
    setUser(data.user);
    storeUser(data.user);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isReady,
      isAuthenticated: Boolean(token),
      login,
      signup,
      logout,
      refreshProfile,
      updateProfile,
    }),
    [user, token, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
