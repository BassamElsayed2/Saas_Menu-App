"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "remixicon/fonts/remixicon.css";

// ==================== البيانات (Data) ====================
const menuData = [
  {
    id: 1,
    nameKey: "latte",
    name: { ar: "لاتيه كلاسيك", en: "Classic Latte" },
    description: {
      ar: "إسبريسو غني مع حليب مخفوق ورغوة كريمية",
      en: "Rich espresso with steamed milk and creamy foam",
    },
    price: { ar: "80 ج.م", en: "80 EGP" },
    prepTime: { ar: "5 دقائق", en: "5 mins" },
    calories: { ar: "180 كالوري", en: "180 kcal" },
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
    category: "hot-drinks",
    isHot: true,
    isVegetarian: true,
    isBestSeller: false,
  },
  {
    id: 2,
    nameKey: "arabicCoffee",
    name: { ar: "قهوة عربية بالهيل", en: "Arabic Coffee with Cardamom" },
    description: {
      ar: "قهوة عربية أصيلة مع هيل وشيء من الزعفران مع التمر",
      en: "Traditional Arabic coffee with cardamom and saffron, served with dates",
    },
    price: { ar: "50 ج.م", en: "50 EGP" },
    prepTime: { ar: "3 دقائق", en: "3 mins" },
    calories: { ar: "120 كالوري", en: "120 kcal" },
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=300&fit=crop",
    category: "hot-drinks",
    isHot: true,
    isVegetarian: true,
    isBestSeller: true,
  },
  {
    id: 3,
    nameKey: "hotChocolate",
    name: { ar: "شوكولاتة سخنة", en: "Hot Chocolate" },
    description: {
      ar: "شوكولاتة بلجيكية غنية مع كريمة ومارشميلو",
      en: "Rich Belgian chocolate topped with whipped cream and marshmallows",
    },
    price: { ar: "60 ج.م", en: "60 EGP" },
    prepTime: { ar: "5 دقائق", en: "5 mins" },
    calories: { ar: "250 كالوري", en: "250 kcal" },
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop",
    category: "hot-drinks",
    isHot: true,
    isVegetarian: true,
    isBestSeller: false,
  },
  {
    id: 4,
    nameKey: "icedCaramel",
    name: { ar: "آيس كراميل لاتيه", en: "Iced Caramel Latte" },
    description: {
      ar: "إسبريسو مثلج مع حليب وصوص كراميل",
      en: "Iced espresso with cold milk and caramel sauce",
    },
    price: { ar: "100 ج.م", en: "100 EGP" },
    prepTime: { ar: "4 دقائق", en: "4 mins" },
    calories: { ar: "200 كالوري", en: "200 kcal" },
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop",
    category: "cold-drinks",
    isHot: false,
    isVegetarian: true,
    isBestSeller: false,
  },
  {
    id: 5,
    nameKey: "berrySmoothie",
    name: { ar: "سموذي توت", en: "Berry Smoothie" },
    description: {
      ar: "مزيج منعش من التوت والفراولة مع زبادي وعسل",
      en: "Refreshing mix of berries and strawberries with yogurt and honey",
    },
    price: { ar: "80 ج.م", en: "80 EGP" },
    prepTime: { ar: "3 دقائق", en: "3 mins" },
    calories: { ar: "150 كالوري", en: "150 kcal" },
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop",
    category: "cold-drinks",
    isHot: false,
    isVegetarian: true,
    isBestSeller: false,
  },
  {
    id: 6,
    nameKey: "lemonade",
    name: { ar: "ليموناضة بالنعناع", en: "Mint Lemonade" },
    description: {
      ar: "عصير ليمون طازة مع نعناع وثلج مجروش",
      en: "Fresh lemon juice with mint and crushed ice",
    },
    price: { ar: "60 ج.م", en: "60 EGP" },
    prepTime: { ar: "2 دقيقة", en: "2 mins" },
    calories: { ar: "50 كالوري", en: "50 kcal" },
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
    category: "cold-drinks",
    isHot: false,
    isVegetarian: true,
    isBestSeller: false,
  },
  {
    id: 7,
    nameKey: "kunafa",
    name: { ar: "كنافة بالقشطة", en: "Kunafa with Cream" },
    description: {
      ar: "كنافة مقرمشة مع قشطة طازة وقطر",
      en: "Crispy golden kunafa filled with fresh cream and syrup",
    },
    price: { ar: "70 ج.م", en: "70 EGP" },
    prepTime: { ar: "15 دقيقة", en: "15 mins" },
    calories: { ar: "400 كالوري", en: "400 kcal" },
    image: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400&h=300&fit=crop",
    category: "desserts",
    isHot: false,
    isVegetarian: true,
    isBestSeller: true,
  },
  {
    id: 8,
    nameKey: "chocolateCake",
    name: { ar: "كيك شوكولاتة", en: "Chocolate Fondant" },
    description: {
      ar: "كيك بالشوكولاتة ساخن مع آيس كريم فانيلا",
      en: "Warm chocolate cake with molten center, served with vanilla ice cream",
    },
    price: { ar: "80 ج.م", en: "80 EGP" },
    prepTime: { ar: "10 دقائق", en: "10 mins" },
    calories: { ar: "350 كالوري", en: "350 kcal" },
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    category: "desserts",
    isHot: true,
    isVegetarian: true,
    isBestSeller: false,
  },
  {
    id: 9,
    nameKey: "tiramisu",
    name: { ar: "تيراميسو", en: "Tiramisu" },
    description: {
      ar: "بسكويت منقوع بالقهوة مع كريمة الماسكاربوني",
      en: "Italian dessert layered with mascarpone cream and coffee",
    },
    price: { ar: "90 ج.م", en: "90 EGP" },
    prepTime: { ar: "5 دقائق", en: "5 mins" },
    calories: { ar: "300 كالوري", en: "300 kcal" },
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    category: "desserts",
    isHot: false,
    isVegetarian: true,
    isBestSeller: false,
  },
  {
    id: 10,
    nameKey: "grilledChicken",
    name: { ar: "صدور دجاج مشوية", en: "Grilled Chicken Breast" },
    description: {
      ar: "صدور دجاج طازجة مشوية مع خضار وبطاطس محمرة",
      en: "Grilled chicken breast served with seasonal vegetables and roasted potatoes",
    },
    price: { ar: "150 ج.م", en: "150 EGP" },
    prepTime: { ar: "25 دقيقة", en: "25 mins" },
    calories: { ar: "400 كالوري", en: "400 kcal" },
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
    category: "main",
    isHot: true,
    isVegetarian: false,
    isBestSeller: false,
  },
  {
    id: 11,
    nameKey: "burger",
    name: { ar: "برجر شيف الخاص", en: "Chef's Special Burger" },
    description: {
      ar: "برجر لحم بقري مع جبنة شيدر وخس وطماطم وبطاطس",
      en: "Juicy beef burger with cheddar cheese, lettuce, tomato, served with fries",
    },
    price: { ar: "100 ج.م", en: "100 EGP" },
    prepTime: { ar: "15 دقيقة", en: "15 mins" },
    calories: { ar: "550 كالوري", en: "550 kcal" },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "main",
    isHot: true,
    isVegetarian: false,
    isBestSeller: true,
  },
  {
    id: 12,
    nameKey: "pasta",
    name: { ar: "باستا بالصوص الأبيض", en: "Creamy Alfredo Pasta" },
    description: {
      ar: "باستا فيتوتشيني بصوص الكريمة والمشروم والبارميزان",
      en: "Fettuccine pasta with creamy alfredo sauce, mushrooms, and parmesan",
    },
    price: { ar: "110 ج.م", en: "110 EGP" },
    prepTime: { ar: "20 دقيقة", en: "20 mins" },
    calories: { ar: "450 كالوري", en: "450 kcal" },
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    category: "main",
    isHot: false,
    isVegetarian: true,
    isBestSeller: false,
  },
  {
    id: 13,
    nameKey: "breakfastPlate",
    name: { ar: "طبق الفطور الشامل", en: "Full Breakfast Plate" },
    description: {
      ar: "بيض، فول، جبنة، زيتون، مربى، خبز طازج، وشاي أو قهوة",
      en: "Eggs, foul, cheese, olives, jam, fresh bread, and tea or coffee",
    },
    price: { ar: "90 ج.م", en: "90 EGP" },
    prepTime: { ar: "10 دقائق", en: "10 mins" },
    calories: { ar: "350 كالوري", en: "350 kcal" },
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop",
    category: "breakfast",
    isHot: false,
    isVegetarian: true,
    isBestSeller: false,
  },
  {
    id: 14,
    nameKey: "salad",
    name: { ar: "سلطة شيف خاصة", en: "Chef's Special Salad" },
    description: {
      ar: "سلطة طازجة بالخس والجرجير والطماطم والخيار مع صوص خاص",
      en: "Fresh salad with lettuce, arugula, tomatoes, cucumber and special dressing",
    },
    price: { ar: "70 ج.م", en: "70 EGP" },
    prepTime: { ar: "8 دقائق", en: "8 mins" },
    calories: { ar: "150 كالوري", en: "150 kcal" },
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    category: "salads",
    isHot: false,
    isVegetarian: true,
    isBestSeller: false,
  },
  {
    id: 15,
    nameKey: "sandwich",
    name: { ar: "ساندويش دجاج مشوي", en: "Grilled Chicken Sandwich" },
    description: {
      ar: "ساندويش بصدور الدجاج المشوية مع الخضار والصوص الخاص",
      en: "Grilled chicken breast sandwich with fresh vegetables and special sauce",
    },
    price: { ar: "85 ج.م", en: "85 EGP" },
    prepTime: { ar: "12 دقيقة", en: "12 mins" },
    calories: { ar: "380 كالوري", en: "380 kcal" },
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop",
    category: "main",
    isHot: true,
    isVegetarian: false,
    isBestSeller: false,
  },
  {
    id: 16,
    nameKey: "pizza",
    name: { ar: "بيتزا مارجريتا", en: "Margherita Pizza" },
    description: {
      ar: "بيتزا إيطالية كلاسيكية بصوص الطماطم والموتزاريلا الطازجة والريحان",
      en: "Classic Italian pizza with tomato sauce, fresh mozzarella, and basil",
    },
    price: { ar: "120 ج.م", en: "120 EGP" },
    prepTime: { ar: "20 دقيقة", en: "20 mins" },
    calories: { ar: "520 كالوري", en: "520 kcal" },
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    category: "main",
    isHot: true,
    isVegetarian: true,
    isBestSeller: true,
  },
];

