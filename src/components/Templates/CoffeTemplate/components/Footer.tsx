"use client";

import React from "react";
import { Branch } from "../../types";

interface FooterProps {
  menuName: string;
  branches: Branch[];
}

export const Footer: React.FC<FooterProps> = ({ menuName, branches }) => {
  return (
    <footer className="bg-[var(--glass)] border-t border-[var(--glass-border)] py-12 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold text-[var(--accent)] mb-4">
              {menuName}
            </h3>
            <p className="text-[var(--text-muted)] text-sm">
              Crafting exceptional coffee experiences since 2020
            </p>
          </div>

          {/* Branches */}
          {branches.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-[var(--text-main)] mb-4">
                Our Locations
              </h4>
              <div className="space-y-3">
                {branches.map((branch) => (
                  <div key={branch.id} className="text-sm text-[var(--text-muted)]">
                    <p className="font-medium text-[var(--text-main)]">{branch.name}</p>
                    <p>{branch.address}</p>
                    <p>{branch.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-[var(--text-main)] mb-4">
              Contact Us
            </h4>
            <div className="space-y-2 text-sm text-[var(--text-muted)]">
              <p>
                <i className="ri-phone-line mr-2"></i>
                {branches[0]?.phone || "Contact us for inquiries"}
              </p>
              <p>
                <i className="ri-map-pin-line mr-2"></i>
                {branches[0]?.address || "Visit our locations"}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[var(--border-main)] text-center text-sm text-[var(--text-muted)]">
          <p>&copy; {new Date().getFullYear()} {menuName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
