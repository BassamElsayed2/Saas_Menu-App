"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { Ad } from "../../types";

// ============================
// After Hero Ad Banner
// ============================

interface AfterHeroAdProps {
  ads: Ad[];
}

export function AfterHeroAd({ ads }: AfterHeroAdProps) {
  const { lang, isRTL } = useLanguage();

  const filteredAds = ads.filter((ad) => ad.position === "after-hero" && ad.isActive);

  if (filteredAds.length === 0) return null;

  return (
    <>
      {filteredAds.map((ad) => (
        <section
          key={ad.id}
          style={{
            padding: "40px 16px",
            background: "#FAF3E1",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              className="animate-fade-in-up"
              style={{
                position: "relative",
                background: ad.bgColor,
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                opacity: 0,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isRTL ? "1fr 45%" : "45% 1fr",
                  gap: "0",
                  alignItems: "center",
                  minHeight: "280px",
                }}
                className="ad-grid"
              >
                {/* الصورة */}
                <div
                  style={{
                    position: "relative",
                    height: "280px",
                    order: isRTL ? 2 : 1,
                  }}
                >
                  <Image
                    src={ad.image}
                    alt={ad.title[lang]}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isRTL
                        ? "linear-gradient(to left, rgba(0, 0, 0, 0.3), transparent)"
                        : "linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent)",
                    }}
                  />
                </div>

                {/* المحتوى */}
                <div
                  style={{
                    padding: "40px",
                    color: "white",
                    order: isRTL ? 1 : 2,
                  }}
                >
                  <h2
                    style={{
                      fontSize: "clamp(28px, 5vw, 42px)",
                      fontWeight: "900",
                      marginBottom: "16px",
                      lineHeight: "1.2",
                      textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {ad.title[lang]}
                  </h2>
                  <p
                    style={{
                      fontSize: "clamp(16px, 3vw, 20px)",
                      marginBottom: "28px",
                      opacity: 0.95,
                      lineHeight: "1.6",
                    }}
                  >
                    {ad.description[lang]}
                  </p>
                  <a
                    href={ad.link}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "rgba(255, 255, 255, 0.95)",
                      color: "#1a1a1a",
                      padding: "14px 32px",
                      borderRadius: "999px",
                      fontWeight: "700",
                      fontSize: "16px",
                      textDecoration: "none",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
                    }}
                  >
                    {ad.buttonText[lang]}
                    <i
                      className={isRTL ? "ri-arrow-left-line" : "ri-arrow-right-line"}
                      style={{ fontSize: "20px" }}
                    />
                  </a>
                </div>
              </div>

              {/* Decorative Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  [isRTL ? "left" : "right"]: "20px",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  padding: "8px 20px",
                  borderRadius: "999px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                ⭐ {lang === "ar" ? "عرض خاص" : "Special Offer"}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

// ============================
// Mid Menu Ad
// ============================

interface MidMenuAdProps {
  ads: Ad[];
  index: number;
}

export function MidMenuAd({ ads, index }: MidMenuAdProps) {
  const { lang, isRTL } = useLanguage();

  const filteredAds = ads.filter((ad) => ad.position === "mid-menu" && ad.isActive);

  if (filteredAds.length === 0) return null;

  // Get ad based on index (cycle through if more placements than ads)
  const ad = filteredAds[index % filteredAds.length];

  return (
    <div
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
        className="mid-ad-grid"
      >
        <div style={{ textAlign: isRTL ? "right" : "left" }}>
          {/* Badge */}
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
            🎉 {lang === "ar" ? "عرض خاص" : "Special Offer"}
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
            <i
              className={isRTL ? "ri-arrow-left-line" : "ri-arrow-right-line"}
              style={{ fontSize: "18px" }}
            />
          </a>
        </div>
        {ad.image && (
          <div
            style={{
              position: "relative",
              width: "200px",
              height: "200px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            }}
            className="mid-ad-image"
          >
            <Image
              src={ad.image}
              alt={ad.title[lang]}
              fill
              style={{ objectFit: "cover" }}
              sizes="200px"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================
// Pre Footer Ad
// ============================

interface PreFooterAdProps {
  ads: Ad[];
  phoneNumber?: string;
}

export function PreFooterAd({ ads, phoneNumber }: PreFooterAdProps) {
  const { lang, isRTL, t } = useLanguage();

  const filteredAds = ads.filter((ad) => ad.position === "pre-footer" && ad.isActive);

  // If no ads, show default delivery ad
  if (filteredAds.length === 0) {
    return (
      <section
        style={{
          padding: "40px 16px",
          background: "#FAF3E1",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            className="animate-fade-in-up"
            style={{
              position: "relative",
              background: "linear-gradient(135deg, rgb(255, 141, 20) 0%, rgb(255, 143, 105) 100%)",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
              opacity: 0,
              textAlign: "center",
              padding: "48px 32px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                border: "3px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <i className="ri-truck-line" style={{ fontSize: "40px", color: "white" }} />
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 42px)",
                fontWeight: "900",
                color: "white",
                marginBottom: "16px",
                lineHeight: "1.2",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              {t.ads.freeDelivery}
            </h2>
            <p
              style={{
                fontSize: "clamp(16px, 3vw, 20px)",
                color: "rgba(255, 255, 255, 0.95)",
                marginBottom: "32px",
                maxWidth: "600px",
                margin: "0 auto 32px",
                lineHeight: "1.6",
              }}
            >
              {t.ads.freeDeliveryDesc}
            </p>
            <a
              href={`https://wa.me/${phoneNumber || "201023456789"}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "white",
                color: "#1a1a1a",
                padding: "16px 40px",
                borderRadius: "999px",
                fontWeight: "700",
                fontSize: "17px",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
              }}
            >
              {t.ads.orderNow}
              <i
                className={isRTL ? "ri-arrow-left-line" : "ri-arrow-right-line"}
                style={{ fontSize: "20px" }}
              />
            </a>
            {/* Decorative elements */}
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "150px",
                height: "150px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                filter: "blur(40px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-70px",
                left: "-70px",
                width: "180px",
                height: "180px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "50%",
                filter: "blur(50px)",
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {filteredAds.map((ad) => (
        <section
          key={ad.id}
          style={{
            padding: "40px 16px",
            background: "#FAF3E1",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              className="animate-fade-in-up"
              style={{
                position: "relative",
                background: ad.bgColor,
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                opacity: 0,
                textAlign: "center",
                padding: "48px 32px",
              }}
            >
              {ad.image && (
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto 20px",
                    border: "3px solid rgba(255, 255, 255, 0.3)",
                    position: "relative",
                  }}
                >
                  <Image
                    src={ad.image}
                    alt={ad.title[lang]}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="80px"
                  />
                </div>
              )}
              <h2
                style={{
                  fontSize: "clamp(28px, 5vw, 42px)",
                  fontWeight: "900",
                  color: "white",
                  marginBottom: "16px",
                  lineHeight: "1.2",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                {ad.title[lang]}
              </h2>
              <p
                style={{
                  fontSize: "clamp(16px, 3vw, 20px)",
                  color: "rgba(255, 255, 255, 0.95)",
                  marginBottom: "32px",
                  maxWidth: "600px",
                  margin: "0 auto 32px",
                  lineHeight: "1.6",
                }}
              >
                {ad.description[lang]}
              </p>
              <a
                href={ad.link || `https://wa.me/${phoneNumber || "201023456789"}`}
                target={ad.link?.startsWith("http") ? "_blank" : undefined}
                rel={ad.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "white",
                  color: "#1a1a1a",
                  padding: "16px 40px",
                  borderRadius: "999px",
                  fontWeight: "700",
                  fontSize: "17px",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
                }}
              >
                {ad.buttonText[lang]}
                <i
                  className={isRTL ? "ri-arrow-left-line" : "ri-arrow-right-line"}
                  style={{ fontSize: "20px" }}
                />
              </a>
              {/* Decorative elements */}
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "150px",
                  height: "150px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  filter: "blur(40px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-70px",
                  left: "-70px",
                  width: "180px",
                  height: "180px",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "50%",
                  filter: "blur(50px)",
                }}
              />
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

// ============================
// Legacy Support - AdBanner (for backward compatibility)
// ============================

interface AdBannerProps {
  ads?: Ad[];
  phoneNumber?: string;
}

export function AdBanner({ ads = [], phoneNumber }: AdBannerProps) {
  return <AfterHeroAd ads={ads} />;
}
