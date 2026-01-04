"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context";
import { MenuItem } from "../../types";

interface ModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function Modal({ item, onClose }: ModalProps) {
  const { t, isRTL } = useLanguage();

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="animate-fade-in"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-scale-in"
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #FAF3E1 0%, #F5E7C6 50%, #FAF3E1 100%)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "700px",
          maxHeight: "90vh",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "24px",
            [isRTL ? "left" : "right"]: "24px",
            zIndex: 20,
            background: "#222222",
            color: "white",
            borderRadius: "50%",
            padding: "12px",
            transition: "all 0.3s",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <i className="ri-close-line" style={{ fontSize: "20px" }} />
        </button>

        {/* Scrollable Content */}
        <div style={{ overflowY: "auto", maxHeight: "90vh" }}>
          {/* Image Section */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              overflow: "hidden",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
            }}
          >
            <Image
              src={item.image || "/images/restaurant/placeholder.jpg"}
              alt={item.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(34, 34, 34, 0.8) 0%, rgba(34, 34, 34, 0.2) 50%, transparent 100%)",
              }}
            />

            {/* Badges on image */}
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                left: "24px",
                right: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {/* Price Badge */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #FF6D1F, #e65b1b)",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "16px",
                    fontWeight: "bold",
                    fontSize: "24px",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {item.price} {t.common.currency}
                </div>
                {item.discountPercent && item.discountPercent > 0 && (
                  <div
                    style={{
                      background: "rgba(255, 59, 48, 0.95)",
                      backdropFilter: "blur(8px)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                      width: "fit-content",
                    }}
                  >
                    <i className="ri-percent-line" style={{ fontSize: "16px" }} />
                    <span style={{ fontWeight: "700" }}>
                      -{item.discountPercent}% {t.common.discount}
                    </span>
                  </div>
                )}
              </div>

              {/* Icon Badges */}
              <div style={{ display: "flex", gap: "8px" }}>
                {item.isHot && (
                  <div
                    style={{
                      background: "rgba(255, 109, 31, 0.95)",
                      backdropFilter: "blur(8px)",
                      color: "white",
                      padding: "12px",
                      borderRadius: "50%",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <i className="ri-fire-line" style={{ fontSize: "20px" }} />
                  </div>
                )}
                {item.isVegetarian && (
                  <div
                    style={{
                      background: "rgba(34, 139, 34, 0.95)",
                      backdropFilter: "blur(8px)",
                      color: "white",
                      padding: "12px",
                      borderRadius: "50%",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <i className="ri-leaf-line" style={{ fontSize: "20px" }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div style={{ padding: "20px 24px" }}>
            {/* Title & Description */}
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "clamp(24px, 4vw, 28px)",
                  fontWeight: "bold",
                  color: "#222222",
                  marginBottom: "10px",
                  lineHeight: "1.2",
                }}
              >
                {item.name}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span
                  style={{
                    height: "3px",
                    width: "48px",
                    background: "linear-gradient(to right, #FF6D1F, #e65b1b)",
                    borderRadius: "999px",
                  }}
                />
                <span
                  style={{
                    height: "3px",
                    width: "24px",
                    background: "rgba(34, 34, 34, 0.2)",
                    borderRadius: "999px",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "clamp(13px, 2.5vw, 15px)",
                  color: "rgba(34, 34, 34, 0.8)",
                  lineHeight: "1.5",
                }}
              >
                {item.description}
              </p>
            </div>

            {/* Info Cards Grid */}
            {(item.prepTime || item.calories) && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                {item.prepTime && (
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.6)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 109, 31, 0.2)",
                      borderRadius: "12px",
                      padding: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div
                      style={{
                        background: "linear-gradient(135deg, #FF6D1F, #e65b1b)",
                        borderRadius: "10px",
                        padding: "10px",
                        boxShadow: "0 4px 12px rgba(255, 109, 31, 0.3)",
                      }}
                    >
                      <i className="ri-time-line" style={{ fontSize: "20px", color: "white" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "rgba(34, 34, 34, 0.6)",
                          marginBottom: "2px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {t.common.prepTime}
                      </p>
                      <p style={{ fontWeight: "bold", fontSize: "15px", color: "#222222" }}>{item.prepTime}</p>
                    </div>
                  </div>
                )}

                {item.calories && (
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.6)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 109, 31, 0.2)",
                      borderRadius: "12px",
                      padding: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div
                      style={{
                        background: "linear-gradient(135deg, #FF6D1F, #e65b1b)",
                        borderRadius: "10px",
                        padding: "10px",
                        boxShadow: "0 4px 12px rgba(255, 109, 31, 0.3)",
                      }}
                    >
                      <i className="ri-fire-line" style={{ fontSize: "20px", color: "white" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "rgba(34, 34, 34, 0.6)",
                          marginBottom: "2px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {t.common.calories}
                      </p>
                      <p style={{ fontWeight: "bold", fontSize: "15px", color: "#222222" }}>{item.calories}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features Tags */}
            {(item.isHot || item.isVegetarian) && (
              <div style={{ marginBottom: "20px" }}>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "rgba(34, 34, 34, 0.7)",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.common.features}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {item.isHot && (
                    <div
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 109, 31, 0.2), rgba(255, 109, 31, 0.1))",
                        border: "2px solid rgba(255, 109, 31, 0.3)",
                        color: "#FF6D1F",
                        padding: "8px 16px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 8px rgba(255, 109, 31, 0.1)",
                      }}
                    >
                      <i className="ri-fire-line" style={{ fontSize: "16px" }} />
                      <span>{t.common.hotDrink}</span>
                    </div>
                  )}
                  {item.isVegetarian && (
                    <div
                      style={{
                        background: "linear-gradient(135deg, rgba(34, 139, 34, 0.2), rgba(34, 139, 34, 0.1))",
                        border: "2px solid rgba(34, 139, 34, 0.3)",
                        color: "rgb(21, 128, 61)",
                        padding: "8px 16px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 8px rgba(34, 139, 34, 0.1)",
                      }}
                    >
                      <i className="ri-leaf-line" style={{ fontSize: "16px" }} />
                      <span>{t.common.vegetarian}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Category Tag */}
            {item.categoryName && (
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, rgba(255, 109, 31, 0.1), rgba(255, 154, 77, 0.15))",
                    padding: "10px 20px",
                    borderRadius: "999px",
                  }}
                >
                  <i className="ri-restaurant-line" style={{ fontSize: "18px", color: "#FF6D1F" }} />
                  <span style={{ fontWeight: "600", color: "#FF6D1F" }}>{item.categoryName}</span>
                </div>
              </div>
            )}

            {/* Decorative Element */}
            <div style={{ margin: "24px 0", display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "linear-gradient(to right, transparent, rgba(34, 34, 34, 0.2), transparent)",
                }}
              />
              <div style={{ display: "flex", gap: "4px" }}>
                <span style={{ width: "8px", height: "8px", background: "#FF6D1F", borderRadius: "50%" }} />
                <span style={{ width: "8px", height: "8px", background: "rgba(255, 109, 31, 0.6)", borderRadius: "50%" }} />
                <span style={{ width: "8px", height: "8px", background: "rgba(255, 109, 31, 0.3)", borderRadius: "50%" }} />
              </div>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "linear-gradient(to right, transparent, rgba(34, 34, 34, 0.2), transparent)",
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #FF6D1F, #e65b1b)",
                  color: "white",
                  fontWeight: "bold",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 16px rgba(255, 109, 31, 0.3)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
