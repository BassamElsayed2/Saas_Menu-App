"use client";

import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { Checkbox } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const locale = useLocale();
  const router = useRouter();
  const { login } = useAuth();
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
    }
  }, []);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t("fillAllFields"));
      return;
    }

    setLoading(true);
    console.log("📝 Form submitted, attempting login...");

    try {
      await login(email, password);
      console.log("✅ Login completed successfully");

      // Login successful
      toast.success("Login successful!");

      // Close modal
      onClose();

      // Small delay to ensure cache is updated
      await new Promise(resolve => setTimeout(resolve, 200));

      // Navigate to menus page (menu selection)
      console.log("🔄 Navigating to menus page...");
      router.push(`/${locale}/menus`);
    } catch (error) {
      console.error("❌ Login failed:", error);
      // Error already handled by React Query hook with toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-md transform transition-all">
                {/* Ambient Background Effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute -top-20 ltr:-right-20 rtl:-left-20 w-72 h-72 bg-primary-500/20 dark:bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-20 ltr:-left-20 rtl:-right-20 w-72 h-72 bg-primary-400/15 dark:bg-primary-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>

                {/* Card */}
                <div className="relative bg-white/95 dark:bg-[#0c1427]/95 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/20 rounded-2xl shadow-2xl dark:shadow-primary-500/10 p-8 md:p-10">
                  {/* Top Actions - Dark Mode & Close */}
                  <div className="absolute top-4 ltr:right-4 rtl:left-4 flex items-center gap-2">
                    {/* Dark Mode Toggle */}
                    <button
                      onClick={() => {
                        const newMode = !isDarkMode;
                        setIsDarkMode(newMode);
                        localStorage.setItem("theme", newMode ? "dark" : "light");
                        document.documentElement.classList.toggle("dark", newMode);
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-primary-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary-500 transition-all"
                      title={isDarkMode ? "Light Mode" : "Dark Mode"}
                    >
                      <i className={`${isDarkMode ? "ri-sun-line" : "ri-moon-line"} text-xl`}></i>
                    </button>

                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
                    >
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  </div>

                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <Image
                      src="/images/ENS.png"
                      alt="logo"
                      className="h-14 w-auto dark:hidden"
                      width={140}
                      height={56}
                    />
                    <Image
                      src="/images/ENS.png"
                      alt="logo"
                      className="h-14 w-auto hidden dark:block"
                      width={140}
                      height={56}
                    />
                  </div>

                  {/* Title */}
                  <div className="text-center mb-8">
                    <Dialog.Title as="h2" className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {t("title")}
                    </Dialog.Title>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {t("subtitle")}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
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
                        onClick={onClose}
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
                  <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    {t("noAccount")}{" "}
                    <Link
                      href={`/${locale}/authentication/sign-up`}
                      onClick={onClose}
                      className="text-primary-500 dark:text-primary-400 font-medium hover:underline"
                    >
                      {t("createAccount")}
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SignInModal;

