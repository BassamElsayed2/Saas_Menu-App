"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const SignUpForm: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    if (password.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }

    setLoading(true);

    const success = await signup(email, password, name);

    if (success) {
      router.push(`/${locale}/authentication/confirm-email`);
    }

    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="auth-main-content bg-white dark:bg-[#0a0e19] py-[60px] md:py-[80px] lg:py-[120px] xl:py-[135px]">
        <div className="mx-auto px-[12.5px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1255px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[25px] items-center">
            <div className="xl:ltr:-mr-[25px] xl:rtl:-ml-[25px] 2xl:ltr:-mr-[45px] 2xl:rtl:-ml-[45px] rounded-[25px] order-2 lg:order-1">
              <Image
                src="/images/sign-up.jpg"
                alt="sign-up-image"
                className="rounded-[25px]"
                width={646}
                height={804}
              />
            </div>

            <div className="xl:ltr:pl-[90px] xl:rtl:pr-[90px] 2xl:ltr:pl-[120px] 2xl:rtl:pr-[120px] order-1 lg:order-2">
              <Image
                src="/images/logo-big.svg"
                alt="logo"
                className="inline-block dark:hidden"
                width={142}
                height={38}
              />
              <Image
                src="/images/white-logo-big.svg"
                alt="logo"
                className="hidden dark:inline-block"
                width={142}
                height={38}
              />

              <div className="my-[17px] md:my-[25px]">
                <h1 className="!font-semibold !text-[22px] md:!text-xl lg:!text-2xl !mb-[5px] md:!mb-[7px]">
                  إنشاء حساب جديد
                </h1>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-[15px] relative">
                  <label className="mb-[10px] md:mb-[12px] text-black dark:text-white font-medium block">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    className="h-[55px] rounded-md text-black dark:text-white border border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500"
                    placeholder="أدخل اسمك الكامل"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="mb-[15px] relative">
                  <label className="mb-[10px] md:mb-[12px] text-black dark:text-white font-medium block">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="h-[55px] rounded-md text-black dark:text-white border border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500"
                    placeholder="example@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="mb-[15px] relative">
                  <label className="mb-[10px] md:mb-[12px] text-black dark:text-white font-medium block">
                    كلمة المرور
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="h-[55px] rounded-md text-black dark:text-white border border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500"
                    placeholder="8 أحرف على الأقل"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                    minLength={8}
                  />
                  <button
                    className="absolute text-lg ltr:right-[20px] rtl:left-[20px] bottom-[12px] transition-all hover:text-primary-500"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={
                        showPassword ? "ri-eye-line" : "ri-eye-off-line"
                      }
                    ></i>
                  </button>
                </div>

                <div className="mb-[15px] relative">
                  <label className="mb-[10px] md:mb-[12px] text-black dark:text-white font-medium block">
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="h-[55px] rounded-md text-black dark:text-white border border-gray-200 dark:border-[#172036] bg-white dark:bg-[#0c1427] px-[17px] block w-full outline-0 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-500"
                    placeholder="أعد إدخال كلمة المرور"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="md:text-md block w-full text-center transition-all rounded-md font-medium my-[20px] md:my-[25px] py-[12px] px-[25px] text-white bg-primary-500 hover:bg-primary-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <span className="flex items-center justify-center gap-[5px]">
                    {loading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin"></i>
                        جاري إنشاء الحساب...
                      </>
                    ) : (
                      <>
                        <i className="material-symbols-outlined">person_4</i>
                        إنشاء حساب
                      </>
                    )}
                  </span>
                </button>
              </form>

              <p>
                لديك حساب بالفعل؟{" "}
                <Link
                  href={`/${locale}/authentication/sign-in`}
                  className="text-primary-500 transition-all font-semibold hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
