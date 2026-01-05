"use client";

import React from "react";
import { LanguageProvider } from "./context";
import {
  Navbar,
  HeroSection,
  AdBanner,
  MenuSection,
  OffersSection,
  Footer,
  ENSFixedBanner,
} from "./components";
import { globalStyles } from "./styles";
import { TemplateProps } from "../types";

export default function Template1({
  menuData,
  slug,
  selectedCategory,
  onCategoryChange,
  onShowRatingModal,
}: TemplateProps) {
  const discountedItems = menuData.items.filter(
    (item) => item.discountPercent && item.discountPercent > 0
  );

  return (
    <LanguageProvider>
      {/* Galaxy Background Container */}
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-violet-950/50 to-slate-950 text-white font-sans relative overflow-hidden">
        {/* Global Styles */}
        <style jsx global>
          {globalStyles}
        </style>

        {/* Stars Layer */}
        <div className="fixed inset-0 stars-bg opacity-40 pointer-events-none" />
        
        {/* Nebula Effects */}
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed top-1/2 left-0 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <Navbar menuName={menuData.menu.name} logo={menuData.menu.logo} />
          
          <HeroSection
            menuName={menuData.menu.name}
            description={menuData.menu.description}
            logo={menuData.menu.logo}
            rating={menuData.rating}
          />

          {/* Ad Banner - Shows discounted items or default ads */}
          <AdBanner items={discountedItems} currency={menuData.menu.currency || "EGP"} />

          <MenuSection
            categories={menuData.categories || []}
            items={menuData.items}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            currency={menuData.menu.currency || "SAR"}
          />

          {/* Offers Section - Shows discounted items or default offers */}
          <OffersSection items={discountedItems} currency={menuData.menu.currency || "EGP"} />

          <Footer menuName={menuData.menu.name} branches={menuData.branches} />
        </div>

        {/* ENS Banner */}
        {menuData.menu.ownerPlanType === "free" && <ENSFixedBanner />}
      </div>
    </LanguageProvider>
  );
}
