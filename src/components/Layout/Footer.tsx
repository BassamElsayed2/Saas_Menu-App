"use client";

import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <div className="grow"></div>

      <footer className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-primary-500/10 px-6 py-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {currentYear} <span className="font-semibold text-primary-500">ENS Menu</span>. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
