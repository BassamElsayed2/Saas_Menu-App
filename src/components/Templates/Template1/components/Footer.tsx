"use client";

import React from "react";
import { useLanguage } from "../context";
import { Icon } from "./Icon";

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: string;
  longitude: string;
}

interface FooterProps {
  menuName: string;
  branches?: Branch[];
}

export const Footer: React.FC<FooterProps> = ({ menuName, branches = [] }) => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative border-t border-violet-500/10">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-6">
              {menuName}
            </h3>
            <p className="text-violet-200/60 leading-relaxed text-lg">
              {t.hero.description}
            </p>
          </div>

          {/* Branches */}
          {branches.length > 0 && (
            <div>
              <h4 className="text-xl font-bold text-white mb-8">
                {t.branches.title}
              </h4>
              <ul className="space-y-5">
                {branches.map((branch) => (
                  <li key={branch.id}>
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0 border border-violet-500/20 group-hover:border-violet-500/40 transition-colors">
                        <Icon name="map-pin-line" size={18} className="text-violet-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block mb-1">
                          {branch.name}
                        </span>
                        <p className="text-sm text-violet-300/50">{branch.address}</p>
                        {branch.phone && (
                          <a
                            href={`tel:${branch.phone}`}
                            className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                          >
                            {branch.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social & Contact */}
          <div>
            <h4 className="text-xl font-bold text-white mb-8">
              {t.footer.followUs}
            </h4>
            <div className="flex items-center gap-4">
              {[
                { icon: "instagram-line", href: "#", color: "from-pink-500 to-violet-500" },
                { icon: "twitter-x-line", href: "#", color: "from-slate-400 to-slate-600" },
                { icon: "facebook-fill", href: "#", color: "from-blue-500 to-blue-700" },
                { icon: "whatsapp-line", href: "#", color: "from-green-500 to-green-700" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm text-violet-300/70 hover:text-white border border-violet-500/10 hover:border-violet-500/30 hover:bg-gradient-to-br hover:from-violet-600/20 hover:to-blue-600/20 transition-all duration-300 hover:scale-110"
                >
                  <Icon name={social.icon} size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-violet-500/10 text-center">
          <p className="text-violet-300/40">
            © {currentYear} {menuName}. {t.footer.rights}
          </p>
          <p className="text-violet-400/30 text-sm mt-3">
            {t.footer.designedBy}{" "}
            <a
              href="https://ens.eg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors font-semibold"
            >
              ENS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
