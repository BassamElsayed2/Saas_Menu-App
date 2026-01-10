"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import {
  signupSchema,
  getZodErrorMessage,
} from "@/lib/validators/auth.validator";
import type { SignupFormData } from "@/lib/validators/auth.validator";
import { useAvailabilityCheck } from "@/hooks/useAvailabilityCheck";
import { FormInput } from "./FormInput";
import GoogleAuthButton from "./GoogleAuthButton";

/**
 * Sign Up Form Component
 * Features:
 * - Real-time email and phone availability checking
 * - Zod validation
 * - Password visibility toggle
 * - Loading states
 * - Accessibility support
 */
const SignUpForm: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const { signup } = useAuth();

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

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

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
      toast.error("البريد الإلكتروني مستخدم بالفعل");
      return;
    }

    if (phoneAvailable === false) {
      toast.error("رقم الهاتف مستخدم بالفعل");
      return;
    }

    // Prevent submission while checking
    if (checkingEmail || checkingPhone) {
      toast.error("الرجاء الانتظار حتى يتم التحقق من البيانات");
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
        toast.success("تم إنشاء الحساب بنجاح!");
        // Redirect directly to menus page (email verification disabled)
        router.push(`/${locale}/menus`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="auth-main-content bg-gradient-to-br from-white via-purple-50/30 to-white dark:from-[#0a0e19] dark:via-[#0f1525] dark:to-[#0a0e19] py-[60px] min-h-screen">
        <div className="mx-auto px-[12.5px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1255px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[50px] items-center">
            {/* Image Section */}
            <div className="hidden md:block xl:ltr:-mr-[25px] xl:rtl:-ml-[25px] 2xl:ltr:-mr-[45px] 2xl:rtl:-ml-[45px] rounded-[30px] order-2 lg:order-1 overflow-hidden shadow-2xl dark:shadow-black/50 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="relative">
                <Image
                  src="/images/sign-up.jpg"
                  alt="صورة التسجيل"
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
                    إنشاء حساب جديد
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    انضم إلينا اليوم وابدأ رحلتك معنا
                  </p>
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl border border-gray-100 dark:border-[#172036]">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Google Sign Up Button */}
                  <div className="mb-6">
                    <GoogleAuthButton mode="signup" />
                  </div>

                  {/* Divider */}
                  <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-200 dark:border-[#172036]"></div>
                    <span className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      أو أنشئ حساباً جديداً
                    </span>
                    <div className="flex-1 border-t border-gray-200 dark:border-[#172036]"></div>
                  </div>

                  {/* Name Field */}
                  <FormInput
                    label="الاسم الكامل"
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.name}
                    onChange={updateFormField("name")}
                    disabled={loading}
                    required
                  />

                  {/* Email Field */}
                  <FormInput
                    label="البريد الإلكتروني"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={updateFormField("email")}
                    disabled={loading}
                    required
                    isAvailable={emailAvailable}
                    isChecking={checkingEmail}
                    availableMessage="البريد الإلكتروني متاح ✓"
                    unavailableMessage="البريد الإلكتروني مستخدم بالفعل"
                  />

                  {/* Phone Field */}
                  <FormInput
                    label="رقم الهاتف"
                    type="tel"
                    placeholder="+010 **** **** "
                    value={formData.phoneNumber}
                    onChange={updateFormField("phoneNumber")}
                    disabled={loading}
                    required
                    isAvailable={phoneAvailable}
                    isChecking={checkingPhone}
                    availableMessage="رقم الهاتف متاح ✓"
                    unavailableMessage="رقم الهاتف مستخدم بالفعل"
                  />

                  {/* Password Field */}
                  <div className="mb-[15px]">
                    <FormInput
                      label="كلمة المرور"
                      type="password"
                      placeholder="8 أحرف (حرف كبير، صغير، رقم، رمز)"
                      value={formData.password}
                      onChange={updateFormField("password")}
                      disabled={loading}
                      required
                      minLength={8}
                      showToggle
                      onToggle={togglePasswordVisibility}
                      showValue={showPassword}
                    />

                    {/* Password Requirements Indicator */}
                    {formData.password && (
                      <div className="mt-3 p-4 bg-gray-50 dark:bg-[#172036]/50 rounded-xl border border-gray-200 dark:border-[#1f2a3e]">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          متطلبات كلمة المرور:
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs transition-all duration-200">
                            <i
                              className={`text-base transition-all duration-200 ${
                                passwordValidation.minLength
                                  ? "ri-checkbox-circle-fill text-green-500"
                                  : "ri-close-circle-fill text-red-500"
                              }`}
                            ></i>
                            <span
                              className={`transition-all duration-200 ${
                                passwordValidation.minLength
                                  ? "text-green-600 dark:text-green-400 font-medium"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              8 أحرف على الأقل
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs transition-all duration-200">
                            <i
                              className={`text-base transition-all duration-200 ${
                                passwordValidation.hasUpperCase
                                  ? "ri-checkbox-circle-fill text-green-500"
                                  : "ri-close-circle-fill text-red-500"
                              }`}
                            ></i>
                            <span
                              className={`transition-all duration-200 ${
                                passwordValidation.hasUpperCase
                                  ? "text-green-600 dark:text-green-400 font-medium"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              حرف كبير (A-Z)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs transition-all duration-200">
                            <i
                              className={`text-base transition-all duration-200 ${
                                passwordValidation.hasLowerCase
                                  ? "ri-checkbox-circle-fill text-green-500"
                                  : "ri-close-circle-fill text-red-500"
                              }`}
                            ></i>
                            <span
                              className={`transition-all duration-200 ${
                                passwordValidation.hasLowerCase
                                  ? "text-green-600 dark:text-green-400 font-medium"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              حرف صغير (a-z)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs transition-all duration-200">
                            <i
                              className={`text-base transition-all duration-200 ${
                                passwordValidation.hasNumber
                                  ? "ri-checkbox-circle-fill text-green-500"
                                  : "ri-close-circle-fill text-red-500"
                              }`}
                            ></i>
                            <span
                              className={`transition-all duration-200 ${
                                passwordValidation.hasNumber
                                  ? "text-green-600 dark:text-green-400 font-medium"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              رقم واحد (0-9)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs transition-all duration-200">
                            <i
                              className={`text-base transition-all duration-200 ${
                                passwordValidation.hasSpecialChar
                                  ? "ri-checkbox-circle-fill text-green-500"
                                  : "ri-close-circle-fill text-red-500"
                              }`}
                            ></i>
                            <span
                              className={`transition-all duration-200 ${
                                passwordValidation.hasSpecialChar
                                  ? "text-green-600 dark:text-green-400 font-medium"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              رمز خاص (@$!%*?&#...)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <FormInput
                    label="تأكيد كلمة المرور"
                    type="password"
                    placeholder="أعد إدخال كلمة المرور"
                    value={formData.confirmPassword}
                    onChange={updateFormField("confirmPassword")}
                    disabled={loading}
                    required
                    showToggle
                    onToggle={togglePasswordVisibility}
                    showValue={showPassword}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full h-[56px] rounded-xl font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary-500/30 disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98] mt-6"
                    disabled={loading || checkingEmail || checkingPhone}
                    aria-label="إنشاء حساب جديد"
                  >
                    <span className="flex items-center justify-center gap-2 text-base">
                      {loading ? (
                        <>
                          <i
                            className="ri-loader-4-line animate-spin text-xl"
                            aria-hidden="true"
                          ></i>
                          <span>جاري إنشاء الحساب...</span>
                        </>
                      ) : checkingEmail || checkingPhone ? (
                        <>
                          <i
                            className="ri-loader-4-line animate-spin text-xl"
                            aria-hidden="true"
                          ></i>
                          <span>جاري التحقق...</span>
                        </>
                      ) : (
                        <>
                          <i
                            className="ri-user-add-line text-xl"
                            aria-hidden="true"
                          ></i>
                          <span>إنشاء حساب</span>
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[#172036] text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    لديك حساب بالفعل؟{" "}
                    <Link
                      href={`/${locale}/authentication/sign-in`}
                      className="text-primary-500 dark:text-primary-400 font-semibold hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-200 hover:underline inline-flex items-center gap-1"
                    >
                      تسجيل الدخول
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

export default SignUpForm;
