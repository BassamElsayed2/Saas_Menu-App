"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { MenuItem, Ad } from "../../types";
import { MenuCard } from "./MenuCard";
import { SearchBar } from "./SearchBar";

interface MenuSectionProps {
  items: MenuItem[];
  ads: Ad[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  onItemClick: (item: MenuItem) => void;
}

// Default mid-menu ad data
const defaultMidMenuAd: Ad = {
  id: 999999,
  position: "mid-menu",
  isActive: true,
  title: {
    ar: "عروض اليوم الخاصة",
    en: "Today's Special Offers"
  },
  description: {
    ar: "استمتع بأشهى الأطباق مع خصومات حصرية تصل إلى 30% على جميع الوجبات المميزة",
    en: "Enjoy the most delicious dishes with exclusive discounts up to 30% on all special meals"
  },
  buttonText: {
    ar: "اطلب الآن",
    en: "Order Now"
  },
  link: "#menu",
  image: "/images/restaurant/order1.jpg",
  bgColor: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 50%, #FFB366 100%)"
};

export function MenuSection({
  items,
  ads,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  setIsSearchOpen,
  onItemClick,
}: MenuSectionProps) {
  const { t, lang } = useLanguage();

  // Get mid-menu ads or use default
  const midMenuAds = ads.filter((ad) => ad.position === "mid-menu" && ad.isActive);
  const displayMidMenuAds = midMenuAds.length > 0 ? midMenuAds : [defaultMidMenuAd];

  return (
    <section id="menu" className="t2-menu-section">
      {/* Background Decorations */}
      <div className="t2-menu-bg-decor top" />
      <div className="t2-menu-bg-decor bottom" />
      <div className="t2-menu-floating-decor t2-animate-float" />

      <div className="t2-menu-inner">
        {/* Section Header */}
        <div className="t2-menu-header">
          <span className="t2-menu-subtitle t2-animate-fade-in-up">
            {t.menu.subtitle}
          </span>
          <h2 className="t2-menu-title t2-animate-fade-in-up t2-delay-100">
            {t.menu.title} <span className="t2-menu-title-highlight">{t.menu.titleHighlight}</span>
          </h2>
          <p className="t2-menu-description t2-animate-fade-in-up t2-delay-200">
            {t.menu.description}
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          hasResults={items.length > 0}
        />

        {/* Menu Grid */}
        {items.length > 0 ? (
          <div className="t2-menu-grid">
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <MenuCard item={item} index={index} onClick={() => onItemClick(item)} />

                {/* إعلان بعد المنتج السادس */}
                {index === 5 && displayMidMenuAds.map((ad) => (
                  <div
                    key={`ad-${ad.id}`}
                    className="t2-mid-menu-ad t2-animate-fade-in-up"
                    style={{
                      background: ad.bgColor,
                      animationDelay: `${(index + 1) * 100}ms`,
                    }}
                  >
                    <div className="t2-mid-menu-ad-content">
                      <span className="t2-mid-menu-ad-badge">
                        🎉 {lang === "ar" ? "عرض حصري" : "Exclusive Offer"}
                      </span>
                      <h3 className="t2-mid-menu-ad-title">
                        {ad.title[lang]}
                      </h3>
                      <p className="t2-mid-menu-ad-description">
                        {ad.description[lang]}
                      </p>
                      <a href={ad.link} className="t2-mid-menu-ad-button">
                        {ad.buttonText[lang]}
                        <i className="ri-arrow-right-line" />
                      </a>
                    </div>

                    <div className="t2-mid-menu-ad-image">
                      <Image
                        src={ad.image}
                        alt={ad.title[lang]}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="200px"
                      />
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="t2-no-products">
            <p>{t.menu.noProducts}</p>
          </div>
        )}
      </div>
    </section>
  );
}
