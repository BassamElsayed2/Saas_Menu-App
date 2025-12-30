"use client";

import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
  ReactNode,
  useMemo,
  memo,
} from "react";

// ============================
// Types & Interfaces
// ============================

type Locale = "ar" | "en";
type Category = "all" | "appetizers" | "mains" | "drinks" | "desserts";

interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  image: string;
  category: "appetizers" | "mains" | "drinks" | "desserts";
  isPopular?: boolean;
}

interface AdItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  badge?: { ar: string; en: string };
  link?: string;
  discount?: string;
}

// ============================
// Translations
// ============================

const translations = {
  ar: {
    brand: "منيو الكتروني",
    tagline: "استمتع بأشهى المأكولات",
    hero: {
      title: "اكتشف",
      highlight: "قائمتنا",
      subtitle: "المميزة",
      description: "تجربة طعام فريدة تجمع بين النكهات الأصيلة والإبداع العصري",
      cta: "تصفح القائمة",
    },
    nav: {
      menu: "القائمة",
      about: "عن المطعم",
      contact: "تواصل معنا",
    },
    categories: {
      title: "قائمة الطعام",
      all: "عرض الكل",
      appetizers: "المقبلات",
      mains: "الأطباق الرئيسية",
      drinks: "المشروبات",
      desserts: "الحلويات",
    },
    search: {
      placeholder: "ابحث في القائمة...",
      noResults: "لا توجد نتائج",
      results: "نتيجة",
      tryDifferentKeywords: "جرب البحث بكلمات أخرى",
    },
    footer: {
      address: "القاهرة، مصر",
      phone: "+20 10 123 4567",
      hours: "مفتوح يومياً: 12:00 م - 12:00 ص",
      rights: "جميع الحقوق محفوظة",
      followUs: "تابعنا",
      designedBy: "تصميم وتطوير",
    },
  },
  en: {
    brand: "Online Menu",
    tagline: "Enjoy the finest cuisine",
    hero: {
      title: "Discover",
      highlight: "Our Menu",
      subtitle: "Excellence",
      description:
        "A unique dining experience blending authentic flavors with modern creativity",
      cta: "Browse Menu",
    },
    nav: {
      menu: "Menu",
      about: "About",
      contact: "Contact",
    },
    categories: {
      title: "Our Menu",
      all: "View All",
      appetizers: "Appetizers",
      mains: "Main Courses",
      drinks: "Beverages",
      desserts: "Desserts",
    },
    search: {
      placeholder: "Search menu...",
      noResults: "No results found",
      results: "result",
      tryDifferentKeywords: "Try searching with different keywords",
    },
    footer: {
      address: "Cairo, Egypt",
      phone: "+20 10 123 4567",
      hours: "Open Daily: 12:00 PM - 12:00 AM",
      rights: "All Rights Reserved",
      followUs: "Follow Us",
      designedBy: "Designed & Developed by",
    },
  },
} as const;

// ============================
// Menu Items Data
// ============================

const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: "1",
    nameAr: "حمص بالطحينة",
    nameEn: "Hummus with Tahini",
    descriptionAr: "حمص كريمي مع طحينة طازجة وزيت زيتون بكر",
    descriptionEn: "Creamy chickpea dip with fresh tahini and virgin olive oil",
    price: 50,
    image:
      "https://images.pexels.com/photos/1618898/pexels-photo-1618898.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    category: "appetizers",
    isPopular: true,
  },
  {
    id: "2",
    nameAr: "متبل باذنجان",
    nameEn: "Baba Ganoush",
    descriptionAr: "باذنجان مشوي مع طحينة وثوم وليمون",
    descriptionEn: "Smoky roasted eggplant with tahini, garlic and lemon",
    price: 60,
    image:
      "https://images.pexels.com/photos/1618898/pexels-photo-1618898.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    category: "appetizers",
  },
  {
    id: "3",
    nameAr: "فتوش",
    nameEn: "Fattoush Salad",
    descriptionAr: "سلطة لبنانية تقليدية مع خبز مقرمش",
    descriptionEn: "Traditional Lebanese salad with crispy pita bread",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
    category: "appetizers",
  },
  {
    id: "4",
    nameAr: "سمبوسة لحم",
    nameEn: "Meat Samosa",
    descriptionAr: "سمبوسة مقرمشة محشوة باللحم المتبل",
    descriptionEn: "Crispy pastry filled with seasoned minced meat",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=500&fit=crop",
    category: "appetizers",
    isPopular: true,
  },
  // Main Courses
  {
    id: "5",
    nameAr: "كباب مشوي",
    nameEn: "Grilled Kebab",
    descriptionAr: "لحم غنم مفروم متبل ومشوي على الفحم",
    descriptionEn: "Seasoned minced lamb grilled over charcoal",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&h=500&fit=crop",
    category: "mains",
    isPopular: true,
  },
  {
    id: "6",
    nameAr: "مندي لحم",
    nameEn: "Lamb Mandi",
    descriptionAr: "لحم غنم طري مع أرز مندي تقليدي",
    descriptionEn: "Tender lamb with traditional mandi rice",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=500&fit=crop",
    category: "mains",
    isPopular: true,
  },
  {
    id: "7",
    nameAr: "سمك مشوي",
    nameEn: "Grilled Fish",
    descriptionAr: "سمك هامور طازج مشوي مع أعشاب",
    descriptionEn: "Fresh hammour fish grilled with herbs",
    price: 150,
    image:
      "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    category: "mains",
  },
  {
    id: "8",
    nameAr: "دجاج مشوي",
    nameEn: "Grilled Chicken",
    descriptionAr: "نصف دجاجة متبلة ومشوية على الفحم",
    descriptionEn: "Half chicken marinated and grilled over charcoal",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop",
    category: "mains",
  },
  // Drinks
  {
    id: "9",
    nameAr: "عصير برتقال طازج",
    nameEn: "Fresh Orange Juice",
    descriptionAr: "عصير برتقال طازج معصور",
    descriptionEn: "Freshly squeezed orange juice",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop",
    category: "drinks",
  },
  {
    id: "10",
    nameAr: "لبن عيران",
    nameEn: "Ayran",
    descriptionAr: "لبن مخفوق منعش",
    descriptionEn: "Refreshing yogurt drink",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&h=500&fit=crop",
    category: "drinks",
  },
  {
    id: "11",
    nameAr: "شاي مغربي",
    nameEn: "Moroccan Tea",
    descriptionAr: "شاي أخضر بالنعناع الطازج",
    descriptionEn: "Green tea with fresh mint",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=500&fit=crop",
    category: "drinks",
    isPopular: true,
  },
  {
    id: "12",
    nameAr: "قهوة عربية",
    nameEn: "Arabic Coffee",
    descriptionAr: "قهوة عربية أصيلة مع الهيل",
    descriptionEn: "Authentic Arabic coffee with cardamom",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop",
    category: "drinks",
  },
  // Desserts
  {
    id: "13",
    nameAr: "كنافة نابلسية",
    nameEn: "Kunafa",
    descriptionAr: "كنافة تقليدية محشوة بالجبن والقطر",
    descriptionEn: "Traditional kunafa with cheese and syrup",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&h=500&fit=crop",
    category: "desserts",
    isPopular: true,
  },
  {
    id: "14",
    nameAr: "بقلاوة",
    nameEn: "Baklava",
    descriptionAr: "طبقات رقيقة من العجين مع المكسرات والعسل",
    descriptionEn: "Layers of filo pastry with nuts and honey",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500&h=500&fit=crop",
    category: "desserts",
  },
  {
    id: "15",
    nameAr: "أم علي",
    nameEn: "Um Ali",
    descriptionAr: "حلى مصري بالعجين والمكسرات والحليب",
    descriptionEn: "Egyptian dessert with pastry, nuts and milk",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=500&fit=crop",
    category: "desserts",
  },
  {
    id: "16",
    nameAr: "آيس كريم عربي",
    nameEn: "Arabic Ice Cream",
    descriptionAr: "آيس كريم بنكهة المستكة والفستق",
    descriptionEn: "Ice cream with mastic and pistachio flavors",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=500&fit=crop",
    category: "desserts",
  },
];

