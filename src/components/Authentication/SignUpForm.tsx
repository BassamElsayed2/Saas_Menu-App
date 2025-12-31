"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import {
  signupSchema,
  getZodErrorMessage,
} from "@/lib/validators/auth.validator";
import type { SignupFormData } from "@/lib/validators/auth.validator";
import { useAvailabilityCheck } from "@/hooks/useAvailabilityCheck";

/**
 * Sign Up Form Component
 * Features:
 * - Real-time email and phone availability checking
 * - Zod validation
 * - Password visibility toggle
 * - Loading states
 * - Accessibility support
 * - Modern landing page styling
 */
const SignUpForm: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const { signup } = useAuth();
  const t = useTranslations("SignUp");
  const isRTL = locale === "ar";

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Initialize dark mode from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Real-time availability checking with custom hooks
  const { isAvailable: emailAvailable, isChecking: checkingEmail } =
    useAvailabilityCheck({
      value: formData.email,
      type: "email",
    });

  const { isAvailable: phoneAvailable, isChecking: checkingPhone } =
    useAvailabilityCheck({
      value: formData.phoneNumber,
      type: "phone",
      minLength: 8,
    });

  // Update form field
  const updateFormField = useCallback(
    (field: keyof SignupFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Real-time password validation
        if (field === "password") {
          setPasswordValidation({
            minLength: value.length >= 8,
            hasUpperCase: /[A-Z]/.test(value),
            hasLowerCase: /[a-z]/.test(value),
            hasNumber: /\d/.test(value),
            hasSpecialChar: /[@$!%*?&#^()_+=\-\[\]{};:'",.<>\/\\|`~]/.test(
              value
            ),
          });
        }
      },
    []
  );

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with Zod
    try {
      signupSchema.parse(formData);
    } catch (error: any) {
      const errorMessage = getZodErrorMessage(error);
      toast.error(errorMessage);
      return;
    }

    // Check availability before submitting
    if (emailAvailable === false) {
      toast.error(t("emailTaken") || "البريد الإلكتروني مستخدم بالفعل");
      return;
    }

    if (phoneAvailable === false) {
      toast.error(t("phoneTaken") || "رقم الهاتف مستخدم بالفعل");
      return;
    }

    // Prevent submission while checking
    if (checkingEmail || checkingPhone) {
      toast.error(t("waitingValidation") || "الرجاء الانتظار حتى يتم التحقق من البيانات");
      return;
    }

    setLoading(true);

    try {
      const success = await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.phoneNumber
      );

      if (success) {
        toast.success(t("accountCreated") || "تم إنشاء الحساب بنجاح!");
        router.push(`/${locale}/authentication/confirm-email`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(t("signupError") || "حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  // Render availability status
  const renderAvailabilityStatus = (
    isChecking: boolean,
    isAvailable: boolean | null,
    availableText: string,
    unavailableText: string
  ) => {
    if (isChecking) {
      return (
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <i className="ri-loader-4-line animate-spin"></i>
          {t("checking") || "جاري التحقق..."}
        </span>
      );
    }
    if (isAvailable === true) {
      return (
        <span className="text-xs text-green-500 flex items-center gap-1">
          <i className="ri-checkbox-circle-fill"></i>
          {availableText}
        </span>
      );
    }
    if (isAvailable === false) {
      return (
        <span className="text-xs text-red-500 flex items-center gap-1">
          <i className="ri-close-circle-fill"></i>
          {unavailableText}
        </span>
      );
    }
    return null;
  };

  return (
    <>
      <Toaster position="top-center" />

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
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div className="space-y-2">
                  <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                    <i className="ri-user-line text-primary-500 dark:text-primary-400"></i>
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={updateFormField("name")}
                    disabled={loading}
                    required
                    className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                      <i className="ri-mail-line text-primary-500 dark:text-primary-400"></i>
                      {t("email")}
                    </label>
                    {formData.email && renderAvailabilityStatus(
                      checkingEmail,
                      emailAvailable,
                      t("emailAvailable") || "البريد الإلكتروني متاح ✓",
                      t("emailTaken") || "البريد الإلكتروني مستخدم بالفعل"
                    )}
                  </div>
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={updateFormField("email")}
                    disabled={loading}
                    required
                    className={`h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      emailAvailable === false
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : emailAvailable === true
                        ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                        : "border-gray-200 dark:border-[#1e293b] focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500/20 dark:focus:ring-primary-400/20"
                    }`}
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                      <i className="ri-phone-line text-primary-500 dark:text-primary-400"></i>
                      {t("phoneNumber")}
                    </label>
                    {formData.phoneNumber && formData.phoneNumber.length >= 8 && renderAvailabilityStatus(
                      checkingPhone,
                      phoneAvailable,
                      t("phoneAvailable") || "رقم الهاتف متاح ✓",
                      t("phoneTaken") || "رقم الهاتف مستخدم بالفعل"
                    )}
                  </div>
                  <input
                    type="tel"
                    placeholder={t("phoneNumberPlaceholder")}
                    value={formData.phoneNumber}
                    onChange={updateFormField("phoneNumber")}
                    disabled={loading}
                    required
                    className={`h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      phoneAvailable === false
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : phoneAvailable === true
                        ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                        : "border-gray-200 dark:border-[#1e293b] focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500/20 dark:focus:ring-primary-400/20"
                    }`}
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
                      value={formData.password}
                      onChange={updateFormField("password")}
                      disabled={loading}
                      required
                      minLength={8}
                      className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 ltr:pr-12 rtl:pl-12 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      aria-pressed={showPassword}
                      aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                      onClick={togglePasswordVisibility}
                      className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-xl"
                    >
                      <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                    </button>
                  </div>

                  {/* Password Requirements Indicator */}
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <i className={`${passwordValidation.minLength ? "ri-checkbox-circle-fill text-green-500" : "ri-close-circle-fill text-red-500"}`}></i>
                        <span className={passwordValidation.minLength ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                          {t("passwordMinLengthRule") || "8 أحرف على الأقل"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <i className={`${passwordValidation.hasUpperCase ? "ri-checkbox-circle-fill text-green-500" : "ri-close-circle-fill text-red-500"}`}></i>
                        <span className={passwordValidation.hasUpperCase ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                          {t("passwordUppercaseRule") || "حرف كبير (A-Z)"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <i className={`${passwordValidation.hasLowerCase ? "ri-checkbox-circle-fill text-green-500" : "ri-close-circle-fill text-red-500"}`}></i>
                        <span className={passwordValidation.hasLowerCase ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                          {t("passwordLowercaseRule") || "حرف صغير (a-z)"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <i className={`${passwordValidation.hasNumber ? "ri-checkbox-circle-fill text-green-500" : "ri-close-circle-fill text-red-500"}`}></i>
                        <span className={passwordValidation.hasNumber ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                          {t("passwordNumberRule") || "رقم واحد (0-9)"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <i className={`${passwordValidation.hasSpecialChar ? "ri-checkbox-circle-fill text-green-500" : "ri-close-circle-fill text-red-500"}`}></i>
                        <span className={passwordValidation.hasSpecialChar ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                          {t("passwordSpecialRule") || "رمز خاص (@$!%*?&#...)"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                    <i className="ri-lock-2-line text-primary-500 dark:text-primary-400"></i>
                    {t("confirmPassword")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("confirmPasswordPlaceholder")}
                      value={formData.confirmPassword}
                      onChange={updateFormField("confirmPassword")}
                      disabled={loading}
                      required
                      className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 ltr:pr-12 rtl:pl-12 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || checkingEmail || checkingPhone}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white font-semibold text-lg shadow-lg shadow-primary-500/25 dark:shadow-primary-400/30 hover:shadow-xl hover:shadow-primary-500/30 dark:hover:shadow-primary-400/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-xl"></i>
                      {t("creatingAccount")}
                    </>
                  ) : checkingEmail || checkingPhone ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-xl"></i>
                      {t("checking") || "جاري التحقق..."}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">person_add</span>
                      {t("signUpButton")}
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {t("hasAccount")}{" "}
                <Link
                  href={`/${locale}/authentication/sign-in`}
                  className="text-primary-500 dark:text-primary-400 font-medium hover:underline"
                >
                  {t("signIn")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUpForm;
