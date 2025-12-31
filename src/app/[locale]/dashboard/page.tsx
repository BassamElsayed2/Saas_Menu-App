"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const t = useTranslations("Dashboard");

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/authentication/sign-in`);
    }
  }, [user, loading, router, locale]);

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      router.push(`/${locale}/authentication/sign-in`);
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 animate-pulse">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 ltr:right-10 rtl:left-10 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 ltr:left-10 rtl:right-10 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Card */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-xl dark:shadow-primary-500/5 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <i className="ri-dashboard-3-line text-white text-2xl"></i>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {t("title")}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {user.name || user.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all font-medium flex items-center gap-2"
            >
              <i className="ri-logout-box-r-line text-lg"></i>
              {t("logout")}
            </button>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-2xl shadow-xl shadow-primary-500/20 p-6 md:p-8 mb-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <i className="ri-hand-heart-line text-white text-2xl"></i>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {t("welcomeBack")}, {user.name}!
                </h2>
                <p className="text-white/80 text-sm">
                  {t("role")}: <span className="font-medium">{user.role}</span>
                </p>
              </div>
            </div>
            <p className="text-white/90 flex items-center gap-2">
              <i className="ri-mail-line"></i>
              {user.email}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Menus */}
          <div className="group bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t("stats.totalMenus")}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  0
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <i className="ri-file-list-3-line text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Active Menus */}
          <div className="group bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t("stats.activeMenus")}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  0
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <i className="ri-checkbox-circle-line text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Total Views */}
          <div className="group bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t("stats.totalViews")}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  0
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <i className="ri-eye-line text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <i className="ri-flashlight-line text-primary-500"></i>
            {t("quickActions.title")}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Manage Menus */}
            <Link
              href={`/${locale}/menus`}
              className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-2 border-blue-200/50 dark:border-blue-500/20 rounded-2xl hover:border-blue-400 dark:hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <i className="ri-restaurant-line text-white text-3xl"></i>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {t("quickActions.manageMenus")}
              </span>
            </Link>

            {/* View Profile */}
            <Link
              href={`/${locale}/dashboard/profile/user-profile`}
              className="group p-6 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-2 border-green-200/50 dark:border-green-500/20 rounded-2xl hover:border-green-400 dark:hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/10 transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <i className="ri-user-line text-white text-3xl"></i>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {t("quickActions.viewProfile")}
              </span>
            </Link>

            {/* Analytics - Coming Soon */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border-2 border-purple-200/50 dark:border-purple-500/20 rounded-2xl text-center opacity-60 cursor-not-allowed relative overflow-hidden">
              <div className="absolute top-2 ltr:right-2 rtl:left-2 px-2 py-1 bg-purple-500 text-white text-xs font-medium rounded-full">
                قريباً
              </div>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <i className="ri-bar-chart-box-line text-white text-3xl"></i>
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {t("quickActions.analytics")}
              </span>
            </div>

            {/* Settings - Coming Soon */}
            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 border-2 border-orange-200/50 dark:border-orange-500/20 rounded-2xl text-center opacity-60 cursor-not-allowed relative overflow-hidden">
              <div className="absolute top-2 ltr:right-2 rtl:left-2 px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                قريباً
              </div>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <i className="ri-settings-3-line text-white text-3xl"></i>
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {t("quickActions.settings")}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/${locale}/menus`}
            className="group bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                <i className="ri-restaurant-line text-white text-2xl"></i>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  إدارة القوائم
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  عرض وإدارة جميع قوائمك
                </p>
              </div>
              <i className={`ri-arrow-${isRTL ? 'left' : 'right'}-line text-xl text-gray-400 group-hover:text-primary-500 transition-colors`}></i>
            </div>
          </Link>

          <Link
            href={`/${locale}/dashboard/profile/user-profile`}
            className="group bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <i className="ri-user-settings-line text-white text-2xl"></i>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  الملف الشخصي
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  تعديل معلوماتك الشخصية
                </p>
              </div>
              <i className={`ri-arrow-${isRTL ? 'left' : 'right'}-line text-xl text-gray-400 group-hover:text-primary-500 transition-colors`}></i>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
