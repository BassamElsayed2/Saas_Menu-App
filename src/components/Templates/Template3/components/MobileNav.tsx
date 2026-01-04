"use client";

import React from "react";
import { useLanguage } from "../context";

const MobileNav: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    { id: "hero", icon: "home", label: t.nav.home },
    { id: "menu", icon: "restaurant_menu", label: t.nav.menu },
    { id: "contact", icon: "info", label: t.nav.contact },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="t3-mobile-nav t3-glass-card t3-fade-in">
      <div className="t3-mobile-nav-inner">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="t3-mobile-nav-btn"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;

