"use client";

import React from "react";
import Image from "next/image";
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
  menuName,
  description,
  logo,
  rating,
  particles,
  onScrollToMenu,
}: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section
          style={{
            position: "relative",
            minHeight: "55vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "linear-gradient(135deg, #FFF8E7 0%, #FAF3E1 50%, #F5EDD5 100%)",
            paddingTop: "100px",
            paddingBottom: "40px",
          }}
        >
          {/* Enhanced Particles */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            {particles.map((particle, i) => (
              <div
                key={i}
                className="animate-particle"
                style={{
                  position: "absolute",
                  width: i % 3 === 0 ? "12px" : "8px",
                  height: i % 3 === 0 ? "12px" : "8px",
                  borderRadius: "50%",
                  background: i % 2 === 0 
                    ? "linear-gradient(135deg, rgba(255, 109, 31, 0.3), rgba(255, 154, 77, 0.2))"
                    : "linear-gradient(135deg, rgba(245, 231, 198, 0.4), rgba(255, 255, 255, 0.3))",
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  boxShadow: i % 3 === 0 ? "0 0 20px rgba(255, 109, 31, 0.3)" : "none",
                }}
              />
            ))}
          </div>

          {/* Decorative Shapes */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <div
              className="animate-float"
              style={{
                position: "absolute",
                top: "10%",
                right: "5%",
                width: "300px",
                height: "300px",
                background: "radial-gradient(circle, rgba(255, 109, 31, 0.08) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(40px)",
              }}
            />
            <div
              className="animate-float delay-300"
              style={{
                position: "absolute",
                bottom: "15%",
                left: "8%",
                width: "250px",
                height: "250px",
                background: "radial-gradient(circle, rgba(245, 231, 198, 0.12) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(40px)",
              }}
            />
          </div>

          {/* Background overlay */}
          <div style={{ position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(255, 248, 231, 0) 0%, rgba(250, 243, 225, 0.5) 60%, rgba(250, 243, 225, 0.9) 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
              padding: "0 16px",
              maxWidth: "896px",
              margin: "0 auto",
            }}
          >
            {/* Since Badge - Enhanced */}
            <div
              className="animate-fade-in-up"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "20px",
                opacity: 0,
              }}
            >
              <span
                style={{
                  width: "48px",
                  height: "2px",
                  background: "linear-gradient(to right, transparent, rgba(255, 109, 31, 0.5), rgba(255, 109, 31, 0.8))",
                  borderRadius: "999px",
                }}
              />
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(255, 109, 31, 0.1), rgba(255, 154, 77, 0.15))",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid rgba(255, 109, 31, 0.3)",
                  borderRadius: "999px",
                  padding: "6px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 16px rgba(255, 109, 31, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.5)",
                }}
              >
                <i className="ri-sparkle-line" style={{ fontSize: "14px", color: "#FF6D1F" }} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.15em",
                    color: "#FF6D1F",
                    textTransform: "uppercase",
                  }}
                >
                  {t.hero.since}
                </span>
                <i className="ri-sparkle-line" style={{ fontSize: "14px", color: "#FF6D1F" }} />
              </div>
              <span
                style={{
                  width: "48px",
                  height: "2px",
                  background: "linear-gradient(to left, transparent, rgba(255, 109, 31, 0.5), rgba(255, 109, 31, 0.8))",
                  borderRadius: "999px",
                }}
              />
            </div>

            {/* Title - Enhanced */}
            <h1
              className="animate-fade-in-up delay-200"
              style={{
                fontSize: "clamp(40px, 8vw, 72px)",
                fontWeight: "900",
                color: "#1a1a1a",
                marginBottom: "20px",
                opacity: 0,
                lineHeight: "1.1",
                letterSpacing: "-1.5px",
              }}
            >
              {t.hero.title}{" "}
              <span 
                style={{ 
                  background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 50%, #FFB366 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                {t.hero.titleHighlight}
                <span
                  style={{
                    position: "absolute",
                    bottom: "6px",
                    left: 0,
                    right: 0,
                    height: "8px",
                    background: "rgba(255, 109, 31, 0.15)",
                    zIndex: -1,
                    borderRadius: "4px",
                  }}
                />
              </span>
            </h1>

            {/* Tagline - Enhanced */}
            <p
              className="animate-fade-in-up delay-300"
              style={{
                fontSize: "clamp(14px, 2.5vw, 17px)",
                color: "rgba(26, 26, 26, 0.75)",
                marginBottom: "32px",
                maxWidth: "560px",
                margin: "0 auto 32px",
                lineHeight: "1.6",
                opacity: 0,
                fontWeight: "400",
              }}
            >
              {t.hero.tagline}
            </p>

            {/* CTA Button - Enhanced */}
            <button
              onClick={onScrollToMenu}
              className="animate-fade-in-up delay-400"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 50%, #FF9A4D 100%)",
                color: "white",
                padding: "14px 32px",
                borderRadius: "999px",
                fontWeight: "700",
                fontSize: "15px",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 12px 32px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
                border: "none",
                cursor: "pointer",
                opacity: 0,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(255, 109, 31, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)";
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                  animation: "shimmer 2s infinite",
                }}
              />
              {t.hero.cta}
              <i className="ri-arrow-down-s-line" style={{ fontSize: "18px", transition: "transform 0.3s" }} />
            </button>
          </div>
        </section>
  );
}
