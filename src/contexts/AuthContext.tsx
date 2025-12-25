'use client';

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser, useLogin as useLoginMutation, useLogout as useLogoutMutation } from '@/hooks/useApi';
import api from '@/lib/api';

interface User {
  id: number;
  email: string;
  name: string;
  role?: string;
  phoneNumber?: string;
  country?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  profileImage?: string;
  planType?: 'free' | 'monthly' | 'yearly';
  menusLimit?: number;
  currentMenusCount?: number;
  emailVerified?: boolean;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 Starting login...');
      const result = await loginMutation.mutateAsync({ email, password });
      console.log('✅ Login mutation successful:', result);
      
      // No need to refetch - the mutation already updates the cache
      console.log('✅ Login completed, user should be in cache now');
      
      return;
    } catch (error) {
      console.error('❌ Login error:', error);
      // Error is already handled by the mutation
      throw error;
    }
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const value: AuthContextType = {
    user: user || null,
    loading: isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;

