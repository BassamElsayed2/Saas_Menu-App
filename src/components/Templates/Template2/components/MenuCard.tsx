"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { MenuItem } from "../../types";

interface MenuCardProps {
  item: MenuItem;
  index: number;
  onClick: () => void;
}

export function MenuCard({ item, index, onClick }: MenuCardProps) {
  const { t } = useLanguage();

  return (
    <div
      onClick={onClick}
      className="animate-fade-in-up"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 231, 198, 0.7) 100%)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: 0,
        animationDelay: `${index * 100}ms`,
        cursor: "pointer",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(255, 109, 31, 0.2), 0 8px 16px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
        <Image
          src={item.image || "/images/restaurant/placeholder.jpg"}
          alt={item.name}
          fill
          style={{ objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26, 26, 26, 0.6) 0%, rgba(26, 26, 26, 0.2) 40%, transparent 100%)",
          }}
        />

        {/* Badges */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            right: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
              color: "white",
              padding: "8px 16px",
              borderRadius: "999px",
              fontWeight: "800",
              fontSize: "14px",
              boxShadow: "0 8px 24px rgba(255, 109, 31, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {item.price} {t.common.currency}
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {item.isBestSeller && (
              <div
                style={{
                  background: "rgba(34, 34, 34, 0.9)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <i className="ri-award-line" style={{ fontSize: "14px" }} />
                <span>{t.common.bestSeller}</span>
              </div>
            )}
            {item.discountPercent && item.discountPercent > 0 && (
              <div
                style={{
                  background: "rgba(255, 59, 48, 0.95)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                -{item.discountPercent}%
              </div>
            )}
            {item.isHot && (
              <div
                style={{
                  background: "rgba(255, 109, 31, 0.9)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="ri-fire-line" style={{ fontSize: "14px" }} />
              </div>
            )}
            {item.isVegetarian && (
              <div
                style={{
                  background: "rgba(34, 139, 34, 0.9)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="ri-leaf-line" style={{ fontSize: "14px" }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "10px",
            transition: "color 0.3s",
            lineHeight: "1.3",
          }}
        >
          {item.name}
        </h3>

        <p
          style={{
            fontSize: "13px",
            color: "rgba(26, 26, 26, 0.7)",
            lineHeight: "1.6",
            marginBottom: "16px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.description}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "12px",
            borderTop: "1.5px solid rgba(255, 109, 31, 0.1)",
          }}
        >
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <span
              style={{
                height: "4px",
                width: "40px",
                background: "linear-gradient(to right, #FF6D1F, #FF8C42)",
                borderRadius: "999px",
                transition: "width 0.3s",
              }}
            />
            <span
              style={{
                height: "4px",
                width: "20px",
                background: "rgba(255, 109, 31, 0.3)",
                borderRadius: "999px",
                transition: "width 0.3s",
              }}
            />
          </div>

          {item.prepTime && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#FF6D1F",
                background: "rgba(255, 109, 31, 0.08)",
                padding: "5px 12px",
                borderRadius: "999px",
              }}
            >
              <i className="ri-time-line" style={{ fontSize: "14px" }} />
              <span>{item.prepTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