// ==================== بيانات الإعلانات (Ads Data) ====================
const adsData = [
  {
    id: 1,
    title: { ar: "عرض خاص - خصم 30%", en: "Special Offer - 30% OFF" },
    description: {
      ar: "احصل على خصم 30% على جميع المشروبات الساخنة",
      en: "Get 30% discount on all hot drinks",
    },
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop",
    buttonText: { ar: "اطلب الآن", en: "Order Now" },
    link: "#menu",
    bgColor: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
    position: "after-hero",
  },
  {
    id: 2,
    title: { ar: "وجبة اليوم المميزة", en: "Today's Special Meal" },
    description: {
      ar: "برجر شيف الخاص + بطاطس + مشروب بسعر 120 جنيه فقط!",
      en: "Chef's Burger + Fries + Drink for only 120 EGP!",
    },
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=400&fit=crop",
    buttonText: { ar: "اطلب الآن", en: "Order Now" },
    link: "#menu",
    bgColor: "linear-gradient(135deg,rgb(139, 99, 34) 0%,rgb(205, 128, 50) 100%)",
    position: "mid-menu",
  },
  {
    id: 3,
    title: { ar: "توصيل مجاني", en: "Free Delivery" },
    description: {
      ar: "توصيل مجاني لجميع الطلبات فوق 200 جنيه",
      en: "Free delivery for all orders above 200 EGP",
    },
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=400&fit=crop",
    buttonText: { ar: "اطلب الآن", en: "Order Now" },
    link: "https://wa.me/201023456789",
    bgColor: "linear-gradient(135deg,rgb(255, 141, 20) 0%,rgb(255, 143, 105) 100%)",
    position: "before-footer", 
  },
];

// ==================== الترجمات (Translations) ====================
const translations = {
  ar: {
    dir: "rtl",
    lang: "ar",
    nav: {
      home: "الرئيسية",
      menu: "المنيو",
      menuHighlight: "الإلكتروني",
      about: "عنّا",
      reviews: "آراء الناس",
      contact: "كلمنا",
    },
    hero: {
      since: "منذ 2020",
      title: "المنيو",
      titleHighlight: "الإلكتروني",
      tagline: "استمتع بأحلى تجربة قهوة وأكل شرقي وغربي في جو شيك ومريح",
      cta: "شوف المنيو",
      imageAlt: "منيو إلكتروني لمطعم وقهوة",
    },
    menu: {
      subtitle: "اختياراتنا المميزة",
      title: "قائمة",
      titleHighlight: "المنيو",
      description: "أحلى مشروبات وسلطات وحلويات وأطباق رئيسية متختارين بعناية",
      categories: {
        all: "الكل",
        "hot-drinks": "مشروبات سخنة",
        "cold-drinks": "مشروبات ساقعة",
        desserts: "حلويات",
        main: "أطباق رئيسية",
        breakfast: "فطار",
        salads: "سلطات",
      },
      categoriesTitle: "التصنيفات",
      noProducts: "لا توجد منتجات في هذه الفئة",
    },
    footer: {
      brand: "منيو",
      brandHighlight: "الإلكتروني",
      description: "بنقدم تجربة أكل كاملة من حيث الجودة والطعم والخدمة السريعة",
      contactTitle: "كلمنا",
      address: "طنطا – مصر",
      hours: "٨ صباحاً – ١٢ بالليل",
      followTitle: "تابعنا على",
      copyright: "© 2025 المنيو الإلكتروني. كل الحقوق محفوظة",
      quickLinks: "روابط سريعة",
      developedBy: " تصميم وتطوير ",
    },
    common: {
      close: "إغلاق",
      bestSeller: "الأكثر طلبًا",
      bestSellerBadge: "⭐ الأكثر مبيعاً",
      prepTime: "وقت التحضير",
      calories: "السعرات الحرارية",
      features: "المميزات",
      hotDrink: "مشروب ساخن",
      vegetarian: "نباتي ١٠٠٪",
    },
    search: {
      placeholder: "ابحث في القائمة... 🔍",
      noResults: "لا توجد نتائج",
      tryAgain: "جرب البحث بكلمات أخرى",
      bestSeller: "⭐ الأكثر مبيعاً",
    },
    navbar: {
      categoriesTitle: "🍽️ الفئات",
      logoAlt: "شعار القائمة الإلكترونية",
    },
    languageSwitcher: {
      ariaLabel: "تبديل اللغة",
      english: "EN",
      arabic: "AR",
    },
    whatsapp: {
      greeting: "أهلا 👋",
      prompt: "إزاي نقدر نساعدك النهارده؟",
      buttonLabel: "ابدأ المحادثة",
      message: "مرحبا بك! 👋",
    },
  },
  en: {
    dir: "ltr",
    lang: "en",
    nav: {
      home: "Home",
      menu: "Online",
      menuHighlight: "Menu",
      about: "About Us",
      reviews: "Reviews",
      contact: "Contact",
    },
    hero: {
      since: "Since 2020",
      title: "Online",
      titleHighlight: "Menu",
      tagline:
        "Enjoy a unique experience with specialty coffee and Eastern & international food in a stylish, cozy atmosphere",
      cta: "Check the Menu",
      imageAlt: "Online Restaurant Menu",
    },
    menu: {
      subtitle: "Our Special Picks",
      title: "Online",
      titleHighlight: "Menu",
      description:
        "A hand-picked selection of hot & cold drinks, desserts, and main dishes",
      categories: {
        all: "All",
        "hot-drinks": "Hot Drinks",
        "cold-drinks": "Cold Drinks",
        desserts: "Desserts",
        main: "Main Dishes",
        breakfast: "Breakfast",
        salads: "Salads",
      },
      categoriesTitle: "Categories",
      noProducts: "No products in this category",
    },
    footer: {
      brand: "Online",
      brandHighlight: "Menu",
      description:
        "We offer a complete dining experience with top-quality ingredients, great taste, and fast service",
      contactTitle: "Contact Us",
      address: "Tanta, Egypt",
      hours: "8:00 AM – 12:00 Midnight",
      followTitle: "Follow Us",
      copyright: "© 2025 Online Menu. All rights reserved",
      quickLinks: "Quick Links",
      developedBy: " Designed and Developed by ",
    },
    common: {
      close: "Close",
      bestSeller: "Best Seller",
      bestSellerBadge: "⭐ Best Seller",
      prepTime: "Prep Time",
      calories: "Calories",
      features: "Features",
      hotDrink: "Hot Drink",
      vegetarian: "100% Vegetarian",
    },
    search: {
      placeholder: "Search menu... 🔍",
      noResults: "No results found",
      tryAgain: "Try searching with different keywords",
      bestSeller: "⭐ Best Seller",
    },
    navbar: {
      categoriesTitle: "🍽️ Categories",
      logoAlt: "Menu Online Logo",
    },
    languageSwitcher: {
      ariaLabel: "Switch Language",
      english: "EN",
      arabic: "AR",
    },
    whatsapp: {
      greeting: "Hi! 👋",
      message: "Hello! 👋",
      prompt: "How can we help you today?",
      buttonLabel: "Start Chat",
    },
  },
};

