"use client";

import React from "react";
import { useLanguage } from "../context";

interface NavbarProps {
  isScrolled: boolean;
  showCategories: boolean;
  categories: Array<{ id: string; name: string; emoji: string }>;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onShowMobileCategories: () => void;
}

export function Navbar({
  isScrolled,
  showCategories,
  categories,
  selectedCategory,
  onCategoryChange,
  onShowMobileCategories,
}: NavbarProps) {
  const { t, toggleLanguage, lang } = useLanguage();

  return (
    <nav className={`t2-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="t2-navbar-inner">
        {/* Logo */}
        <div className="t2-logo-container">
          <div className="t2-logo-icon">
            <span>📋</span>
          </div>
          <h1 className="t2-logo-text">
            {t.nav.menu} <span className="t2-logo-highlight">{t.nav.menuHighlight}</span>
          </h1>
        </div>

        {/* Language Switcher */}
        <button onClick={toggleLanguage} className="t2-lang-button">
          <i className="ri-global-line" />
          <span>{lang === "ar" ? t.languageSwitcher.english : t.languageSwitcher.arabic}</span>
        </button>
      </div>

      {/* Mobile Category Button */}
      {showCategories && (
        <div className="t2-mobile-category-btn t2-md-hidden">
          <button onClick={onShowMobileCategories}>
            🍽️ {t.menu?.categoriesTitle}
          </button>
        </div>
      )}

      {/* Desktop Categories */}
      {showCategories && (
        <div className="t2-desktop-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`t2-category-btn ${selectedCategory === category.id ? "active" : ""}`}
            >
              <span>{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