// ============================
// Ads Data
// ============================

const adsData: AdItem[] = [
  {
    id: "ad1",
    titleAr: "عرض خاص على المشويات",
    titleEn: "Special Grill Offer",
    descriptionAr: "احصل على خصم 20% على جميع أطباق المشويات",
    descriptionEn: "Get 20% off on all grilled dishes",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=400&fit=crop",
    badge: { ar: "عرض محدود", en: "Limited Offer" },
    discount: "20%",
  },
  {
    id: "ad2",
    titleAr: "وجبة العائلة",
    titleEn: "Family Meal Deal",
    descriptionAr: "وجبة كاملة لـ 4 أشخاص بسعر مميز",
    descriptionEn: "Complete meal for 4 people at a special price",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop",
    badge: { ar: "الأكثر طلباً", en: "Best Seller" },
    discount: "30%",
  },
  {
    id: "ad3",
    titleAr: "حلويات طازجة يومياً",
    titleEn: "Fresh Desserts Daily",
    descriptionAr: "تشكيلة متنوعة من الحلويات الشرقية والغربية",
    descriptionEn: "Variety of Eastern and Western desserts",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=400&fit=crop",
    badge: { ar: "جديد", en: "New" },
  },
  {
    id: "ad4",
    titleAr: "توصيل مجاني",
    titleEn: "Free Delivery",
    descriptionAr: "توصيل مجاني للطلبات فوق 200 جنيه",
    descriptionEn: "Free delivery on orders above 200 EGP",
    image:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=400&fit=crop",
    badge: { ar: "توصيل", en: "Delivery" },
  },
];

// ============================
// ENS Ads Data (Separate Section)
// ============================
const ensAdsData = [
  {
    id: "ens1",
    titleAr: "تصميم مواقع احترافية",
    titleEn: "Professional Web Design",
    descriptionAr: "نصمم لك موقعاً عصرياً يعكس هوية علامتك التجارية",
    descriptionEn: "We design modern websites that reflect your brand identity",
    icon: "global-line",
  },
  {
    id: "ens2",
    titleAr: "تطبيقات الويب",
    titleEn: "Web Applications",
    descriptionAr: "حلول رقمية متكاملة لنمو أعمالك",
    descriptionEn: "Complete digital solutions for your business growth",
    icon: "code-s-slash-line",
  },
  {
    id: "ens3",
    titleAr: "منيو إلكتروني",
    titleEn: "Digital Menu",
    descriptionAr: "احصل على منيو إلكتروني مثل هذا لمطعمك",
    descriptionEn: "Get a digital menu like this for your restaurant",
    icon: "restaurant-line",
  },
];

// ============================
// Context: Language
// ============================

interface LanguageContextType {
  locale: Locale;
  t: typeof translations.ar | typeof translations.en;
  direction: "rtl" | "ltr";
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>("ar");

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  const direction = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = direction;
      document.documentElement.lang = locale;
    }
  }, [locale, direction]);

  const value: LanguageContextType = {
    locale,
    t: translations[locale],
    direction,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// ============================
// Icons (Using Remix Icons via className)
// ============================

const Icon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = "",
}) => <i className={`ri-${name} ${className}`} />;

