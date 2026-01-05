"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import api from "@/lib/api";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

const ResetPasswordForm: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations("ResetPassword");
  const isRTL = locale === "ar";
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const tokenParam = searchParams?.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [searchParams]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast.error(t("invalidLink"));
      return;
    }
    
    if (!password || !confirmPassword) {
      toast.error(t("fillAllFields"));
      return;
    }
    
    if (password.length < 8) {
      toast.error(t("passwordMinLength"));
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error(t("passwordMismatch"));
      return;
    }
    
    setLoading(true);
    
    const result = await api.resetPassword(token, password);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(t("successMessage"));
      setSuccess(true);
      
      setTimeout(() => {
        router.push(`/${locale}/authentication/sign-in`);
      }, 2000);
    }
    
    setLoading(false);
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] flex items-center justify-center relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500/5 dark:bg-red-400/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-md mx-auto px-4 animate-slide-up w-full relative z-10">
          <div className="bg-white/90 dark:bg-[#0c1427]/90 backdrop-blur-xl border border-red-200/50 dark:border-red-500/20 rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <i className="ri-error-warning-line text-4xl text-red-600 dark:text-red-400"></i>
            </div>
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-3">
              {t("invalidLinkTitle")}
            </h2>
            <p className="text-red-700 dark:text-red-300 mb-6">
              {t("invalidLinkDescription")}
            </p>
            <Link
              href={`/${locale}/authentication/forgot-password`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <i className="ri-link text-xl"></i>
              {t("requestNewLink")}
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                success 
                  ? "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30" 
                  : "bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30"
              }`}>
                <i className={`text-4xl ${
                  success 
                    ? "ri-checkbox-circle-line text-green-600 dark:text-green-400" 
                    : "ri-key-2-line text-primary-500 dark:text-primary-400"
                }`}></i>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                {success ? t("successTitle") : t("title")}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {success ? t("redirecting") : t("subtitle")}
              </p>
            </div>

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div className="space-y-2">
                  <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                    <i className="ri-lock-line text-primary-500 dark:text-primary-400"></i>
                    {t("newPassword")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("newPasswordPlaceholder")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                      minLength={8}
                      className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 ltr:pr-12 rtl:pl-12 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-xl"
                    >
                      <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                    <i className="ri-lock-password-line text-primary-500 dark:text-primary-400"></i>
                    {t("confirmPassword")}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("confirmPasswordPlaceholder")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      {t("changing")}
                    </>
                  ) : (
                    <>
                      <i className="ri-lock-password-line text-xl"></i>
                      {t("changeButton")}
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-6 text-center">
                <i className="ri-checkbox-circle-line text-5xl text-green-600 dark:text-green-400 mb-4"></i>
                <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
                  {t("successMessage")}
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {t("canNowLogin")}
                </p>
              </div>
            )}

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

export default ResetPasswordForm;
