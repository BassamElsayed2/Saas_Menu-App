"use client";

import React from "react";
import { useLanguage } from "../context";

interface HeroSectionProps {
  menuName: string;
  description?: string;
  logo?: string;
  rating?: { average: number; total: number };
  particles: Array<{ left: number; top: number; delay: number }>;
  onScrollToMenu: () => void;
}

export function HeroSection({
  particles,
  onScrollToMenu,
}: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="t2-hero">
      {/* Enhanced Particles */}
      <div className="t2-hero-particles">
        {particles.map((particle, i) => (
          <div
            key={i}
            className={`t2-particle t2-animate-particle ${i % 3 === 0 ? "large" : "small"} ${i % 2 === 0 ? "orange" : "cream"}`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative Shapes */}
      <div className="t2-hero-shapes">
        <div className="t2-hero-shape shape-1 t2-animate-float" />
        <div className="t2-hero-shape shape-2 t2-animate-float t2-delay-300" />
      </div>

      {/* Background overlay */}
      <div className="t2-hero-overlay" />

      {/* Content */}
      <div className="t2-hero-content">
        {/* Since Badge */}
        <div className="t2-hero-badge-container t2-animate-fade-in-up">
          <span className="t2-hero-badge-line left" />
          <div className="t2-hero-badge">
            <i className="ri-sparkle-line" />
            <span>{t.hero.since}</span>
            <i className="ri-sparkle-line" />
          </div>
          <span className="t2-hero-badge-line right" />
        </div>

        {/* Title */}
        <h1 className="t2-hero-title t2-animate-fade-in-up t2-delay-200">
          {t.hero.title} <span className="t2-hero-title-highlight">{t.hero.titleHighlight}</span>
        </h1>

        {/* Tagline */}
        <p className="t2-hero-tagline t2-animate-fade-in-up t2-delay-300">
          {t.hero.tagline}
        </p>

        {/* CTA Button */}
        <button onClick={onScrollToMenu} className="t2-hero-cta t2-animate-fade-in-up t2-delay-400">
          <span className="shimmer" />
          {t.hero.cta}
          <i className="ri-arrow-down-s-line" />
        </button>
      </div>
    </section>
  );
}
