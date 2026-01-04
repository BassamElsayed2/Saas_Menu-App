"use client";

import React, { useState, useEffect, useRef } from "react";
import "remixicon/fonts/remixicon.css";
import { TemplateProps, MenuItem, Ad } from "../types";
import { LanguageProvider, useLanguage } from "./context";
import { globalStyles } from "./styles";
import { translations } from "./translations";
import {
  Navbar,
  HeroSection,
  Footer,
  MenuSection,
  AfterHeroAd,
  MidMenuAd,
  PreFooterAd,
  Modal,
  WhatsAppButton,
  MobileCategoriesSheet,
} from "./components";

// ============================
// Default Ads Data
// ============================

const defaultAds: Ad[] = [
  {
    id: 1,
    position: "after-hero",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop",
    title: {
      ar: "🔥 عرض اليوم - خصم 25%",
      en: "🔥 Today's Deal - 25% Off",
    },
    description: {
      ar: "استمتع بأشهى الأطباق مع خصم مميز على جميع الوجبات الرئيسية. العرض لفترة محدودة!",
      en: "Enjoy our delicious dishes with a special discount on all main courses. Limited time offer!",
    },
    buttonText: {
      ar: "اطلب الآن",
      en: "Order Now",
    },
    link: "#menu",
    bgColor: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
    isActive: true,
  },
  {
    id: 2,
    position: "mid-menu",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=400&fit=crop",
    title: {
      ar: "🎉 وجبة كومبو عائلية",
      en: "🎉 Family Combo Meal",
    },
    description: {
      ar: "وجبة كاملة للعائلة بسعر مميز - تشمل 4 أطباق رئيسية + مشروبات + حلويات",
      en: "Complete family meal at a special price - includes 4 main dishes + drinks + desserts",
    },
    buttonText: {
      ar: "اكتشف المزيد",
      en: "Discover More",
    },
    link: "#menu",
    bgColor: "linear-gradient(135deg,rgb(139, 99, 34) 0%,rgb(205, 128, 50) 100%)",
    isActive: true,
  },
  {
    id: 3,
    position: "pre-footer",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=400&fit=crop",
    title: {
      ar: "توصيل مجاني",
      en: "Free Delivery",
    },
    description: {
      ar: "استمتع بتوصيل مجاني لجميع الطلبات فوق 100 جنيه. اطلب الآن واستمتع بوجبتك في المنزل!",
      en: "Enjoy free delivery on all orders over $20. Order now and enjoy your meal at home!",
    },
    buttonText: {
      ar: "اطلب الآن",
      en: "Order Now",
    },
    link: "",
    bgColor: "linear-gradient(135deg,rgb(255, 141, 20) 0%,rgb(255, 143, 105) 100%)",
    isActive: true,
  },
];

// ============================
// Template2 Inner Component (with context access)
// ============================

interface Template2InnerProps extends TemplateProps {}

function Template2Inner({
  menuData,
  slug,
  selectedCategory,
  onCategoryChange,
  onShowRatingModal,
}: Template2InnerProps) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<MenuItem | null>(null);
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number }>>([]);

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Get ads data (use default if no ads from database)
  const adsData = menuData.ads && menuData.ads.length > 0 ? menuData.ads : defaultAds;

  // Scroll Effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Products Section Observer
  useEffect(() => {
    const section = document.getElementById("menu");
    if (!section) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => setShowCategories(entry.isIntersecting),
      { rootMargin: "-120px 0px" }
    );

    observerRef.current.observe(section);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Generate particles for hero
  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 16 }, (_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
      }));
    };
    setParticles(generateParticles());
  }, []);

  // Modal body scroll lock
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCard]);

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  // Build categories from menuData
  const categories = [
    { id: "all", name: t.menu.all, emoji: "🍽️" },
    ...(menuData.categories || []).map((cat) => ({
      id: cat.id.toString(),
      name: cat.name,
      emoji: "🍴",
    })),
  ];

  // Filter items based on category and search
  const filteredItems = menuData.items.filter((item) => {
    const categoryMatch =
      selectedCategory === "all" ||
      item.categoryId?.toString() === selectedCategory ||
      item.category === selectedCategory;

    const searchMatch =
      searchQuery === "" ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const phoneNumber = menuData.branches?.[0]?.phone?.replace(/[^0-9]/g, "") || "201023456789";

  return (
    <div dir={t.dir} lang={t.lang}>
      <style jsx global>
        {globalStyles}
      </style>

      {/* Navbar */}
      <Navbar
        isScrolled={isScrolled}
        showCategories={showCategories}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        onShowMobileCategories={() => setShowMobileCategories(true)}
      />

      {/* Mobile Categories Sheet */}
      <MobileCategoriesSheet
        isOpen={showMobileCategories}
        onClose={() => setShowMobileCategories(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      {/* Hero Section */}
      <HeroSection
        menuName={menuData.menu.name}
        description={menuData.menu.description}
        logo={menuData.menu.logo}
        rating={menuData.rating}
        particles={particles}
        onScrollToMenu={scrollToMenu}
      />

      {/* After Hero Ads */}
      <AfterHeroAd ads={adsData} />

      {/* Menu Section */}
      <MenuSection
        items={filteredItems}
        ads={adsData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        onItemClick={setSelectedCard}
      />

      {/* Pre-Footer Ad */}
      <PreFooterAd ads={adsData} phoneNumber={phoneNumber} />

      {/* Footer */}
      <Footer
        menuName={menuData.menu.name}
        description={menuData.menu.description}
        logo={menuData.menu.logo}
        branches={menuData.branches}
      />

      {/* Modal */}
      <Modal item={selectedCard} onClose={() => setSelectedCard(null)} />

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber={phoneNumber} />
    </div>
  );
}

// ============================
// Template2 - Main Export with Provider
// ============================

export default function Template2(props: TemplateProps) {
  return (
    <LanguageProvider>
      <Template2Inner {...props} />
    </LanguageProvider>
  );
}
