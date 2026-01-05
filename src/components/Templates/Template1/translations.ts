// ============================
// Translations for Template1
// ============================

export const translations = {
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
      empty: "لا توجد عناصر في هذه الفئة",
    },
    search: {
      placeholder: "ابحث في القائمة...",
      noResults: "لا توجد نتائج",
      results: "نتيجة",
      tryDifferentKeywords: "جرب البحث بكلمات أخرى",
    },
    rating: {
      reviews: "تقييم",
      outOf: "من 5",
    },
    branches: {
      title: "فروعنا",
      viewOnMap: "عرض على الخريطة",
    },
    footer: {
      address: "القاهرة، مصر",
      phone: "+20 10 123 4567",
      hours: "مفتوح يومياً: 12:00 م - 12:00 ص",
      rights: "جميع الحقوق محفوظة",
      followUs: "تابعنا",
      designedBy: "تصميم وتطوير",
    },
    banner: {
      cta: "أنشئ قائمتك الرقمية مجاناً مع ENS",
    },
    offers: {
      title: "العروض الخاصة",
      subtitle: "لا تفوت هذه العروض المميزة",
    },
    ads: {
      todayOffers: "عروض اليوم",
      familyMeal: "وجبة العائلة",
      chefSpecial: "طبق الشيف",
    },
    item: {
      addToCart: "أضف للسلة",
      viewDetails: "عرض التفاصيل",
      discount: "خصم",
      popular: "الأكثر طلباً",
      new: "جديد",
      soldOut: "نفذت الكمية",
    },
    modal: {
      close: "إغلاق",
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
      empty: "No items in this category",
    },
    search: {
      placeholder: "Search menu...",
      noResults: "No results found",
      results: "result",
      tryDifferentKeywords: "Try searching with different keywords",
    },
    rating: {
      reviews: "reviews",
      outOf: "out of 5",
    },
    branches: {
      title: "Our Branches",
      viewOnMap: "View on Map",
    },
    footer: {
      address: "Cairo, Egypt",
      phone: "+20 10 123 4567",
      hours: "Open Daily: 12:00 PM - 12:00 AM",
      rights: "All Rights Reserved",
      followUs: "Follow Us",
      designedBy: "Designed & Developed by",
    },
    banner: {
      cta: "Create your digital menu for free with ENS",
    },
    offers: {
      title: "Special Offers",
      subtitle: "Don't miss these amazing deals",
    },
    ads: {
      todayOffers: "Today's Offers",
      familyMeal: "Family Meal",
      chefSpecial: "Chef's Special",
    },
    item: {
      addToCart: "Add to Cart",
      viewDetails: "View Details",
      discount: "OFF",
      popular: "Popular",
      new: "New",
      soldOut: "Sold Out",
    },
    modal: {
      close: "Close",
    },
  },
} as const;

export type TranslationType = typeof translations.ar | typeof translations.en;
