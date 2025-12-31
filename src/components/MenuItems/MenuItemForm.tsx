"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useCategories } from "@/hooks/useApi";
import api from "@/lib/api";

interface MenuItemFormProps {
  menuId: number;
  item?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  menuId,
  item,
  onSuccess,
  onCancel,
}) => {
  const t = useTranslations("MenuItems");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(item?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: categories = [], isLoading: categoriesLoading } = useCategories(menuId);

  const [formData, setFormData] = useState({
    nameAr: item?.nameAr || item?.translations?.ar?.name || "",
    nameEn: item?.nameEn || item?.translations?.en?.name || "",
    descriptionAr: item?.descriptionAr || item?.translations?.ar?.description || "",
    descriptionEn: item?.descriptionEn || item?.translations?.en?.description || "",
    categoryId: item?.categoryId || null,
    category: item?.category || "",
    originalPrice: item?.originalPrice || "",
    discountPercent: item?.discountPercent || 0,
    price: item?.price || "",
    image: item?.image || "",
    available: item?.available !== undefined ? item.available : true,
  });

  // Handle image file selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error(t("invalidImageType"));
      return;
    }

    // Validate file size (max 1MB)
    if (file.size > MAX_FILE_SIZE) {
      toast.error(t("imageTooLarge"));
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload the image
    setUploadingImage(true);
    try {
      const result = await api.uploadImage(file);
      if (result.error) {
        throw new Error(result.error);
      }
      const imageUrl = (result.data as any)?.url || (result.data as any)?.imageUrl;
      if (imageUrl) {
        setFormData(prev => ({ ...prev, image: imageUrl }));
        toast.success(t("imageUploaded"));
      } else {
        throw new Error("No image URL returned");
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error(t("imageUploadError"));
      setImagePreview(item?.image || null);
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: "" }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // حساب السعر النهائي تلقائياً
  useEffect(() => {
    if (formData.originalPrice && formData.discountPercent > 0) {
      const original = parseFloat(formData.originalPrice);
      const discount = parseFloat(formData.discountPercent.toString());
      const final = original * (1 - discount / 100);
      setFormData(prev => ({ ...prev, price: final.toFixed(2) }));
    } else if (formData.originalPrice) {
      setFormData(prev => ({ ...prev, price: formData.originalPrice }));
    }
  }, [formData.originalPrice, formData.discountPercent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nameAr || !formData.nameEn) {
      toast.error(t("nameRequired"));
      return;
    }

    if (!formData.price || parseFloat(formData.price) < 0) {
      toast.error(t("priceRequired"));
      return;
    }

    setLoading(true);

    try {
      const payload: any = {
        nameAr: formData.nameAr,
        nameEn: formData.nameEn,
        descriptionAr: formData.descriptionAr || null,
        descriptionEn: formData.descriptionEn || null,
        price: parseFloat(formData.price),
        image: formData.image || null,
        available: formData.available,
      };

      // إضافة التصنيف إذا تم اختياره
      if (formData.categoryId) {
        payload.categoryId = formData.categoryId;
        // احصل على اسم التصنيف من القائمة
        const selectedCategory = categories.find((cat: any) => cat.id === formData.categoryId);
        payload.category = selectedCategory?.nameAr || selectedCategory?.name || "main";
      } else if (formData.category) {
        payload.category = formData.category;
      } else {
        // قيم افتراضية إذا لم يتم اختيار تصنيف
        payload.category = "main";
      }

      // إضافة الخصم إذا كان موجوداً
      if (formData.originalPrice) {
        payload.originalPrice = parseFloat(formData.originalPrice);
      }
      if (formData.discountPercent > 0) {
        payload.discountPercent = parseInt(formData.discountPercent.toString());
      }

      const result = item
        ? await api.put(`/menus/${menuId}/items/${item.id}`, payload)
        : await api.post(`/menus/${menuId}/items`, payload);

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success(item ? t("updateSuccess") : t("createSuccess"));
      onSuccess();
    } catch (error: any) {
      console.error("Error saving menu item:", error);
      toast.error(error.message || t("saveError"));
    } finally {
      setLoading(false);
    }
  };

  // Input base styles
  const inputBaseStyles = "w-full px-4 py-3 bg-white/50 dark:bg-[#0a0e19]/50 border border-gray-200/50 dark:border-primary-500/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 dark:focus:ring-primary-400/50 dark:focus:border-primary-400/50 transition-all duration-200";
  
  const labelStyles = "block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload Section */}
      <div>
        <label className={labelStyles}>
          <i className="ri-image-line ltr:mr-2 rtl:ml-2 text-primary-500"></i>
          {t("image")}
        </label>
        
        {/* Image Preview or Upload Area */}
        {imagePreview || formData.image ? (
          <div className="relative">
            <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-primary-200 dark:border-primary-500/30 shadow-lg shadow-primary-500/10">
              <Image
                src={imagePreview || formData.image}
                alt="Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Uploading overlay */}
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-white text-sm font-medium">{t("uploading")}</span>
                  </div>
                </div>
              )}
              
              {/* Action buttons */}
              {!uploadingImage && (
                <div className="absolute bottom-3 ltr:right-3 rtl:left-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all text-sm font-medium flex items-center gap-1.5 shadow-lg"
                  >
                    <i className="ri-edit-line"></i>
                    {t("changeImage")}
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-2 bg-red-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium flex items-center gap-1.5 shadow-lg"
                  >
                    <i className="ri-delete-bin-line"></i>
                    {t("removeImage")}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            onClick={() => !uploadingImage && fileInputRef.current?.click()}
            className="relative w-full h-48 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 bg-gray-50/50 dark:bg-gray-800/30 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="ri-image-add-line text-3xl text-primary-500 dark:text-primary-400"></i>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("clickToUpload")}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t("maxFileSize")}</p>
            </div>
          </div>
        )}
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <i className="ri-information-line"></i>
          {t("imageHintUpload")}
        </p>
      </div>

      {/* Names Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arabic Name */}
        <div>
          <label className={labelStyles}>
            <i className="ri-translate-2 ltr:mr-2 rtl:ml-2 text-primary-500"></i>
            {t("nameAr")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.nameAr}
            onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
            className={inputBaseStyles}
            placeholder={t("nameArPlaceholder")}
            required
            dir="rtl"
          />
        </div>

        {/* English Name */}
        <div>
          <label className={labelStyles}>
            <i className="ri-translate ltr:mr-2 rtl:ml-2 text-primary-500"></i>
            {t("nameEn")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.nameEn}
            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            className={inputBaseStyles}
            placeholder={t("nameEnPlaceholder")}
            required
          />
        </div>
      </div>

      {/* Descriptions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arabic Description */}
        <div>
          <label className={labelStyles}>
            <i className="ri-file-text-line ltr:mr-2 rtl:ml-2 text-primary-500"></i>
            {t("descriptionAr")}
          </label>
          <textarea
            value={formData.descriptionAr}
            onChange={(e) =>
              setFormData({ ...formData, descriptionAr: e.target.value })
            }
            rows={3}
            className={`${inputBaseStyles} resize-none`}
            placeholder={t("descriptionPlaceholder")}
            dir="rtl"
          />
        </div>

        {/* English Description */}
        <div>
          <label className={labelStyles}>
            <i className="ri-file-text-line ltr:mr-2 rtl:ml-2 text-primary-500"></i>
            {t("descriptionEn")}
          </label>
          <textarea
            value={formData.descriptionEn}
            onChange={(e) =>
              setFormData({ ...formData, descriptionEn: e.target.value })
            }
            rows={3}
            className={`${inputBaseStyles} resize-none`}
            placeholder={t("descriptionPlaceholder")}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className={labelStyles}>
          <i className="ri-folder-line ltr:mr-2 rtl:ml-2 text-primary-500"></i>
          {t("category")} <span className="text-red-500">*</span>
        </label>
        {categoriesLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            {t("loadingCategories")}
          </div>
        ) : categories.length > 0 ? (
          <select
            value={formData.categoryId || ""}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value ? parseInt(e.target.value) : null })
            }
            className={inputBaseStyles}
            required
          >
            <option value="">{t("selectCategory")}</option>
            {categories.map((cat: { id: number; name: string }) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        ) : (
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700/50 flex items-start gap-3">
            <i className="ri-alert-line text-amber-500 text-xl"></i>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t("noCategoriesHint")}
            </p>
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="space-y-4 p-5 bg-gradient-to-br from-primary-50/50 to-purple-50/50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-2xl border border-primary-100 dark:border-primary-500/20">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <i className="ri-price-tag-3-line text-white text-sm"></i>
          </div>
          {t("pricing")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Original Price */}
          <div>
            <label className={labelStyles}>
              {t("originalPrice")}
            </label>
            <div className="relative">
              <span className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className={`${inputBaseStyles} ltr:pl-8 rtl:pr-8`}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Discount Percent */}
          <div>
            <label className={labelStyles}>
              {t("discountPercent")}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discountPercent}
                onChange={(e) => setFormData({ ...formData, discountPercent: parseInt(e.target.value) || 0 })}
                className={`${inputBaseStyles} ltr:pr-10 rtl:pl-10`}
                placeholder="0"
              />
              <span className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">%</span>
            </div>
          </div>

          {/* Final Price (Calculated) */}
          <div>
            <label className={labelStyles}>
              {t("finalPrice")} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 text-primary-500 font-bold">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`${inputBaseStyles} ltr:pl-8 rtl:pr-8 bg-primary-50/50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-500/30 font-semibold text-primary-700 dark:text-primary-300`}
                placeholder="0.00"
                required
              />
            </div>
            {formData.originalPrice && formData.discountPercent > 0 && (
              <p className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <i className="ri-check-line"></i>
                {t("calculatedPrice")}
              </p>
            )}
          </div>
        </div>

        {/* Discount Badge Preview */}
        {formData.originalPrice && formData.discountPercent > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-700/50">
            <p className="text-xs text-green-600 dark:text-green-400 mb-2 font-medium">معاينة الخصم:</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="line-through text-gray-400 dark:text-gray-500 text-lg">
                ${formData.originalPrice}
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full text-sm font-bold shadow-lg shadow-red-500/30">
                -{formData.discountPercent}%
              </span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${formData.price}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Available Toggle */}
      <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="available"
            checked={formData.available}
            onChange={(e) =>
              setFormData({ ...formData, available: e.target.checked })
            }
            className="sr-only peer"
          />
          <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] ltr:after:left-[2px] rtl:after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
          <span className="ltr:ml-3 rtl:mr-3 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <i className={`ri-${formData.available ? 'eye-line text-green-500' : 'eye-off-line text-gray-400'}`}></i>
            {t("available")}
          </span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium flex items-center gap-2"
          disabled={loading}
        >
          <i className="ri-close-line"></i>
          {t("cancel")}
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none font-semibold flex items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t("saving")}
            </>
          ) : (
            <>
              <i className={`ri-${item ? 'save-line' : 'add-line'}`}></i>
              {item ? t("update") : t("create")}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;

