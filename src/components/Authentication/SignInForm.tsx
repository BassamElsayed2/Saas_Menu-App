"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { Checkbox } from "@headlessui/react";

const SignInForm: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const { login, user: contextUser } = useAuth();
  const t = useTranslations("SignIn");
  const isRTL = locale === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t("fillAllFields"));
      return;
    }

    setLoading(true);
    console.log("📝 Form submitted, attempting login...");

    try {
      const result = await login(email, password);

      // Login successful
      toast.success("Login successful!");

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Navigate based on user role from login response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userData = result as any;
      if (userData?.user?.role === "admin") {
        router.push(`/${locale}/admin`);
      } else {
        router.push(`/${locale}/menus`);
      }
    } catch (error) {
      console.error("❌ Login failed:", error);
      // Error already handled by React Query hook with toast
    } finally {
      setLoading(false);
    }
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
        {/* Top Bar - Back Button & Dark Mode Toggle */}
        <div className="flex items-center justify-between mb-8">
          {/* Back Button */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition group"
          >
            <i className={`ri-arrow-${isRTL ? 'right' : 'left'}-line text-xl transition-transform ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}></i>
            {t("backToHome")}
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => {
              const newMode = !isDarkMode;
              setIsDarkMode(newMode);
              localStorage.setItem("theme", newMode ? "dark" : "light");
              document.documentElement.classList.toggle("dark", newMode);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-sm border border-gray-200/50 dark:border-primary-500/20 text-gray-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-[#15203c] hover:text-primary-500 transition-all shadow-sm"
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            <i className={`${isDarkMode ? "ri-sun-line" : "ri-moon-line"} text-xl`}></i>
          </button>
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

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                {t("title")}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {t("subtitle")}
              </p>
            </div>

            {/* Form */}
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

              {/* Password */}
              <div className="space-y-2">
                <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                  <i className="ri-lock-line text-primary-500 dark:text-primary-400"></i>
                  {t("password")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                    className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 ltr:pr-12 rtl:pl-12 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    aria-pressed={showPassword}
                    aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-xl"
                  >
                    <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={rememberMe}
                    onChange={setRememberMe}
                    className="group size-5 rounded border-2 border-gray-300 dark:border-[#1e293b] bg-white dark:bg-[#0a0e19] data-[checked]:bg-primary-500 dark:data-[checked]:bg-primary-400 data-[checked]:border-primary-500 dark:data-[checked]:border-primary-400 transition-all cursor-pointer flex items-center justify-center hover:border-primary-400"
                  >
                    <i className="ri-check-line text-white text-sm opacity-0 group-data-[checked]:opacity-100 transition-opacity"></i>
                  </Checkbox>
                  <label 
                    className="text-sm cursor-pointer text-gray-500 dark:text-gray-400"
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    {t("rememberMe")}
                  </label>
                </div>

                <Link
                  href={`/${locale}/authentication/forgot-password`}
                  className="text-sm text-primary-500 dark:text-primary-400 hover:underline font-medium"
                >
                  {t("forgotPassword")}
                </Link>
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
                    {t("signingIn")}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">login</span>
                    {t("signInButton")}
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              {t("noAccount")}{" "}
              <Link
                href={`/${locale}/authentication/sign-up`}
                className="text-primary-500 dark:text-primary-400 font-medium hover:underline"
              >
                {t("createAccount")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInForm;
