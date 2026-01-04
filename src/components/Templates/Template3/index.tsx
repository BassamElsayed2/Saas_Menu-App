"use client";

import React, { useMemo } from "react";
import "remixicon/fonts/remixicon.css";
import "./styles.css";
import { TemplateProps } from "../types";
import { LanguageProvider, useLanguage } from "./context";
import {
  Header,
  HeroSection,
  MenuSection,
  Footer,
  MobileNav,
} from "./components";

// ============================
// Template3 Inner Component (with context access)
// ============================

interface Template3InnerProps extends TemplateProps {}

function Template3Inner({
  menuData,
  selectedCategory,
  onCategoryChange,
}: Template3InnerProps) {
  const { t } = useLanguage();

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  // Build categories from menuData
  const categories = useMemo(() => [
    { id: "all", name: t.menu.all },
    ...(menuData.categories || []).map((cat) => ({
      id: cat.id.toString(),
      name: cat.name,
    })),
  ], [menuData.categories, t.menu.all]);

  return (
    <div className="t3-wrapper" dir={t.dir} lang={t.lang}>
      {/* Material Symbols */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection onScrollToMenu={scrollToMenu} />

      {/* Menu Section */}
      <MenuSection
        items={menuData.items}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      {/* Footer */}
      <Footer
        menuName={menuData.menu.name}
        branches={menuData.branches}
      />

      {/* Mobile Nav */}
      <MobileNav />

      {/* Cinematic Light Overlay */}
      <div className="t3-cinematic-light" />
    </div>
  );
}

// ============================
// Template3 - Main Export with Provider
// ============================

export default function Template3(props: TemplateProps) {
  return (
    <LanguageProvider>
      <Template3Inner {...props} />
    </LanguageProvider>
  );
}
