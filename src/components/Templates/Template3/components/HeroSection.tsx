"use client";

import React from "react";
import { useLanguage } from "../context";

interface HeroSectionProps {
  onScrollToMenu: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToMenu }) => {
  const { t } = useLanguage();

  return (
    <section className="t3-hero" id="hero">
      {/* Background */}
      <div className="t3-hero-bg" />
      
      {/* Animated glow orbs */}
      <div className="t3-hero-orb t3-hero-orb-1" />
      <div className="t3-hero-orb t3-hero-orb-2" />

      {/* Grid pattern for depth - 3D perspective lines */}
      <div className="t3-hero-grid" />

      {/* Floating decorative elements */}
      <div className="t3-hero-float-element t3-hero-float-1 t3-glass-card" />
      <div className="t3-hero-float-element t3-hero-float-2 t3-gradient-animated" />
      <div className="t3-hero-float-element t3-hero-float-3 t3-glass-card" />

      {/* Main content */}
      <div className="t3-hero-content">
        {/* Badge */}
        <div className="t3-hero-badge t3-glass-card t3-fade-in">
          <span className="t3-hero-badge-dot t3-pulse-glow" />
          <span className="t3-hero-badge-text">{t.hero.badge}</span>
        </div>

        {/* Title */}
        <h1 className="t3-hero-title t3-text-gradient t3-glow-text t3-slide-up">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="t3-hero-subtitle t3-fade-in" style={{ animationDelay: "0.3s" }}>
          {t.hero.subtitle}
        </p>

        {/* CTA Button */}
        <button
          className="t3-btn-primary t3-hero-cta t3-scale-in"
          style={{ animationDelay: "0.5s" }}
          onClick={onScrollToMenu}
        >
          {t.hero.cta}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="t3-hero-scroll t3-fade-in t3-float" style={{ animationDelay: "1s" }}>
        <span className="t3-hero-scroll-text">{t.hero.scroll}</span>
        <span className="material-symbols-outlined">expand_more</span>
      </div>

      {/* Cinematic light overlay */}
      <div className="t3-cinematic-light" />
    </section>
  );
};

export default HeroSection;
