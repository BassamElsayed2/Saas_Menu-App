// ============================
// Types & Interfaces
// ============================

export type Locale = "ar" | "en";

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  image: string;
  category: string;
  categoryId?: number;
  isPopular?: boolean;
  originalPrice?: number;
  discountPercent?: number;
}

export interface AdItem {
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