// ==================== Categories Data ====================
const categoriesData = [
  { id: "all", emoji: "🍽️" },
  { id: "hot-drinks", emoji: "☕" },
  { id: "cold-drinks", emoji: "🧊" },
  { id: "desserts", emoji: "🍰" },
  { id: "main", emoji: "🍔" },
  { id: "breakfast", emoji: "🍳" },
  { id: "salads", emoji: "🥗" },
];

// ==================== المكون الرئيسي (Main Component) ====================
export default function DefaultTemplate() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number; delay: number }>
  >([]);

  const t = translations[lang];
  const isRTL = lang === "ar";
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  // Search click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const toggleLanguage = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  const categories = categoriesData.map((cat) => ({
    ...cat,
    label: t.menu.categories[cat.id as keyof typeof t.menu.categories] || cat.id,
  }));

  // تصفية العناصر بناءً على الفئة والبحث
  const filteredItems = menuData.filter((item) => {
    // تصفية حسب الفئة
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    
    // تصفية حسب البحث
    const searchMatch = searchQuery === "" || 
      item.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const handleWhatsAppClick = () => {
    const phoneNumber = "201023456789";
    const message = t.whatsapp?.message;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsWhatsAppOpen(false);
  };

  return (
    <>
      {/* ==================== الاستايلات (Styles) ==================== */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700;800&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "DM Sans", "Cairo", sans-serif;
          background: linear-gradient(135deg, #FFF8E7 0%, #FAF3E1 50%, #F5EDD5 100%);
          color: #1a1a1a;
          overflow-x: hidden;
          position: relative;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 109, 31, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(245, 231, 198, 0.05) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: "Playfair Display", "Cairo", serif;
          font-weight: 700;
        }

        [dir="rtl"] {
          direction: rtl;
          text-align: right;
          font-family: "Cairo", "DM Sans", sans-serif;
        }

        [dir="ltr"] {
          direction: ltr;
          text-align: left;
        }

        html {
          scroll-behavior: smooth;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }

        ::-webkit-scrollbar-track {
          background: linear-gradient(180deg, #FAF3E1 0%, #F5EDD5 100%);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #FF6D1F 0%, #FF8C42 100%);
          border-radius: 10px;
          border: 2px solid #FAF3E1;
          transition: all 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #FF8C42 0%, #FF6D1F 100%);
          border-color: #FF6D1F;
        }

        /* Enhanced Animations */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes particle {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0) rotate(0deg);
          }
          10% {
            opacity: 1;
            transform: translateY(-20px) scale(1) rotate(45deg);
          }
          90% {
            opacity: 0.8;
            transform: translateY(-120px) scale(1.2) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-150px) scale(0) rotate(360deg);
          }
        }

        @keyframes slow-zoom {
          0% {
            transform: scale(1) rotate(0deg);
          }
          100% {
            transform: scale(1.15) rotate(2deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 109, 31, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 109, 31, 0.6);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-particle {
          animation: particle 10s ease-in-out infinite;
        }

        .animate-slow-zoom {
          animation: slow-zoom 25s ease-in-out infinite alternate;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }

        /* Glassmorphism Effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Responsive utilities */
        @media (max-width: 768px) {
          .md-hidden {
            display: block !important;
          }
          
          .desktop-categories {
            display: none !important;
          }
          
          .ad-grid {
            grid-template-columns: 1fr !important;
          }
          
          .ad-grid > div:first-child {
            order: 1 !important;
            height: 200px !important;
          }
          
          .ad-grid > div:last-child {
            order: 2 !important;
            padding: 24px !important;
          }
        }

        @media (min-width: 769px) {
          .md-hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* ==================== المحتوى (Content) ==================== */}
      <div dir={t.dir} lang={t.lang}>
        {/* ==================== Navbar ==================== */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 40,
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            background: isScrolled
              ? "rgba(255, 255, 255, 0.85)"
              : "rgba(255, 255, 255, 0.5)",
            backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(10px)",
            WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(10px)",
            boxShadow: isScrolled
              ? "0 8px 32px rgba(255, 109, 31, 0.15), 0 2px 8px rgba(0, 0, 0, 0.05)"
              : "0 4px 16px rgba(0, 0, 0, 0.03)",
            borderBottom: isScrolled
              ? "1px solid rgba(255, 109, 31, 0.15)"
              : "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 50%, #FFB366 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(255, 109, 31, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.2) 100%)",
                    borderRadius: "50%",
                  }}
                />
                <span style={{ fontSize: "28px", position: "relative", zIndex: 1 }}>📋</span>
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#1a1a1a",
                  letterSpacing: "-0.5px",
                }}
              >
                {t.nav.menu}{" "}
                <span 
                  style={{ 
                    background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.nav.menuHighlight}
                </span>
              </h1>
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 231, 198, 0.9) 100%)",
                border: "2px solid rgba(255, 109, 31, 0.15)",
                color: "#1a1a1a",
                padding: "12px 20px",
                borderRadius: "999px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 109, 31, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.8)";
              }}
            >
              <i className="ri-global-line" style={{ fontSize: "20px", color: "#FF6D1F" }} />
              <span style={{ fontWeight: "600", fontSize: "14px" }}>
                {lang === "ar" ? t.languageSwitcher.english : t.languageSwitcher.arabic}
              </span>
            </button>
          </div>

          {/* Mobile Category Button */}
          {showCategories && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "12px",
              }}
              className="md-hidden"
            >
              <button
                onClick={() => setShowMobileCategories(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 109, 31, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)";
                }}
              >
                🍽️ {t.menu?.categoriesTitle}
              </button>
            </div>
          )}

          {/* Desktop Categories - تظهر عند الوصول للمنيو */}
          {showCategories && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px",
                padding: "0 16px 16px",
              }}
              className="desktop-categories"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    borderRadius: "999px",
                    fontSize: "15px",
                    fontWeight: "600",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    background:
                      activeCategory === category.id 
                        ? "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)" 
                        : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 231, 198, 0.8) 100%)",
                    color:
                      activeCategory === category.id ? "white" : "#1a1a1a",
                    boxShadow:
                      activeCategory === category.id
                        ? "0 8px 24px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)"
                        : "0 4px 12px rgba(0, 0, 0, 0.06)",
                    transform:
                      activeCategory === category.id ? "translateY(-2px)" : "translateY(0)",
                    border: activeCategory === category.id 
                      ? "2px solid rgba(255, 255, 255, 0.3)" 
                      : "2px solid rgba(255, 109, 31, 0.15)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== category.id) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 109, 31, 0.2)";
                      e.currentTarget.style.borderColor = "rgba(255, 109, 31, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== category.id) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
                      e.currentTarget.style.borderColor = "rgba(255, 109, 31, 0.15)";
                    }
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{category.emoji}</span>
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* Mobile Categories Bottom Sheet */}
        {showMobileCategories && (
          <div
            onClick={() => setShowMobileCategories(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(0, 0, 0, 0.4)",
              display: "flex",
              alignItems: "flex-end",
            }}
            className="animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                background: "#FAF3E1",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h3 style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {t.navbar.categoriesTitle}
                </h3>
                <button
                  onClick={() => setShowMobileCategories(false)}
                  style={{
                    fontSize: "20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setShowMobileCategories(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      transition: "all 0.3s",
                      background:
                        activeCategory === category.id
                          ? "#FF6D1F"
                          : "#F5E7C6",
                      color:
                        activeCategory === category.id ? "white" : "#222222",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {category.emoji} {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== Hero Section ==================== */}
        <section
          style={{
            position: "relative",
            minHeight: "55vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "linear-gradient(135deg, #FFF8E7 0%, #FAF3E1 50%, #F5EDD5 100%)",
            paddingTop: "100px",
            paddingBottom: "40px",
          }}
        >
          {/* Enhanced Particles */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            {particles.map((particle, i) => (
              <div
                key={i}
                className="animate-particle"
                style={{
                  position: "absolute",
                  width: i % 3 === 0 ? "12px" : "8px",
                  height: i % 3 === 0 ? "12px" : "8px",
                  borderRadius: "50%",
                  background: i % 2 === 0 
                    ? "linear-gradient(135deg, rgba(255, 109, 31, 0.3), rgba(255, 154, 77, 0.2))"
                    : "linear-gradient(135deg, rgba(245, 231, 198, 0.4), rgba(255, 255, 255, 0.3))",
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  boxShadow: i % 3 === 0 ? "0 0 20px rgba(255, 109, 31, 0.3)" : "none",
                }}
              />
            ))}
          </div>

          {/* Decorative Shapes */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <div
              className="animate-float"
              style={{
                position: "absolute",
                top: "10%",
                right: "5%",
                width: "300px",
                height: "300px",
                background: "radial-gradient(circle, rgba(255, 109, 31, 0.08) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(40px)",
              }}
            />
            <div
              className="animate-float delay-300"
              style={{
                position: "absolute",
                bottom: "15%",
                left: "8%",
                width: "250px",
                height: "250px",
                background: "radial-gradient(circle, rgba(245, 231, 198, 0.12) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(40px)",
              }}
            />
          </div>

          {/* Background overlay */}
          <div style={{ position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(255, 248, 231, 0) 0%, rgba(250, 243, 225, 0.5) 60%, rgba(250, 243, 225, 0.9) 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
              padding: "0 16px",
              maxWidth: "896px",
              margin: "0 auto",
            }}
          >
            {/* Since Badge - Enhanced */}
            <div
              className="animate-fade-in-up"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "20px",
                opacity: 0,
              }}
            >
              <span
                style={{
                  width: "48px",
                  height: "2px",
                  background: "linear-gradient(to right, transparent, rgba(255, 109, 31, 0.5), rgba(255, 109, 31, 0.8))",
                  borderRadius: "999px",
                }}
              />
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(255, 109, 31, 0.1), rgba(255, 154, 77, 0.15))",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid rgba(255, 109, 31, 0.3)",
                  borderRadius: "999px",
                  padding: "6px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 16px rgba(255, 109, 31, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.5)",
                }}
              >
                <i className="ri-sparkle-line" style={{ fontSize: "14px", color: "#FF6D1F" }} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.15em",
                    color: "#FF6D1F",
                    textTransform: "uppercase",
                  }}
                >
                  {t.hero.since}
                </span>
                <i className="ri-sparkle-line" style={{ fontSize: "14px", color: "#FF6D1F" }} />
              </div>
              <span
                style={{
                  width: "48px",
                  height: "2px",
                  background: "linear-gradient(to left, transparent, rgba(255, 109, 31, 0.5), rgba(255, 109, 31, 0.8))",
                  borderRadius: "999px",
                }}
              />
            </div>

            {/* Title - Enhanced */}
            <h1
              className="animate-fade-in-up delay-200"
              style={{
                fontSize: "clamp(40px, 8vw, 72px)",
                fontWeight: "900",
                color: "#1a1a1a",
                marginBottom: "20px",
                opacity: 0,
                lineHeight: "1.1",
                letterSpacing: "-1.5px",
              }}
            >
              {t.hero.title}{" "}
              <span 
                style={{ 
                  background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 50%, #FFB366 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                {t.hero.titleHighlight}
                <span
                  style={{
                    position: "absolute",
                    bottom: "6px",
                    left: 0,
                    right: 0,
                    height: "8px",
                    background: "rgba(255, 109, 31, 0.15)",
                    zIndex: -1,
                    borderRadius: "4px",
                  }}
                />
              </span>
            </h1>

            {/* Tagline - Enhanced */}
            <p
              className="animate-fade-in-up delay-300"
              style={{
                fontSize: "clamp(14px, 2.5vw, 17px)",
                color: "rgba(26, 26, 26, 0.75)",
                marginBottom: "32px",
                maxWidth: "560px",
                margin: "0 auto 32px",
                lineHeight: "1.6",
                opacity: 0,
                fontWeight: "400",
              }}
            >
              {t.hero.tagline}
            </p>

            {/* CTA Button - Enhanced */}
            <button
              onClick={scrollToMenu}
              className="animate-fade-in-up delay-400"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 50%, #FF9A4D 100%)",
                color: "white",
                padding: "14px 32px",
                borderRadius: "999px",
                fontWeight: "700",
                fontSize: "15px",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 12px 32px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
                border: "none",
                cursor: "pointer",
                opacity: 0,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(255, 109, 31, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 109, 31, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)";
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                  animation: "shimmer 2s infinite",
                }}
              />
              {t.hero.cta}
              <i className="ri-arrow-down-s-line" style={{ fontSize: "18px", transition: "transform 0.3s" }} />
            </button>
          </div>
        </section>

        {/* ==================== إعلان 1 - بعد Hero ==================== */}
        {adsData
          .filter((ad) => ad.position === "after-hero")
          .map((ad) => (
            <section
              key={ad.id}
              style={{
                padding: "40px 16px",
                background: "#FAF3E1",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <div
                  className="animate-fade-in-up"
                  style={{
                    position: "relative",
                    background: ad.bgColor,
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                    opacity: 0,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isRTL
                        ? "1fr 45%"
                        : "45% 1fr",
                      gap: "0",
                      alignItems: "center",
                      minHeight: "280px",
                    }}
                    className="ad-grid"
                  >
                    {/* الصورة */}
                    <div
                      style={{
                        position: "relative",
                        height: "280px",
                        order: isRTL ? 2 : 1,
                      }}
                    >
                      <Image
                        src={ad.image}
                        alt={ad.title[lang]}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: isRTL
                            ? "linear-gradient(to left, rgba(0, 0, 0, 0.3), transparent)"
                            : "linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent)",
                        }}
                      />
                    </div>

                    {/* المحتوى */}
                    <div
                      style={{
                        padding: "40px",
                        color: "white",
                        order: isRTL ? 1 : 2,
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "clamp(28px, 5vw, 42px)",
                          fontWeight: "900",
                          marginBottom: "16px",
                          lineHeight: "1.2",
                          textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {ad.title[lang]}
                      </h2>
                      <p
                        style={{
                          fontSize: "clamp(16px, 3vw, 20px)",
                          marginBottom: "28px",
                          opacity: 0.95,
                          lineHeight: "1.6",
                        }}
                      >
                        {ad.description[lang]}
                      </p>
                      <a
                        href={ad.link}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          background: "rgba(255, 255, 255, 0.95)",
                          color: "#1a1a1a",
                          padding: "14px 32px",
                          borderRadius: "999px",
                          fontWeight: "700",
                          fontSize: "16px",
                          textDecoration: "none",
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                          transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
                        }}
                      >
                        {ad.buttonText[lang]}
                        <i className={isRTL ? "ri-arrow-left-line" : "ri-arrow-right-line"} style={{ fontSize: "20px" }} />
                      </a>
                    </div>
                  </div>

                  {/* Decorative Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      [isRTL ? "left" : "right"]: "20px",
                      background: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(10px)",
                      padding: "8px 20px",
                      borderRadius: "999px",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    ⭐ {lang === "ar" ? "عرض خاص" : "Special Offer"}
                  </div>
                </div>
              </div>
            </section>
          ))}

        {/* ==================== Menu Section ==================== */}
        <section
          id="menu"
          style={{
            padding: "120px 16px 96px",
            background: "linear-gradient(180deg, #FAF3E1 0%, #FFF8E7 50%, #F5EDD5 100%)",
            position: "relative",
            overflow: "hidden",
            minHeight: "100vh",
          }}
        >
          {/* Enhanced Background Decorations */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              [isRTL ? "right" : "left"]: "-5%",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(255, 109, 31, 0.08) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(80px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-10%",
              [isRTL ? "left" : "right"]: "-5%",
              width: "450px",
              height: "450px",
              background: "radial-gradient(circle, rgba(245, 231, 198, 0.12) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(80px)",
            }}
          />
          
          {/* Floating Shapes */}
          <div
            className="animate-float"
            style={{
              position: "absolute",
              top: "20%",
              right: "10%",
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, rgba(255, 109, 31, 0.1), rgba(255, 154, 77, 0.05))",
              borderRadius: "50%",
              filter: "blur(20px)",
            }}
          />
          <div
            className="animate-float delay-300"
            style={{
              position: "absolute",
              bottom: "30%",
              left: "8%",
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, rgba(245, 231, 198, 0.15), rgba(255, 255, 255, 0.1))",
              borderRadius: "50%",
              filter: "blur(25px)",
            }}
          />

          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            {/* Section Header - Enhanced */}
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span
                className="animate-fade-in-up"
                style={{
                  display: "inline-block",
                  color: "#FF6D1F",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  opacity: 0,
                  position: "relative",
                  padding: "8px 20px",
                  background: "linear-gradient(135deg, rgba(255, 109, 31, 0.08), rgba(255, 154, 77, 0.12))",
                  backdropFilter: "blur(10px)",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(255, 109, 31, 0.2)",
                  boxShadow: "0 4px 16px rgba(255, 109, 31, 0.1)",
                }}
              >
                {t.menu.subtitle}
              </span>
              <h2
                className="animate-fade-in-up delay-100"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: "900",
                  color: "#1a1a1a",
                  marginBottom: "16px",
                  opacity: 0,
                  lineHeight: "1.2",
                  letterSpacing: "-1px",
                }}
              >
                {t.menu.title}{" "}
                <span 
                  style={{ 
                    background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  {t.menu.titleHighlight}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "3px",
                      left: 0,
                      right: 0,
                      height: "8px",
                      background: "rgba(255, 109, 31, 0.12)",
                      zIndex: -1,
                      borderRadius: "3px",
                    }}
                  />
                </span>
              </h2>
              <p
                className="animate-fade-in-up delay-200"
                style={{
                  color: "rgba(26, 26, 26, 0.7)",
                  fontSize: "14px",
                  maxWidth: "560px",
                  margin: "0 auto",
                  opacity: 0,
                  lineHeight: "1.6",
                }}
              >
                {t.menu.description}
              </p>
            </div>

            {/* Search Bar - Enhanced */}
            <div
              ref={searchContainerRef}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "56px",
                position: "relative",
                width: "100%",
                maxWidth: "700px",
                margin: "0 auto 56px",
              }}
            >
              <div style={{ position: "relative", width: "100%" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    [isRTL ? "right" : "left"]: "24px",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                >
                  <i 
                    className="ri-search-line" 
                    style={{ 
                      fontSize: "24px", 
                      background: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }} 
                  />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    if (searchQuery) setIsSearchOpen(true);
                  }}
                  placeholder={t.search.placeholder}
                  style={{
                    width: "100%",
                    padding: isRTL ? "18px 56px 18px 64px" : "18px 64px 18px 56px",
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "2px solid rgba(255, 109, 31, 0.2)",
                    outline: "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    color: "#1a1a1a",
                    fontSize: "16px",
                    fontWeight: "500",
                    textAlign: isRTL ? "right" : "left",
                    boxShadow: "0 8px 24px rgba(255, 109, 31, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.8)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 109, 31, 0.4)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 109, 31, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSearchFocused) {
                      e.currentTarget.style.borderColor = "rgba(255, 109, 31, 0.2)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 109, 31, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.8)";
                    }
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      [isRTL ? "left" : "right"]: "20px",
                      transform: "translateY(-50%)",
                      background: "linear-gradient(135deg, rgba(255, 109, 31, 0.1), rgba(255, 154, 77, 0.15))",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #FF6D1F, #FF8C42)";
                      e.currentTarget.style.transform = "translateY(-50%) rotate(90deg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 109, 31, 0.1), rgba(255, 154, 77, 0.15))";
                      e.currentTarget.style.transform = "translateY(-50%) rotate(0deg)";
                    }}
                  >
                    <i
                      className="ri-close-line"
                      style={{
                        fontSize: "20px",
                        color: "#FF6D1F",
                      }}
                    />
                  </button>
                )}
              </div>

              {/* Search results or empty message */}
              {isSearchOpen && searchQuery && filteredItems.length === 0 && (
                <div
                  className="animate-fade-in"
                  style={{
                    position: "absolute",
                    top: "100%",
                    marginTop: "12px",
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.98)",
                    backdropFilter: "blur(24px)",
                    borderRadius: "16px",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                    border: "1px solid rgba(255, 109, 31, 0.1)",
                    padding: "32px",
                    textAlign: "center",
                    zIndex: 50,
                  }}
                >
                  <span style={{ fontSize: "48px", display: "block", marginBottom: "12px" }}>
                    🔍
                  </span>
                  <p
                    style={{
                      color: "rgba(34, 34, 34, 0.6)",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    {t.search.noResults}
                  </p>
                  <p style={{ color: "rgba(34, 34, 34, 0.4)", fontSize: "13px" }}>
                    {t.search.tryAgain}
                  </p>
                </div>
              )}
            </div>

            {/* Menu Grid */}
            {filteredItems.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "32px",
                }}
              >
                {filteredItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div
                    key={item.id}
                    onClick={() => setSelectedCard(item)}
                    className="animate-fade-in-up"
                    style={{
                      position: "relative",
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 231, 198, 0.7) 100%)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      overflow: "hidden",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      opacity: 0,
                      animationDelay: `${index * 100}ms`,
                      cursor: "pointer",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 48px rgba(255, 109, 31, 0.2), 0 8px 16px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.borderColor = "rgba(255, 109, 31, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                    }}
                  >
                    {/* Image - Enhanced */}
                    <div 
                      style={{ 
                        position: "relative", 
                        height: "200px", 
                        overflow: "hidden",
                        borderRadius: "20px 20px 0 0",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name[lang]}
                        fill
                        style={{ 
                          objectFit: "cover",
                          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.transform = "scale(1)";
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(26, 26, 26, 0.6) 0%, rgba(26, 26, 26, 0.2) 40%, transparent 100%)",
                        }}
                      />

                      {/* Badges */}
                      <div
                        style={{
                          position: "absolute",
                          top: "16px",
                          left: "16px",
                          right: "16px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            background: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "999px",
                            fontWeight: "800",
                            fontSize: "14px",
                            boxShadow: "0 8px 24px rgba(255, 109, 31, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                          }}
                        >
                          {item.price[lang]}
                        </div>

                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {item.isBestSeller && (
                            <div
                              style={{
                                background: "rgba(34, 34, 34, 0.9)",
                                color: "white",
                                padding: "6px 12px",
                                borderRadius: "999px",
                                fontSize: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <i className="ri-award-line" style={{ fontSize: "14px" }} />
                              <span>{t.common.bestSeller}</span>
                            </div>
                          )}
                          {item.isHot && (
                            <div
                              style={{
                                background: "rgba(255, 109, 31, 0.9)",
                                color: "white",
                                padding: "6px 12px",
                                borderRadius: "999px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <i className="ri-fire-line" style={{ fontSize: "14px" }} />
                            </div>
                          )}
                          {item.isVegetarian && (
                            <div
                              style={{
                                background: "rgba(34, 139, 34, 0.9)",
                                color: "white",
                                padding: "6px 12px",
                                borderRadius: "999px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <i className="ri-leaf-line" style={{ fontSize: "14px" }} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content - Enhanced */}
                    <div style={{ padding: "20px" }}>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#1a1a1a",
                          marginBottom: "10px",
                          transition: "color 0.3s",
                          lineHeight: "1.3",
                        }}
                      >
                        {item.name[lang]}
                      </h3>

                      <p
                        style={{
                          fontSize: "13px",
                          color: "rgba(26, 26, 26, 0.7)",
                          lineHeight: "1.6",
                          marginBottom: "16px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.description[lang]}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "12px",
                          borderTop: "1.5px solid rgba(255, 109, 31, 0.1)",
                        }}
                      >
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <span
                            style={{
                              height: "4px",
                              width: "40px",
                              background: "linear-gradient(to right, #FF6D1F, #FF8C42)",
                              borderRadius: "999px",
                              transition: "width 0.3s",
                            }}
                          />
                          <span
                            style={{
                              height: "4px",
                              width: "20px",
                              background: "rgba(255, 109, 31, 0.3)",
                              borderRadius: "999px",
                              transition: "width 0.3s",
                            }}
                          />
                        </div>

                        {item.prepTime && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "#FF6D1F",
                              background: "rgba(255, 109, 31, 0.08)",
                              padding: "5px 12px",
                              borderRadius: "999px",
                            }}
                          >
                            <i className="ri-time-line" style={{ fontSize: "14px" }} />
                            <span>{item.prepTime[lang]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                    {/* إعلان بعد المنتج السادس */}
                    {index === 5 && adsData
                      .filter((ad) => ad.position === "mid-menu")
                      .map((ad) => (
                        <div
                          key={`ad-${ad.id}`}
                          className="animate-fade-in-up"
                          style={{
                            gridColumn: "1 / -1",
                            position: "relative",
                            background: ad.bgColor,
                            borderRadius: "20px",
                            overflow: "hidden",
                            padding: "32px",
                            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
                            opacity: 0,
                            animationDelay: `${(index + 1) * 100}ms`,
                          }}
                        >
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr auto",
                              gap: "24px",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  display: "inline-block",
                                  background: "rgba(255, 255, 255, 0.2)",
                                  padding: "6px 16px",
                                  borderRadius: "999px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  color: "white",
                                  marginBottom: "12px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.1em",
                                }}
                              >
                                🎉 {lang === "ar" ? "عرض حصري" : "Exclusive Offer"}
                              </div>
                              <h3
                                style={{
                                  fontSize: "clamp(22px, 4vw, 32px)",
                                  fontWeight: "900",
                                  color: "white",
                                  marginBottom: "12px",
                                  lineHeight: "1.2",
                                }}
                              >
                                {ad.title[lang]}
                              </h3>
                              <p
                                style={{
                                  fontSize: "clamp(14px, 2.5vw, 18px)",
                                  color: "rgba(255, 255, 255, 0.95)",
                                  marginBottom: "20px",
                                  lineHeight: "1.5",
                                }}
                              >
                                {ad.description[lang]}
                              </p>
                              <a
                                href={ad.link}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  background: "white",
                                  color: "#1a1a1a",
                                  padding: "12px 28px",
                                  borderRadius: "999px",
                                  fontWeight: "700",
                                  fontSize: "14px",
                                  textDecoration: "none",
                                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                                  transition: "all 0.3s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = "translateY(-3px)";
                                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = "translateY(0)";
                                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
                                }}
                              >
                                {ad.buttonText[lang]}
                                <i className="ri-arrow-right-line" style={{ fontSize: "18px" }} />
                              </a>
                            </div>

                            <div
                              style={{
                                position: "relative",
                                width: "200px",
                                height: "200px",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              <Image
                                src={ad.image}
                                alt={ad.title[lang]}
                                fill
                                style={{ objectFit: "cover" }}
                                sizes="200px"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <p style={{ color: "rgba(34, 34, 34, 0.7)", fontSize: "18px" }}>
                  {t.menu.noProducts}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ==================== إعلان 3 - قبل Footer ==================== */}
        {adsData
          .filter((ad) => ad.position === "before-footer")
          .map((ad) => (
            <section
              key={ad.id}
              style={{
                padding: "40px 16px",
                background: "#FAF3E1",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <div
                  className="animate-fade-in-up"
                  style={{
                    position: "relative",
                    background: ad.bgColor,
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                    opacity: 0,
                    textAlign: "center",
                    padding: "48px 32px",
                  }}
                >
                  {/* أيقونة مميزة */}
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      border: "3px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <i className="ri-truck-line" style={{ fontSize: "40px", color: "white" }} />
                  </div>

                  <h2
                    style={{
                      fontSize: "clamp(28px, 5vw, 42px)",
                      fontWeight: "900",
                      color: "white",
                      marginBottom: "16px",
                      lineHeight: "1.2",
                      textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {ad.title[lang]}
                  </h2>

                  <p
                    style={{
                      fontSize: "clamp(16px, 3vw, 20px)",
                      color: "rgba(255, 255, 255, 0.95)",
                      marginBottom: "32px",
                      maxWidth: "600px",
                      margin: "0 auto 32px",
                      lineHeight: "1.6",
                    }}
                  >
                    {ad.description[lang]}
                  </p>

                  <a
                    href={ad.link}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "white",
                      color: "#1a1a1a",
                      padding: "16px 40px",
                      borderRadius: "999px",
                      fontWeight: "700",
                      fontSize: "17px",
                      textDecoration: "none",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
                    }}
                  >
                    {ad.buttonText[lang]}
                    <i className="ri-arrow-right-line" style={{ fontSize: "20px" }} />
                  </a>

                  {/* شكل زخرفي */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-50px",
                      right: "-50px",
                      width: "150px",
                      height: "150px",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "50%",
                      filter: "blur(40px)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-70px",
                      left: "-70px",
                      width: "180px",
                      height: "180px",
                      background: "rgba(255, 255, 255, 0.08)",
                      borderRadius: "50%",
                      filter: "blur(50px)",
                    }}
                  />
                </div>
              </div>
            </section>
          ))}

        {/* ==================== Footer - Enhanced ==================== */}
        <footer
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
            color: "#FAF3E1",
            padding: "80px 16px 40px",
            overflow: "hidden",
          }}
        >
          {/* Decorative Elements */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              height: "6px",
              background: "linear-gradient(90deg, transparent 0%, #FF6D1F 50%, transparent 100%)",
              boxShadow: "0 0 20px rgba(255, 109, 31, 0.5)",
            }}
          />
          
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(255, 109, 31, 0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(60px)",
            }}
          />
          <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "48px",
                marginBottom: "48px",
              }}
            >
              {/* Brand - Enhanced */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF6D1F 0%, #FF8C42 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px rgba(255, 109, 31, 0.4)",
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>📋</span>
                  </div>
                  <h3
                    style={{
                      fontSize: "26px",
                      fontWeight: "800",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {t.footer.brand}
                    <span 
                      style={{ 
                        background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        marginLeft: "6px",
                      }}
                    >
                      {t.footer.brandHighlight}
                    </span>
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: "14.5px",
                    color: "rgba(250, 243, 225, 0.85)",
                    lineHeight: "1.8",
                    maxWidth: "400px",
                  }}
                >
                  {t.footer.description}
                </p>
              </div>

              {/* Contact */}
              <div>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "20px",
                    color: "#FAF3E1",
                  }}
                >
                  {t.footer.contactTitle}
                </h4>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    <i
                      className="ri-map-pin-line"
                      style={{
                        fontSize: "16px",
                        color: "#FF6D1F",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: "rgba(250, 243, 225, 0.8)" }}>
                      {t.footer.address}
                    </span>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    <i
                      className="ri-time-line"
                      style={{
                        fontSize: "16px",
                        color: "#FF6D1F",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: "rgba(250, 243, 225, 0.8)" }}>
                      {t.footer.hours}
                    </span>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    <i
                      className="ri-phone-line"
                      style={{
                        fontSize: "16px",
                        color: "#FF6D1F",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <a
                      href="tel:+201023456789"
                      dir="ltr"
                      style={{
                        color: "rgba(250, 243, 225, 0.8)",
                        textDecoration: "none",
                        transition: "color 0.3s",
                      }}
                    >
                      +20 102 345 6789
                    </a>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      gap: "12px",
                      fontSize: "14px",
                    }}
                  >
                    <i
                      className="ri-mail-line"
                      style={{
                        fontSize: "16px",
                        color: "#FF6D1F",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <a
                      href="mailto:info@menu.com"
                      style={{
                        color: "rgba(250, 243, 225, 0.8)",
                        textDecoration: "none",
                        transition: "color 0.3s",
                      }}
                    >
                      info@menu.com
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social - Enhanced */}
              <div>
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginBottom: "24px",
                    color: "#FAF3E1",
                  }}
                >
                  {t.footer.followTitle}
                </h4>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {["ri-instagram-line", "ri-facebook-line", "ri-twitter-x-line"].map((iconClass, i) => (
                    <a
                      key={i}
                      href="#"
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        color: "#FF6D1F",
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(245, 231, 198, 0.15))",
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(255, 109, 31, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px) scale(1.1)";
                        e.currentTarget.style.background = "linear-gradient(135deg, #FF6D1F, #FF8C42)";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.borderColor = "#FF6D1F";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 109, 31, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(245, 231, 198, 0.15))";
                        e.currentTarget.style.color = "#FF6D1F";
                        e.currentTarget.style.borderColor = "rgba(255, 109, 31, 0.2)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <i className={iconClass} style={{ fontSize: "22px", position: "relative", zIndex: 1 }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom - Enhanced */}
            <div
              style={{
                marginTop: "56px",
                paddingTop: "32px",
                borderTop: "2px solid rgba(255, 109, 31, 0.15)",
                textAlign: "center",
                fontSize: "13px",
                color: "rgba(250, 243, 225, 0.7)",
              }}
            >
              <p style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: "8px",
                marginBottom: "12px",
                fontWeight: "500",
              }}>
                {t.footer.copyright}
                <i className="ri-heart-fill" style={{ fontSize: "14px", color: "#FF6D1F", animation: "pulse 2s ease-in-out infinite" }} />
              </p>

              <p
                style={{
                  marginTop: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontSize: "13px",
                }}
              >
                {t.footer.developedBy}
                <a
                  href="https://www.facebook.com/ENSEGYPTEG"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: "700",
                    background: "linear-gradient(135deg, #FF6D1F 0%, #FF9A4D 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textDecoration: "none",
                    transition: "all 0.3s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.letterSpacing = "1px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.letterSpacing = "0";
                  }}
                >
                  ENS
                </a>
              </p>
            </div>
          </div>
        </footer>

        {/* ==================== Modal (Card Details) ==================== */}
        {selectedCard && (
          <div
            onClick={() => setSelectedCard(null)}
            className="animate-fade-in"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="animate-scale-in"
              style={{
                position: "relative",
                background:
                  "linear-gradient(135deg, #FAF3E1 0%, #F5E7C6 50%, #FAF3E1 100%)",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "700px",
                maxHeight: "90vh",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                style={{
                  position: "absolute",
                  top: "24px",
                  [isRTL ? "left" : "right"]: "24px",
                  zIndex: 20,
                  background: "#222222",
                  color: "white",
                  borderRadius: "50%",
                  padding: "12px",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <i className="ri-close-line" style={{ fontSize: "20px" }} />
              </button>

              {/* Scrollable Content */}
              <div style={{ overflowY: "auto", maxHeight: "90vh" }}>
                {/* Image Section */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    overflow: "hidden",
                    borderTopLeftRadius: "24px",
                    borderTopRightRadius: "24px",
                  }}
                >
                  <Image
                    src={selectedCard.image}
                    alt={selectedCard.name[lang]}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(34, 34, 34, 0.8) 0%, rgba(34, 34, 34, 0.2) 50%, transparent 100%)",
                    }}
                  />

                  {/* Badges on image */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "24px",
                      left: "24px",
                      right: "24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {/* Price Badge */}
                      <div
                        style={{
                          background: "linear-gradient(135deg, #FF6D1F, #e65b1b)",
                          color: "white",
                          padding: "12px 24px",
                          borderRadius: "16px",
                          fontWeight: "bold",
                          fontSize: "24px",
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {selectedCard.price[lang]}
                      </div>
                      {selectedCard.isBestSeller && (
                        <div
                          style={{
                            background: "rgba(34, 34, 34, 0.95)",
                            backdropFilter: "blur(8px)",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "12px",
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                            width: "fit-content",
                          }}
                        >
                          <i className="ri-award-line" style={{ fontSize: "20px", color: "#FF6D1F" }} />
                          <span style={{ fontWeight: "600" }}>{t.common.bestSeller}</span>
                        </div>
                      )}
                    </div>

                    {/* Icon Badges */}
                    <div style={{ display: "flex", gap: "8px" }}>
                      {selectedCard.isHot && (
                        <div
                          style={{
                            background: "rgba(255, 109, 31, 0.95)",
                            backdropFilter: "blur(8px)",
                            color: "white",
                            padding: "12px",
                            borderRadius: "50%",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <i className="ri-fire-line" style={{ fontSize: "20px" }} />
                        </div>
                      )}
                      {selectedCard.isVegetarian && (
                        <div
                          style={{
                            background: "rgba(34, 139, 34, 0.95)",
                            backdropFilter: "blur(8px)",
                            color: "white",
                            padding: "12px",
                            borderRadius: "50%",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <i className="ri-leaf-line" style={{ fontSize: "20px" }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div style={{ padding: "20px 24px" }}>
                  {/* Title & Description */}
                  <div style={{ marginBottom: "20px" }}>
                    <h2
                      style={{
                        fontSize: "clamp(24px, 4vw, 28px)",
                        fontWeight: "bold",
                        color: "#222222",
                        marginBottom: "10px",
                        lineHeight: "1.2",
                      }}
                    >
                      {selectedCard.name[lang]}
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                      <span
                        style={{
                          height: "3px",
                          width: "48px",
                          background: "linear-gradient(to right, #FF6D1F, #e65b1b)",
                          borderRadius: "999px",
                        }}
                      />
                      <span
                        style={{
                          height: "3px",
                          width: "24px",
                          background: "rgba(34, 34, 34, 0.2)",
                          borderRadius: "999px",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: "clamp(13px, 2.5vw, 15px)",
                        color: "rgba(34, 34, 34, 0.8)",
                        lineHeight: "1.5",
                      }}
                    >
                      {selectedCard.description[lang]}
                    </p>
                  </div>

                  {/* Info Cards Grid */}
                  {(selectedCard.prepTime || selectedCard.calories) && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: "12px",
                        marginBottom: "20px",
                      }}
                    >
                      {selectedCard.prepTime && (
                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.6)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 109, 31, 0.2)",
                            borderRadius: "12px",
                            padding: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            transition: "box-shadow 0.3s",
                          }}
                        >
                          <div
                            style={{
                              background: "linear-gradient(135deg, #FF6D1F, #e65b1b)",
                              borderRadius: "10px",
                              padding: "10px",
                              boxShadow: "0 4px 12px rgba(255, 109, 31, 0.3)",
                            }}
                          >
                            <i className="ri-time-line" style={{ fontSize: "20px", color: "white" }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p
                              style={{
                                fontSize: "10px",
                                fontWeight: "500",
                                color: "rgba(34, 34, 34, 0.6)",
                                marginBottom: "2px",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {t.common.prepTime}
                            </p>
                            <p
                              style={{
                                fontWeight: "bold",
                                fontSize: "15px",
                                color: "#222222",
                              }}
                            >
                              {selectedCard.prepTime[lang]}
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedCard.calories && (
                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.6)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 109, 31, 0.2)",
                            borderRadius: "12px",
                            padding: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            transition: "box-shadow 0.3s",
                          }}
                        >
                          <div
                            style={{
                              background: "linear-gradient(135deg, #FF6D1F, #e65b1b)",
                              borderRadius: "10px",
                              padding: "10px",
                              boxShadow: "0 4px 12px rgba(255, 109, 31, 0.3)",
                            }}
                          >
                            <i className="ri-fire-line" style={{ fontSize: "20px", color: "white" }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p
                              style={{
                                fontSize: "10px",
                                fontWeight: "500",
                                color: "rgba(34, 34, 34, 0.6)",
                                marginBottom: "2px",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {t.common.calories}
                            </p>
                            <p
                              style={{
                                fontWeight: "bold",
                                fontSize: "15px",
                                color: "#222222",
                              }}
                            >
                              {selectedCard.calories[lang]}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features Tags */}
                  {(selectedCard.isHot || selectedCard.isVegetarian) && (
                    <div style={{ marginBottom: "20px" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "rgba(34, 34, 34, 0.7)",
                          marginBottom: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {t.common.features}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {selectedCard.isHot && (
                          <div
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(255, 109, 31, 0.2), rgba(255, 109, 31, 0.1))",
                              border: "2px solid rgba(255, 109, 31, 0.3)",
                              color: "#FF6D1F",
                              padding: "8px 16px",
                              borderRadius: "999px",
                              fontSize: "13px",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              boxShadow: "0 2px 8px rgba(255, 109, 31, 0.1)",
                            }}
                          >
                            <i className="ri-fire-line" style={{ fontSize: "16px" }} />
                            <span>{t.common.hotDrink}</span>
                          </div>
                        )}
                        {selectedCard.isVegetarian && (
                          <div
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(34, 139, 34, 0.2), rgba(34, 139, 34, 0.1))",
                              border: "2px solid rgba(34, 139, 34, 0.3)",
                              color: "rgb(21, 128, 61)",
                              padding: "8px 16px",
                              borderRadius: "999px",
                              fontSize: "13px",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              boxShadow: "0 2px 8px rgba(34, 139, 34, 0.1)",
                            }}
                          >
                            <i className="ri-leaf-line" style={{ fontSize: "16px" }} />
                            <span>{t.common.vegetarian}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Decorative Element */}
                  <div style={{ margin: "24px 0", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        background:
                          "linear-gradient(to right, transparent, rgba(34, 34, 34, 0.2), transparent)",
                      }}
                    />
                    <div style={{ display: "flex", gap: "4px" }}>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "#FF6D1F",
                          borderRadius: "50%",
                        }}
                      />
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "rgba(255, 109, 31, 0.6)",
                          borderRadius: "50%",
                        }}
                      />
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "rgba(255, 109, 31, 0.3)",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        background:
                          "linear-gradient(to right, transparent, rgba(34, 34, 34, 0.2), transparent)",
                      }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <button
                      onClick={() => setSelectedCard(null)}
                      style={{
                        flex: 1,
                        background: "linear-gradient(135deg, #FF6D1F, #e65b1b)",
                        color: "white",
                        fontWeight: "bold",
                        padding: "16px 32px",
                        borderRadius: "12px",
                        transition: "all 0.3s",
                        boxShadow: "0 4px 16px rgba(255, 109, 31, 0.3)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      {t.common.close}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== WhatsApp Button - Enhanced ==================== */}
        <div>
          {/* Main Button */}
          <button
            onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
            style={{
              position: "fixed",
              bottom: "32px",
              right: "32px",
              zIndex: 50,
              width: "68px",
              height: "68px",
              background: "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)",
              color: "white",
              borderRadius: "50%",
              boxShadow: "0 12px 32px rgba(37, 211, 102, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              border: "3px solid rgba(255, 255, 255, 0.3)",
              cursor: "pointer",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(10deg)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(37, 211, 102, 0.6), 0 8px 16px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) rotate(0deg)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(37, 211, 102, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2)";
            }}
          >
            {isWhatsAppOpen ? (
              <i className="ri-close-line" style={{ fontSize: "32px" }} />
            ) : (
              <div style={{ position: "relative" }}>
                <i className="ri-message-3-line" style={{ fontSize: "32px", position: "relative", zIndex: 1 }} />
                <span
                  style={{
                    position: "absolute",
                    inset: "-10px",
                    borderRadius: "50%",
                    background: "rgba(37, 211, 102, 0.4)",
                    animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                  }}
                />
              </div>
            )}
          </button>

          {/* Chat Card - Enhanced */}
          {isWhatsAppOpen && (
            <div
              className="animate-scale-in"
              style={{
                position: "fixed",
                bottom: "116px",
                right: "32px",
                zIndex: 50,
                width: "340px",
                maxWidth: "calc(100vw - 64px)",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 231, 198, 0.95) 100%)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25), 0 8px 20px rgba(0, 0, 0, 0.15)",
                  overflow: "hidden",
                  border: "2px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                {/* Header */}
                <div style={{ 
                  background: "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)", 
                  color: "white", 
                  padding: "20px",
                  boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        background: "rgba(255, 255, 255, 0.25)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      <i className="ri-message-3-line" style={{ fontSize: "26px" }} />
                    </div>
                    <div style={{ textAlign: isRTL ? "right" : "left" }}>
                      <h3 style={{ fontWeight: "700", fontSize: "18px", marginBottom: "2px" }}>{t.whatsapp?.greeting}</h3>
                      <p style={{ fontSize: "13px", opacity: 0.9 }}>نحن متاحون الآن</p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "20px", background: "rgba(250, 243, 225, 0.5)" }}>
                  <div
                    style={{
                      background: "white",
                      borderRadius: "16px",
                      padding: "18px",
                      marginBottom: "14px",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                      border: "1px solid rgba(255, 109, 31, 0.1)",
                    }}
                  >
                    <p style={{ fontSize: "14.5px", color: "#1a1a1a", lineHeight: "1.6" }}>
                      {t.whatsapp?.message}
                      <br />
                      {t.whatsapp?.prompt}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ padding: "20px", borderTop: "2px solid rgba(255, 109, 31, 0.1)" }}>
                  <button
                    onClick={handleWhatsAppClick}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)",
                      color: "white",
                      padding: "14px 20px",
                      borderRadius: "14px",
                      fontWeight: "700",
                      fontSize: "15px",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 8px 20px rgba(37, 211, 102, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 12px 28px rgba(37, 211, 102, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 211, 102, 0.3)";
                    }}
                  >
                    <i className="ri-message-3-line" style={{ fontSize: "22px" }} />
                    <span>{t.whatsapp?.buttonLabel}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}