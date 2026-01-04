"use client";

import React from "react";
import Image from "next/image";
import { MenuItem } from "../../types";
import { useLanguage } from "../context";

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
  index?: number;
}

export function MenuCard({ item, onClick, index = 0 }: MenuCardProps) {
  const { t } = useLanguage();

  const hasDiscount = item.discountPercent && item.discountPercent > 0;
  const discountedPrice = hasDiscount
    ? item.price - (item.price * (item.discountPercent as number)) / 100
    : item.price;

  return (
    <div
      onClick={onClick}
      className="t2-menu-card t2-animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image Container */}
      <div className="t2-menu-card-image">
        <Image
          src={item.image || "/images/restaurant/default-food.jpg"}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
        />
        <div className="t2-menu-card-overlay" />

        {/* Price & Badges */}
        <div className="t2-menu-card-badges">
          <div className="t2-price-badge">
            {discountedPrice.toFixed(0)} {t.menu.currency}
          </div>

          <div className="t2-badges-row">
            {item.isBestSeller && (
              <div className="t2-badge featured">
                <i className="ri-award-line" />
                {t.menu.featured}
              </div>
            )}
            {hasDiscount && (
              <div className="t2-badge discount">
                -{item.discountPercent}%
              </div>
            )}
            {item.isHot && (
              <div className="t2-badge popular">
                <i className="ri-fire-line" />
                {t.menu.popular}
              </div>
            )}
            {item.isVegetarian && (
              <div className="t2-badge vegetarian">
                <i className="ri-leaf-line" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="t2-menu-card-content">
        <h3 className="t2-menu-card-name">{item.name}</h3>
        <p className="t2-menu-card-description">{item.description}</p>

        {/* Footer */}
        <div className="t2-menu-card-footer">
          <div className="t2-decor-lines">
            <span className="t2-decor-line primary" />
            <span className="t2-decor-line secondary" />
          </div>

          {item.prepTime && (
            <div className="t2-prep-time">
              <i className="ri-time-line" />
              {item.prepTime} {t.menu.minutes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
