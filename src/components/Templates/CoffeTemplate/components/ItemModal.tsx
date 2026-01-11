"use client";

import React from "react";
import { MenuItem } from "../../types";
import { getCurrencyByCode } from "@/constants/currencies";
import { getItemImage } from "../utils/fakeImages";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  currency?: string;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  item,
  currency = "SAR",
}) => {
  if (!isOpen || !item) return null;

  const currencySymbol = getCurrencyByCode(currency)?.symbol || currency;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-card)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[var(--border-main)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-main)] hover:bg-[var(--accent)] text-[var(--text-main)] hover:text-white transition-all duration-300 z-10"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        {/* Image */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-[var(--bg-main)]">
          <img
            src={getItemImage(item.image, item.name, item.categoryName)}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to fake image if real image fails to load
              const target = e.target as HTMLImageElement;
              target.src = getItemImage("", item.name, item.categoryName);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-main)] mb-4">
            {item.name}
          </h3>

          <p className="text-lg text-[var(--text-muted)] mb-6 leading-relaxed">
            {item.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between pt-6 border-t border-[var(--border-main)]">
            {item.originalPrice && item.discountPercent ? (
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-sm text-[var(--text-muted)] line-through block mb-1">
                    {item.originalPrice} {currencySymbol}
                  </span>
                  <span className="text-3xl font-bold text-[var(--accent)] font-display">
                    {item.price} {currencySymbol}
                  </span>
                </div>
                <span className="text-sm font-bold bg-[var(--accent)] text-white px-3 py-1 rounded">
                  -{item.discountPercent}%
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-[var(--accent)] font-display">
                {item.price} {currencySymbol}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
