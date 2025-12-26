"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const FooterSection = () => {
  const t = useTranslations("Landing.footer");
  const navT = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "#features", label: navT("features") },
    { href: "#packages", label: navT("packages") },
    { href: "#how-it-works", label: navT("howItWorks") },
    { href: "#contact", label: navT("contact") },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-8 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6 group">
              <img
                src="/images/landing-pages/ens-logo.png"
                alt="ENS Logo"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-3xl font-bold text-white transition-colors duration-300 group-hover:text-purple-400">
                ENS
              </span>
            </div>
            <p
              className="text-gray-400 max-w-md mb-6 leading-relaxed"
              suppressHydrationWarning
            >
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white" suppressHydrationWarning>
              {t("quickLinks")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block"
                    suppressHydrationWarning
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white" suppressHydrationWarning>
              {t("contactUs")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
                <a
                  href="tel:+201000000000"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  dir="ltr"
                >
                  +20 100 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
                <a
                  href="mailto:info@ens.com"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  info@ens.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                <span
                  className="text-gray-400"
                  suppressHydrationWarning
                >
                  {t("location")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-5">
          <div className="flex flex-col items-center gap-6">
            {/* Copyright - Center & Larger */}
            <p
              className="text-gray-500 text-base md:text-lg flex items-center gap-2 font-bold"
              suppressHydrationWarning
            >
              © {currentYear}{" "}
              <a
                href="https://www.facebook.com/ENSEGYPTEG"
                className="text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                ENS
              </a>
              <Heart className="w-5 h-5 text-purple-400 animate-pulse" />
              {t("copyright")}
            </p>

            {/* Links */}
            <div className="flex gap-8">
              <a
                href="#"
                className="text-gray-500 hover:text-purple-400 text-sm transition-colors duration-300"
                suppressHydrationWarning
              >
                {t("privacy")}
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-purple-400 text-sm transition-colors duration-300"
                suppressHydrationWarning
              >
                {t("terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
