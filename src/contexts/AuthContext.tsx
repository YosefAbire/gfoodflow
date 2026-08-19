'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserResponse } from '@/types';
import { apiFetch, getAccessToken, setTokens, clearTokens } from '@/lib/apiClient';

interface AuthContextType {
  user: UserResponse | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, full_name: string, password: string, organization_id?: string | null) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>(() => {
    if (typeof window !== 'undefined' && !getAccessToken()) {
      return 'unauthenticated';
    }
    return 'loading';
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const token = getAccessToken();

    if (!token) {
      return;
    }

    apiFetch<UserResponse>('/auth/me')
      .then((userData) => {
        if (isMounted) {
          setUser(userData);
          setStatus('authenticated');
        }
      })
      .catch(() => {
        if (isMounted) {
          clearTokens();
          setUser(null);
          setStatus('unauthenticated');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const body = new URLSearchParams();
      body.append('username', email);
      body.append('password', password);

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (!res.ok) {
        let errorMessage = 'Login failed.';
        try {
          const errData = await res.json();
          if (errData?.error?.message) {
            errorMessage = errData.error.message;
          } else if (errData?.detail) {
            errorMessage = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
          }
        } catch {
          // ignore
        }
        throw new Error(errorMessage);
      }

      const tokenData = await res.json();
      setTokens(tokenData.access_token, tokenData.refresh_token);

      const me = await apiFetch<UserResponse>('/auth/me');
      setUser(me);
      setStatus('authenticated');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected login error occurred.';
      setError(msg);
      throw err;
    }
  };

  const register = async (
    email: string,
    full_name: string,
    password: string,
    organization_id?: string | null
  ) => {
    setError(null);
    try {
      await apiFetch<UserResponse>('/users', {
        method: 'POST',
        body: JSON.stringify({
          email,
          full_name,
          password,
          role: 'AGRICULTURAL_OFFICER',
          organization_id: organization_id || null,
        }),
      });

      await login(email, password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected registration error occurred.';
      setError(msg);
      throw err;
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    setStatus('unauthenticated');
    setError(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, status, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
