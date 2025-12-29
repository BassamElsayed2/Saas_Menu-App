"use client";

import React, { useState, useEffect, use } from "react";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useMenu, useCategories, useDeleteCategory, useCategory, useCreateCategory, useUpdateCategory } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
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
  const { user, loading: authLoading } = useAuth();
  const { data: menu, isLoading: menuLoading } = useMenu(parseInt(id));
  const { data: categories = [], isLoading: categoriesLoading } = useCategories(parseInt(id));
  const deleteCategory = useDeleteCategory(parseInt(id));

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // التحقق من ملكية القائمة
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
      // Error handled by hook
    }
  };

  const loading = authLoading || menuLoading || categoriesLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t("subtitle")}
            </p>
          </div>
          <button
            onClick={() => {
              setEditingCategory(null);
              setShowForm(true);
            }}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2 shadow-lg"
          >
            <i className="material-symbols-outlined !text-[20px]">add</i>
            {t("addCategory")}
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
          <i className="material-symbols-outlined text-gray-400 !text-[64px] mb-4">
            category
          </i>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t("noCategories")}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t("getStarted")}</p>
          <button
            onClick={() => {
              setEditingCategory(null);
              setShowForm(true);
            }}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            {t("createFirst")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: Category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                {category.image ? (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <i className="material-symbols-outlined text-gray-400 !text-[40px]">
                      category
                    </i>
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setShowForm(true);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title={t("edit")}
                  >
                    <i className="material-symbols-outlined text-blue-500 !text-[20px]">
                      edit
                    </i>
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title={t("delete")}
                  >
                    <i className="material-symbols-outlined text-red-500 !text-[20px]">
                      delete
                    </i>
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{t("sortOrder")}: {category.sortOrder}</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  category.isActive
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}>
                  {category.isActive ? t("active") : t("inactive")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Form Modal */}
      {showForm && (
        <CategoryFormModal
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
      )}
    </div>
  );
}

interface CategoryFormModalProps {
  menuId: string;
  category: Category | null;
  onClose: () => void;
  onSuccess: () => void;
}

function CategoryFormModal({ menuId, category, onClose, onSuccess }: CategoryFormModalProps) {
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
      // Reset form for new category
      setFormData({
        nameAr: "",
        nameEn: "",
        image: "",
        sortOrder: 0,
      });
    }
  }, [categoryData, category]);

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
        // Update
        await updateCategory.mutateAsync(formData);
      } else {
        // Create
        await createCategory.mutateAsync(formData);
      }
      onSuccess();
    } catch (error: any) {
      console.error("Error saving category:", error);
      // Error handled by hook
    }
  };

  const saving = createCategory.isPending || updateCategory.isPending;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {category ? t("editCategory") : t("addCategory")}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <i className="material-symbols-outlined text-gray-500 dark:text-gray-400">
              close
            </i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("nameAr")} *
              </label>
              <input
                type="text"
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="مثال: مقبلات"
                required
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("nameEn")} *
              </label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Starters"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("image")}
            </label>
            {formData.image ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden mb-2">
                <Image
                  src={formData.image}
                  alt="Category"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  <i className="material-symbols-outlined !text-[16px]">close</i>
                </button>
              </div>
            ) : null}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
            />
            {uploading && (
              <p className="text-sm text-gray-500 mt-2">{t("uploading")}...</p>
            )}
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("sortOrder")}
            </label>
            <input
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              min="0"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
              disabled={saving}
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={saving}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("saving")}
                </span>
              ) : (
                category ? t("update") : t("create")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

