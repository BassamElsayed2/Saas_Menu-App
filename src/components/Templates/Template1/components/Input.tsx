"use client";

import React from "react";
import { Icon } from "./Icon";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
  className?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
          <Icon name={icon} size={18} className="text-violet-400/50" />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full bg-white/5 backdrop-blur-sm border border-violet-500/20 rounded-2xl
          text-white placeholder-violet-300/40
          focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          py-4 px-5
          ${icon ? "ps-12" : ""}
        `}
      />
    </div>
  );
};
