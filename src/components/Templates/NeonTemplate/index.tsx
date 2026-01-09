"use client";

import React from "react";
import { AdSpace } from "./components/AdSpace";
import { Navbar } from "./components/Navbar";
import { QRCodeSection } from "./components/QRCodeSection";
import { TemplatesSection } from "./components/TemplatesSection";
import { Footer } from "./components/Footer";
import { TemplateProps } from "../types";

function NeonTemplate({
  menuData,
  slug,
  selectedCategory,
  onCategoryChange,
  onShowRatingModal,
}: TemplateProps) {
  // Get customizations from menuData
  const customizations = menuData.customizations || {};

  // Extract colors for all components
  const primaryColor = customizations.primaryColor || "#14b8a6";
  const secondaryColor = customizations.secondaryColor || "#06b6d4";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <AdSpace
        position="left"
        menuId={menuData.menu.id}
        ownerPlanType={menuData.menu.ownerPlanType}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <AdSpace
        position="right"
        menuId={menuData.menu.id}
        ownerPlanType={menuData.menu.ownerPlanType}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />

      <Navbar
        menuName={menuData.menu.name}
        logo={menuData.menu.logo}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <main>
        <TemplatesSection
          menuData={menuData}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          customizations={customizations}
        />
        <QRCodeSection
          slug={slug}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </main>
      <Footer
        menuName={menuData.menu.name}
        branches={menuData.branches}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </div>
  );
}

export default NeonTemplate;
