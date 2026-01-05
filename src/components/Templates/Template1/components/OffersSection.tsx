"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { Icon } from "./Icon";
import { DEFAULT_IMAGE, defaultData, formatPrice, getCurrencyLabel } from "../constants";

interface OfferItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  originalPrice?: number;
  discountPercent?: number;
}

interface OffersSectionProps {
  items?: OfferItem[];
  currency?: string;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ items = [], currency = "EGP" }) => {
  const { t, locale } = useLanguage();

  const offers = items.length > 0 ? items : defaultData[locale].offers;
  if (offers.length === 0) return null;

  return (
    <section className="relative py-16 px-4">
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h2 className="mb-2 text-3xl font-black text-white md:text-4xl">
            <Icon name="fire-fill" size={32} className="me-3 inline text-orange-400" />
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {t.offers.title}
            </span>
          </h2>
          <p className="text-violet-300/60">{t.offers.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-slate-900/80 to-orange-950/30 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/20"
            >
              {/* Badges */}
              <div className="absolute end-4 top-4 z-10 flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30">
                <Icon name="fire-fill" size={24} className="text-white" />
              </div>
              {offer.discountPercent && (
                <div className="absolute start-4 top-4 z-10 rounded-full bg-gradient-to-r from-orange-600 to-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  -{offer.discountPercent}%
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-orange-900/20">
                <Image
                  src={offer.image || DEFAULT_IMAGE}
                  alt={offer.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="relative -mt-16 p-6">
                <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-orange-200">
                  {offer.name}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-violet-300/60">{offer.description}</p>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-2xl font-black text-transparent">
                    {formatPrice(offer.price, locale)} {getCurrencyLabel(locale, currency)}
                  </span>
                  {offer.originalPrice && (
                    <span className="text-sm text-orange-400/40 line-through">
                      {formatPrice(offer.originalPrice, locale)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
