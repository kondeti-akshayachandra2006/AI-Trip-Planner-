import * as SecureStoreHelper from './secureStore';
import { createContext, createElement, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import type { UserProfile } from './types';
import { env } from '@/utils/env';

const STORAGE_KEY = 'pdd_trip_planner_user';
const STORAGE_TOKEN = 'pdd_trip_planner_token';

type AuthContextValue = {
  user: UserProfile | null;
  isReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function saveUser(user: UserProfile | null) {
  if (!user) return SecureStoreHelper.removeUser();
  return SecureStoreHelper.saveUser(JSON.stringify(user));
}

async function loadUser(): Promise<UserProfile | null> {
  const raw = await SecureStoreHelper.getUser();
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

async function saveToken(token: string | null) {
  return SecureStoreHelper.saveToken(token);
}

async function loadToken(): Promise<string | null> {
  return SecureStoreHelper.getToken();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Promise.all([loadUser(), loadToken()]).then(([storedUser, storedToken]) => {
      setUser(storedUser);
      setToken(storedToken);
      setIsReady(true);
    });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${env.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      const userProfile: UserProfile = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        photoUrl: `https://api.dicebear.com/6.x/adventurer/svg?seed=${encodeURIComponent(data.user.email)}`,
        favorites: [],
        preferences: [],
        savedTrips: 0,
        upcomingTrips: 0,
        completedTrips: 0,
        joinedAt: new Date().toISOString(),
      };
      setUser(userProfile);
      setToken(data.token);
      await Promise.all([saveUser(userProfile), saveToken(data.token)]);
    } catch (err) {
      throw err;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${env.apiBaseUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Signup failed');
      }
      const data = await res.json();
      const userProfile: UserProfile = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        photoUrl: `https://api.dicebear.com/6.x/adventurer/svg?seed=${encodeURIComponent(data.user.email)}`,
        favorites: [],
        preferences: [],
        savedTrips: 0,
        upcomingTrips: 0,
        completedTrips: 0,
        joinedAt: new Date().toISOString(),
      };
      setUser(userProfile);
      setToken(data.token);
      await Promise.all([saveUser(userProfile), saveToken(data.token)]);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await Promise.all([saveUser(null), saveToken(null)]);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const next = { ...user, ...updates } as UserProfile;
    setUser(next);
    await saveUser(next);
  };

  const value = useMemo(
    () => ({ user, token, isReady, isAuthenticated: Boolean(token), login, signup, logout, updateProfile }),
    [user, token, isReady],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within AuthProvider');
  return value;
}
