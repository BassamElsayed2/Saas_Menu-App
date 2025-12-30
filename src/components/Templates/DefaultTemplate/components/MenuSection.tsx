"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Category, MenuItem } from "../types";
import { useLanguage } from "../context";
import { menuItems } from "../data";
import { Button } from "./Button";
import { Input } from "./Input";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { MenuCard } from "./MenuCard";

// ============================
// Menu Section Component
// ============================

export const MenuSection: React.FC = () => {
  const { t, direction } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rtl = direction === "rtl";

  const openModal = useCallback((item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  const categories = useMemo(
    () => [
      { id: "all" as Category, icon: "grid-line", label: t.categories.all },
      {
        id: "appetizers" as Category,
        icon: "bowl-line",
        label: t.categories.appetizers,
      },
      {
        id: "mains" as Category,
        icon: "restaurant-line",
        label: t.categories.mains,
      },
      {
        id: "drinks" as Category,
        icon: "cup-line",
        label: t.categories.drinks,
      },
      {
        id: "desserts" as Category,
        icon: "cake-3-line",
        label: t.categories.desserts,
      },
    ],
    [t]
  );

  const filteredItems = useMemo(() => {
    const categoryFiltered =
      activeCategory === "all"
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory);

    if (!searchQuery.trim()) return categoryFiltered;

    const searchLower = searchQuery.toLowerCase();
    return categoryFiltered.filter(
      (item) =>
        item.nameEn.toLowerCase().includes(searchLower) ||
        item.nameAr.includes(searchQuery) ||
        item.descriptionEn.toLowerCase().includes(searchLower) ||
        item.descriptionAr.includes(searchQuery)
    );
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="menu"
      className="
    relative overflow-hidden
    py-16 sm:py-20 md:py-24
  "
    >
      {/* Ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] md:w-[850px] h-[520px] md:h-[850px] bg-[var(--accent)]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] md:w-[650px] h-[420px] md:h-[650px] bg-[var(--accent-2)]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="
        text-3xl sm:text-4xl md:text-5xl
        font-extrabold
        mb-3
      "
          >
            <span
              className="
          bg-gradient-to-r
          from-[var(--accent)]
          to-[var(--accent-2)]
          bg-clip-text
          text-transparent
        "
            >
              {t.categories.title}
            </span>
          </h2>
          <div className="w-20 sm:w-28 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] mx-auto rounded-full" />
        </div>

        {/* Search */}
        <div className="max-w-md sm:max-w-xl mx-auto mb-6 sm:mb-10">
          <div className="relative">
            <Icon
              name="search-line"
              className={`
            absolute top-1/2 -translate-y-1/2
            text-lg sm:text-xl
            text-[var(--text-muted)]
            ${rtl ? "right-3 sm:right-4" : "left-3 sm:left-4"}
          `}
            />

            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className={`
            h-11 sm:h-12
            text-sm sm:text-base
            backdrop-blur-md
            ${
              rtl
                ? "pr-10 sm:pr-12 pl-10 sm:pl-12"
                : "pl-10 sm:pl-12 pr-10 sm:pr-12"
            }
          `}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`
              absolute top-1/2 -translate-y-1/2
              ${rtl ? "left-3 sm:left-4" : "right-3 sm:right-4"}
              text-[var(--text-muted)]
              hover:text-[var(--text-main)]
              transition-colors
            `}
              >
                <Icon name="close-line" className="text-lg sm:text-xl" />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div
          className={`
      flex flex-wrap justify-center
      gap-2 sm:gap-3
      mb-8 sm:mb-10
      ${rtl ? "flex-row-reverse" : ""}
    `}
        >
          {categories.map((category, index) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "glow" : "category"}
              onClick={() => setActiveCategory(category.id)}
              style={{ animationDelay: `${index * 80}ms` }}
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
            >
              <Icon name={category.icon} className="text-sm sm:text-base" />
              <span>{category.label}</span>
            </Button>
          ))}
        </div>

        {/* Results count */}
        {searchQuery && (
          <div className="text-center mb-6 text-sm text-[var(--text-muted)]">
            <span className="text-[var(--accent)] font-bold text-base">
              {filteredItems.length}
            </span>{" "}
            {t.search.results}
          </div>
        )}

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div
            key={`${activeCategory}-${searchQuery}`}
            className="
          grid grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-3 sm:gap-5 md:gap-6
        "
          >
            {filteredItems.map((item, index) => (
              <MenuCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => openModal(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Icon
              name="search-line"
              className="text-6xl text-[var(--text-muted)]/30 mx-auto mb-4 block"
            />
            <h3 className="text-xl font-bold text-[var(--text-muted)] mb-2">
              {t.search.noResults}
            </h3>
            <p className="text-sm text-[var(--text-muted)]/70">
              {t.search.tryDifferentKeywords}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
    </section>
  );
};

