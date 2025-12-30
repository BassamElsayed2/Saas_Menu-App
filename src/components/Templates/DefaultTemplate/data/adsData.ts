import { AdItem, ENSAdItem } from "../types";

// ============================
// Ads Data
// ============================

export const adsData: AdItem[] = [
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

export const ensAdsData: ENSAdItem[] = [
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

