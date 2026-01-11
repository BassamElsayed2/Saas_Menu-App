"use client";

import React, { useState, useMemo } from "react";
import { TemplateProps, MenuItem } from "../types";
import { globalStyles } from "./styles";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PromotionalBanner } from "./components/PromotionalBanner";
import { MenuSection } from "./components/MenuSection";
import { Footer } from "./components/Footer";
import { ItemModal } from "./components/ItemModal";
import { fakeImages } from "./utils/fakeImages";

export default function CoffeeTemplate({
  menuData,
  slug,
  selectedCategory,
  onCategoryChange,
  onShowRatingModal,
}: TemplateProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get discounted items for promotional banners
  const discountedItems = menuData.items.filter(
    (item) => item.discountPercent && item.discountPercent > 0
  );

  // Group items by category
  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, MenuItem[]> = {};
    menuData.items.forEach((item) => {
      const category = item.categoryName || item.category || "Other";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });
    return grouped;
  }, [menuData.items]);

  // Get items for each section
  const coffeeItems = useMemo(() => {
    const filtered = menuData.items.filter(
      (item) =>
        item.categoryName?.toLowerCase().includes("coffee") ||
        item.category?.toLowerCase().includes("coffee") ||
        item.name.toLowerCase().includes("coffee") ||
        item.name.toLowerCase().includes("espresso") ||
        item.name.toLowerCase().includes("latte") ||
        item.name.toLowerCase().includes("cappuccino")
    );

    // If no coffee items, add fake ones for demo
    if (filtered.length === 0 && menuData.items.length === 0) {
      return [
        {
          id: 1,
          name: "Espresso",
          description: "Rich and bold espresso shot",
          price: 12,
          image: "",
          category: "coffee",
          categoryName: "Coffee",
        },
        {
          id: 2,
          name: "Cappuccino",
          description: "Espresso with steamed milk and foam",
          price: 15,
          image: "",
          category: "coffee",
          categoryName: "Coffee",
        },
        {
          id: 3,
          name: "Latte",
          description: "Smooth espresso with steamed milk",
          price: 16,
          image: "",
          category: "coffee",
          categoryName: "Coffee",
        },
        {
          id: 4,
          name: "Americano",
          description: "Espresso with hot water",
          price: 14,
          image: "",
          category: "coffee",
          categoryName: "Coffee",
        },
      ];
    }
    return filtered;
  }, [menuData.items]);

  const teaItems = useMemo(() => {
    const filtered = menuData.items.filter(
      (item) =>
        item.categoryName?.toLowerCase().includes("tea") ||
        item.category?.toLowerCase().includes("tea") ||
        item.name.toLowerCase().includes("tea")
    );

    // If no tea items and no items at all, add fake ones for demo
    if (filtered.length === 0 && menuData.items.length === 0) {
      return [
        {
          id: 5,
          name: "Green Tea",
          description: "Premium green tea leaves",
          price: 10,
          image: "",
          category: "tea",
          categoryName: "Tea",
        },
        {
          id: 6,
          name: "Black Tea",
          description: "Classic black tea blend",
          price: 10,
          image: "",
          category: "tea",
          categoryName: "Tea",
        },
        {
          id: 7,
          name: "Herbal Tea",
          description: "Soothing herbal infusion",
          price: 12,
          image: "",
          category: "tea",
          categoryName: "Tea",
        },
      ];
    }
    return filtered;
  }, [menuData.items]);

  const juiceItems = useMemo(() => {
    const filtered = menuData.items.filter(
      (item) =>
        item.categoryName?.toLowerCase().includes("juice") ||
        item.category?.toLowerCase().includes("juice") ||
        item.name.toLowerCase().includes("juice") ||
        item.name.toLowerCase().includes("smoothie")
    );

    // If no juice items and no items at all, add fake ones for demo
    if (filtered.length === 0 && menuData.items.length === 0) {
      return [
        {
          id: 8,
          name: "Orange Juice",
          description: "Fresh squeezed orange juice",
          price: 8,
          image: "",
          category: "juice",
          categoryName: "Juice",
        },
        {
          id: 9,
          name: "Apple Juice",
          description: "Crisp and refreshing apple juice",
          price: 8,
          image: "",
          category: "juice",
          categoryName: "Juice",
        },
        {
          id: 10,
          name: "Mixed Berry Smoothie",
          description: "Blend of fresh berries",
          price: 12,
          image: "",
          category: "juice",
          categoryName: "Juice",
        },
      ];
    }
    return filtered;
  }, [menuData.items]);

  // Get other items (not coffee, tea, or juice)
  const otherItems = useMemo(() => {
    const allSpecialItems = new Set([
      ...coffeeItems.map((i) => i.id),
      ...teaItems.map((i) => i.id),
      ...juiceItems.map((i) => i.id),
    ]);
    return menuData.items.filter((item) => !allSpecialItems.has(item.id));
  }, [menuData.items, coffeeItems, teaItems, juiceItems]);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Get promotional images (use first discounted items or fake images)
  const happyHourImage =
    discountedItems[0]?.image &&
    discountedItems[0].image.trim() !== "" &&
    !discountedItems[0].image.includes("placeholder")
      ? discountedItems[0].image
      : fakeImages.promotional.happyHour;
  const weekendSpecialImage =
    discountedItems[1]?.image &&
    discountedItems[1].image.trim() !== "" &&
    !discountedItems[1].image.includes("placeholder")
      ? discountedItems[1].image
      : fakeImages.promotional.weekendSpecial;

  // ----------------------------
  // Fallback: if we can't detect coffee/juice/tea (e.g. names are generic/ar),
  // split items into 3 sections so the layout stays (Ads -> Section -> Ads -> Section -> Ads -> Section)
  // ----------------------------
  const needsFallbackSplit =
    menuData.items.length > 0 &&
    coffeeItems.length === 0 &&
    juiceItems.length === 0 &&
    teaItems.length === 0;

  const fallbackSplit = useMemo(() => {
    if (!needsFallbackSplit) return null;
    const items = menuData.items;
    const third = Math.max(1, Math.ceil(items.length / 3));
    return {
      coffee: items.slice(0, third),
      juice: items.slice(third, third * 2),
      tea: items.slice(third * 2),
    };
  }, [needsFallbackSplit, menuData.items]);

  const displayCoffeeItems = needsFallbackSplit
    ? fallbackSplit?.coffee || []
    : coffeeItems;
  const displayJuiceItems = needsFallbackSplit
    ? fallbackSplit?.juice || []
    : juiceItems;
  const displayTeaItems = needsFallbackSplit
    ? fallbackSplit?.tea || []
    : teaItems;

  return (
    <div className="coffee-template min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <style jsx global>
        {globalStyles}
      </style>

      {/* Header */}
      <Header menuName={menuData.menu.name} logo={menuData.menu.logo} />

      {/* Hero Section */}
      <HeroSection
        menuName={menuData.menu.name}
        description={menuData.menu.description}
        establishedYear="2020"
      />

      {/* Promotional Banners */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <PromotionalBanner
            title="Happy Hour"
            kicker="DAILY 5PM — 7PM"
            subtitle="50% OFF ALL COFFEE"
            image={happyHourImage}
            imageAlt="Happy Hour Coffee"
          />
          <PromotionalBanner
            title="Weekend Special"
            kicker="WEEKEND ONLY"
            subtitle="FREE PASTRY"
            image={weekendSpecialImage}
            imageAlt="Weekend Special"
            align="right"
          />
        </div>
      </section>

      {/* Coffee Section (Under top ads) */}
      {displayCoffeeItems.length > 0 && (
        <MenuSection
          sectionId="menu"
          title="Coffee"
          subtitle="Espresso, latte, cappuccino and more."
          items={displayCoffeeItems}
          currency={menuData.menu.currency || "SAR"}
          onItemClick={handleItemClick}
        />
      )}

      {/* Promotional Banners (Second Set) */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <PromotionalBanner
            title="Happy Hour"
            kicker="LIMITED TIME"
            subtitle="50% OFF ALL COFFEE"
            image={happyHourImage}
            imageAlt="Happy Hour Coffee"
          />
          <PromotionalBanner
            title="Weekend Special"
            kicker="SPECIAL"
            subtitle="FREE PASTRY"
            image={weekendSpecialImage}
            imageAlt="Weekend Special"
            align="right"
          />
        </div>
      </section>

      {/* Fresh Juices */}
      {displayJuiceItems.length > 0 && (
        <MenuSection
          sectionId="juice"
          title="Fresh Juices"
          subtitle="Local and international fresh juice selections."
          items={displayJuiceItems}
          currency={menuData.menu.currency || "SAR"}
          onItemClick={handleItemClick}
        />
      )}

      {/* Promotional Banners (Third Set) */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <PromotionalBanner
            title="Happy Hour"
            kicker="NEW"
            subtitle="50% OFF ALL COFFEE"
            image={happyHourImage}
            imageAlt="Happy Hour Coffee"
          />
          <PromotionalBanner
            title="Weekend Special"
            kicker="WEEKEND"
            subtitle="FREE PASTRY"
            image={weekendSpecialImage}
            imageAlt="Weekend Special"
            align="right"
          />
        </div>
      </section>

      {/* Tea Selection */}
      {displayTeaItems.length > 0 && (
        <MenuSection
          sectionId="tea"
          title="Tea Selection"
          subtitle="Carefully selected premium teas from renowned gardens."
          items={displayTeaItems}
          currency={menuData.menu.currency || "SAR"}
          onItemClick={handleItemClick}
        />
      )}

      {/* Other Items */}
      {otherItems.length > 0 && (
        <MenuSection
          sectionId="other"
          title="Other Beverages"
          subtitle="A variety of refreshing drinks to complement your experience."
          items={otherItems}
          currency={menuData.menu.currency || "SAR"}
          onItemClick={handleItemClick}
        />
      )}

      {/* Footer */}
      <Footer menuName={menuData.menu.name} branches={menuData.branches} />

      {/* Item Modal */}
      <ItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
        currency={menuData.menu.currency || "SAR"}
      />
    </div>
  );
}
