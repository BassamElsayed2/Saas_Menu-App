import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const Globe: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <i
    className={`material-symbols-outlined ${className}`}
    style={{ fontSize: size }}
  >
    translate
  </i>
);

export const Moon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <i
    className={`material-symbols-outlined ${className}`}
    style={{ fontSize: size }}
  >
    dark_mode
  </i>
);

export const Sun: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <i
    className={`material-symbols-outlined ${className}`}
    style={{ fontSize: size }}
  >
    light_mode
  </i>
);

export const Menu: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <i
    className={`material-symbols-outlined ${className}`}
    style={{ fontSize: size }}
  >
    menu
  </i>
);

export const ArrowRight: React.FC<IconProps> = ({
  size = 20,
  className = "",
}) => (
  <i
    className={`material-symbols-outlined ${className}`}
    style={{ fontSize: size }}
  >
    arrow_forward
  </i>
);

export const ArrowLeft: React.FC<IconProps> = ({
  size = 20,
  className = "",
}) => (
  <i
    className={`material-symbols-outlined ${className}`}
    style={{ fontSize: size }}
  >
    arrow_back
  </i>
);

export const X: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <i
    className={`material-symbols-outlined ${className}`}
    style={{ fontSize: size }}
  >
    close
  </i>
);
