"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { DEFAULT_IMAGE, formatPrice, getCurrencyLabel } from "../constants";

interface MenuCardProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    originalPrice?: number;
    discountPercent?: number;
  };
  currency: string;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, currency }) => {
  const { locale } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasDiscount = item.discountPercent && item.discountPercent > 0;
  const priceLabel = getCurrencyLabel(locale, currency);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative overflow-hidden rounded-3xl border border-violet-500/10 bg-gradient-to-br from-slate-900/80 to-violet-950/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer"
      >
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-blue-600/0 group-hover:from-violet-600/10 group-hover:to-blue-600/10 transition-all duration-500" />

        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={item.image || DEFAULT_IMAGE}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 start-4 px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-bold rounded-full shadow-lg shadow-violet-500/30">
              -{item.discountPercent}%
            </div>
          )}

          {/* View Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Icon name="eye-line" size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <h3 className="font-bold text-white text-lg line-clamp-1 mb-2 group-hover:text-violet-200 transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-violet-300/60 line-clamp-2 mb-4 min-h-[40px]">
            {item.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              {formatPrice(item.price, locale)} {priceLabel}
            </span>
            {hasDiscount && item.originalPrice && (
              <span className="text-sm text-violet-400/40 line-through">
                {formatPrice(item.originalPrice, locale)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="lg"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="relative w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden ring-2 ring-violet-500/20">
            <Image
              src={item.image || DEFAULT_IMAGE}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-black text-white mb-4">
              {item.name}
            </h2>
            <p className="text-violet-200/70 mb-8 leading-relaxed text-lg">{item.description}</p>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {formatPrice(item.price, locale)} {priceLabel}
              </span>
              {hasDiscount && item.originalPrice && (
                <>
                  <span className="text-xl text-violet-400/40 line-through">
                    {formatPrice(item.originalPrice, locale)}
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-violet-600/30 to-blue-600/30 text-violet-300 text-sm font-bold rounded-xl border border-violet-500/20">
                    -{item.discountPercent}%
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
