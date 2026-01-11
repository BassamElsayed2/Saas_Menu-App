"use client";

import React from "react";

interface HeroSectionProps {
  menuName: string;
  description?: string;
  establishedYear?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  menuName,
  description,
  establishedYear = "2020",
}) => {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Established Year */}
        <p className="text-xs md:text-sm text-[var(--text-muted)] mb-4 tracking-[0.28em] uppercase">
          ESTABLISHED {establishedYear}
        </p>

        {/* Main Title */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[var(--accent)] mb-5">
          Our Menu
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
          {description ||
            "Discover our carefully curated selection of handcrafted coffee, premium teas, and fresh juices. Each drink tells a story."}
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 my-10">
          <div className="h-px bg-[var(--border-main)] flex-1 max-w-[120px]"></div>
          <i className="ri-leaf-line text-[var(--accent)] text-xl"></i>
          <div className="h-px bg-[var(--border-main)] flex-1 max-w-[120px]"></div>
        </div>
      </div>
    </section>
  );
};
