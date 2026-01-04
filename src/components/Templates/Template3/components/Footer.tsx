"use client";

import React from "react";
import { useLanguage } from "../context";
import { Branch } from "../../types";

interface FooterProps {
  menuName?: string;
  branches?: Branch[];
}

const Footer: React.FC<FooterProps> = ({ menuName, branches }) => {
  const { t } = useLanguage();
  const phone = branches?.[0]?.phone || "+20 1000000000";

  return (
    <footer className="t3-footer">
      <div className="t3-footer-bg" />
      <div className="t3-footer-top-line" />

      <div className="t3-container t3-footer-content">
        <div className="t3-footer-grid">
          {/* Brand */}
          <div className="t3-footer-col t3-fade-in">
            <div className="t3-footer-brand">
              <div className="t3-footer-brand-icon">
                <i className="ri-restaurant-line" style={{ fontSize: "18px", color: "var(--t3-primary)" }} />
              </div>
              <h3 className="t3-footer-brand-name">{menuName || t.footer.brand}</h3>
            </div>
            <p className="t3-footer-desc">{t.footer.description}</p>
          </div>

          {/* Contact */}
          <div className="t3-footer-col t3-fade-in" style={{ animationDelay: "0.1s" }}>
            <h4 className="t3-footer-title">{t.footer.contactTitle}</h4>
            <div className="t3-footer-contact">
              <p className="t3-footer-contact-item">
                <span className="material-symbols-outlined">location_on</span>
                {branches?.[0]?.address || t.footer.location}
              </p>
              <p className="t3-footer-contact-item">
                <span className="material-symbols-outlined">phone</span>
                {phone}
              </p>
              <p className="t3-footer-contact-item">
                <span className="material-symbols-outlined">schedule</span>
                {t.footer.hours}
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="t3-footer-col t3-fade-in" style={{ animationDelay: "0.2s" }}>
            <h4 className="t3-footer-title">{t.footer.followTitle}</h4>
            <div className="t3-footer-social">
              <a href="#" className="t3-footer-social-link">
                <i className="ri-facebook-fill" />
              </a>
              <a href="#" className="t3-footer-social-link">
                <i className="ri-instagram-line" />
              </a>
              <a href="#" className="t3-footer-social-link">
                <i className="ri-twitter-x-line" />
              </a>
            </div>
          </div>
        </div>

        <div className="t3-footer-divider" />

        <div className="t3-footer-bottom t3-fade-in">
          <p>
            © {new Date().getFullYear()} {menuName || t.footer.brand} — {t.footer.rights}
          </p>
          <p className="t3-footer-credit" dir="ltr">
            {t.footer.designedBy}{" "}
            <a href="https://www.facebook.com/ENSEGYPTEG" target="_blank" rel="noopener noreferrer">
              ENS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

