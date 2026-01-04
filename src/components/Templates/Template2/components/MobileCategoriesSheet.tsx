"use client";

import React, { useEffect, useRef } from "react";
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
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 45,
        background: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "flex-start",
        paddingTop: "100px",
      }}
      className="animate-fade-in"
    >
      <div
        ref={sheetRef}
        className="animate-slide-down"
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #FAF3E1 0%, #FFF8E7 100%)",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
          padding: "20px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 109, 31, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            paddingBottom: "16px",
            borderBottom: "2px solid rgba(255, 109, 31, 0.1)",
          }}
        >
          <h3 style={{ 
            fontWeight: "800", 
            fontSize: "20px", 
            color: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <span style={{ fontSize: "24px" }}>🍽️</span>
            {t.navbar?.categoriesTitle || t.menu?.categoriesTitle}
          </h3>
          <button
            onClick={onClose}
            style={{ 
              fontSize: "24px", 
              background: "rgba(255, 109, 31, 0.1)", 
              border: "none", 
              cursor: "pointer",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FF6D1F",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 109, 31, 0.2)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 109, 31, 0.1)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onCategoryChange(category.id);
                onClose();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 16px",
                borderRadius: "16px",
                fontSize: "15px",
                fontWeight: "600",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                background: selectedCategory === category.id 
                  ? "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)" 
                  : "rgba(255, 255, 255, 0.9)",
                color: selectedCategory === category.id ? "white" : "#1a1a1a",
                border: selectedCategory === category.id 
                  ? "2px solid rgba(255, 255, 255, 0.3)" 
                  : "2px solid rgba(255, 109, 31, 0.1)",
                cursor: "pointer",
                boxShadow: selectedCategory === category.id 
                  ? "0 6px 20px rgba(255, 109, 31, 0.3)" 
                  : "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <span style={{ fontSize: "20px" }}>{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

