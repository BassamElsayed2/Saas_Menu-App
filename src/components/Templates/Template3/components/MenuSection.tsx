"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "../context";
import { MenuItem } from "../../types";
import MenuCard from "./MenuCard";
import CategoryFilter from "./CategoryFilter";
import ProductModal from "./ProductModal";

interface Category {
  id: string;
  name: string;
}

interface MenuSectionProps {
  items: MenuItem[];
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const MenuCardSkeleton: React.FC = () => (
  <div className="t3-glass-card">
    <div className="t3-skeleton" style={{ height: "12rem", borderRadius: "var(--t3-radius) var(--t3-radius) 0 0" }} />
    <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div className="t3-skeleton" style={{ height: "1.5rem", width: "75%", borderRadius: "0.5rem" }} />
      <div className="t3-skeleton" style={{ height: "1rem", width: "100%", borderRadius: "0.25rem" }} />
      <div className="t3-skeleton" style={{ height: "1rem", width: "85%", borderRadius: "0.25rem" }} />
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.5rem" }}>
        <div className="t3-skeleton" style={{ height: "2rem", width: "4rem", borderRadius: "9999px" }} />
        <div className="t3-skeleton" style={{ height: "1.25rem", width: "6rem", borderRadius: "0.25rem" }} />
      </div>
    </div>
  </div>
);

const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === "all" || 
        item.categoryId?.toString() === selectedCategory ||
        item.category === selectedCategory;
      
      const matchesSearch = searchQuery === "" ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <section id="menu" className="t3-menu-section">
      <div className="t3-menu-section-bg" />
      <div className="t3-menu-section-orb t3-float" />

      <div className="t3-container" style={{ position: "relative", zIndex: 10 }}>
        {/* Section Header */}
        <div className="t3-menu-header t3-fade-in">
          <span className="t3-menu-header-badge t3-glass-card t3-scale-in">
            ✦ {t.menu.all} ✦
          </span>
          <h2 className="t3-menu-title t3-text-gradient t3-glow-text">
            {t.menu.title}
          </h2>
          <p className="t3-menu-subtitle">{t.menu.subtitle}</p>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: "3rem" }}>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Menu Grid */}
        <div className="t3-menu-grid">
          {isLoading
            ? [...Array(6)].map((_, i) => <MenuCardSkeleton key={i} />)
            : filteredItems.map((item, i) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onSelect={setSelectedItem}
                  index={i}
                />
              ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && !isLoading && (
          <p className="t3-no-results">{t.menu.noResults}</p>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default MenuSection;

