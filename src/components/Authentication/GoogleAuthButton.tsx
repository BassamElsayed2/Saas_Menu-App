"use client";

import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useGoogleOAuth } from "@/providers/GoogleOAuthProvider";

interface GoogleAuthButtonProps {
  mode: "signin" | "signup";
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ mode }) => {
  const locale = useLocale();
  const tSignIn = useTranslations("SignIn");
  const tSignUp = useTranslations("SignUp");
  const t = mode === "signin" ? tSignIn : tSignUp;
  const router = useRouter();
  const { isGoogleOAuthAvailable, isLoading: isGoogleLoading } =
    useGoogleOAuth();
  const [loading, setLoading] = React.useState(false);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error(t("googleAuthFailed"));
      return;
    }

    setLoading(true);

    try {
      // NEXT_PUBLIC_API_URL already contains /api at the end
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
          locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Save tokens to localStorage (using keys that api.ts expects)
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("auth_token", data.accessToken); // For compatibility
      localStorage.setItem("refresh_token", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Show success message
      const successMessage = data.isNew
        ? t("accountCreatedSuccess")
        : t("loginSuccess");

      toast.success(successMessage);

      // Small delay to ensure localStorage is saved
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Reload page to refresh auth state
      const redirectPath = data.user.role === "admin" ? "admin" : "menus";
      window.location.href = `/${locale}/${redirectPath}`;
    } catch (error: any) {
      console.error("Google auth error:", error);
      toast.error(error.message || t("googleSignInFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    toast.error(t("googleSignInFailed"));
  };

  // Don't render if Google OAuth is not available or still loading
  if (isGoogleLoading) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  if (!isGoogleOAuthAvailable) {
    // Show a message instead of nothing (helpful for development)
    return (
      <div className="w-full p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md text-center">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          {t("googleOAuthNotConfigured")}
        </p>
        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
          {t("googleOAuthSetupInstructions")}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[400px]">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap={false}
          theme="outline"
          size="large"
          text={mode === "signin" ? "signin_with" : "signup_with"}
        />
      </div>
    </div>
  );
};

export default GoogleAuthButton;
