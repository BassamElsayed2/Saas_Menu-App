"use client";

import React, { useRef, useState } from "react";
import { useLanguage } from "../context";
import { MenuItem } from "../../types";

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  index: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onSelect, index }) => {
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const currency = language === "ar" ? "ج.م" : "EGP";
  const hasDiscount = item.originalPrice && item.discountPercent;

  // 3D tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;
    setTransform({
      rotateX: mouseY * -10,
      rotateY: mouseX * 10,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      className="opacity-0 perspective-1000"
      style={{ animation: `fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards ${index * 0.1}s` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(item)}
        className="group relative cursor-pointer rounded-2xl overflow-hidden t3-glass-card transition-all duration-500"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
          boxShadow: transform.rotateX !== 0 || transform.rotateY !== 0
            ? "0 25px 50px -12px rgba(0,0,0,0.6), 0 0 30px rgba(255,140,0,0.15)"
            : "0 10px 30px -10px rgba(0,0,0,0.4)",
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, hsla(30, 100%, 50%, 0.2) 0%, transparent 70%)",
            filter: "blur(20px)",
            zIndex: -1,
          }}
        />

        {/* Image Container with parallax */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"}
            alt={item.name}
            className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,15%,8%)] via-transparent to-transparent" />
          
          {/* Featured badge */}
          {(item.isHot || item.isBestSeller) && (
            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 px-3 py-1 rounded-full text-xs font-semibold t3-gradient-animated text-white shadow-lg"
              style={{ boxShadow: "0 0 15px hsla(30, 100%, 50%, 0.4)" }}
            >
              ⭐ {t.menu.featured}
            </div>
          )}
          
          {/* Discount badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 shadow-lg">
              -{item.discountPercent}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-semibold text-white group-hover:t3-text-gradient transition-all duration-300 line-clamp-1">
            {item.name}
          </h3>
          
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {item.description}
          </p>
          
          {/* Price & Action */}
          <div className="flex items-center justify-between pt-2">
            {/* Price Badge with glow */}
            <div 
              className="relative inline-flex items-center justify-center px-4 py-2 rounded-full font-semibold t3-gradient-animated text-white text-sm"
              style={{ boxShadow: "0 0 15px hsla(30, 100%, 50%, 0.3)" }}
            >
              {hasDiscount && (
                <span className="text-[10px] text-white/60 line-through mr-1.5 rtl:mr-0 rtl:ml-1.5">
                  {item.originalPrice}
                </span>
              )}
              {item.price} {currency}
            </div>
            
            <button
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300 text-sm font-medium flex items-center gap-1"
            >
              {t.menu.viewDetails}
              <span className="rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Edge highlight effect */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(135deg, hsla(30, 100%, 50%, 0.1) 0%, transparent 50%)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
