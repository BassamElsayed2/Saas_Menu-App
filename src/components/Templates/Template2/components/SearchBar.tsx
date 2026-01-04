"use client";

import React, { useRef, useEffect } from "react";
import { useLanguage } from "../context";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  hasResults: boolean;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  isSearchOpen,
  setIsSearchOpen,
  hasResults,
}: SearchBarProps) {
  const { t, isRTL } = useLanguage();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSearchOpen]);

  return (
    <div
      ref={searchContainerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "56px",
        position: "relative",
        width: "100%",
        maxWidth: "700px",
        margin: "0 auto 56px",
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            [isRTL ? "right" : "left"]: "24px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <i
            className="ri-search-line"
            style={{
              fontSize: "24px",
              background: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsSearchOpen(true);
          }}
          onFocus={() => {
            if (searchQuery) setIsSearchOpen(true);
          }}
          placeholder={t.search.placeholder}
          style={{
            width: "100%",
            padding: isRTL ? "18px 56px 18px 64px" : "18px 64px 18px 56px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(255, 109, 31, 0.2)",
            outline: "none",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            color: "#1a1a1a",
            fontSize: "16px",
            fontWeight: "500",
            textAlign: isRTL ? "right" : "left",
            boxShadow: "0 8px 24px rgba(255, 109, 31, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.8)",
          }}
        />
        {searchQuery && (
          <button
            onClick={() => {
              onSearchChange("");
              searchInputRef.current?.focus();
            }}
            style={{
              position: "absolute",
              top: "50%",
              [isRTL ? "left" : "right"]: "20px",
              transform: "translateY(-50%)",
              background: "linear-gradient(135deg, rgba(255, 109, 31, 0.1), rgba(255, 154, 77, 0.15))",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <i className="ri-close-line" style={{ fontSize: "20px", color: "#FF6D1F" }} />
          </button>
        )}
      </div>

      {isSearchOpen && searchQuery && !hasResults && (
        <div
          className="animate-fade-in"
          style={{
            position: "absolute",
            top: "100%",
            marginTop: "12px",
            width: "100%",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(24px)",
            borderRadius: "16px",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(255, 109, 31, 0.1)",
            padding: "32px",
            textAlign: "center",
            zIndex: 50,
          }}
        >
          <span style={{ fontSize: "48px", display: "block", marginBottom: "12px" }}>🔍</span>
          <p style={{ color: "rgba(34, 34, 34, 0.6)", fontSize: "16px", marginBottom: "8px" }}>{t.search.noResults}</p>
          <p style={{ color: "rgba(34, 34, 34, 0.4)", fontSize: "13px" }}>{t.search.tryAgain}</p>
        </div>
      )}
    </div>
  );
}

