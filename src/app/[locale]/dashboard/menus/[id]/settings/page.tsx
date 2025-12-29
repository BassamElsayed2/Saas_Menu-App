"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "react-hot-toast";
import { templates } from "@/components/Templates";

export default function MenuSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const t = useTranslations("MenuSettings");
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuSlug, setMenuSlug] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "appearance">(
    "general"
  );
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
    fetchMenuSettings();
  }, [id]);

  const fetchMenuSettings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Fetching menu with ID:", id);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menus/${id}?locale=${locale}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Full API Response:", data);

        // البيانات تأتي مباشرة في data.menu وليس data.data.menu
        const menu = data.menu;
        console.log("Menu data extracted:", menu);

        if (menu && menu.id) {
          // استخدام الاسم المترجم للعرض
          const displayName =
            locale === "ar"
              ? menu.nameAr || menu.name || ""
              : menu.nameEn || menu.name || "";
          setMenuName(displayName);
          setMenuSlug(menu.slug || null);

          const initialData = {
            nameEn: menu.nameEn || "",
            nameAr: menu.nameAr || "",
            descriptionEn: menu.descriptionEn || "",
            descriptionAr: menu.descriptionAr || "",
            slug: menu.slug || "",
            theme: menu.theme || "default",
            isActive: menu.isActive !== undefined ? menu.isActive : true,
          };
          console.log("Form data set:", initialData);
          setFormData(initialData);
          setOriginalData(initialData);
        } else {
          console.error("Menu data is invalid or missing ID");
          toast.error("لا يمكن تحميل بيانات القائمة");
        }
      } else {
        const errorText = await response.text();
        console.error("Response not OK:", errorText);
        toast.error("خطأ في تحميل البيانات");
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
      router.push(`/${locale}/dashboard/menus/${id}`);
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
      router.push(`/${locale}/dashboard/menus`);
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast.error(t("deleteError"));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => router.push(`/${locale}/dashboard/menus`)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <i className="material-symbols-outlined">arrow_back</i>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {menuName || t("title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-6 border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex">
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`flex-1 px-6 py-4 font-semibold text-base transition-all flex items-center justify-center gap-2 ${
              activeTab === "general"
                ? "bg-primary-500 text-white shadow-lg"
                : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <i className="material-symbols-outlined !text-[24px]">settings</i>
            <span>الإعدادات العامة</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("appearance")}
            className={`flex-1 px-6 py-4 font-semibold text-base transition-all flex items-center justify-center gap-2 ${
              activeTab === "appearance"
                ? "bg-primary-500 text-white shadow-lg"
                : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <i className="material-symbols-outlined !text-[24px]">palette</i>
            <span>الشكل والتصميم</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Tab Content */}
        {activeTab === "general" && (
          <>
            {/* General Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <i className="material-symbols-outlined text-primary-500">
                  info
                </i>
                {t("sections.general")}
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <i className="material-symbols-outlined !text-[18px] text-primary-500">
                        language
                      </i>
                      {t("fields.nameEn")}
                    </label>
                    <input
                      type="text"
                      value={formData.nameEn}
                      onChange={(e) =>
                        setFormData({ ...formData, nameEn: e.target.value })
                      }
                      className="form-input"
                      placeholder="Restaurant Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <i className="material-symbols-outlined !text-[18px] text-primary-500">
                        translate
                      </i>
                      {t("fields.nameAr")}
                    </label>
                    <input
                      type="text"
                      value={formData.nameAr}
                      onChange={(e) =>
                        setFormData({ ...formData, nameAr: e.target.value })
                      }
                      className="form-input"
                      dir="rtl"
                      placeholder="اسم المطعم"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <i className="material-symbols-outlined !text-[18px] text-primary-500">
                      description
                    </i>
                    {t("fields.descriptionEn")}
                  </label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionEn: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white resize-none transition-colors"
                    placeholder="Describe your menu in English..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <i className="material-symbols-outlined !text-[18px] text-primary-500">
                      article
                    </i>
                    {t("fields.descriptionAr")}
                  </label>
                  <textarea
                    value={formData.descriptionAr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionAr: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white resize-none transition-colors"
                    dir="rtl"
                    placeholder="صف قائمتك بالعربية..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <i className="material-symbols-outlined !text-[18px] text-blue-500">
                      link
                    </i>
                    {t("fields.slug")}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.slug}
                      className="form-input pl-12 cursor-not-allowed"
                      disabled
                    />
                    <i className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-[20px]">
                      lock
                    </i>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
                      <i className="material-symbols-outlined !text-[16px]">
                        info
                      </i>
                      {t("fields.slugHint")} - لا يمكن تغيير الرابط بعد الإنشاء
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <i className="material-symbols-outlined text-green-500">
                  toggle_on
                </i>
                {t("sections.status")}
              </h2>

              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="w-6 h-6 text-green-500 rounded-lg focus:ring-2 focus:ring-green-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="isActive"
                      className="text-base font-semibold text-gray-900 dark:text-white cursor-pointer flex items-center gap-2"
                    >
                      <i className="material-symbols-outlined !text-[20px] text-green-500">
                        {formData.isActive ? "check_circle" : "cancel"}
                      </i>
                      {t("fields.isActive")}
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t("fields.isActiveHint")}
                    </p>
                    {!formData.isActive && (
                      <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-2">
                        <p className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1">
                          <i className="material-symbols-outlined !text-[14px]">
                            warning
                          </i>
                          القائمة غير مرئية للعملاء حالياً
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border-2 border-red-300 dark:border-red-700 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="material-symbols-outlined text-white !text-[28px]">
                    warning
                  </i>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2 flex items-center gap-2">
                    {t("dangerZone.title")}
                  </h2>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    {t("dangerZone.description")}
                  </p>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-semibold"
                  >
                    <i className="material-symbols-outlined !text-[20px]">
                      delete
                    </i>
                    {t("dangerZone.deleteButton")}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Appearance Tab Content */}
        {activeTab === "appearance" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <i className="material-symbols-outlined text-purple-500">
                palette
              </i>
              اختر تصميم القائمة
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => {
                const isSelected = formData.theme === template.id;
                return (
                  <div
                    key={template.id}
                    onClick={() =>
                      setFormData({ ...formData, theme: template.id })
                    }
                    className={`relative group cursor-pointer rounded-xl overflow-hidden border-4 transition-all duration-300 ${
                      isSelected
                        ? "border-primary-500 shadow-2xl scale-105"
                        : "border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:shadow-xl"
                    }`}
                  >
                    {/* Preview Image/Placeholder */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
                      {/* Template Preview Mockup */}
                      <div className="absolute inset-0 p-4 flex flex-col">
                        {/* Header */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3 mb-3 shadow-md">
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                        {/* Content Grid/List based on template */}
                        {template.id === "default" && (
                          <div className="grid grid-cols-3 gap-2 flex-1">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="bg-white dark:bg-gray-900 rounded-md shadow-sm"
                              ></div>
                            ))}
                          </div>
                        )}
                        {template.id === "template2" && (
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className="bg-white dark:bg-gray-900 rounded-md shadow-sm"
                              ></div>
                            ))}
                          </div>
                        )}
                        {template.id === "template3" && (
                          <div className="space-y-2 flex-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className="bg-white dark:bg-gray-900 rounded-md shadow-sm h-16"
                              ></div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                          <i className="material-symbols-outlined !text-[16px]">
                            check_circle
                          </i>
                          محدد
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div
                        className={`absolute inset-0 bg-primary-500/10 backdrop-blur-[1px] transition-opacity duration-300 ${
                          isSelected
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      ></div>
                    </div>

                    {/* Template Info */}
                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {locale === "ar" ? template.nameAr : template.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {locale === "ar"
                          ? template.descriptionAr
                          : template.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <i className="material-symbols-outlined text-blue-500 !text-[24px] mt-0.5">
                  lightbulb
                </i>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                    نصيحة
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    اضغط على أي تصميم لمعاينته. التصميم المحدد سيظهر مباشرة في
                    قائمتك العامة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-semibold text-lg"
          >
            {saving ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                {t("buttons.saving")}
              </>
            ) : (
              <>
                <i className="material-symbols-outlined !text-[24px]">save</i>
                {t("buttons.save")}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/${locale}/dashboard/menus/${id}`)}
            className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
          >
            <i className="material-symbols-outlined !text-[24px]">close</i>
            {t("buttons.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}
