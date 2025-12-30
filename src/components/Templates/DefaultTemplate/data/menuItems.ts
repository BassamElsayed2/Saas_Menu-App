import { MenuItem } from "../types";

// ============================
// Menu Items Data
// ============================

export const menuItems: MenuItem[] = [
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

