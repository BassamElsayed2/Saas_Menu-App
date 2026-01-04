"use client";

import React from "react";
import { useLanguage } from "../context";

const Header: React.FC = () => {
  const { t, toggleLanguage, language } = useLanguage();

  return (
    <header className="t3-header">
      <div className="t3-header-inner t3-glass-card">
        <nav className="t3-header-nav">
          {/* Logo */}
          <div className="t3-header-logo">
            <div className="t3-header-logo-icon t3-gradient-animated">
              <span style={{ color: "var(--t3-primary-fg)", fontWeight: "bold", fontSize: "1.25rem" }}>
                م
              </span>
            </div>
            <span className="t3-header-logo-text">{t.nav.onlineMenu}</span>
          </div>

          {/* Navigation Links */}
          <div className="t3-header-links">
            {["menu", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="t3-header-link"
              >
                {t.nav[item as keyof typeof t.nav]}
              </a>
            ))}
          </div>

          {/* Language Toggle */}
          <button onClick={toggleLanguage} className="t3-lang-btn t3-glass-card">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              language
            </span>
            <span>{language === "en" ? "العربية" : "English"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

