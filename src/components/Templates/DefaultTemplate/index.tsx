"use client";

import React from "react";
import { LanguageProvider } from "./context";
import {
  Navbar,
  HeroSection,
  AdBanner,
  MenuSection,
  OffersSection,
  ENSServicesSection,
  Footer,
  ENSFixedBanner,
} from "./components";
import { globalStyles } from "./styles";

// ============================
// Main App Component
// ============================

export default function DefaultTemplate() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        <style jsx global>
          {globalStyles}
        </style>

        {/* Layout */}
        <Navbar />
        <HeroSection />
        <AdBanner />
        <MenuSection />
        <OffersSection />
        <ENSServicesSection />
        <Footer />
        <ENSFixedBanner />
      </div>
    </LanguageProvider>
  );
}
