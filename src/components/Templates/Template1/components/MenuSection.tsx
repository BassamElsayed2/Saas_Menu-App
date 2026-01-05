"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { MenuCard } from "./MenuCard";
import { Icon } from "./Icon";

interface Category {
  id: number;
  name: string;
  image: string | null;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  categoryId?: number;
  originalPrice?: number;
  discountPercent?: number;
}

interface MenuSectionProps {
  categories: Category[];
  items: MenuItem[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  currency: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  categories,
  items,
  selectedCategory,
  onCategoryChange,
  currency,
}) => {
  const { t } = useLanguage();

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter(
          (item) =>
            item.categoryId?.toString() === selectedCategory ||
            item.category === selectedCategory
        );

  return (
    <section id="menu" className="py-24 px-4 relative">
      {/* Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {t.categories.title}
            </span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-violet-500 rounded-full" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 animate-pulse" />
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-blue-500 rounded-full" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-8 mb-12 scrollbar-hide">
          {/* All Category */}
          <button
            onClick={() => onCategoryChange("all")}
            className={`
              flex-shrink-0 px-7 py-3.5 rounded-2xl font-bold transition-all duration-300
              ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-xl shadow-violet-500/30 scale-105"
                  : "bg-white/5 backdrop-blur-sm text-violet-300/70 hover:bg-white/10 hover:text-white border border-violet-500/10 hover:border-violet-500/30"
              }
            `}
          >
            {t.categories.all}
          </button>

          {/* Dynamic Categories */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id.toString())}
              className={`
                flex-shrink-0 flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold transition-all duration-300
                ${
                  selectedCategory === category.id.toString()
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-xl shadow-violet-500/30 scale-105"
                    : "bg-white/5 backdrop-blur-sm text-violet-300/70 hover:bg-white/10 hover:text-white border border-violet-500/10 hover:border-violet-500/30"
                }
              `}
            >
              {category.image && (
                <div className="relative w-7 h-7 rounded-lg overflow-hidden ring-1 ring-white/20">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <MenuCard item={item} currency={currency} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 flex items-center justify-center border border-violet-500/20">
              <Icon name="restaurant-line" size={48} className="text-violet-400/50" />
            </div>
            <p className="text-violet-300/50 text-xl">
              {t.categories.empty}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
