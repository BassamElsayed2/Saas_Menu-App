"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import api from "@/lib/api";
import toast from 'react-hot-toast';

const ForgotPasswordForm: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations("ForgotPassword");
  const isRTL = locale === "ar";
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error(t("enterEmail"));
      return;
    }
    
    setLoading(true);
    
    const result = await api.forgotPassword(email);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(t("successMessage"));
      setSuccess(true);
    }
    
    setLoading(false);
  };

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
                <i className="ri-lock-password-line text-4xl text-primary-500 dark:text-primary-400"></i>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                {t("title")}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {success ? t("checkEmail") : t("subtitle")}
              </p>
            </div>

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                    <i className="ri-mail-line text-primary-500 dark:text-primary-400"></i>
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white font-semibold text-lg shadow-lg shadow-primary-500/25 dark:shadow-primary-400/30 hover:shadow-xl hover:shadow-primary-500/30 dark:hover:shadow-primary-400/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-xl"></i>
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      <i className="ri-mail-send-line text-xl"></i>
                      {t("sendButton")}
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-3xl text-green-600 dark:text-green-400"></i>
                </div>
                <h3 className="font-bold text-lg text-green-900 dark:text-green-100 mb-2">
                  {t("successTitle")}
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {t("successDescription")}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              {t("rememberPassword")}{" "}
              <Link
                href={`/${locale}/authentication/sign-in`}
                className="text-primary-500 dark:text-primary-400 font-medium hover:underline"
              >
                {t("login")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordForm;
