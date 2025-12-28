"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  categoryId?: number;
  categoryName?: string;
  originalPrice?: number;
  discountPercent?: number;
}

interface Category {
  id: number;
  name: string;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: string;
  longitude: string;
}

interface MenuData {
  menu: {
    id: number;
    name: string;
    description: string;
    logo: string;
    theme: string;
    slug: string;
    isActive: boolean;
  };
  categories?: Category[];
  items: MenuItem[];
  itemsByCategory: Record<string, MenuItem[]>;
  branches: Branch[];
  rating: {
    average: number;
    total: number;
  };
}

interface DefaultTemplateProps {
  menuData: MenuData;
  slug: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onShowRatingModal: () => void;
}

export default function DefaultTemplate({
  menuData,
  slug,
  selectedCategory,
  onCategoryChange,
  onShowRatingModal,
}: DefaultTemplateProps) {
  const locale = useLocale();
  const t = useTranslations("PublicMenu");

  // Use categories from API if available, otherwise use itemsByCategory keys
  const categories =
    menuData.categories && menuData.categories.length > 0
      ? menuData.categories.map((cat) => ({
          id: cat.id,
          key: `category_${cat.id}`,
          name: cat.name,
        }))
      : Object.keys(menuData.itemsByCategory).map((key) => ({
          id: null,
          key: key,
          name: key,
        }));

  // Get display items based on selected category
  const displayItems =
    selectedCategory === "all"
      ? menuData.items
      : menuData.itemsByCategory[selectedCategory] || [];

  return <div className="min-h-screen ">{/* template one */}</div>;
}
