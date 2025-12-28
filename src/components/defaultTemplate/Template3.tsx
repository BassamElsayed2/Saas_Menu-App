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

interface Template3Props {
  menuData: MenuData;
  slug: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onShowRatingModal: () => void;
}

export default function Template3({
  menuData,
  slug,
  selectedCategory,
  onCategoryChange,
  onShowRatingModal,
}: Template3Props) {
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Minimal Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {menuData.menu.logo && (
                <div className="relative w-14 h-14 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <Image
                    src={menuData.menu.logo}
                    alt={menuData.menu.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {menuData.menu.name}
                </h1>
                {menuData.menu.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {menuData.menu.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs - Minimal */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            <button
              onClick={() => onCategoryChange("all")}
              className={`px-5 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === "all"
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t("allCategories")}
            </button>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => onCategoryChange(category.key)}
                className={`px-5 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.key
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
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

      {/* Menu Items - Vertical List */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex gap-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Image */}
              <div className="flex-shrink-0 w-48 h-48">
                {item.image ? (
                  <div
                    className={`relative w-full h-full overflow-hidden ${
                      index % 2 === 0 ? "rounded-l-lg" : "rounded-r-lg"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${
                      index % 2 === 0 ? "rounded-l-lg" : "rounded-r-lg"
                    }`}
                  >
                    <i className="material-symbols-outlined text-gray-400 !text-[48px]">
                      fastfood
                    </i>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <div className="text-right ml-4">
                      {item.originalPrice &&
                        item.originalPrice > item.price && (
                          <div className="text-sm text-gray-400 line-through mb-1">
                            ${item.originalPrice}
                          </div>
                        )}
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${item.price}
                      </span>
                      {item.discountPercent && item.discountPercent > 0 && (
                        <div className="text-xs text-red-600 dark:text-red-400 font-semibold mt-1">
                          -{item.discountPercent}%
                        </div>
                      )}
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayItems.length === 0 && (
          <div className="text-center py-16">
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
        <section className="bg-gray-50 dark:bg-gray-800/50 py-16 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t("ourBranches")}
            </h2>
            <div className="space-y-4">
              {menuData.branches.map((branch) => (
                <div
                  key={branch.id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {branch.name}
                  </h3>
                  <div className="space-y-2">
                    {branch.address && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <i className="material-symbols-outlined !text-[18px] mt-0.5">
                          location_on
                        </i>
                        {branch.address}
                      </p>
                    )}
                    {branch.phone && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <i className="material-symbols-outlined !text-[18px]">
                          phone
                        </i>
                        {branch.phone}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
