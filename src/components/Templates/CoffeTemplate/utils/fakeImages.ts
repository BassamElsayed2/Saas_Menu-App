// ============================
// Fake Images Helper
// ============================

// Unsplash images for coffee shop items
export const fakeImages = {
  // Coffee images
  coffee: [
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511920170033-83939d329638?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop",
  ],
  // Tea images
  tea: [
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop",
  ],
  // Juice images
  juice: [
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
  ],
  // Promotional banners
  promotional: {
    happyHour: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop",
    weekendSpecial: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop",
    coffee: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=400&fit=crop",
    pastry: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=400&fit=crop",
  },
  // Default/Other items
  default: [
    "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511920170033-83939d329638?w=400&h=400&fit=crop",
  ],
};

/**
 * Get a fake image based on item type
 */
export function getFakeImage(
  itemName: string,
  categoryName?: string,
  index: number = 0
): string {
  const name = (itemName || "").toLowerCase();
  const category = (categoryName || "").toLowerCase();

  // If name is too generic (like "test"), use category or default
  const isGenericName = name.length < 3 || 
    name === "test" || 
    name === "تیست" ||
    name.includes("test");

  // Check for coffee
  if (
    !isGenericName && (
      name.includes("coffee") ||
      name.includes("espresso") ||
      name.includes("latte") ||
      name.includes("cappuccino") ||
      name.includes("mocha") ||
      name.includes("americano")
    ) ||
    category.includes("coffee")
  ) {
    return fakeImages.coffee[index % fakeImages.coffee.length];
  }

  // Check for tea
  if (
    (!isGenericName && (
      name.includes("tea") ||
      name.includes("chai")
    )) ||
    category.includes("tea")
  ) {
    return fakeImages.tea[index % fakeImages.tea.length];
  }

  // Check for juice
  if (
    (!isGenericName && (
      name.includes("juice") ||
      name.includes("smoothie") ||
      name.includes("fresh")
    )) ||
    category.includes("juice")
  ) {
    return fakeImages.juice[index % fakeImages.juice.length];
  }

  // Default - use a variety of images based on index
  // Rotate through coffee, tea, and juice images for variety
  const allImages = [
    ...fakeImages.coffee,
    ...fakeImages.tea,
    ...fakeImages.juice,
    ...fakeImages.default,
  ];
  return allImages[index % allImages.length];
}

/**
 * Check if image URL is valid
 */
function isValidImageUrl(image: string | undefined | null): boolean {
  if (!image || image.trim() === "") return false;
  
  // Check for placeholder indicators
  if (
    image.includes("placeholder") ||
    image.includes("test") ||
    image.includes("تیست") ||
    image.length < 10
  ) {
    return false;
  }
  
  // Check if it's a valid URL format
  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("/") ||
    image.startsWith("data:image")
  ) {
    return true;
  }
  
  return false;
}

/**
 * Get image URL - use real image if available, otherwise use fake image
 */
export function getItemImage(
  image: string | undefined | null,
  itemName: string,
  categoryName?: string,
  index: number = 0
): string {
  // Always use fake image if real image is not valid
  if (!isValidImageUrl(image)) {
    return getFakeImage(itemName, categoryName, index);
  }
  
  // Return real image if valid
  return image;
}
