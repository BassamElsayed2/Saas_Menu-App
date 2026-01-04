"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context";

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popupRef.current &&
        buttonRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleClick = () => {
    const phone = phoneNumber || "201023456789";
    const message = t.whatsapp?.message || "";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          zIndex: 50,
          width: "68px",
          height: "68px",
          background: "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)",
          color: "white",
          borderRadius: "50%",
          boxShadow: "0 12px 32px rgba(37, 211, 102, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          border: "3px solid rgba(255, 255, 255, 0.3)",
          cursor: "pointer",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1) rotate(10deg)";
          e.currentTarget.style.boxShadow =
            "0 16px 48px rgba(37, 211, 102, 0.6), 0 8px 16px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          e.currentTarget.style.boxShadow =
            "0 12px 32px rgba(37, 211, 102, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2)";
        }}
      >
        {isOpen ? (
          <i className="ri-close-line" style={{ fontSize: "32px" }} />
        ) : (
          <div style={{ position: "relative" }}>
            <i className="ri-message-3-line" style={{ fontSize: "32px", position: "relative", zIndex: 1 }} />
            <span
              style={{
                position: "absolute",
                inset: "-10px",
                borderRadius: "50%",
                background: "rgba(37, 211, 102, 0.4)",
                animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
          </div>
        )}
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className="animate-scale-in"
          style={{
            position: "fixed",
            bottom: "116px",
            right: "32px",
            zIndex: 50,
            width: "340px",
            maxWidth: "calc(100vw - 64px)",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 231, 198, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25), 0 8px 20px rgba(0, 0, 0, 0.15)",
              overflow: "hidden",
              border: "2px solid rgba(255, 255, 255, 0.5)",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)",
                color: "white",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "rgba(255, 255, 255, 0.25)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <i className="ri-message-3-line" style={{ fontSize: "26px" }} />
                </div>
                <div style={{ textAlign: isRTL ? "right" : "left" }}>
                  <h3 style={{ fontWeight: "700", fontSize: "18px", marginBottom: "2px" }}>
                    {t.whatsapp?.greeting}
                  </h3>
                  <p style={{ fontSize: "13px", opacity: 0.9 }}>{t.whatsapp?.available}</p>
                </div>
              </div>
            </div>

            <div style={{ padding: "20px", background: "rgba(250, 243, 225, 0.5)" }}>
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "18px",
                  marginBottom: "14px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                  border: "1px solid rgba(255, 109, 31, 0.1)",
                }}
              >
                <p style={{ fontSize: "14.5px", color: "#1a1a1a", lineHeight: "1.6" }}>
                  {t.whatsapp?.message}
                  <br />
                  {t.whatsapp?.prompt}
                </p>
              </div>
            </div>

            <div style={{ padding: "20px", borderTop: "2px solid rgba(255, 109, 31, 0.1)" }}>
              <button
                onClick={handleClick}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)",
                  color: "white",
                  padding: "14px 20px",
                  borderRadius: "14px",
                  fontWeight: "700",
                  fontSize: "15px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 20px rgba(37, 211, 102, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(37, 211, 102, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 211, 102, 0.3)";
                }}
              >
                <i className="ri-message-3-line" style={{ fontSize: "22px" }} />
                <span>{t.whatsapp?.buttonLabel}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

