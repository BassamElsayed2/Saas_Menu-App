"use client";

import React, { useEffect } from "react";
import { Icon } from "./Icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />

      {/* Modal Content */}
      <div
        className={`
          relative w-full ${sizes[size]}
          bg-gradient-to-br from-slate-900 via-violet-950/50 to-slate-900
          border border-violet-500/20
          rounded-3xl shadow-2xl shadow-violet-500/20
          animate-modal-in
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-50" />

        {/* Content Container */}
        <div className="relative">
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-violet-500/10">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl text-violet-300/50 hover:text-white hover:bg-violet-500/20 transition-all duration-200"
              >
                <Icon name="close-line" size={22} />
              </button>
            </div>
          )}

          {/* Body */}
          <div className="p-6">{children}</div>

          {/* Close button if no title */}
          {!title && (
            <button
              onClick={onClose}
              className="absolute top-4 end-4 p-2.5 rounded-xl text-violet-300/50 hover:text-white hover:bg-violet-500/20 transition-all duration-200"
            >
              <Icon name="close-line" size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