// ============================
// Design Tokens (Button Variants & Sizes)
// ============================

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50";

const BUTTON_VARIANTS = {
  default:
    "bg-[var(--accent)] text-white hover:opacity-90 shadow-lg hover:shadow-xl",
  outline:
    "border-2 border-[var(--border-main)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-transparent",
  ghost: "hover:bg-white/5",
  hero: "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white shadow-xl hover:shadow-[0_0_50px_var(--accent)/40] hover:scale-105",
  glow: "bg-[var(--accent)] text-white shadow-[0_0_40px_var(--accent)]",
  category:
    "bg-[var(--bg-card)] border border-[var(--border-main)] hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white",
  secondary:
    "bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--bg-card)]/80",
} as const;

const BUTTON_SIZES = {
  sm: "px-3 py-1.5 text-[var(--text-sm)]",
  default: "px-4 py-2 text-[var(--text-base)]",
  lg: "px-5 py-2.5 md:px-6 md:py-3 text-[var(--text-base)] md:text-[var(--text-lg)]",
  xl: "px-6 py-3 md:px-8 md:py-4 text-[var(--text-lg)] md:text-[var(--text-xl)]",
  icon: "h-10 w-10 p-0",
} as const;

// ============================
// Components
// ============================

// Button Component
const Button: React.FC<{
  children: ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof BUTTON_SIZES;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  style,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

// Input Component
const Input: React.FC<{
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}> = ({ type = "text", value, onChange, placeholder, className = "" }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] px-4 py-2 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 focus:outline-none transition-all ${className}`}
    />
  );
};

// Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
}> = ({ isOpen, onClose, item }) => {
  const { locale, direction } = useLanguage();
  const rtl = direction === "rtl";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const name = locale === "ar" ? item.nameAr : item.nameEn;
  const description = locale === "ar" ? item.descriptionAr : item.descriptionEn;
  const popularText = locale === "ar" ? "الأكثر طلباً" : "Popular";
  const priceLabel = locale === "ar" ? "السعر" : "Price";
  const categoryLabels: Record<string, { ar: string; en: string }> = {
    appetizers: { ar: "المقبلات", en: "Appetizers" },
    mains: { ar: "الأطباق الرئيسية", en: "Main Courses" },
    drinks: { ar: "المشروبات", en: "Beverages" },
    desserts: { ar: "الحلويات", en: "Desserts" },
  };
  const categoryLabel =
    locale === "ar"
      ? categoryLabels[item.category].ar
      : categoryLabels[item.category].en;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal Content */}
      <div
        dir={direction}
        className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--border-main)] shadow-2xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[var(--accent)] transition-all duration-300 ${
            rtl ? "left-4" : "right-4"
          }`}
        >
          <Icon name="close-line" className="text-xl" />
        </button>

        {/* Image */}
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <img
            src={item.image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />

          {/* Popular Badge */}
          {item.isPopular && (
            <div
              className={`absolute top-4 flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white text-xs font-bold shadow-lg ${
                rtl ? "right-4" : "left-4"
              }`}
            >
              <Icon name="star-fill" className="text-sm" />
              <span>{popularText}</span>
            </div>
          )}

          {/* Category Badge */}
          <div
            className={`absolute bottom-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium border border-white/20 ${
              rtl ? "right-4" : "left-4"
            }`}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-[var(--text-main)]">{name}</h2>

          {/* Description */}
          <p className="text-[var(--text-muted)] leading-relaxed text-base">
            {description}
          </p>

          {/* Divider */}
          <div className="h-px bg-[var(--border-main)]" />

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-muted)] text-sm">
              {priceLabel}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[var(--accent)]">
                {item.price}
              </span>
              <span className="text-lg text-[var(--text-muted)]">ج.م</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Language Toggle Component
const LanguageToggle: React.FC = () => {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="group relative overflow-hidden rounded-full px-4 py-2"
    >
      <span className="flex items-center gap-2">
        <Icon
          name="global-line"
          className="text-[var(--text-lg)] transition-transform duration-300 group-hover:rotate-180"
        />
        <span className="text-[var(--text-sm)] font-semibold tracking-wide">
          {locale === "ar" ? "EN" : "عربي"}
        </span>
      </span>
    </Button>
  );
};

