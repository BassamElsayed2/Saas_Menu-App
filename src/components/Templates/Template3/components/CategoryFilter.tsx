"use client";

import React, { useState } from "react";
import { useLanguage } from "../context";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) => {
  const { t } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="t3-filter-wrapper t3-fade-in">
      {/* Search bar */}
      <div className={`t3-search-wrapper t3-glass-card ${isFocused ? "focused" : ""}`}>
        <span className="material-symbols-outlined t3-search-icon">search</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t.menu.search}
          className="t3-search-input"
        />
        <div className="t3-search-line t3-gradient-animated" />
      </div>

      {/* Category buttons */}
      <div className="t3-categories-wrapper">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`t3-category-btn ${selectedCategory === cat.id ? "active" : ""}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

