"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLanguage } from "../context";
import { MenuItem } from "../../types";

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ item, onClose }) => {
  const { t, language } = useLanguage();
  const currency = language === "ar" ? "ج.م" : "EGP";

  if (!item) return null;

  const hasDiscount = item.originalPrice && item.discountPercent;

  return (
    <Transition appear show={!!item} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[hsl(20,10%,5%)]/90 backdrop-blur-xl" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4 perspective-1000">
          <Transition.Child
            as={Fragment}
            enter="ease-[cubic-bezier(0.34,1.56,0.64,1)] duration-500"
            enterFrom="opacity-0 scale-75 translate-y-20"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90 translate-y-8"
          >
            <Dialog.Panel 
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl t3-glass-card shadow-2xl"
              style={{ 
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 60px rgba(255,140,0,0.1)",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Close button with rotation hover */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 w-10 h-10 rounded-full t3-glass-card flex items-center justify-center text-white/70 hover:text-white hover:rotate-90 transition-all duration-300"
              >
                <i className="ri-close-line text-xl" />
              </button>

              {/* Image with depth effect */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,15%,8%)] via-[hsl(20,15%,8%)]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[hsl(20,15%,8%)]/30 via-transparent to-transparent" />
                
                {/* Floating price badge */}
                <div 
                  className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 px-5 py-2.5 rounded-full font-bold text-xl t3-gradient-animated text-white animate-float"
                  style={{ 
                    boxShadow: "0 0 25px hsla(30, 100%, 50%, 0.4)",
                    animation: "float 4s ease-in-out infinite"
                  }}
                >
                  {hasDiscount && (
                    <span className="text-sm text-white/60 line-through mr-2 rtl:mr-0 rtl:ml-2">
                      {item.originalPrice}
                    </span>
                  )}
                  {item.price} {currency}
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-14 flex gap-2">
                  {(item.isHot || item.isBestSeller) && (
                    <span 
                      className="px-3 py-1.5 rounded-full text-xs font-semibold t3-gradient-animated text-white"
                      style={{ boxShadow: "0 0 15px hsla(30, 100%, 50%, 0.4)" }}
                    >
                      ⭐ {t.menu.featured}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 shadow-lg">
                      -{item.discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              {/* Content with staggered animation feel */}
              <div className="p-6 md:p-8 space-y-5">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold t3-text-gradient t3-glow-text">
                  {item.name}
                </h2>
                
                {/* Description */}
                <p className="text-gray-400 text-base leading-relaxed">
                  {item.description}
                </p>

                {/* Info badges with hover effects */}
                {(item.calories || item.prepTime || item.isVegetarian || item.isHot) && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {item.prepTime && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm t3-glass-card border border-orange-500/20 text-white/80 hover:scale-105 transition-transform cursor-default">
                        <i className="ri-time-line text-orange-500" />
                        {item.prepTime}
                      </span>
                    )}
                    {item.calories && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm t3-glass-card border border-orange-500/20 text-white/80 hover:scale-105 transition-transform cursor-default">
                        <i className="ri-fire-line text-orange-500" />
                        {item.calories}
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-green-500/10 border border-green-500/30 text-green-400 hover:scale-105 transition-transform cursor-default">
                        <i className="ri-leaf-line" />
                        {language === "ar" ? "نباتي" : "Vegetarian"}
                      </span>
                    )}
                    {item.isHot && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-red-500/10 border border-red-500/30 text-red-400 hover:scale-105 transition-transform cursor-default">
                        <i className="ri-fire-fill" />
                        {language === "ar" ? "حار" : "Spicy"}
                      </span>
                    )}
                  </div>
                )}

                {/* Close Button with glow */}
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-xl t3-gradient-animated text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02]"
                  style={{ boxShadow: "0 0 25px hsla(30, 100%, 50%, 0.3)" }}
                >
                  {t.close}
                </button>
              </div>

              {/* Decorative depth elements */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductModal;
