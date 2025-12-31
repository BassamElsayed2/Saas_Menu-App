"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useMenu } from "@/hooks/useApi";
import { Checkbox } from "@headlessui/react";

export default function MenuSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const t = useTranslations("MenuSettings");
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === "ar";
  const { user, loading: authLoading } = useAuth();
  const { data: menu, isLoading: menuLoading } = useMenu(parseInt(id));

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    slug: "",
    theme: "default",
    isActive: true,
  });
  const [originalData, setOriginalData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    slug: "",
    theme: "default",
    isActive: true,
  });

  useEffect(() => {
    if (!authLoading && !menuLoading) {
      if (!user) {
        toast.error("يجب تسجيل الدخول أولاً");
        router.push(`/${locale}/authentication/sign-in`);
        return;
      }

      if (menu && menu.userId !== user.id) {
        toast.error("ليس لديك صلاحية للوصول لهذه القائمة");
        router.push(`/${locale}/menus`);
        return;
      }
    }
  }, [user, menu, authLoading, menuLoading, router, locale]);

  useEffect(() => {
    fetchMenuSettings();
  }, [id]);

  const fetchMenuSettings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menus/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const menu = data.data?.menu;
        if (menu) {
          const initialData = {
            nameEn: menu.nameEn || menu.name || "",
            nameAr: menu.nameAr || "",
            descriptionEn: menu.descriptionEn || menu.description || "",
            descriptionAr: menu.descriptionAr || "",
            slug: menu.slug || "",
            theme: menu.theme || "default",
            isActive: menu.isActive || false,
          };
          setFormData(initialData);
          setOriginalData(initialData);
        }
      }
    } catch (error) {
      console.error("Error fetching menu settings:", error);
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build update object with only changed fields
    const updates: any = {};

    if (formData.nameEn !== originalData.nameEn) {
      updates.nameEn = formData.nameEn;
    }
    if (formData.nameAr !== originalData.nameAr) {
      updates.nameAr = formData.nameAr;
    }
    if (formData.descriptionEn !== originalData.descriptionEn) {
      updates.descriptionEn = formData.descriptionEn;
    }
    if (formData.descriptionAr !== originalData.descriptionAr) {
      updates.descriptionAr = formData.descriptionAr;
    }
    if (formData.theme !== originalData.theme) {
      updates.theme = formData.theme;
    }
    if (formData.isActive !== originalData.isActive) {
      updates.isActive = formData.isActive;
    }

    // Only send request if there are changes
    if (Object.keys(updates).length === 0) {
      toast("لا توجد تغييرات لحفظها", { icon: "ℹ️" });
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) throw new Error("Failed to update menu");

      toast.success(t("saveSuccess"));
      // Update original data to reflect saved changes
      setOriginalData({ ...formData });
      router.push(`/${locale}/menus/${id}`);
    } catch (error) {
      console.error("Error saving menu settings:", error);
      toast.error(t("saveError"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(t("deleteConfirm"))) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menus/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete menu");

      toast.success(t("deleteSuccess"));
      router.push(`/${locale}/menus`);
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast.error(t("deleteError"));
    }
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 ltr:right-10 rtl:left-10 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 ltr:left-10 rtl:right-10 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push(`/${locale}/menus/${id}`)}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition group"
          >
            <i className={`ri-arrow-${isRTL ? 'right' : 'left'}-line text-xl transition-transform ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}></i>
            العودة للوحة التحكم
          </button>
        </div>

        {/* Header Card */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-xl dark:shadow-primary-500/5 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <i className="ri-settings-3-line text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("title")}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Settings */}
          <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <i className="ri-information-line text-primary-500"></i>
              {t("sections.general")}
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {t("fields.nameEn")} *
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {t("fields.nameAr")} *
                  </label>
                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    dir="rtl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t("fields.descriptionEn")}
                </label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t("fields.descriptionAr")}
                </label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t("fields.slug")} *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                    })
                  }
                  className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 font-mono focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("fields.slugHint")}
                </p>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <i className="ri-palette-line text-primary-500"></i>
              {t("sections.appearance")}
            </h2>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {t("fields.theme")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Classic Theme */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, theme: "classic" })}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all ${
                    formData.theme === "classic"
                      ? "border-primary-500 ring-2 ring-primary-500/20 shadow-lg shadow-primary-500/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-500/50"
                  }`}
                >
                  {/* Theme Preview */}
                  <div className="aspect-[4/3] bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-3">
                    <div className="h-full rounded-lg bg-white dark:bg-gray-800 shadow-sm p-2 flex flex-col">
                      <div className="w-8 h-2 bg-amber-400 rounded mb-2"></div>
                      <div className="flex-1 grid grid-cols-2 gap-1">
                        <div className="bg-amber-100 dark:bg-amber-900/30 rounded"></div>
                        <div className="bg-amber-100 dark:bg-amber-900/30 rounded"></div>
                        <div className="bg-amber-100 dark:bg-amber-900/30 rounded"></div>
                        <div className="bg-amber-100 dark:bg-amber-900/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                  {/* Theme Name */}
                  <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {t("themes.classic")}
                      </span>
                      {formData.theme === "classic" && (
                        <span className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-xs"></i>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      تصميم دافئ وأنيق
                    </p>
                  </div>
                </button>

                {/* Modern Theme */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, theme: "modern" })}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all ${
                    formData.theme === "modern"
                      ? "border-primary-500 ring-2 ring-primary-500/20 shadow-lg shadow-primary-500/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-500/50"
                  }`}
                >
                  {/* Theme Preview */}
                  <div className="aspect-[4/3] bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3">
                    <div className="h-full rounded-lg bg-white dark:bg-gray-800 shadow-sm p-2 flex flex-col">
                      <div className="w-8 h-2 bg-blue-500 rounded mb-2"></div>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="h-3 bg-blue-100 dark:bg-blue-900/30 rounded-full"></div>
                        <div className="flex-1 grid grid-cols-3 gap-1">
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg"></div>
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg"></div>
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Theme Name */}
                  <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {t("themes.modern")}
                      </span>
                      {formData.theme === "modern" && (
                        <span className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-xs"></i>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      تصميم عصري وبسيط
                    </p>
                  </div>
                </button>

                {/* Elegant Theme */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, theme: "elegant" })}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all ${
                    formData.theme === "elegant"
                      ? "border-primary-500 ring-2 ring-primary-500/20 shadow-lg shadow-primary-500/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-500/50"
                  }`}
                >
                  {/* Theme Preview */}
                  <div className="aspect-[4/3] bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3">
                    <div className="h-full rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 shadow-sm p-2 flex flex-col">
                      <div className="w-8 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded mb-2"></div>
                      <div className="flex-1 grid grid-cols-2 gap-1">
                        <div className="bg-purple-500/20 rounded border border-purple-500/30"></div>
                        <div className="bg-pink-500/20 rounded border border-pink-500/30"></div>
                        <div className="bg-pink-500/20 rounded border border-pink-500/30"></div>
                        <div className="bg-purple-500/20 rounded border border-purple-500/30"></div>
                      </div>
                    </div>
                  </div>
                  {/* Theme Name */}
                  <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {t("themes.elegant")}
                      </span>
                      {formData.theme === "elegant" && (
                        <span className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-xs"></i>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      تصميم فاخر وراقي
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Status Settings */}
          <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <i className="ri-toggle-line text-primary-500"></i>
              {t("sections.status")}
            </h2>

            <div className="flex items-start gap-3">
              <Checkbox
                checked={formData.isActive}
                onChange={(checked) => setFormData({ ...formData, isActive: checked })}
                className="group size-6 rounded-lg border-2 border-gray-300 dark:border-[#1e293b] bg-white dark:bg-[#0a0e19] data-[checked]:bg-primary-500 dark:data-[checked]:bg-primary-400 data-[checked]:border-primary-500 dark:data-[checked]:border-primary-400 transition-all cursor-pointer flex items-center justify-center mt-0.5"
              >
                <i className="ri-check-line text-white text-sm opacity-0 group-data-[checked]:opacity-100 transition-opacity"></i>
              </Checkbox>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer" onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}>
                  {t("fields.isActive")}
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t("fields.isActiveHint")}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("buttons.saving")}
                </>
              ) : (
                <>
                  <i className="ri-save-line text-xl"></i>
                  {t("buttons.save")}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/${locale}/menus/${id}`)}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium"
            >
              {t("buttons.cancel")}
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50/80 dark:bg-red-900/10 backdrop-blur-xl border-2 border-red-200 dark:border-red-800/50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
              <i className="ri-error-warning-line"></i>
              {t("dangerZone.title")}
            </h2>
            <p className="text-sm text-red-600 dark:text-red-300/80 mb-4">
              {t("dangerZone.description")}
            </p>
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30 transition-all font-medium flex items-center gap-2"
            >
              <i className="ri-delete-bin-line text-xl"></i>
              {t("dangerZone.deleteButton")}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
