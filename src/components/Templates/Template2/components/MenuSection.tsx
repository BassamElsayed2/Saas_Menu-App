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
  const { t, isRTL, lang } = useLanguage();

  // Get mid-menu ads or use default
  const midMenuAds = ads.filter((ad) => ad.position === "mid-menu" && ad.isActive);
  const displayMidMenuAds = midMenuAds.length > 0 ? midMenuAds : [defaultMidMenuAd];

  return (
    <section
      id="menu"
      style={{
        padding: "120px 16px 96px",
        background: "linear-gradient(180deg, #FAF3E1 0%, #FFF8E7 50%, #F5EDD5 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Background Decorations */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          [isRTL ? "right" : "left"]: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255, 109, 31, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          [isRTL ? "left" : "right"]: "-5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(245, 231, 198, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />
      <div
        className="animate-float"
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, rgba(255, 109, 31, 0.1), rgba(255, 154, 77, 0.05))",
          borderRadius: "50%",
          filter: "blur(20px)",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span
            className="animate-fade-in-up"
            style={{
              display: "inline-block",
              color: "#FF6D1F",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "16px",
              opacity: 0,
              position: "relative",
              padding: "8px 20px",
              background: "linear-gradient(135deg, rgba(255, 109, 31, 0.08), rgba(255, 154, 77, 0.12))",
              backdropFilter: "blur(10px)",
              borderRadius: "999px",
              border: "1.5px solid rgba(255, 109, 31, 0.2)",
              boxShadow: "0 4px 16px rgba(255, 109, 31, 0.1)",
            }}
          >
            {t.menu.subtitle}
          </span>
          <h2
            className="animate-fade-in-up delay-100"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: "900",
              color: "#1a1a1a",
              marginBottom: "16px",
              opacity: 0,
              lineHeight: "1.2",
              letterSpacing: "-1px",
            }}
          >
            {t.menu.title}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                position: "relative",
                display: "inline-block",
              }}
            >
              {t.menu.titleHighlight}
              <span
                style={{
                  position: "absolute",
                  bottom: "3px",
                  left: 0,
                  right: 0,
                  height: "8px",
                  background: "rgba(255, 109, 31, 0.12)",
                  zIndex: -1,
                  borderRadius: "3px",
                }}
              />
            </span>
          </h2>
          <p
            className="animate-fade-in-up delay-200"
            style={{
              color: "rgba(26, 26, 26, 0.7)",
              fontSize: "14px",
              maxWidth: "560px",
              margin: "0 auto",
              opacity: 0,
              lineHeight: "1.6",
            }}
          >
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "32px",
            }}
          >
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <MenuCard item={item} index={index} onClick={() => onItemClick(item)} />

                {/* إعلان بعد المنتج السادس */}
                {index === 5 && displayMidMenuAds.map((ad) => (
                    <div
                      key={`ad-${ad.id}`}
                      className="animate-fade-in-up"
                      style={{
                        gridColumn: "1 / -1",
                        position: "relative",
                        background: ad.bgColor,
                        borderRadius: "20px",
                        overflow: "hidden",
                        padding: "32px",
                        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
                        opacity: 0,
                        animationDelay: `${(index + 1) * 100}ms`,
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          gap: "24px",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: "inline-block",
                              background: "rgba(255, 255, 255, 0.2)",
                              padding: "6px 16px",
                              borderRadius: "999px",
                              fontSize: "11px",
                              fontWeight: "700",
                              color: "white",
                              marginBottom: "12px",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                            }}
                          >
                            🎉 {lang === "ar" ? "عرض حصري" : "Exclusive Offer"}
                          </div>
                          <h3
                            style={{
                              fontSize: "clamp(22px, 4vw, 32px)",
                              fontWeight: "900",
                              color: "white",
                              marginBottom: "12px",
                              lineHeight: "1.2",
                            }}
                          >
                            {ad.title[lang]}
                          </h3>
                          <p
                            style={{
                              fontSize: "clamp(14px, 2.5vw, 18px)",
                              color: "rgba(255, 255, 255, 0.95)",
                              marginBottom: "20px",
                              lineHeight: "1.5",
                            }}
                          >
                            {ad.description[lang]}
                          </p>
                          <a
                            href={ad.link}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              background: "white",
                              color: "#1a1a1a",
                              padding: "12px 28px",
                              borderRadius: "999px",
                              fontWeight: "700",
                              fontSize: "14px",
                              textDecoration: "none",
                              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                              transition: "all 0.3s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-3px)";
                              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
                            }}
                          >
                            {ad.buttonText[lang]}
                            <i className="ri-arrow-right-line" style={{ fontSize: "18px" }} />
                          </a>
                        </div>

                        <div
                          style={{
                            position: "relative",
                            width: "200px",
                            height: "200px",
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <Image
                            src={ad.image}
                            alt={ad.title[lang]}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="200px"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ color: "rgba(34, 34, 34, 0.7)", fontSize: "18px" }}>{t.menu.noProducts}</p>
          </div>
        )}
      </div>
    </section>
  );
}
