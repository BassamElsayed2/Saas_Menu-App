"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import toast from 'react-hot-toast';

const ConfirmEmailForm: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations("ConfirmEmail");
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();
  
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const tokenParam = searchParams?.get('token');
    const emailParam = searchParams?.get('email');
    
    if (tokenParam) {
      setToken(tokenParam);
      verifyEmail(tokenParam);
    }
    
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);
  
  const verifyEmail = async (verificationToken: string) => {
    setLoading(true);
    
    const result = await api.verifyEmail(verificationToken);
    
    if (result.error) {
      setError(result.error);
      toast.error(result.error);
    } else {
      setVerified(true);
      toast.success(t("verificationSuccess"));
    }
    
    setLoading(false);
  };
  
  const handleResend = async () => {
    if (!email) {
      toast.error(t("enterEmail"));
      return;
    }
    
    setResendLoading(true);
    
    const result = await api.resendVerification(email);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(t("resendSuccess"));
    }
    
    setResendLoading(false);
  };

  // Still loading
  if (token && loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">{t("verifying")}</p>
        </div>
      </main>
    );
  }

  // Verification successful
  if (verified) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] relative overflow-hidden transition-colors duration-300">
        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 dark:bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-500/5 dark:bg-green-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 py-10 relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-md mx-auto animate-slide-up w-full">
            <div className="bg-white/90 dark:bg-[#0c1427]/90 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-2xl dark:shadow-primary-500/5 p-8 md:p-10 text-center">
              {/* Success Icon */}
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-5xl text-green-600 dark:text-green-400"></i>
              </div>

              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {t("successTitle")}
              </h1>
              
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                {t("successDescription")}
              </p>
              
              <Link
                href={`/${locale}/authentication/sign-in`}
                className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <i className="ri-login-box-line text-xl"></i>
                {t("loginButton")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Verification failed or no token - show waiting/resend screen
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 ltr:right-10 rtl:left-10 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 ltr:left-10 rtl:right-10 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Top Bar - Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/${locale}/authentication/sign-in`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition group"
          >
            <i className={`ri-arrow-${isRTL ? 'right' : 'left'}-line text-xl transition-transform ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}></i>
            {t("backToLogin")}
          </Link>
        </div>

        {/* Card with Animation */}
        <div className="max-w-md mx-auto animate-slide-up">
          <div className="bg-white/90 dark:bg-[#0c1427]/90 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-2xl dark:shadow-primary-500/5 p-8 md:p-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/images/ENS.png"
                alt="logo"
                className="h-16 w-auto dark:hidden"
                width={160}
                height={64}
              />
              <Image
                src="/images/ENS.png"
                alt="logo"
                className="h-16 w-auto hidden dark:block"
                width={160}
                height={64}
              />
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full flex items-center justify-center">
                <i className="ri-mail-check-line text-4xl text-primary-500 dark:text-primary-400"></i>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                {t("title")}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {error ? t("errorMessage") : t("subtitle")}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <i className="ri-error-warning-line text-2xl text-red-600 dark:text-red-400"></i>
                  <div>
                    <h3 className="font-semibold text-red-900 dark:text-red-100">
                      {t("errorTitle")}
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Resend Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <i className="ri-mail-line text-2xl text-blue-600 dark:text-blue-400"></i>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  {t("didntReceive")}
                </h3>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t("checkSpam")}
              </p>
              
              <div className="space-y-3">
                <input
                  type="email"
                  className="h-12 w-full rounded-lg bg-white dark:bg-[#0a0e19] border border-blue-200 dark:border-blue-800 px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={resendLoading}
                />
                
                <button
                  onClick={handleResend}
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  disabled={resendLoading}
                >
                  {resendLoading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-xl"></i>
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      <i className="ri-mail-send-line text-xl"></i>
                      {t("resendButton")}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              <Link
                href={`/${locale}/authentication/sign-in`}
                className="text-primary-500 dark:text-primary-400 font-medium hover:underline"
              >
                {t("backToLoginLink")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConfirmEmailForm;
