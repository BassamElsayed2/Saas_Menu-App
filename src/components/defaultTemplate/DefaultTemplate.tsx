"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  categoryId?: number;
  categoryName?: string;
  originalPrice?: number;
  discountPercent?: number;
}

interface Category {
  id: number;
  name: string;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: string;
  longitude: string;
}

interface MenuData {
  menu: {
    id: number;
    name: string;
    description: string;
    logo: string;
    theme: string;
    slug: string;
    isActive: boolean;
  };
  categories?: Category[];
  items: MenuItem[];
  itemsByCategory: Record<string, MenuItem[]>;
  branches: Branch[];
  rating: {
    average: number;
    total: number;
  };
}

interface DefaultTemplateProps {
  menuData: MenuData;
  slug: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onShowRatingModal: () => void;
}

export default function DefaultTemplate({
  menuData,
  slug,
  selectedCategory,
  onCategoryChange,
  onShowRatingModal,
}: DefaultTemplateProps) {
  const locale = useLocale();
  const t = useTranslations("PublicMenu");

  // Use categories from API if available, otherwise use itemsByCategory keys
  const categories =
    menuData.categories && menuData.categories.length > 0
      ? menuData.categories.map((cat) => ({
          id: cat.id,
          key: `category_${cat.id}`,
          name: cat.name,
        }))
      : Object.keys(menuData.itemsByCategory).map((key) => ({
          id: null,
          key: key,
          name: key,
        }));

  // Get display items based on selected category
  const displayItems =
    selectedCategory === "all"
      ? menuData.items
      : menuData.itemsByCategory[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {menuData.menu.logo && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={menuData.menu.logo}
                    alt={menuData.menu.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {menuData.menu.name}
                </h1>
                {menuData.menu.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {menuData.menu.description}
                  </p>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`material-symbols-outlined !text-[20px] ${
                      star <= menuData.rating.average
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    star
                  </i>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {menuData.rating.average.toFixed(1)} ({menuData.rating.total})
              </span>
              <button
                onClick={onShowRatingModal}
                className="ltr:ml-2 rtl:mr-2 px-3 py-1 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                {t("rateUs")}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => onCategoryChange("all")}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("allCategories")}
            </button>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => onCategoryChange(category.key)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.key
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category.name ||
                  t(`categories.${category.key}`) ||
                  category.key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {item.image ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="material-symbols-outlined text-gray-400 !text-[64px]">
                    fastfood
                  </i>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <div className="text-right">
                    {item.originalPrice && item.originalPrice > item.price && (
                      <div className="text-sm text-gray-400 line-through mb-1">
                        ${item.originalPrice}
                      </div>
                    )}
                    <span className="text-lg font-bold text-primary-500">
                      ${item.price}
                    </span>
                    {item.discountPercent && item.discountPercent > 0 && (
                      <div className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">
                        -{item.discountPercent}%
                      </div>
                    )}
                  </div>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {displayItems.length === 0 && (
          <div className="text-center py-12">
            <i className="material-symbols-outlined text-gray-400 !text-[64px] mb-4">
              restaurant_menu
            </i>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("noItems")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("noItemsInCategory")}
            </p>
          </div>
        )}
      </main>

      {/* Branches */}
      {menuData.branches.length > 0 && (
        <section className="bg-white dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("ourBranches")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuData.branches.map((branch) => (
                <div
                  key={branch.id}
                  className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {branch.name}
                  </h3>
                  {branch.address && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-start gap-2">
                      <i className="material-symbols-outlined !text-[20px]">
                        location_on
                      </i>
                      {branch.address}
                    </p>
                  )}
                  {branch.phone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <i className="material-symbols-outlined !text-[20px]">
                        phone
                      </i>
                      {branch.phone}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
