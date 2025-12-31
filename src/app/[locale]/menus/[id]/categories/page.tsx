"use client";

import React, { useState, useEffect, use, Fragment } from "react";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useMenu, useCategories, useDeleteCategory, useCategory, useCreateCategory, useUpdateCategory } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import api from "@/lib/api";

interface Category {
  id: number;
  name: string;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function CategoriesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("Categories");
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === "ar";
  const { user, loading: authLoading } = useAuth();
  const { data: menu, isLoading: menuLoading } = useMenu(parseInt(id));
  const { data: categories = [], isLoading: categoriesLoading } = useCategories(parseInt(id));
  const deleteCategory = useDeleteCategory(parseInt(id));

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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

  const handleDelete = async (categoryId: number) => {
    if (!confirm(t("deleteConfirm"))) return;

    try {
      await deleteCategory.mutateAsync(categoryId);
    } catch (error: any) {
      console.error("Error deleting category:", error);
    }
  };

  const loading = authLoading || menuLoading || categoriesLoading;

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

      <div className="container mx-auto px-4 py-8 relative z-10">
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t("title")}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {t("subtitle")}
              </p>
            </div>
            <button
              onClick={() => {
                setEditingCategory(null);
                setShowForm(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all flex items-center gap-2 font-semibold"
            >
              <i className="ri-add-line text-xl"></i>
              {t("addCategory")}
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-xl dark:shadow-primary-500/5 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
              <i className="ri-folder-line text-5xl text-primary-500 dark:text-primary-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t("noCategories")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {t("getStarted")}
            </p>
            <button
              onClick={() => {
                setEditingCategory(null);
                setShowForm(true);
              }}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all font-semibold inline-flex items-center gap-2"
            >
              <i className="ri-add-line text-xl"></i>
              {t("createFirst")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: Category) => (
              <div
                key={category.id}
                className="group bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 hover:shadow-xl hover:-translate-y-1 transition-all p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  {category.image ? (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-folder-line text-3xl text-gray-400"></i>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate group-hover:text-primary-500 transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t("sortOrder")}: {category.sortOrder}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    category.isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}>
                    {category.isActive ? t("active") : t("inactive")}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setShowForm(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all font-medium"
                  >
                    <i className="ri-edit-line text-lg"></i>
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all font-medium"
                  >
                    <i className="ri-delete-bin-line text-lg"></i>
                    {t("delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Form Modal */}
      <CategoryFormModal
        isOpen={showForm}
        menuId={id}
        category={editingCategory}
        onClose={() => {
          setShowForm(false);
          setEditingCategory(null);
        }}
        onSuccess={() => {
          setShowForm(false);
          setEditingCategory(null);
        }}
      />
    </main>
  );
}

interface CategoryFormModalProps {
  isOpen: boolean;
  menuId: string;
  category: Category | null;
  onClose: () => void;
  onSuccess: () => void;
}

function CategoryFormModal({ isOpen, menuId, category, onClose, onSuccess }: CategoryFormModalProps) {
  const t = useTranslations("Categories");
  const locale = useLocale();
  const { data: categoryData } = useCategory(parseInt(menuId), category?.id || 0);
  const createCategory = useCreateCategory(parseInt(menuId));
  const updateCategory = useUpdateCategory(parseInt(menuId), category?.id || 0);
  
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    image: "",
    sortOrder: 0,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (categoryData) {
      setFormData({
        nameAr: categoryData.nameAr || "",
        nameEn: categoryData.nameEn || "",
        image: categoryData.image || "",
        sortOrder: categoryData.sortOrder || 0,
      });
    } else if (!category) {
      setFormData({
        nameAr: "",
        nameEn: "",
        image: "",
        sortOrder: 0,
      });
    }
  }, [categoryData, category]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        nameAr: "",
        nameEn: "",
        image: "",
        sortOrder: 0,
      });
    }
  }, [isOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await api.uploadImage(file, "logos");
      if (result.error) throw new Error(result.error);
      setFormData({ ...formData, image: result.data?.url || "" });
      toast.success(t("imageUploadSuccess"));
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error(error.message || t("imageUploadError"));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (category) {
        await updateCategory.mutateAsync(formData);
      } else {
        await createCategory.mutateAsync(formData);
      }
      onSuccess();
    } catch (error: any) {
      console.error("Error saving category:", error);
    }
  };

  const saving = createCategory.isPending || updateCategory.isPending;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-lg transform transition-all">
                <div className="relative bg-white/95 dark:bg-[#0c1427]/95 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/20 rounded-2xl shadow-2xl dark:shadow-primary-500/10">
                  {/* Header */}
                  <div className="px-6 py-5 border-b border-gray-200/50 dark:border-primary-500/10 flex items-center justify-between">
                    <Dialog.Title as="h2" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                        <i className="ri-folder-add-line text-white text-lg"></i>
                      </div>
                      {category ? t("editCategory") : t("addCategory")}
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Names */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {t("nameAr")} *
                        </label>
                        <input
                          type="text"
                          value={formData.nameAr}
                          onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                          className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                          placeholder="مثال: مقبلات"
                          required
                          dir="rtl"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {t("nameEn")} *
                        </label>
                        <input
                          type="text"
                          value={formData.nameEn}
                          onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                          className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                          placeholder="e.g., Starters"
                          required
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {t("image")}
                      </label>
                      {formData.image ? (
                        <div className="relative inline-block">
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                            <Image
                              src={formData.image}
                              alt="Category"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: "" })}
                            className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <i className="ri-close-line text-sm"></i>
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all bg-gray-50 dark:bg-[#0a0e19]/50">
                          <div className="flex flex-col items-center justify-center py-4">
                            <i className="ri-upload-cloud-2-line text-3xl text-gray-400 mb-2"></i>
                            <p className="text-sm text-gray-500 dark:text-gray-400">انقر للرفع</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                          />
                        </label>
                      )}
                      {uploading && (
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                          {t("uploading")}...
                        </p>
                      )}
                    </div>

                    {/* Sort Order */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {t("sortOrder")}
                      </label>
                      <input
                        type="number"
                        value={formData.sortOrder}
                        onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                        className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        min="0"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium"
                        disabled={saving}
                      >
                        {t("cancel")}
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {t("saving")}
                          </>
                        ) : (
                          category ? t("update") : t("create")
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
