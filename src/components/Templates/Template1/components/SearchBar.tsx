"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { Icon } from "./Icon";
import { DEFAULT_IMAGE, formatPrice, getCurrencyLabel } from "../constants";

interface SearchItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface SearchBarProps {
  items: SearchItem[];
  onItemClick?: (item: SearchItem) => void;
  currency?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  items,
  onItemClick,
  currency = "SAR",
}) => {
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search logic
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery)
    );
    setResults(filtered.slice(0, 6)); // Limit to 6 results
  }, [query, items]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPrice = (price: number) => {
    return `${new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)} ${getCurrencyLabel(locale, currency)}`;
  };

  const handleItemClick = (item: SearchItem) => {
    onItemClick?.(item);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
          <Icon name="search-line" size={20} className="text-violet-400/50" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={t.search.placeholder}
          className="w-full bg-white/5 backdrop-blur-sm border border-violet-500/20 rounded-2xl text-white placeholder-violet-300/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 py-4 px-5 ps-14"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute inset-y-0 end-0 flex items-center pe-5 text-violet-400/50 hover:text-white transition-colors"
          >
            <Icon name="close-circle-fill" size={20} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute top-full mt-3 w-full bg-slate-900/95 backdrop-blur-xl border border-violet-500/20 rounded-2xl shadow-2xl shadow-violet-500/10 overflow-hidden z-50">
          {results.length > 0 ? (
            <div className="max-h-[400px] overflow-y-auto">
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-violet-500/10 transition-colors border-b border-violet-500/10 last:border-0"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-violet-500/20">
                    <Image
                      src={item.image || DEFAULT_IMAGE}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-start">
                    <h4 className="font-semibold text-white line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-violet-300/50 line-clamp-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Price */}
                  <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    {formatPrice(item.price)}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                <Icon name="search-line" size={32} className="text-violet-400/50" />
              </div>
              <p className="text-violet-300/50 font-medium">{t.search.noResults}</p>
              <p className="text-violet-400/30 text-sm mt-1">
                {t.search.tryDifferentKeywords}
              </p>
            </div>
          )}

          {/* Results Count */}
          {results.length > 0 && (
            <div className="px-4 py-3 bg-violet-500/5 border-t border-violet-500/10 text-center">
              <span className="text-sm text-violet-300/50">
                {results.length} {t.search.results}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

