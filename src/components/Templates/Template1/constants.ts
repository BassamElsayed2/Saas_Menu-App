// ============================
// Template1 Shared Constants & Utilities
// ============================

export const DEFAULT_IMAGE = "/images/ENSd.png";

// Format price based on locale
export const formatPrice = (price: number, locale: string, currency: string = "EGP") => {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Currency labels
export const getCurrencyLabel = (locale: string, currency: string = "EGP") => {
  if (currency === "EGP") return locale === "ar" ? "ج.م" : "EGP";
  if (currency === "SAR") return locale === "ar" ? "ر.س" : "SAR";
  if (currency === "USD") return "$";
  if (currency === "EUR") return "€";
  return currency;
};

// Default data for when no real data is provided
export const defaultData = {
  ar: {
    ads: [
      {
        id: 1,
        title: "عروض اليوم",
        description: "خصومات تصل إلى 50% على أطباقنا المميزة",
        image: DEFAULT_IMAGE,
      },
      {
        id: 2,
        title: "وجبة العائلة",
        description: "وجبة كاملة لـ 4 أشخاص بسعر مميز",
        image: DEFAULT_IMAGE,
      },
      {
        id: 3,
        title: "طبق الشيف",
        description: "جرب طبق الشيف الجديد",
        image: DEFAULT_IMAGE,
      },
    ],
    offers: [
      {
        id: 1,
        name: "برجر لحم أنجوس",
        description: "برجر لحم أنجوس مع جبنة شيدر وصوص خاص",
        price: 45,
        originalPrice: 65,
        discountPercent: 30,
        image: DEFAULT_IMAGE,
      },
      {
        id: 2,
        name: "بيتزا مارجريتا",
        description: "بيتزا إيطالية أصلية مع صوص طماطم طازج",
        price: 55,
        originalPrice: 75,
        discountPercent: 25,
        image: DEFAULT_IMAGE,
      },
      {
        id: 3,
        name: "سلطة سيزر",
        description: "خس روماني مع صوص سيزر ودجاج مشوي",
        price: 35,
        originalPrice: 50,
        discountPercent: 30,
        image: DEFAULT_IMAGE,
      },
    ],
  },
  en: {
    ads: [
      {
        id: 1,
        title: "Today's Offers",
        description: "Up to 50% off on our special dishes",
        image: DEFAULT_IMAGE,
      },
      {
        id: 2,
        title: "Family Meal",
        description: "Complete meal for 4 at a special price",
        image: DEFAULT_IMAGE,
      },
      {
        id: 3,
        title: "Chef's Special",
        description: "Try our new chef's special dish",
        image: DEFAULT_IMAGE,
      },
    ],
    offers: [
      {
        id: 1,
        name: "Angus Beef Burger",
        description: "Angus beef patty with cheddar cheese and special sauce",
        price: 45,
        originalPrice: 65,
        discountPercent: 30,
        image: DEFAULT_IMAGE,
      },
      {
        id: 2,
        name: "Margherita Pizza",
        description: "Authentic Italian pizza with fresh tomato sauce",
        price: 55,
        originalPrice: 75,
        discountPercent: 25,
        image: DEFAULT_IMAGE,
      },
      {
        id: 3,
        name: "Caesar Salad",
        description: "Romaine lettuce with Caesar dressing and grilled chicken",
        price: 35,
        originalPrice: 50,
        discountPercent: 30,
        image: DEFAULT_IMAGE,
      },
    ],
  },
};

// Common Tailwind classes
export const styles = {
  gradient: {
    primary: "bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-400",
    secondary: "bg-gradient-to-r from-violet-500 to-blue-500",
    text: "bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent",
    fire: "bg-gradient-to-r from-orange-400 to-red-400",
    fireText: "bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent",
  },
  card: "bg-gradient-to-br from-slate-900/80 to-violet-950/50 backdrop-blur-sm border border-violet-500/10 rounded-3xl",
  button: "rounded-xl bg-white/5 backdrop-blur-sm border border-violet-500/20 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300",
  ring: "ring-2 ring-violet-500/30",
  shadow: "shadow-2xl shadow-violet-500/20",
};

