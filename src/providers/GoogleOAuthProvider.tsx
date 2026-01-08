"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { GoogleOAuthProvider as GoogleProvider } from "@react-oauth/google";

interface GoogleOAuthContextType {
  isGoogleOAuthAvailable: boolean;
  isLoading: boolean;
}

const GoogleOAuthContext = createContext<GoogleOAuthContextType>({
  isGoogleOAuthAvailable: false,
  isLoading: true,
});

export const useGoogleOAuth = () => useContext(GoogleOAuthContext);

interface GoogleOAuthProviderProps {
  children: React.ReactNode;
}

const GoogleOAuthProvider: React.FC<GoogleOAuthProviderProps> = ({ children }) => {
  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Google Client ID from backend
    const fetchClientId = async () => {
      try {
        // NEXT_PUBLIC_API_URL already contains /api at the end
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/auth/google/config`);
        const data = await response.json();
        if (data.clientId) {
          setClientId(data.clientId);
        }
      } catch (error) {
        console.error("Failed to fetch Google Client ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientId();
  }, []);

  const contextValue: GoogleOAuthContextType = {
    isGoogleOAuthAvailable: !!clientId,
    isLoading: loading,
  };

  // Always wrap children with context, but only wrap with GoogleProvider if clientId exists
  if (!clientId) {
    return (
      <GoogleOAuthContext.Provider value={contextValue}>
        {children}
      </GoogleOAuthContext.Provider>
    );
  }

  return (
    <GoogleOAuthContext.Provider value={contextValue}>
      <GoogleProvider clientId={clientId}>{children}</GoogleProvider>
    </GoogleOAuthContext.Provider>
  );
};

export default GoogleOAuthProvider;

