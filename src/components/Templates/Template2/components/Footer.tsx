"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { Branch } from "../../types";

interface FooterProps {
  menuName: string;
  description?: string;
  logo?: string;
  branches?: Branch[];
}

export function Footer({ menuName, description, logo, branches }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="t2-footer">
      <div className="t2-footer-top-border" />
      <div className="t2-footer-glow" />
      
      <div className="t2-footer-inner">
        <div className="t2-footer-grid">
          {/* Brand */}
          <div>
            <div className="t2-footer-brand-section">
              {logo ? (
                <div className="t2-footer-logo">
                  <Image src={logo} alt={menuName} fill style={{ objectFit: "cover" }} />
                </div>
              ) : (
                <div className="t2-footer-logo-placeholder">
                  <span>📋</span>
                </div>
              )}
              <h3 className="t2-footer-brand-name">
                {menuName || t.footer.brand}
                <span className="t2-footer-brand-highlight">{t.footer.brandHighlight}</span>
              </h3>
            </div>
            <p className="t2-footer-brand-description">
              {description || t.footer.description}
            </p>
          </div>

          {/* Branches */}
          {branches && branches.length > 0 && (
            <div>
              <h4 className="t2-footer-section-title">{t.footer.branches}</h4>
              <ul className="t2-footer-list">
                {branches.map((branch) => (
                  <li key={branch.id} className="t2-footer-list-item">
                    <i className="ri-map-pin-line t2-footer-list-icon" />
                    <div>
                      <p className="t2-footer-list-text">{branch.name}</p>
                      <p className="t2-footer-list-subtext">{branch.address}</p>
                      {branch.phone && (
                        <a href={`tel:${branch.phone}`} dir="ltr" className="t2-footer-link">
                          {branch.phone}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <h4 className="t2-footer-section-title">{t.footer.contactTitle}</h4>
            <ul className="t2-footer-list">
              <li className="t2-footer-list-item">
                <i className="ri-map-pin-line t2-footer-list-icon" />
                <span className="t2-footer-contact-text">{t.footer.address}</span>
              </li>
              <li className="t2-footer-list-item">
                <i className="ri-time-line t2-footer-list-icon" />
                <span className="t2-footer-contact-text">{t.footer.hours}</span>
              </li>
              <li className="t2-footer-list-item">
                <i className="ri-phone-line t2-footer-list-icon" />
                <a href="tel:+201023456789" dir="ltr" className="t2-footer-contact-link">
                  +20 102 345 6789
                </a>
              </li>
              <li className="t2-footer-list-item">
                <i className="ri-mail-line t2-footer-list-icon" />
                <a href="mailto:info@menu.com" className="t2-footer-contact-link">
                  info@menu.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="t2-footer-social-title">{t.footer.followTitle}</h4>
            <div className="t2-footer-social-container">
              {["ri-instagram-line", "ri-facebook-line", "ri-twitter-x-line"].map((iconClass, i) => (
                <a key={i} href="#" className="t2-footer-social-button">
                  <i className={iconClass} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="t2-footer-bottom">
          <p className="t2-footer-copyright">
            {t.footer.copyright}
            <i className="ri-heart-fill" />
          </p>
          <p className="t2-footer-developed-by">
            {t.footer.developedBy}
            <a
              href="https://www.facebook.com/ENSEGYPTEG"
              target="_blank"
              rel="noopener noreferrer"
              className="t2-footer-dev-link"
            >
              ENS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
