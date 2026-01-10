"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import GoogleAuthButton from "./GoogleAuthButton";

const SignInForm: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const { login, user: contextUser } = useAuth();
  const t = useTranslations("SignIn");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t("fillAllFields"));
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);

      // Login successful
      toast.success(t("loginSuccess"));

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Navigate based on user role from login response
      if (result?.user?.role === "admin") {
        router.push(`/${locale}/admin`);
      } else {
        router.push(`/${locale}/menus`);
      }
    } catch (error: any) {
      console.error("❌ Login failed:", error);
      // Error is already handled by React Query hook with detailed toast message
      // The hook will show appropriate error messages based on error type:
      // - Account locked (with time remaining)
      // - Account suspended (with reason)
      // - Invalid password (with remaining attempts)
      // - Email not found
      // - Network errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-main-content bg-gradient-to-br from-white via-purple-50/30 to-white dark:from-[#0a0e19] dark:via-[#0f1525] dark:to-[#0a0e19] py-[60px] min-h-screen">
        <div className="mx-auto px-[12.5px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1255px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[50px] items-center">
            {/* Image Section */}
            <div className="hidden md:block xl:ltr:-mr-[25px] xl:rtl:-ml-[25px] 2xl:ltr:-mr-[45px] 2xl:rtl:-ml-[45px] rounded-[30px] order-2 lg:order-1 overflow-hidden shadow-2xl dark:shadow-black/50 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="relative">
                <Image
                  src="/images/sign-in.jpg"
                  alt="sign-in-image"
                  className="rounded-[30px] object-cover"
                  width={646}
                  height={804}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[30px]"></div>
              </div>
            </div>

            {/* Form Section */}
            <div className="xl:ltr:pl-[90px] xl:rtl:pr-[90px] 2xl:ltr:pl-[120px] 2xl:rtl:pr-[120px] order-1 lg:order-2 animate-fade-in">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  {/* Logo */}
                  <div className="transform hover:scale-105 transition-transform duration-200">
                    <Image
                      src="/images/ENS-copy.png"
                      alt="شعار الموقع"
                      className="inline-block drop-shadow-lg"
                      width={142}
                      height={38}
                      priority
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-300">
                    {t("title")}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    مرحباً بك مرة أخرى! يرجى تسجيل الدخول للمتابعة
                  </p>
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl border border-gray-100 dark:border-[#172036]">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Google Sign In Button */}
                  <div className="mb-6">
                    <GoogleAuthButton mode="signin" />
                  </div>

                  {/* Divider */}
                  <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-200 dark:border-[#172036]"></div>
                    <span className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t("orContinueWith")}
                    </span>
                    <div className="flex-1 border-t border-gray-200 dark:border-[#172036]"></div>
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {t("email")}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-4 rtl:pr-4 pointer-events-none">
                        <i className="ri-mail-line text-gray-400 dark:text-gray-500 text-lg"></i>
                      </div>
                      <input
                        type="email"
                        className="h-[56px] rounded-xl text-black dark:text-white border-2 border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] ltr:pl-12 rtl:pr-12 ltr:pr-4 rtl:pl-4 block w-full outline-0 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-500/30 group-hover:border-gray-300 dark:group-hover:border-[#1f2a3e]"
                        placeholder={t("emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="relative group">
                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {t("password")}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-4 rtl:pr-4 pointer-events-none">
                        <i className="ri-lock-password-line text-gray-400 dark:text-gray-500 text-lg"></i>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="h-[56px] rounded-xl text-black dark:text-white border-2 border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] ltr:pl-12 rtl:pr-12 ltr:pr-14 rtl:pl-14 block w-full outline-0 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-500/30 group-hover:border-gray-300 dark:group-hover:border-[#1f2a3e]"
                        placeholder={t("passwordPlaceholder")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#172036] focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword
                            ? "إخفاء كلمة المرور"
                            : "إظهار كلمة المرور"
                        }
                      >
                        <i
                          className={
                            showPassword ? "ri-eye-line" : "ri-eye-off-line"
                          }
                        ></i>
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  {/* <div className="flex justify-end">
                    <Link
                      href={`/${locale}/authentication/forgot-password`}
                      className="text-sm text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-200 hover:underline"
                    >
                      {t("forgotPassword")}
                    </Link>
                  </div> */}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full h-[56px] rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary-500/30 disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98] mt-6"
                    disabled={loading}
                  >
                    <span className="flex items-center justify-center gap-2 text-base">
                      {loading ? (
                        <>
                          <i className="ri-loader-4-line animate-spin text-xl"></i>
                          <span>{t("signingIn")}</span>
                        </>
                      ) : (
                        <>
                          <i className="ri-login-box-line text-xl"></i>
                          <span>{t("signInButton")}</span>
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[#172036] text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t("noAccount")}{" "}
                    <Link
                      href={`/${locale}/authentication/sign-up`}
                      className="text-primary-500 dark:text-primary-400 font-semibold hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-200 hover:underline inline-flex items-center gap-1"
                    >
                      {t("createAccount")}
                      <i className="ri-arrow-left-line rtl:rotate-180 text-sm"></i>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
