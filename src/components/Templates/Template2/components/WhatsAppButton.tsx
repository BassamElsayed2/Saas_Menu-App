"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.whatsapp.defaultMessage)}`,
      "_blank"
    );
  };

  return (
    <div 
      ref={containerRef}
      className="t2-whatsapp-container"
      style={{
        position: "fixed",
        bottom: "32px",
        [isRTL ? "left" : "right"]: "32px",
        [isRTL ? "right" : "left"]: "auto",
        zIndex: 50,
      }}
    >
      {/* Main Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="t2-whatsapp-button">
        {isOpen ? (
          <i className="ri-close-line" />
        ) : (
          <>
            <i className="ri-whatsapp-line" />
            <span className="t2-whatsapp-ping" />
          </>
        )}
      </button>

      {/* Popup */}
      {isOpen && (
        <div 
          className="t2-whatsapp-popup t2-animate-scale-in"
          style={{
            position: "absolute",
            bottom: "84px",
            [isRTL ? "left" : "right"]: 0,
            [isRTL ? "right" : "left"]: "auto",
          }}
        >
          {/* Header */}
          <div className="t2-whatsapp-popup-header">
            <div className="t2-whatsapp-popup-header-inner">
              <div className="t2-whatsapp-popup-icon">
                <i className="ri-whatsapp-line" />
              </div>
              <div>
                <h4 className="t2-whatsapp-popup-title">{t.whatsapp.title}</h4>
                <p className="t2-whatsapp-popup-subtitle">{t.whatsapp.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="t2-whatsapp-popup-message">
            <div className="t2-whatsapp-message-box">
              <p className="t2-whatsapp-message-text">{t.whatsapp.greeting}</p>
            </div>
          </div>

          {/* Button */}
          <div className="t2-whatsapp-popup-footer">
            <button onClick={handleWhatsAppClick} className="t2-whatsapp-chat-button">
              <i className="ri-whatsapp-line" />
              {t.whatsapp.startChat}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
