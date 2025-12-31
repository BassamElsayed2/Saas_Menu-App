"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useMenus, useCreateMenu, useDeleteMenu } from "@/hooks/useApi";
import api from "@/lib/api";
import { getMenuPublicUrl } from "@/lib/menuUrl";
import toast from "react-hot-toast";
import Image from "next/image";

interface Menu {
  id: number;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  logoUrl: string | null;
  createdAt: string;
}

export default function MenusPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Menus");
  const isRTL = locale === "ar";
  const [showCreateModal, setShowCreateModal] = useState(false);

  // React Query hooks
  const { data: menus = [], isLoading: loadingMenus } = useMenus();
  const deleteMenu = useDeleteMenu();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/authentication/sign-in`);
    }
  }, [user, loading, router, locale]);

  const handleToggleStatus = async (menuId: number, currentStatus: boolean) => {
    try {
      const result = await api.patch(`/menus/${menuId}/status`, {
        isActive: !currentStatus,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(currentStatus ? t("menuPaused") : t("menuActivated"));
      window.location.reload();
    } catch (error) {
      console.error("Error toggling menu status:", error);
      toast.error(t("toggleError"));
    }
  };

  const handleDelete = async (menuId: number) => {
    if (!confirm(t("deleteConfirm"))) return;
    await deleteMenu.mutateAsync(menuId);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400">{t("loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 ltr:right-10 rtl:left-10 w-72 h-72 bg-gradient-to-tr from-primary-400/20 to-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 ltr:left-10 rtl:right-10 w-96 h-96 bg-gradient-to-tr from-primary-500/5 to-primary-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {t("title")}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">
                {t("subtitle")}
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2 shadow-lg shadow-primary-500/25 font-medium"
            >
              <i className="ri-add-line text-xl"></i>
              {t("createMenu")}
            </button>
          </div>
        </div>

        {loadingMenus ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-4">{t("loading") || "Loading menus..."}</p>
          </div>
        ) : menus.length === 0 ? (
          <div className="bg-white/90 dark:bg-[#0c1427]/90 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-restaurant-line text-4xl text-primary-500 dark:text-primary-400"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t("noMenus")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {t("getStarted")}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all shadow-lg shadow-primary-500/25 font-medium inline-flex items-center gap-2"
            >
              <i className="ri-add-line text-xl"></i>
              {t("createFirst")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((menu: Menu) => (
              <div
                key={menu.id}
                className="group bg-white/90 dark:bg-[#0c1427]/90 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                      <i className="ri-restaurant-line text-white text-lg"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {menu.name}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      menu.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {menu.isActive ? t("active") : t("inactive")}
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 min-h-[40px]">
                  {menu.description || t("noDescription")}
                </p>

                <div className="mb-4 p-3 bg-gray-50 dark:bg-[#0a0e19] rounded-xl space-y-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <i className="ri-link text-primary-500"></i>
                    <span className="font-mono text-gray-700 dark:text-gray-300">{menu.slug}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <i className="ri-calendar-line text-primary-500"></i>
                    {new Date(menu.createdAt).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US")}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/${locale}/menus/${menu.id}`)}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <i className="ri-dashboard-line"></i>
                    {t("openDashboard")}
                  </button>
                  <button
                    onClick={() => handleToggleStatus(menu.id, menu.isActive)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-[#0a0e19] text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    title={menu.isActive ? t("deactivate") : t("activate")}
                  >
                    <i className={`ri-${menu.isActive ? "pause" : "play"}-line text-lg`}></i>
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="w-10 h-10 flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    title={t("delete")}
                  >
                    <i className="ri-delete-bin-line text-lg"></i>
                  </button>
                </div>

                <a
                  href={getMenuPublicUrl(menu.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-3 px-4 py-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors text-sm font-medium"
                >
                  <i className="ri-external-link-line"></i>
                  {t("viewPublic")}
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Menu Modal */}
      {showCreateModal && (
        <CreateMenuModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

interface CreateMenuModalProps {
  onClose: () => void;
}

function CreateMenuModal({ onClose }: CreateMenuModalProps) {
  const t = useTranslations("Menus.createModal");
  const [formData, setFormData] = useState({
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    slug: "",
    logo: null as File | null,
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [slugStatus, setSlugStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    suggestions: string[];
  }>({
    checking: false,
    available: null,
    suggestions: [],
  });

  const createMenu = useCreateMenu();

  // Debounced slug check
  useEffect(() => {
    if (!formData.slug || formData.slug.length < 3) {
      setSlugStatus({ checking: false, available: null, suggestions: [] });
      return;
    }

    const timeoutId = setTimeout(async () => {
      setSlugStatus({ checking: true, available: null, suggestions: [] });
      try {
        const result = await api.checkSlugAvailability(formData.slug);
        if (result.error) {
          setSlugStatus({ checking: false, available: false, suggestions: [] });
        } else if (result.data && typeof result.data === 'object') {
          setSlugStatus({
            checking: false,
            available: (result.data as any).available ?? false,
            suggestions: (result.data as any).suggestions ?? [],
          });
        } else {
          setSlugStatus({ checking: false, available: null, suggestions: [] });
        }
      } catch (error) {
        console.error("Error checking slug:", error);
        setSlugStatus({ checking: false, available: null, suggestions: [] });
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [formData.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check slug availability before submitting
    if (formData.slug && slugStatus.available === false) {
      toast.error("هذا الرابط مستخدم بالفعل. يرجى اختيار رابط آخر.");
      return;
    }

    try {
      let logoUrl = null;

      // Upload logo if exists
      if (formData.logo) {
        setUploadingLogo(true);
        const uploadResult = await api.uploadImage(formData.logo, "logos");
        if (uploadResult.error) {
          toast.error(uploadResult.error);
          setUploadingLogo(false);
          return;
        }
        // Get full URL if relative path
        const url = uploadResult.data?.url || null;
        logoUrl =
          url && !url.startsWith("http")
            ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${url}`
            : url;
        setUploadingLogo(false);
      }

      // Transform data to match backend expectations
      const menuData = {
        nameEn: formData.name,
        nameAr: formData.nameAr,
        descriptionEn: formData.description,
        descriptionAr: formData.descriptionAr,
        slug: formData.slug,
        logo: logoUrl,
      };

      await createMenu.mutateAsync(menuData);
      onClose();
    } catch (error) {
      // Error handled by React Query hook
      setUploadingLogo(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData({ ...formData, slug: suggestion });
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("يجب اختيار ملف صورة");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    setFormData({ ...formData, logo: file });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setFormData({ ...formData, logo: null });
    setLogoPreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 dark:bg-[#0c1427]/95 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/20 rounded-2xl shadow-2xl max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50 dark:border-primary-500/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <i className="ri-restaurant-line text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("title")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <i className="ri-close-line text-xl text-gray-500 dark:text-gray-400"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Names Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <i className="ri-price-tag-3-line text-xl text-primary-500 dark:text-primary-400"></i>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("menuNames")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                  <i className="ri-global-line text-primary-500 dark:text-primary-400"></i>
                  {t("nameEn")} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-12 w-full rounded-xl bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all"
                  placeholder="e.g., My Restaurant Menu"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                  <i className="ri-translate-2 text-primary-500 dark:text-primary-400"></i>
                  {t("nameAr")} *
                </label>
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData({ ...formData, nameAr: e.target.value })
                  }
                  className="h-12 w-full rounded-xl bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all"
                  placeholder="مثال: قائمة مطعمي"
                  dir="rtl"
                  required
                />
              </div>
            </div>
          </div>

          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <i className="ri-image-line text-xl text-primary-500 dark:text-primary-400"></i>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("logo") || "شعار القائمة"}
              </h3>
            </div>

            <div className="space-y-2">
              <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                <i className="ri-upload-cloud-line text-primary-500 dark:text-primary-400"></i>
                {t("logoUpload") || "رفع الشعار"}{" "}
                <span className="text-gray-400 text-xs">(اختياري)</span>
              </label>

              {logoPreview ? (
                <div className="relative inline-block">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-[#1e293b] shadow-lg">
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="absolute -top-2 ltr:-right-2 rtl:-left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <i className="ri-close-line text-sm"></i>
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 dark:border-[#1e293b] rounded-xl cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors bg-gray-50 dark:bg-[#0a0e19]">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <i className="ri-upload-cloud-2-line text-4xl text-gray-400 dark:text-gray-500 mb-2"></i>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">انقر للرفع</span> أو
                        اسحب الصورة هنا
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        PNG, JPG, WEBP (حد أقصى 5 ميجابايت)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoChange}
                      disabled={uploadingLogo}
                    />
                  </label>
                </div>
              )}

              {uploadingLogo && (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  جاري رفع الصورة...
                </p>
              )}

              <p className="text-xs text-gray-400 dark:text-gray-500">
                {t("logoHint") ||
                  "سيتم استخدام هذه الصورة كـ favicon للصفحة العامة للمنيو"}
              </p>
            </div>
          </div>

          {/* Descriptions Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <i className="ri-file-text-line text-xl text-primary-500 dark:text-primary-400"></i>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("descriptions")}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                  <i className="ri-global-line text-primary-500 dark:text-primary-400"></i>
                  {t("descriptionEn")}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-xl bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all resize-none"
                  placeholder="Describe your menu in English..."
                />
              </div>

              <div className="space-y-2">
                <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                  <i className="ri-translate-2 text-primary-500 dark:text-primary-400"></i>
                  {t("descriptionAr")}
                </label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionAr: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-xl bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all resize-none"
                  placeholder="اكتب وصف القائمة بالعربية..."
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Slug Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <i className="ri-link text-xl text-primary-500 dark:text-primary-400"></i>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("urlSettings")}
              </h3>
            </div>

            <div className="space-y-2">
              <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                <i className="ri-link text-primary-500 dark:text-primary-400"></i>
                {t("slug")} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, "-"),
                    })
                  }
                  className={`h-12 w-full rounded-xl bg-gray-50 dark:bg-[#0a0e19] border px-4 ltr:pr-12 rtl:pl-12 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 outline-none transition-all font-mono ${
                    slugStatus.available === false
                      ? "border-red-300 dark:border-red-600 focus:ring-red-500/20"
                      : slugStatus.available === true
                      ? "border-green-300 dark:border-green-600 focus:ring-green-500/20"
                      : "border-gray-200 dark:border-[#1e293b] focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500/20"
                  }`}
                  placeholder="my-restaurant-menu"
                  required
                />
                {slugStatus.checking && (
                  <div className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {!slugStatus.checking && slugStatus.available === true && (
                  <div className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2">
                    <i className="ri-checkbox-circle-fill text-xl text-green-500"></i>
                  </div>
                )}
                {!slugStatus.checking && slugStatus.available === false && (
                  <div className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2">
                    <i className="ri-close-circle-fill text-xl text-red-500"></i>
                  </div>
                )}
              </div>

              {/* Status Message */}
              {slugStatus.checking && (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  جاري التحقق من الرابط...
                </p>
              )}
              {!slugStatus.checking && slugStatus.available === true && (
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i>
                  هذا الرابط متاح
                </p>
              )}
              {!slugStatus.checking && slugStatus.available === false && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <i className="ri-close-circle-line"></i>
                  هذا الرابط مستخدم بالفعل
                </p>
              )}

              {/* Suggestions */}
              {!slugStatus.checking &&
                slugStatus.available === false &&
                slugStatus.suggestions.length > 0 && (
                  <div className="p-3 bg-gray-50 dark:bg-[#0a0e19] rounded-xl border border-gray-200 dark:border-[#1e293b]">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <i className="ri-lightbulb-line text-primary-500"></i>
                      اقتراحات مشابهة:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {slugStatus.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1.5 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600 text-gray-700 dark:text-gray-300 transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <div className="flex items-start gap-2">
                  <i className="ri-information-line text-blue-500 dark:text-blue-400 text-lg mt-0.5"></i>
                  <div className="flex-1">
                    <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">
                      {t("slugHint")}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                      {formData.slug
                        ? `${formData.slug}.yoursite.com`
                        : "your-slug.yoursite.com"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200/50 dark:border-primary-500/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={createMenu.isPending}
            >
              <i className="ri-close-line text-xl"></i>
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.01] transition-all font-medium shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              disabled={createMenu.isPending || uploadingLogo}
            >
              {createMenu.isPending ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-xl"></i>
                  {t("creating")}
                </>
              ) : (
                <>
                  <i className="ri-add-circle-line text-xl"></i>
                  {t("create")}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
