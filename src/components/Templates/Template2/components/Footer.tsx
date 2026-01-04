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
    <footer
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
        color: "#FAF3E1",
        padding: "80px 16px 40px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "6px",
          background: "linear-gradient(90deg, transparent 0%, #FF6D1F 50%, transparent 100%)",
          boxShadow: "0 0 20px rgba(255, 109, 31, 0.5)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255, 109, 31, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              {logo ? (
                <div
                  style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", position: "relative" }}
                >
                  <Image src={logo} alt={menuName} fill style={{ objectFit: "cover" }} />
                </div>
              ) : (
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(255, 109, 31, 0.4)",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>📋</span>
                </div>
              )}
              <h3 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.5px" }}>
                {menuName || t.footer.brand}
                <span
                  style={{
                    background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginLeft: "6px",
                  }}
                >
                  {t.footer.brandHighlight}
                </span>
              </h3>
            </div>
            <p
              style={{
                fontSize: "14.5px",
                color: "rgba(250, 243, 225, 0.85)",
                lineHeight: "1.8",
                maxWidth: "400px",
              }}
            >
              {description || t.footer.description}
            </p>
          </div>

          {/* Branches */}
          {branches && branches.length > 0 && (
            <div>
              <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#FAF3E1" }}>
                {t.footer.branches}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {branches.map((branch) => (
                  <li key={branch.id} style={{ display: "flex", gap: "12px", marginBottom: "16px", fontSize: "14px" }}>
                    <i
                      className="ri-map-pin-line"
                      style={{ fontSize: "16px", color: "#FF6D1F", marginTop: "2px", flexShrink: 0 }}
                    />
                    <div>
                      <p style={{ color: "#FAF3E1", fontWeight: "600", marginBottom: "4px" }}>{branch.name}</p>
                      <p style={{ color: "rgba(250, 243, 225, 0.7)" }}>{branch.address}</p>
                      {branch.phone && (
                        <a
                          href={`tel:${branch.phone}`}
                          dir="ltr"
                          style={{ color: "#FF6D1F", textDecoration: "none", fontSize: "13px" }}
                        >
                          {branch.phone}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
<div>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "20px",
                    color: "#FAF3E1",
                  }}
                >
                  {t.footer.contactTitle}
                </h4>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    <i
                      className="ri-map-pin-line"
                      style={{
                        fontSize: "16px",
                        color: "#FF6D1F",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: "rgba(250, 243, 225, 0.8)" }}>
                      {t.footer.address}
                    </span>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    <i
                      className="ri-time-line"
                      style={{
                        fontSize: "16px",
                        color: "#FF6D1F",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: "rgba(250, 243, 225, 0.8)" }}>
                      {t.footer.hours}
                    </span>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    <i
                      className="ri-phone-line"
                      style={{
                        fontSize: "16px",
                        color: "#FF6D1F",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <a
                      href="tel:+201023456789"
                      dir="ltr"
                      style={{
                        color: "rgba(250, 243, 225, 0.8)",
                        textDecoration: "none",
                        transition: "color 0.3s",
                      }}
                    >
                      +20 102 345 6789
                    </a>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      gap: "12px",
                      fontSize: "14px",
                    }}
                  >
                    <i
                      className="ri-mail-line"
                      style={{
                        fontSize: "16px",
                        color: "#FF6D1F",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <a
                      href="mailto:info@menu.com"
                      style={{
                        color: "rgba(250, 243, 225, 0.8)",
                        textDecoration: "none",
                        transition: "color 0.3s",
                      }}
                    >
                      info@menu.com
                    </a>
                  </li>
                </ul>
              </div>
          {/* Social */}
          <div>
            <h4 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "24px", color: "#FAF3E1" }}>
              {t.footer.followTitle}
            </h4>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {["ri-instagram-line", "ri-facebook-line", "ri-twitter-x-line"].map((iconClass, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    color: "#FF6D1F",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(245, 231, 198, 0.15))",
                    backdropFilter: "blur(10px)",
                    border: "2px solid rgba(255, 109, 31, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px) scale(1.1)";
                    e.currentTarget.style.background = "linear-gradient(135deg, #FF6D1F, #FF8C42)";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "#FF6D1F";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 109, 31, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(245, 231, 198, 0.15))";
                    e.currentTarget.style.color = "#FF6D1F";
                    e.currentTarget.style.borderColor = "rgba(255, 109, 31, 0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <i className={iconClass} style={{ fontSize: "22px", position: "relative", zIndex: 1 }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            marginTop: "56px",
            paddingTop: "32px",
            borderTop: "2px solid rgba(255, 109, 31, 0.15)",
            textAlign: "center",
            fontSize: "13px",
            color: "rgba(250, 243, 225, 0.7)",
          }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "12px",
              fontWeight: "500",
            }}
          >
            {t.footer.copyright}
            <i className="ri-heart-fill" style={{ fontSize: "14px", color: "#FF6D1F" }} />
          </p>
          <p
            style={{
              marginTop: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "13px",
            }}
          >
            {t.footer.developedBy}
            <a
              href="https://www.facebook.com/ENSEGYPTEG"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: "700",
                background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textDecoration: "none",
                transition: "all 0.3s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.letterSpacing = "1px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.letterSpacing = "0";
              }}
            >
              ENS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
