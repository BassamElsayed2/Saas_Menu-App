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
  const { t, isRTL, toggleLanguage, lang } = useLanguage();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        background: isScrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.5)",
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(10px)",
        WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(10px)",
        boxShadow: isScrolled
          ? "0 8px 32px rgba(255, 109, 31, 0.15), 0 2px 8px rgba(0, 0, 0, 0.05)"
          : "0 4px 16px rgba(0, 0, 0, 0.03)",
        borderBottom: isScrolled
          ? "1px solid rgba(255, 109, 31, 0.15)"
          : "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 50%, #FFB366 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(255, 109, 31, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.2) 100%)",
                borderRadius: "50%",
              }}
            />
            <span style={{ fontSize: "28px", position: "relative", zIndex: 1 }}>📋</span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: "800",
              color: "#1a1a1a",
              letterSpacing: "-0.5px",
            }}
          >
            {t.nav.menu}{" "}
            <span 
              style={{ 
                background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.nav.menuHighlight}
            </span>
          </h1>
        </div>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 231, 198, 0.9) 100%)",
            border: "2px solid rgba(255, 109, 31, 0.15)",
            color: "#1a1a1a",
            padding: "12px 20px",
            borderRadius: "999px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 109, 31, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.8)";
          }}
        >
          <i className="ri-global-line" style={{ fontSize: "20px", color: "#FF6D1F" }} />
          <span style={{ fontWeight: "600", fontSize: "14px" }}>
            {lang === "ar" ? t.languageSwitcher.english : t.languageSwitcher.arabic}
          </span>
        </button>
      </div>

      {/* Mobile Category Button */}
      {showCategories && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "12px",
          }}
          className="md-hidden"
        >
          <button
            onClick={onShowMobileCategories}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
              color: "white",
              boxShadow: "0 8px 24px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "15px",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 109, 31, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)";
            }}
          >
            🍽️ {t.menu?.categoriesTitle}
          </button>
        </div>
      )}

      {/* Desktop Categories */}
      {showCategories && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
            padding: "0 16px 16px",
          }}
          className="desktop-categories"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 24px",
                borderRadius: "999px",
                fontSize: "15px",
                fontWeight: "600",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                background:
                  selectedCategory === category.id
                    ? "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 231, 198, 0.8) 100%)",
                color: selectedCategory === category.id ? "white" : "#1a1a1a",
                boxShadow:
                  selectedCategory === category.id
                    ? "0 8px 24px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)"
                    : "0 4px 12px rgba(0, 0, 0, 0.06)",
                transform: selectedCategory === category.id ? "translateY(-2px)" : "translateY(0)",
                border:
                  selectedCategory === category.id
                    ? "2px solid rgba(255, 255, 255, 0.3)"
                    : "2px solid rgba(255, 109, 31, 0.15)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 109, 31, 0.2)";
                  e.currentTarget.style.borderColor = "rgba(255, 109, 31, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
                  e.currentTarget.style.borderColor = "rgba(255, 109, 31, 0.15)";
                }
              }}
            >
              <span style={{ fontSize: "20px" }}>{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
