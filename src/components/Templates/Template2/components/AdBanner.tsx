"use client";

import React from "react";
import Image from "next/image";
import { Ad } from "../../types";
import { useLanguage } from "../context";

// ============================
// After Hero Ad
// ============================

interface AfterHeroAdProps {
  ads: Ad[];
}

export function AfterHeroAd({ ads }: AfterHeroAdProps) {
  const { t, lang } = useLanguage();

  const afterHeroAd = ads.find(
    (ad) => ad.position === "after-hero" && ad.isActive
  );

  if (!afterHeroAd) return null;

  return (
    <section className="t2-ad-section">
      <div className="t2-ad-inner t2-animate-fade-in-up">
        <div className="t2-ad-card" style={{ background: afterHeroAd.bgColor }}>
          <div className="t2-ad-grid">
            {/* Image */}
            <div className="t2-ad-image">
              <Image
                src={afterHeroAd.image}
                alt={
                  typeof afterHeroAd.title === "object"
                    ? afterHeroAd.title[lang as "ar" | "en"]
                    : afterHeroAd.title
                }
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="t2-ad-image-overlay" />
            </div>

            {/* Content */}
            <div className="t2-ad-content">
              <h3 className="t2-ad-title">
                {typeof afterHeroAd.title === "object"
                  ? afterHeroAd.title[lang as "ar" | "en"]
                  : afterHeroAd.title}
              </h3>
              <p className="t2-ad-description">
                {typeof afterHeroAd.description === "object"
                  ? afterHeroAd.description[lang as "ar" | "en"]
                  : afterHeroAd.description}
              </p>
              {afterHeroAd.link && (
                <a href={afterHeroAd.link} className="t2-ad-button">
                  {typeof afterHeroAd.buttonText === "object"
                    ? afterHeroAd.buttonText[lang as "ar" | "en"]
                    : afterHeroAd.buttonText || t.ads.orderNow}
                  <i className="ri-arrow-right-line" />
                </a>
              )}
            </div>
          </div>

          {/* Decorative Badge */}
          <div className="t2-ad-badge">{t.ads.specialOffer}</div>
        </div>
      </div>
    </section>
  );
}

// ============================
// Mid Menu Ad
// ============================

interface MidMenuAdProps {
  ad: Ad;
}

export function MidMenuAd({ ad }: MidMenuAdProps) {
  const { t, lang } = useLanguage();

  return (
    <div className="t2-mid-menu-ad" style={{ background: ad.bgColor }}>
      <div className="t2-mid-menu-ad-content">
        <span className="t2-mid-menu-ad-badge">{t.ads.specialOffer}</span>
        <h3 className="t2-mid-menu-ad-title">
          {typeof ad.title === "object" ? ad.title[lang as "ar" | "en"] : ad.title}
        </h3>
        <p className="t2-mid-menu-ad-description">
          {typeof ad.description === "object"
            ? ad.description[lang as "ar" | "en"]
            : ad.description}
        </p>
        {ad.link && (
          <a href={ad.link} className="t2-mid-menu-ad-button">
            {typeof ad.buttonText === "object"
              ? ad.buttonText[lang as "ar" | "en"]
              : ad.buttonText || t.ads.discoverMore}
            <i className="ri-arrow-right-line" />
          </a>
        )}
      </div>

      {/* Image */}
      <div className="t2-mid-menu-ad-image">
        <Image
          src={ad.image}
          alt={typeof ad.title === "object" ? ad.title[lang as "ar" | "en"] : ad.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

// ============================
// Pre Footer Ad (Free Delivery)
// ============================

interface PreFooterAdProps {
  ads: Ad[];
  phoneNumber: string;
}

export function PreFooterAd({ ads, phoneNumber }: PreFooterAdProps) {
  const { t, lang } = useLanguage();

  const preFooterAd = ads.find(
    (ad) => ad.position === "pre-footer" && ad.isActive
  );

  if (!preFooterAd) return null;

  return (
    <section className="t2-ad-section">
      <div className="t2-ad-inner t2-animate-fade-in-up">
        <div className="t2-pre-footer-ad" style={{ background: preFooterAd.bgColor }}>
          {/* Icon */}
          <div className="t2-pre-footer-ad-icon">
            <i className="ri-truck-line" />
          </div>

          <h3 className="t2-pre-footer-ad-title">
            {typeof preFooterAd.title === "object"
              ? preFooterAd.title[lang as "ar" | "en"]
              : preFooterAd.title}
          </h3>
          <p className="t2-pre-footer-ad-description">
            {typeof preFooterAd.description === "object"
              ? preFooterAd.description[lang as "ar" | "en"]
              : preFooterAd.description}
          </p>
          <a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="t2-pre-footer-ad-button"
          >
            {typeof preFooterAd.buttonText === "object"
              ? preFooterAd.buttonText[lang as "ar" | "en"]
              : preFooterAd.buttonText || t.ads.orderNow}
          </a>

          {/* Decorative Elements */}
          <div className="t2-pre-footer-ad-decor-1" />
          <div className="t2-pre-footer-ad-decor-2" />
        </div>
      </div>
    </section>
  );
}
