"use client";

import React from "react";
import Image from "next/image";
import { MenuItem } from "../../types";
import { useLanguage } from "../context";

interface ModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function Modal({ item, onClose }: ModalProps) {
  const { t } = useLanguage();

  if (!item) return null;

  const hasDiscount = item.discountPercent && item.discountPercent > 0;
  const discountedPrice = hasDiscount
    ? item.price - (item.price * (item.discountPercent as number)) / 100
    : item.price;

  return (
    <div onClick={onClose} className="t2-modal-overlay t2-animate-fade-in">
      <div onClick={(e) => e.stopPropagation()} className="t2-modal t2-animate-scale-in">
        {/* Close Button */}
        <button onClick={onClose} className="t2-modal-close">
          <i className="ri-close-line" />
        </button>

        <div className="t2-modal-scroll">
          {/* Image */}
          <div className="t2-modal-image">
            <Image
              src={item.image || "/images/restaurant/default-food.jpg"}
              alt={item.name}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="t2-modal-image-overlay" />

            {/* Price & Badges */}
            <div className="t2-modal-price-section">
              <div>
                <div className="t2-modal-price-badge">
                  {discountedPrice.toFixed(0)} {t.menu.currency}
                </div>
              </div>

              <div className="t2-modal-badges">
                {hasDiscount && (
                  <div className="t2-modal-badge discount">
                    <i className="ri-percent-line" />
                    <span>-{item.discountPercent}%</span>
                  </div>
                )}
                {item.isHot && (
                  <div className="t2-modal-badge icon-only popular">
                    <i className="ri-fire-line" />
                  </div>
                )}
                {item.isVegetarian && (
                  <div className="t2-modal-badge icon-only vegetarian">
                    <i className="ri-leaf-line" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="t2-modal-content">
            {/* Title */}
            <div className="t2-modal-title-section">
              <h2 className="t2-modal-title">{item.name}</h2>

              <div className="t2-modal-divider-small">
                <span className="t2-modal-divider-line primary" />
                <span className="t2-modal-divider-line secondary" />
              </div>

              <p className="t2-modal-description">{item.description}</p>
            </div>

            {/* Details Grid */}
            <div className="t2-modal-details-grid">
              {item.prepTime && (
                <div className="t2-modal-detail-card">
                  <div className="t2-modal-detail-icon">
                    <i className="ri-time-line" />
                  </div>
                  <div className="t2-modal-detail-content">
                    <p className="t2-modal-detail-label">{t.modal.prepTime}</p>
                    <p className="t2-modal-detail-value">
                      {item.prepTime} {t.menu.minutes}
                    </p>
                  </div>
                </div>
              )}

              {item.calories && (
                <div className="t2-modal-detail-card">
                  <div className="t2-modal-detail-icon">
                    <i className="ri-fire-line" />
                  </div>
                  <div className="t2-modal-detail-content">
                    <p className="t2-modal-detail-label">{t.modal.calories}</p>
                    <p className="t2-modal-detail-value">
                      {item.calories} {t.modal.cal}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {(item.isHot || item.isVegetarian) && (
              <div className="t2-modal-tags-section">
                <p className="t2-modal-tags-label">{t.modal.tags}</p>
                <div className="t2-modal-tags-row">
                  {item.isHot && (
                    <span className="t2-modal-tag spicy">
                      <i className="ri-fire-line" />
                      {t.modal.spicy}
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="t2-modal-tag vegetarian">
                      <i className="ri-leaf-line" />
                      {t.modal.vegetarian}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Category */}
            {item.category && (
              <div className="t2-modal-category-badge">
                <i className="ri-restaurant-line" />
                <span>{item.category}</span>
              </div>
            )}

            {/* Divider */}
            <div className="t2-modal-divider-large">
              <div className="t2-modal-divider-gradient" />
              <div className="t2-modal-divider-dots">
                <span className="t2-modal-divider-dot dot-1" />
                <span className="t2-modal-divider-dot dot-2" />
                <span className="t2-modal-divider-dot dot-3" />
              </div>
              <div className="t2-modal-divider-gradient" />
            </div>

            {/* Action Buttons */}
            <div className="t2-modal-actions">
              <button onClick={onClose} className="t2-modal-close-btn">
                {t.modal.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
