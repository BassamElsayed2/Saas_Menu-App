"use client";

import React from "react";
import { useLanguage } from "../context";
import { ensAdsData } from "../data";
import { Icon } from "./Icon";

// ============================
// ENS Services Section Component
// ============================

export const ENSServicesSection: React.FC = () => {
  const { locale, direction } = useLanguage();
  const rtl = direction === "rtl";

  return (
    <section
      dir={direction}
      className="
    relative overflow-hidden
    bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]
    py-16 sm:py-20 md:py-28
  "
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Global Glow */}
      <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-blue-500/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-purple-500/15 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-5 py-2 rounded-full mb-5 border border-white/10">
            <Icon name="code-s-slash-line" className="text-white" />
            <span className="text-white text-sm font-medium">
              {locale === "ar" ? "خدماتنا الرقمية" : "Our Digital Services"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {locale === "ar" ? "حلول ENS الرقمية" : "ENS Digital Solutions"}
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {locale === "ar"
              ? "نقدم لك أفضل الحلول الرقمية لتطوير أعمالك وزيادة تواجدك على الإنترنت"
              : "We provide premium digital solutions to grow your business and strengthen your online presence"}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {ensAdsData.map((service) => (
            <div
              key={service.id}
              className="
            group relative
            rounded-2xl p-6
            bg-white/[0.07] backdrop-blur-md
            border border-white/[0.15]
            transition-all duration-300
            hover:-translate-y-2
            hover:bg-white/[0.12]
            hover:border-white/[0.25]
          "
            >
              {/* Card Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-blue-500/10 to-purple-600/10 blur-xl" />

              <div className="relative z-10">
                <div
                  className="
                w-12 h-12 mb-4
                bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600
                rounded-xl
                flex items-center justify-center
                shadow-lg shadow-blue-500/30
                group-hover:scale-110
                transition-transform duration-300
              "
                >
                  <Icon name={service.icon} className="text-2xl text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {locale === "ar" ? service.titleAr : service.titleEn}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {locale === "ar"
                    ? service.descriptionAr
                    : service.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://www.facebook.com/ENSEGYPTEG"
            target="_blank"
            rel="noopener noreferrer"
            className="
          relative inline-flex items-center gap-2
          bg-gradient-to-r from-blue-500 to-purple-600
          text-white font-semibold
          px-10 py-4 rounded-full
          transition-all duration-300
          hover:scale-[1.07]
          hover:shadow-xl hover:shadow-purple-500/40
          overflow-hidden
        "
          >
            <span className="relative z-10">
              {locale === "ar" ? "تواصل مع ENS" : "Contact ENS"}
            </span>
            <Icon
              name={rtl ? "arrow-left-line" : "arrow-right-line"}
              className="relative z-10"
            />

            {/* Button Shine */}
            <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-10 transition" />
          </a>
        </div>
      </div>
    </section>
  );
};

