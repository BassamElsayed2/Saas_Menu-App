"use client";

import React from "react";
import { useLanguage } from "../context";

interface MobileCategoriesSheetProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Array<{ id: string; name: string; emoji: string }>;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function MobileCategoriesSheet({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
}: MobileCategoriesSheetProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="t2-mobile-sheet-overlay t2-animate-fade-in">
      <div onClick={(e) => e.stopPropagation()} className="t2-mobile-sheet t2-animate-slide-down">
        <div className="t2-mobile-sheet-header">
          <h3 className="t2-mobile-sheet-title">
            <span>🍽️</span>
            {t.menu?.categoriesTitle}
          </h3>
          <button onClick={onClose} className="t2-mobile-sheet-close">
            ✕
          </button>
        </div>

        <div className="t2-mobile-sheet-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onCategoryChange(category.id);
                onClose();
              }}
              className={`t2-mobile-category-button ${selectedCategory === category.id ? "active" : ""}`}
            >
              <span>{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
