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
  const { t } = useLanguage();
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
    <div ref={searchContainerRef} className="t2-search-container">
      <div className="t2-search-inner">
        <div className="t2-search-icon">
          <i className="ri-search-line" />
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
          className="t2-search-input"
        />
        {searchQuery && (
          <button
            onClick={() => {
              onSearchChange("");
              searchInputRef.current?.focus();
            }}
            className="t2-search-clear"
          >
            <i className="ri-close-line" />
          </button>
        )}
      </div>

      {isSearchOpen && searchQuery && !hasResults && (
        <div className="t2-search-no-results t2-animate-fade-in">
          <span className="emoji">🔍</span>
          <p className="title">{t.search.noResults}</p>
          <p className="subtitle">{t.search.tryAgain}</p>
        </div>
      )}
    </div>
  );
}
