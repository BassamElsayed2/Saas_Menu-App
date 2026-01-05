"use client";

import React from "react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className = "" }) => (
  <i
    className={`ri-${name} ${className}`}
    style={{ fontSize: size }}
    aria-hidden="true"
  />
);