// Navbar Component
const Navbar: React.FC = () => {
  const { t, direction } = useLanguage();
  const rtl = direction === "rtl";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-main)]/80 backdrop-blur-xl border-b border-[var(--border-main)]/50">
      <div className="container mx-auto px-4 py-4">
        <div
          className={`flex items-center justify-between ${
            rtl ? "flex-row-reverse" : ""
          }`}
        >
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--accent)]/30 blur-xl rounded-full animate-pulse" />
              <Icon
                name="restaurant-2-line"
                className="relative text-[var(--text-3xl)] text-[var(--accent)] transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-[var(--text-2xl)] font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
              {t.brand}
            </span>
          </a>

          {/* Navigation Links */}
          <div
            className={`hidden md:flex items-center gap-8 ${
              rtl ? "flex-row-reverse" : ""
            }`}
          >
            <a
              href="#menu"
              className="text-[var(--text-base)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300 relative group font-medium"
            >
              {t.nav.menu}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#contact"
              className="text-[var(--text-base)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300 relative group font-medium"
            >
              {t.nav.contact}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Language Toggle */}
          <div
            className={`flex items-center gap-3 ${
              rtl ? "flex-row-reverse" : ""
            }`}
          >
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Ad Banner Component
const AdBanner: React.FC = () => {
  const { locale, direction } = useLanguage();
  const [currentAd, setCurrentAd] = useState(0);
  const rtl = direction === "rtl";

  // Auto-rotate ads
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % adsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const ad = adsData[currentAd];
  const title = locale === "ar" ? ad.titleAr : ad.titleEn;
  const description = locale === "ar" ? ad.descriptionAr : ad.descriptionEn;
  const badge = ad.badge ? (locale === "ar" ? ad.badge.ar : ad.badge.en) : null;

  return (
    <section className="py-8 sm:py-12 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        <div
          dir={direction}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-main)] shadow-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={ad.image}
              alt={title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col sm:flex-row items-center gap-6 min-h-[200px] sm:min-h-[240px]">
            {/* Text Content */}
            <div
              className={`flex-1 text-center sm:text-start ${
                rtl ? "sm:text-right" : "sm:text-left"
              }`}
            >
              {/* Badge */}
              {badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)] text-white text-xs font-bold mb-4 animate-pulse">
                  <Icon name="fire-fill" className="text-sm" />
                  <span>{badge}</span>
                </div>
              )}

              {/* Title with Discount */}
              <div className="flex items-center gap-3 justify-center sm:justify-start mb-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  {title}
                </h3>
                {ad.discount && (
                  <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white text-lg sm:text-xl font-bold shadow-lg">
                    -{ad.discount}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/80 mb-6 max-w-md leading-relaxed">
                {description}
              </p>

              {/* CTA */}
              <Button
                variant="hero"
                size="default"
                className="text-sm sm:text-base"
              >
                <span>{locale === "ar" ? "اطلب الآن" : "Order Now"}</span>
                <Icon
                  name={rtl ? "arrow-left-line" : "arrow-right-line"}
                  className="text-lg"
                />
              </Button>
            </div>

            {/* Decorative Element */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-12 w-32 h-32 rounded-full bg-[var(--accent)]/20 blur-2xl" />
          </div>

          {/* Ad Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {adsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAd(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentAd === index
                    ? "w-6 bg-[var(--accent)]"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentAd(
                (prev) => (prev - 1 + adsData.length) % adsData.length
              )
            }
            className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[var(--accent)] transition-all duration-300 ${
              rtl ? "right-3" : "left-3"
            }`}
          >
            <Icon
              name={rtl ? "arrow-right-s-line" : "arrow-left-s-line"}
              className="text-xl"
            />
          </button>
          <button
            onClick={() => setCurrentAd((prev) => (prev + 1) % adsData.length)}
            className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[var(--accent)] transition-all duration-300 ${
              rtl ? "left-3" : "right-3"
            }`}
          >
            <Icon
              name={rtl ? "arrow-left-s-line" : "arrow-right-s-line"}
              className="text-xl"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

// Small Ad Cards Component (for between menu items)
const SmallAdCard: React.FC<{ ad: AdItem }> = ({ ad }) => {
  const { locale, direction } = useLanguage();
  const rtl = direction === "rtl";

  const title = locale === "ar" ? ad.titleAr : ad.titleEn;
  const badge = ad.badge ? (locale === "ar" ? ad.badge.ar : ad.badge.en) : null;

  return (
    <div
      dir={direction}
      className="
    relative rounded-2xl overflow-hidden
    bg-gradient-to-br from-[var(--accent)]/15 to-[var(--accent-2)]/15
    border border-[var(--accent)]/25
    p-4 sm:p-5
    cursor-pointer group
    transition-all duration-500 ease-out
    hover:border-[var(--accent)]
    hover:shadow-[0_10px_40px_-10px_var(--accent)]
    hover:scale-[1.015]
  "
    >
      {/* Glow overlay */}
      <div
        className="
    absolute inset-0
    bg-gradient-to-r from-[var(--accent)]/15 via-transparent to-[var(--accent-2)]/15
    opacity-0 group-hover:opacity-100
    transition-opacity duration-500
  "
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Badge */}
        {badge && (
          <div
            className="
        inline-flex items-center gap-1.5
        px-2.5 py-1
        rounded-full
        bg-[var(--accent)]
        text-white
        text-[10px] sm:text-xs
        font-semibold
        mb-3
        shadow-sm
      "
          >
            <Icon name="megaphone-fill" className="text-xs" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h4
          className="
      text-base sm:text-lg
      font-bold
      text-[var(--text-main)]
      mb-2
      transition-colors duration-300
      group-hover:text-[var(--accent)]
    "
        >
          {title}
        </h4>

        {/* Discount */}
        {ad.discount && (
          <div className="flex items-end gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)]">
              -{ad.discount}
            </span>
            <span className="text-xs text-[var(--text-muted)] mb-1">
              {locale === "ar" ? "خصم" : "OFF"}
            </span>
          </div>
        )}
      </div>

      {/* Arrow */}
      <div className={`absolute bottom-4 ${rtl ? "left-4" : "right-4"}`}>
        <div
          className="
      w-9 h-9
      rounded-full
      bg-[var(--accent)]/20
      flex items-center justify-center
      transition-all duration-300
      group-hover:bg-[var(--accent)]
      group-hover:scale-110
    "
        >
          <Icon
            name={rtl ? "arrow-left-s-line" : "arrow-right-s-line"}
            className="
          text-lg
          text-[var(--accent)]
          transition-colors duration-300
          group-hover:text-white
        "
          />
        </div>
      </div>

      {/* Decorative blur shapes */}
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[var(--accent)]/15 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[var(--accent-2)]/15 blur-2xl" />
    </div>
  );
};

// Offers Section Component
const OffersSection: React.FC = () => {
  const { locale, direction } = useLanguage();
  const rtl = direction === "rtl";

  return (
    <section
      className="
  relative overflow-hidden
  py-10 sm:py-16
"
    >
      {/* Background wash */}
      <div
        className="
    absolute inset-0
    bg-gradient-to-b from-transparent via-[var(--accent)]/6 to-transparent
  "
      />

      {/* Decorative blur */}
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[var(--accent)]/10 blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[var(--accent-2)]/10 blur-3xl" />

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Header */}
        <div
          className={`
        flex items-center justify-between
        mb-6 sm:mb-10
        ${rtl ? "flex-row-reverse" : ""}
      `}
        >
          <div
            className={`flex items-center gap-3 ${
              rtl ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className="
          w-11 h-11
          rounded-xl
          bg-[var(--accent)]/20
          flex items-center justify-center
          shadow-sm
        "
            >
              <Icon
                name="gift-2-fill"
                className="text-[var(--accent)] text-xl"
              />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)] leading-tight">
                {locale === "ar" ? "عروض خاصة" : "Special Offers"}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                {locale === "ar" ? "لا تفوت الفرصة!" : "Don't miss out!"}
              </p>
            </div>
          </div>

          {/* View all */}
          <Button
            variant="ghost"
            size="sm"
            className="
          text-xs sm:text-sm
          gap-1.5
          group
        "
          >
            <span>{locale === "ar" ? "عرض الكل" : "View All"}</span>
            <Icon
              name={rtl ? "arrow-left-s-line" : "arrow-right-s-line"}
              className="
            text-base
            transition-transform duration-300
            group-hover:translate-x-1
          "
            />
          </Button>
        </div>

        {/* Grid */}
        <div
          className="
      grid grid-cols-2
      lg:grid-cols-4
      gap-3 sm:gap-5
    "
        >
          {adsData.map((ad) => (
            <SmallAdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Hero Section Component
const HeroSection: React.FC = () => {
  const { t, direction } = useLanguage();
  const rtl = direction === "rtl";

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="
  relative min-h-[100svh]
  flex items-center justify-center
  overflow-hidden
"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=900&fit=crop"
          alt="Hero background"
          className="
        w-full h-full object-cover
        scale-110
      "
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Depth gradient */}
        <div
          className="
      absolute inset-0
      bg-gradient-to-b
      from-[var(--bg-main)]/95
      via-transparent
      to-[var(--bg-main)]
    "
        />
      </div>

      {/* Floating lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
      absolute top-1/4 left-1/4
      w-56 md:w-72 h-56 md:h-72
      bg-[var(--accent)]/18
      rounded-full blur-3xl
      animate-float
    "
        />
        <div
          className="
        absolute bottom-1/4 right-1/4
        w-72 md:w-[28rem] h-72 md:h-[28rem]
        bg-[var(--accent-2)]/14
        rounded-full blur-3xl
        animate-float
      "
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      {/* Content */}
      <div
        className={`
      relative z-10
      container mx-auto px-4
      text-center
      ${rtl ? "font-cairo" : "font-poppins"}
    `}
      >
        {/* Badge */}
        <div
          className="
      inline-flex items-center gap-2
      px-4 py-2
      rounded-full
      bg-[var(--accent)]/10
      border border-[var(--accent)]/30
      backdrop-blur-md
      mb-6 md:mb-8
      shadow-sm
    "
        >
          <Icon
            name="sparkling-2-line"
            className="text-sm text-[var(--accent)] animate-pulse"
          />
          <span className="text-xs sm:text-sm text-[var(--accent)] font-medium">
            {t.tagline}
          </span>
        </div>

        {/* Title */}
        <h1
          className="
      text-4xl sm:text-5xl md:text-6xl lg:text-7xl
      font-extrabold
      leading-[1.05]
      tracking-tight
      mb-5 md:mb-6
    "
        >
          <span className="text-[var(--text-main)] block">{t.hero.title}</span>

          <span
            className="
        block
        bg-gradient-to-r
        from-[var(--accent)]
        to-[var(--accent-2)]
        bg-clip-text
        text-transparent
        drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]
      "
          >
            {t.hero.highlight}
          </span>

          <span className="text-[var(--text-main)] block">
            {t.hero.subtitle}
          </span>
        </h1>

        {/* Description */}
        <p
          className="
      text-base sm:text-lg md:text-xl
      text-[var(--text-muted)]
      max-w-2xl mx-auto
      leading-relaxed
      mb-8 md:mb-10
      px-2
    "
        >
          {t.hero.description}
        </p>

        {/* CTA */}
        <div>
          <Button
            variant="hero"
            size="lg"
            onClick={scrollToMenu}
            className="
          group
          text-base sm:text-lg
          px-6 py-3 sm:px-9 sm:py-4
          shadow-[0_20px_50px_-15px_var(--accent)]
        "
          >
            <span>{t.hero.cta}</span>
            <Icon
              name="arrow-down-s-line"
              className="
            text-xl
            transition-transform duration-300
            group-hover:translate-y-1.5
          "
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

// Menu Card Component
const MenuCard = memo<{ item: MenuItem; index: number; onClick: () => void }>(
  ({ item, index, onClick }) => {
    const { locale, direction } = useLanguage();
    const rtl = direction === "rtl";

    const name = locale === "ar" ? item.nameAr : item.nameEn;
    const description =
      locale === "ar" ? item.descriptionAr : item.descriptionEn;
    const popularText = locale === "ar" ? "الأكثر طلباً" : "Popular";
    const viewDetails = locale === "ar" ? "عرض التفاصيل" : "View Details";

    return (
      <div
        dir={direction}
        onClick={onClick}
        className="
      group relative
      bg-[var(--bg-card)]
      rounded-2xl
      overflow-hidden
      border border-[var(--border-main)]
      cursor-pointer
      transition-all duration-500 ease-out
      hover:border-[var(--accent)]/60
      hover:-translate-y-2
      hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)]
    "
        style={{
          animationDelay: `${index * 60}ms`,
          opacity: 0,
          animation: "fadeInUp 0.55s ease-out forwards",
        }}
      >
        {/* Popular badge */}
        {item.isPopular && (
          <div
            className={`
          absolute top-3 z-20
          flex items-center gap-1.5
          px-3 py-1.5
          rounded-full
          bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]
          text-white
          text-[11px]
          font-bold
          shadow-lg
          ${rtl ? "right-3" : "left-3"}
        `}
          >
            <Icon name="star-fill" className="text-xs" />
            <span>{popularText}</span>
          </div>
        )}

        {/* Image */}
        <div className="relative h-44 sm:h-48 overflow-hidden">
          <img
            src={item.image}
            alt={name}
            loading="lazy"
            className="
          w-full h-full object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-110
        "
          />

          {/* Image overlay */}
          <div
            className="
        absolute inset-0
        bg-gradient-to-t
        from-[var(--bg-card)]
        via-black/30
        to-transparent
      "
          />

          {/* Hover action */}
          <div
            className="
        absolute inset-0
        flex items-center justify-center
        bg-[var(--accent)]/0
        group-hover:bg-[var(--accent)]/25
        transition-all duration-500
      "
          >
            <span
              className="
          opacity-0
          group-hover:opacity-100
          translate-y-3
          group-hover:translate-y-0
          transition-all duration-300
          bg-white/95
          text-[var(--bg-main)]
          px-4 py-2
          rounded-full
          text-sm
          font-semibold
          flex items-center gap-2
          shadow-xl
        "
            >
              <Icon name="eye-line" className="text-base" />
              {viewDetails}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3
            className="
        text-base sm:text-lg
        font-bold
        mb-2
        line-clamp-1
        text-[var(--text-main)]
        transition-colors duration-300
        group-hover:text-[var(--accent)]
      "
          >
            {name}
          </h3>

          <p
            className="
        text-xs sm:text-sm
        text-[var(--text-muted)]
        mb-4
        line-clamp-2
        min-h-[2.6rem]
        leading-relaxed
      "
          >
            {description}
          </p>

          {/* Footer */}
          <div
            className="
        flex items-center justify-between
        pt-1
        border-t border-[var(--border-main)]/50
      "
          >
            <span
              className="
          text-[var(--accent)]
          font-extrabold
          text-lg sm:text-xl
          flex items-baseline gap-1
        "
            >
              {item.price}
              <span className="text-xs sm:text-sm font-medium text-[var(--text-muted)]">
                ج.م
              </span>
            </span>

            <div
              className="
          w-9 h-9
          rounded-full
          bg-[var(--accent)]/10
          flex items-center justify-center
          transition-all duration-300
          group-hover:bg-[var(--accent)]
          group-hover:scale-110
        "
            >
              <Icon
                name={rtl ? "arrow-left-s-line" : "arrow-right-s-line"}
                className="
              text-lg
              text-[var(--accent)]
              transition-colors duration-300
              group-hover:text-white
            "
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// Menu Section Component
const MenuSection: React.FC = () => {
  const { t, direction } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rtl = direction === "rtl";

  const openModal = useCallback((item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  const categories = useMemo(
    () => [
      { id: "all" as Category, icon: "grid-line", label: t.categories.all },
      {
        id: "appetizers" as Category,
        icon: "bowl-line",
        label: t.categories.appetizers,
      },
      {
        id: "mains" as Category,
        icon: "restaurant-line",
        label: t.categories.mains,
      },
      {
        id: "drinks" as Category,
        icon: "cup-line",
        label: t.categories.drinks,
      },
      {
        id: "desserts" as Category,
        icon: "cake-3-line",
        label: t.categories.desserts,
      },
    ],
    [t]
  );

  const filteredItems = useMemo(() => {
    const categoryFiltered =
      activeCategory === "all"
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory);

    if (!searchQuery.trim()) return categoryFiltered;

    const searchLower = searchQuery.toLowerCase();
    return categoryFiltered.filter(
      (item) =>
        item.nameEn.toLowerCase().includes(searchLower) ||
        item.nameAr.includes(searchQuery) ||
        item.descriptionEn.toLowerCase().includes(searchLower) ||
        item.descriptionAr.includes(searchQuery)
    );
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="menu"
      className="
    relative overflow-hidden
    py-16 sm:py-20 md:py-24
  "
    >
      {/* Ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] md:w-[850px] h-[520px] md:h-[850px] bg-[var(--accent)]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] md:w-[650px] h-[420px] md:h-[650px] bg-[var(--accent-2)]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="
        text-3xl sm:text-4xl md:text-5xl
        font-extrabold
        mb-3
      "
          >
            <span
              className="
          bg-gradient-to-r
          from-[var(--accent)]
          to-[var(--accent-2)]
          bg-clip-text
          text-transparent
        "
            >
              {t.categories.title}
            </span>
          </h2>
          <div className="w-20 sm:w-28 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] mx-auto rounded-full" />
        </div>

        {/* Search */}
        <div className="max-w-md sm:max-w-xl mx-auto mb-6 sm:mb-10">
          <div className="relative">
            <Icon
              name="search-line"
              className={`
            absolute top-1/2 -translate-y-1/2
            text-lg sm:text-xl
            text-[var(--text-muted)]
            ${rtl ? "right-3 sm:right-4" : "left-3 sm:left-4"}
          `}
            />

            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className={`
            h-11 sm:h-12
            text-sm sm:text-base
            backdrop-blur-md
            ${
              rtl
                ? "pr-10 sm:pr-12 pl-10 sm:pl-12"
                : "pl-10 sm:pl-12 pr-10 sm:pr-12"
            }
          `}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`
              absolute top-1/2 -translate-y-1/2
              ${rtl ? "left-3 sm:left-4" : "right-3 sm:right-4"}
              text-[var(--text-muted)]
              hover:text-[var(--text-main)]
              transition-colors
            `}
              >
                <Icon name="close-line" className="text-lg sm:text-xl" />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div
          className={`
      flex flex-wrap justify-center
      gap-2 sm:gap-3
      mb-8 sm:mb-10
      ${rtl ? "flex-row-reverse" : ""}
    `}
        >
          {categories.map((category, index) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "glow" : "category"}
              onClick={() => setActiveCategory(category.id)}
              style={{ animationDelay: `${index * 80}ms` }}
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
            >
              <Icon name={category.icon} className="text-sm sm:text-base" />
              <span>{category.label}</span>
            </Button>
          ))}
        </div>

        {/* Results count */}
        {searchQuery && (
          <div className="text-center mb-6 text-sm text-[var(--text-muted)]">
            <span className="text-[var(--accent)] font-bold text-base">
              {filteredItems.length}
            </span>{" "}
            {t.search.results}
          </div>
        )}

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div
            key={`${activeCategory}-${searchQuery}`}
            className="
          grid grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-3 sm:gap-5 md:gap-6
        "
          >
            {filteredItems.map((item, index) => (
              <MenuCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => openModal(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Icon
              name="search-line"
              className="text-6xl text-[var(--text-muted)]/30 mx-auto mb-4 block"
            />
            <h3 className="text-xl font-bold text-[var(--text-muted)] mb-2">
              {t.search.noResults}
            </h3>
            <p className="text-sm text-[var(--text-muted)]/70">
              {t.search.tryDifferentKeywords}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
    </section>
  );
};

// ENS Services Section Component
const ENSServicesSection: React.FC = () => {
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

// Fixed Bottom Banner Component
const ENSFixedBanner: React.FC = () => {
  const { locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="
      fixed bottom-0 left-0 right-0 z-50
      bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600
      text-white
      py-2.5 px-4
      shadow-lg shadow-purple-500/20
    "
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <Icon name="code-s-slash-line" className="text-sm" />
            <span className="text-xs font-bold">ENS</span>
          </div>
          <p className="text-xs sm:text-sm font-medium">
            {locale === "ar"
              ? "🚀 هل تريد منيو إلكتروني مثل هذا؟ تواصل مع ENS الآن!"
              : "🚀 Want a digital menu like this? Contact ENS now!"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/ENSEGYPTEG"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-white text-purple-600 
              text-xs sm:text-sm font-bold
              px-3 sm:px-4 py-1.5 rounded-full
              transition-all duration-300
              hover:bg-purple-100
              hover:scale-105
              whitespace-nowrap
            "
          >
            {locale === "ar" ? "تواصل معنا" : "Contact Us"}
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="
              p-1 rounded-full
              hover:bg-white/20
              transition-colors
            "
            aria-label="Close"
          >
            <Icon name="close-line" className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const { t, direction } = useLanguage();

  const socialLinks = useMemo(
    () => [
      { icon: "instagram-line", href: "#" },
      { icon: "twitter-x-line", href: "#" },
      { icon: "facebook-circle-line", href: "#" },
    ],
    []
  );

  return (
    <footer
      id="contact"
      dir={direction}
      className="
    relative overflow-hidden
    bg-[var(--bg-card)]
    border-t border-[var(--border-main)]
   py-4 sm:py-6 md:py-10
   pb-16 sm:pb-18 md:pb-20
  "
    >
      {/* Ambient glow */}
      <div
        className="
    absolute bottom-0 left-1/2 -translate-x-1/2
    w-[420px] md:w-[720px]
    h-[220px] md:h-[340px]
    bg-[var(--accent)]/8
    rounded-full blur-3xl
    pointer-events-none
  "
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Top */}
        <div
          className="
      grid grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      gap-8 sm:gap-10 md:gap-14
      text-start
    "
        >
          {/* Brand */}
          <div>
            <h3
              className="
          text-xl sm:text-2xl
          font-extrabold
          bg-gradient-to-r
          from-[var(--accent)]
          to-[var(--accent-2)]
          bg-clip-text
          text-transparent
          mb-3
        "
            >
              {t.brand}
            </h3>
            <p
              className="
          text-sm sm:text-base
          text-[var(--text-muted)]
          max-w-sm
          leading-relaxed
        "
            >
              {t.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="
          text-base sm:text-lg
          font-semibold
          text-[var(--text-main)]
          mb-4
        "
            >
              {t.nav.contact}
            </h4>

            <ul className="space-y-3">
              <li
                className="
            flex items-start gap-3
            text-sm sm:text-base
            text-[var(--text-muted)]
            transition-colors
            hover:text-[var(--text-main)]
          "
              >
                <Icon
                  name="map-pin-line"
                  className="text-lg sm:text-xl text-[var(--accent)] mt-0.5 shrink-0"
                />
                <span>{t.footer.address}</span>
              </li>

              <li
                className="
            flex items-center gap-3
            text-sm sm:text-base
            text-[var(--text-muted)]
            transition-colors
            hover:text-[var(--text-main)]
          "
              >
                <Icon
                  name="phone-line"
                  className="text-lg sm:text-xl text-[var(--accent)] shrink-0"
                />
                <span dir="ltr">{t.footer.phone}</span>
              </li>

              <li
                className="
            flex items-center gap-3
            text-sm sm:text-base
            text-[var(--text-muted)]
            transition-colors
            hover:text-[var(--text-main)]
          "
              >
                <Icon
                  name="time-line"
                  className="text-lg sm:text-xl text-[var(--accent)] shrink-0"
                />
                <span>{t.footer.hours}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="sm:col-span-2 md:col-span-1">
            <h4
              className="
          text-base sm:text-lg
          font-semibold
          text-[var(--text-main)]
          mb-4
        "
            >
              {t.footer.followUs}
            </h4>

            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                w-10 h-10 sm:w-11 sm:h-11
                rounded-full
                bg-[var(--bg-main)]
                border border-[var(--border-main)]
                flex items-center justify-center
                text-[var(--text-muted)]
                transition-all duration-300
                hover:bg-[var(--accent)]
                hover:border-[var(--accent)]
                hover:text-white
                hover:scale-110
              "
                >
                  <Icon name={social.icon} className="text-lg sm:text-xl" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
      mt-8 sm:mt-10 md:mt-12
      pt-5 sm:pt-6
      border-t border-[var(--border-main)]
      text-center
      flex flex-col items-center
      gap-1.5
    "
        >
          <p
            dir="ltr"
            className="
          text-xs sm:text-sm
          text-[var(--text-muted)]
          leading-relaxed
        "
          >
            © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
          </p>

          <p
            className="
        flex items-center justify-center
        gap-1
        text-xs sm:text-sm
        text-[var(--text-muted)]
      "
          >
            <span>{t.footer.designedBy}</span>
            <a
              href="https://www.facebook.com/ENSEGYPTEG"
              target="_blank"
              rel="noopener noreferrer"
              className="
            font-semibold
            text-[var(--accent)]
            hover:underline
            transition
          "
            >
              ENS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

// ============================
// Main App Component
// ============================

export default function DefaultTemplate() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        <style jsx global>{`
          /* ============================
       Fonts
       ============================ */
          @import url("https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
          @import url("https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css");

          /* ============================
       Design Tokens
       ============================ */
          :root {
            /* Colors */
            --bg-main: hsl(0, 0%, 7%);
            --bg-card: hsl(0, 0%, 12%);
            --border-main: hsl(0, 0%, 25%);
            --text-main: hsl(0, 0%, 98%);
            --text-muted: hsl(0, 0%, 70%);
            --accent: hsl(330, 85%, 55%);
            --accent-2: hsl(260, 80%, 60%);
            --accent-soft: hsl(330, 85%, 65%);
            --accent-glow: hsla(330, 85%, 55%, 0.35);

            /* Typography */
            --text-xs: clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem);
            --text-sm: clamp(0.8rem, 0.75rem + 0.25vw, 0.875rem);
            --text-base: clamp(0.9rem, 0.85rem + 0.25vw, 1rem);
            --text-lg: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
            --text-xl: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
            --text-2xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
            --text-3xl: clamp(1.5rem, 1.25rem + 1.25vw, 1.875rem);
            --text-4xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.25rem);
            --text-5xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);
            --text-6xl: clamp(2.75rem, 2rem + 3.75vw, 3.75rem);
            --text-7xl: clamp(3.25rem, 2.25rem + 5vw, 4.5rem);

            /* Spacing */
            --space-xs: 0.25rem;
            --space-sm: 0.5rem;
            --space-md: 1rem;
            --space-lg: 1.5rem;
            --space-xl: 2rem;
            --space-2xl: 3rem;
            --space-3xl: 4rem;
          }

          /* ============================
       Base Reset
       ============================ */
          *,
          html {
            scroll-behavior: smooth;
          }

          body {
            background: var(--bg-main);
            color: var(--text-main);
            overflow-x: hidden;
            font-family: "Poppins", sans-serif;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            line-height: 1.6;
          }
          h1,
          h2,
          h3 {
            letter-spacing: -0.02em;
          }

          html[dir="rtl"] body,
          html[lang="ar"] body {
            font-family: "Cairo", sans-serif;
          }

          .font-cairo {
            font-family: "Cairo", sans-serif;
          }
          .font-poppins {
            font-family: "Poppins", sans-serif;
          }

          /* ============================
       Animations
       ============================ */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(24px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-18px);
            }
          }

          @keyframes shimmer {
            from {
              background-position: -200% 0;
            }
            to {
              background-position: 200% 0;
            }
          }

          @keyframes modalIn {
            from {
              opacity: 0;
              transform: scale(0.96) translateY(16px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-shimmer {
            animation: shimmer 2s linear infinite;
          }
          .animate-modal-in {
            animation: modalIn 0.35s ease-out forwards;
          }

          /* ============================
       Utilities
       ============================ */
          .line-clamp-1,
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-1 {
            -webkit-line-clamp: 1;
          }
          .line-clamp-2 {
            -webkit-line-clamp: 2;
          }

          /* ============================
       Scrollbar
       ============================ */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: var(--bg-main);
          }
          ::-webkit-scrollbar-thumb {
            background: var(--border-main);
            border-radius: 6px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: var(--accent);
          }
        `}</style>

        {/* Layout */}
        <Navbar />
        <HeroSection />
        <AdBanner />
        <MenuSection />
        <OffersSection />
        <ENSServicesSection />
        <Footer />
        <ENSFixedBanner />
      </div>
    </LanguageProvider>
  );
}
