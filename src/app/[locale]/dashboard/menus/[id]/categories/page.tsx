"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "react-hot-toast";
import Image from "next/image";
import api from "@/lib/api";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/useApi";

interface Category {
  id: number;
  name: string;
  nameAr: string;
  nameEn: string;
  image: string | null;
  sortOrder: number;
  active: boolean;
}

export default function CategoriesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const menuId = parseInt(id);
  const t = useTranslations("Categories");
  const locale = useLocale();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [menuName, setMenuName] = useState("");

  const { data: categories = [], isLoading } = useCategories(menuId);
  const createCategory = useCreateCategory(menuId);
  const updateCategory = useUpdateCategory(menuId, editingCategory?.id || 0);
  const deleteCategory = useDeleteCategory(menuId);

  useEffect(() => {
    fetchMenuName();
  }, [id]);

  const fetchMenuName = async () => {
    try {
      const result = await api.get(`/menus/${id}?locale=${locale}`);
      if (result.data?.menu) {
        setMenuName(result.data.menu.name || "");
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (categoryId: number) => {
    if (!confirm(t("deleteConfirm"))) return;
    await deleteCategory.mutateAsync(categoryId);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingCategory) {
        await updateCategory.mutateAsync(data);
      } else {
        await createCategory.mutateAsync(data);
      }
      setShowForm(false);
      setEditingCategory(null);
    } catch (error) {
      // Error handled by hooks
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => router.push(`/${locale}/dashboard/menus/${id}`)}
              className="mb-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <i className="material-symbols-outlined">arrow_back</i>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {menuName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t("subtitle")}
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <i className="material-symbols-outlined">add</i>
            {t("addCategory")}
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
          onSubmit={handleFormSubmit}
          isSubmitting={createCategory.isPending || updateCategory.isPending}
        />
      )}

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow p-12">
          <i className="material-symbols-outlined text-gray-400 !text-[64px] mb-4">
            category
          </i>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t("noCategories")}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t("getStarted")}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <i className="material-symbols-outlined">add</i>
            {t("createFirst")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: Category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              {category.image ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="material-symbols-outlined text-gray-400 !text-[64px]">
                    category
                  </i>
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      category.active
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {category.active ? t("active") : t("inactive")}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  ترتيب العرض: {category.sortOrder}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <i className="material-symbols-outlined !text-[18px]">edit</i>
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <i className="material-symbols-outlined !text-[18px]">delete</i>
                    {t("delete")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface CategoryFormModalProps {
  category: Category | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

function CategoryFormModal({ category, onClose, onSubmit, isSubmitting }: CategoryFormModalProps) {
  const t = useTranslations("Categories");
  const [formData, setFormData] = useState({
    nameAr: category?.nameAr || "",
    nameEn: category?.nameEn || "",
    image: null as File | null,
    sortOrder: category?.sortOrder || 0,
    active: category?.active ?? true,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(category?.image || null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("يجب اختيار ملف صورة");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    setFormData({ ...formData, image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = category?.image || null;

      if (formData.image) {
        setUploadingImage(true);
        const uploadResult = await api.uploadImage(formData.image, "logos");
        if (uploadResult.error) {
          toast.error(uploadResult.error);
          setUploadingImage(false);
          return;
        }
        const url = uploadResult.data?.url || null;
        imageUrl = url && !url.startsWith("http")
          ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${url}`
          : url;
        setUploadingImage(false);
      }

      onSubmit({
        nameAr: formData.nameAr,
        nameEn: formData.nameEn,
        image: imageUrl,
        sortOrder: formData.sortOrder,
        active: formData.active,
      });
    } catch (error) {
      setUploadingImage(false);
    }
  };

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
            <i className="material-symbols-outlined text-gray-500 dark:text-gray-400">close</i>
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
                className="form-input"
                placeholder="اسم التصنيف"
                dir="rtl"
                required
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
                className="form-input"
                placeholder="Category Name"
                required
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("image")} <span className="text-gray-400 text-xs">(اختياري)</span>
            </label>
            {imagePreview ? (
              <div className="relative inline-block">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, image: null });
                    setImagePreview(category?.image || null);
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                >
                  <i className="material-symbols-outlined !text-[16px]">close</i>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary-500 transition-colors bg-gray-50 dark:bg-gray-700/50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <i className="material-symbols-outlined text-gray-400 !text-[48px] mb-2">
                    cloud_upload
                  </i>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">انقر للرفع</span>
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploadingImage}
                />
              </label>
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
              className="form-input"
              min="0"
            />
          </div>

          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
            />
            <label htmlFor="active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("active")}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
              disabled={isSubmitting}
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isSubmitting || uploadingImage}
            >
              {isSubmitting ? (
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
    </div>
  );
}

