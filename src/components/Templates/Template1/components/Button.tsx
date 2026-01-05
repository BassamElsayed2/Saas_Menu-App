"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600 text-white hover:from-violet-500 hover:via-blue-500 hover:to-indigo-500 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 focus:ring-violet-500",
    secondary:
      "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/10 hover:border-white/20 focus:ring-violet-400",
    outline:
      "border-2 border-violet-500/50 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400 hover:text-white focus:ring-violet-500",
    ghost:
      "text-violet-300 hover:bg-white/5 hover:text-white focus:ring-violet-400",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2.5",
    lg: "px-8 py-4 text-lg gap-3",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};
