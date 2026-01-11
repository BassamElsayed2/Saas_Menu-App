"use client";

import React from "react";
import { MenuItem } from "../../types";
import { getCurrencyByCode } from "@/constants/currencies";
import { getItemImage } from "../utils/fakeImages";

interface MenuSectionProps {
  title: string;
  subtitle: string;
  items: MenuItem[];
  currency?: string;
  onItemClick?: (item: MenuItem) => void;
  sectionId?: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  subtitle,
  items,
  currency = "SAR",
  onItemClick,
  sectionId,
}) => {
  const currencySymbol = getCurrencyByCode(currency)?.symbol || currency;

  return (
    <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8" id={sectionId || undefined}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h3 className="text-4xl md:text-5xl font-display font-bold text-[var(--accent)] mb-3">
            {title}
          </h3>
          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-14 bg-[var(--border-main)]" />
            <span className="text-[var(--accent)]/90">—</span>
            <div className="h-px w-14 bg-[var(--border-main)]" />
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onItemClick?.(item)}
              className="group relative bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--glass-border)] cursor-pointer transition-all duration-500 hover:border-[var(--accent)]/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="flex items-stretch gap-5 p-5 md:p-7 min-h-[110px] md:min-h-[135px]">
                {/* Image */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-[var(--bg-main)] ring-1 ring-white/10">
                  <img
                    src={getItemImage(item.image, item.name, item.categoryName, index)}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to fake image if real image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = getItemImage("", item.name, item.categoryName, index);
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-lg md:text-xl font-display font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="mt-2 text-sm md:text-base text-[var(--text-muted)] line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-xl md:text-2xl font-bold text-[var(--accent)] font-display">
                        {item.price} {currencySymbol}
                      </div>
                      {item.discountPercent && item.originalPrice && (
                        <div className="mt-1 flex items-center justify-end gap-2">
                          <span className="text-sm text-[var(--text-muted)] line-through">
                            {item.originalPrice} {currencySymbol}
                          </span>
                          <span className="text-xs font-bold bg-[var(--accent)] text-[#1a120d] px-2.5 py-1 rounded-full">
                            -{item.discountPercent}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 h-px bg-[var(--border-main)]/70" />
                </div>
              </div>

              {/* subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-24 bg-[radial-gradient(circle_at_30%_20%,var(--accent-glow),transparent_55%)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
