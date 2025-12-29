"use client";

import React from "react";
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

interface Template2Props {
  menuData: MenuData;
  slug: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onShowRatingModal: () => void;
}

export default function Template2({
  menuData,
  slug,
  selectedCategory,
  onCategoryChange,
  onShowRatingModal,
}: Template2Props) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header with Hero Section */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {menuData.menu.logo && (
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white/20 shadow-lg">
                  <Image
                    src={menuData.menu.logo}
                    alt={menuData.menu.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {menuData.menu.name}
                </h1>
                {menuData.menu.description && (
                  <p className="text-lg text-white/90">
                    {menuData.menu.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => onCategoryChange("all")}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-primary-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("allCategories")}
            </button>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => onCategoryChange(category.key)}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category.key
                    ? "bg-primary-500 text-white shadow-lg scale-105"
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

      {/* Menu Items - Large Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {item.image ? (
                <div className="relative h-64 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  {item.discountPercent && item.discountPercent > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      -{item.discountPercent}%
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                  <i className="material-symbols-outlined text-gray-400 !text-[80px]">
                    fastfood
                  </i>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <div className="text-right">
                    {item.originalPrice && item.originalPrice > item.price && (
                      <div className="text-lg text-gray-400 line-through mb-1">
                        ${item.originalPrice}
                      </div>
                    )}
                    <span className="text-3xl font-bold text-primary-500">
                      ${item.price}
                    </span>
                  </div>
                </div>

                {item.description && (
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {displayItems.length === 0 && (
          <div className="text-center py-16">
            <i className="material-symbols-outlined text-gray-400 !text-[80px] mb-6">
              restaurant_menu
            </i>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              {t("noItems")}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t("noItemsInCategory")}
            </p>
          </div>
        )}
      </main>

      {/* Branches */}
      {menuData.branches.length > 0 && (
        <section className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t("ourBranches")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuData.branches.map((branch) => (
                <div
                  key={branch.id}
                  className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {branch.name}
                  </h3>
                  {branch.address && (
                    <p className="text-base text-gray-600 dark:text-gray-400 mb-3 flex items-start gap-3">
                      <i className="material-symbols-outlined !text-[24px] text-primary-500">
                        location_on
                      </i>
                      {branch.address}
                    </p>
                  )}
                  {branch.phone && (
                    <p className="text-base text-gray-600 dark:text-gray-400 flex items-center gap-3">
                      <i className="material-symbols-outlined !text-[24px] text-primary-500">
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
