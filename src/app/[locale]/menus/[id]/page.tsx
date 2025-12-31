"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useMenu } from "@/hooks/useApi";
import { getMenuPublicUrl } from "@/lib/menuUrl";
import toast from "react-hot-toast";

interface MenuStats {
  totalItems: number;
  activeItems: number;
  categories: number;
  views: number;
}

export default function MenuDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const t = useTranslations("MenuDashboard");
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === "ar";
  const { user, loading: authLoading } = useAuth();
  const { data: menu, isLoading: menuLoading, error } = useMenu(parseInt(id));
  
  const [loading, setLoading] = useState(true);
  const [menuName, setMenuName] = useState("");
  const [stats, setStats] = useState<MenuStats>({
    totalItems: 0,
    activeItems: 0,
    categories: 0,
    views: 0,
  });

  useEffect(() => {
    if (!authLoading && !menuLoading) {
      if (!user) {
        toast.error(t("loginRequired"));
        router.push(`/${locale}/authentication/sign-in`);
        return;
      }

      if (menu && menu.userId !== user.id) {
        toast.error(t("noPermission"));
        router.push(`/${locale}/menus`);
        return;
      }
    }
  }, [user, menu, authLoading, menuLoading, router, locale]);

  useEffect(() => {
    fetchMenuData();
  }, [id]);

  const fetchMenuData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menus/${id}?locale=${locale}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMenuName(data.data?.menu?.name || "");
        setStats({
          totalItems: data.data?.itemsCount || 0,
          activeItems: data.data?.activeItemsCount || 0,
          categories: data.data?.categoriesCount || 0,
          views: data.data?.views || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || authLoading || menuLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 dark:text-gray-400 animate-pulse">{t("loading")}</p>
        </div>
      </div>
    );
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
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push(`/${locale}/menus`)}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition group"
          >
            <i className={`ri-arrow-${isRTL ? 'right' : 'left'}-line text-xl transition-transform ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}></i>
            {t("backToMenus")}
          </button>
        </div>

        {/* Header Card */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-xl dark:shadow-primary-500/5 p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {menuName}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {t("subtitle")}
              </p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/menus/${id}/items`}
                className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center gap-2 font-medium"
              >
                <i className="ri-restaurant-line text-lg"></i>
                {t("manageItems")}
              </Link>
              <Link
                href={`/${locale}/menus/${id}/categories`}
                className="px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2 font-medium border border-gray-200 dark:border-gray-700"
              >
                <i className="ri-folder-line text-lg"></i>
                {t("categories")}
              </Link>
              <Link
                href={`/${locale}/menus/${id}/settings`}
                className="px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2 font-medium border border-gray-200 dark:border-gray-700"
              >
                <i className="ri-settings-3-line text-lg"></i>
                {t("settings")}
              </Link>
              {menu?.slug && (
                <a
                  href={getMenuPublicUrl(menu.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-all flex items-center gap-2 font-medium"
                >
                  <i className="ri-external-link-line text-lg"></i>
                  {t("viewPublic")}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Items */}
          <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t("stats.totalItems")}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalItems}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <i className="ri-restaurant-line text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Active Items */}
          <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t("stats.activeItems")}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.activeItems}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <i className="ri-checkbox-circle-line text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t("stats.categories")}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.categories}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <i className="ri-folder-line text-white text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Views */}
          <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t("stats.views")}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.views}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <i className="ri-eye-line text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href={`/${locale}/menus/${id}/items`}
            className="group bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <i className="ri-restaurant-line text-white text-3xl"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors">
                  {t("quickLinks.items")}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("quickLinks.itemsDesc")}
                </p>
              </div>
              <i className={`ri-arrow-${isRTL ? 'left' : 'right'}-line text-gray-400 group-hover:text-primary-500 text-xl transition-colors`}></i>
            </div>
          </Link>

          <Link
            href={`/${locale}/menus/${id}/settings`}
            className="group bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <i className="ri-settings-3-line text-white text-3xl"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors">
                  {t("quickLinks.settings")}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("quickLinks.settingsDesc")}
                </p>
              </div>
              <i className={`ri-arrow-${isRTL ? 'left' : 'right'}-line text-gray-400 group-hover:text-primary-500 text-xl transition-colors`}></i>
            </div>
          </Link>

          {menu?.slug && (
            <a
              href={getMenuPublicUrl(menu.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                  <i className="ri-global-line text-white text-3xl"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors">
                    {t("quickLinks.preview")}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("quickLinks.previewDesc")}
                  </p>
                </div>
                <i className="ri-external-link-line text-gray-400 group-hover:text-primary-500 text-xl transition-colors"></i>
              </div>
            </a>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <i className="ri-history-line text-primary-500"></i>
            {t("recentActivity.title")}
          </h2>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <i className="ri-history-line text-4xl text-gray-400"></i>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              {t("recentActivity.noActivity")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
