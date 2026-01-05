"use client";

import React from "react";
import { useLanguage } from "../context";

export const ENSFixedBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600 text-white py-3.5 text-center shadow-2xl shadow-violet-500/30">
      <a
        href="https://ens.eg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold hover:underline flex items-center justify-center gap-2"
      >
        <span>🚀</span>
        {t.banner.cta}
      </a>
    </div>
  );
};
