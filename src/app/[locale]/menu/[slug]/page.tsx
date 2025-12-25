"use client";

import React, { useState, useEffect, use } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { toast } from "react-hot-toast";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: string;
  longitude: string;
}

interface MenuData {
  menu: {
    id: number;
    name: string;
    description: string;
    logo: string;
    theme: string;
    slug: string;
    isActive: boolean;
  };
  items: MenuItem[];
  itemsByCategory: Record<string, MenuItem[]>;
  branches: Branch[];
  rating: {
    average: number;
    total: number;
  };
}

export default function PublicMenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap params Promise using React.use()
  const { slug } = use(params);
  
  const locale = useLocale();
  const t = useTranslations("PublicMenu");
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    fetchMenuData();
  }, [slug, locale]);

  const fetchMenuData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/menu/${slug}?locale=${locale}`
      );

      if (!response.ok) {
        throw new Error("Menu not found");
      }

      const data = await response.json();
      setMenuData(data.data);

      // Update page metadata dynamically
      if (data.data?.menu) {
        const menu = data.data.menu;
        
        // Update page title
        document.title = menu.name || "Menu";
        
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', menu.description || '');
        
        // Update favicon
        if (menu.logo) {
          let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
          if (!favicon) {
            favicon = document.createElement('link');
            favicon.setAttribute('rel', 'icon');
            document.head.appendChild(favicon);
          }
          favicon.setAttribute('href', menu.logo);
          
          // Also update apple-touch-icon
          let appleIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
          if (!appleIcon) {
            appleIcon = document.createElement('link');
            appleIcon.setAttribute('rel', 'apple-touch-icon');
            document.head.appendChild(appleIcon);
          }
          appleIcon.setAttribute('href', menu.logo);
        }
      }

      // Set first category as default
      const categories = Object.keys(data.data.itemsByCategory || {});
      if (categories.length > 0) {
        setSelectedCategory(categories[0]);
      }
    } catch (error: any) {
      console.error("Error fetching menu:", error);
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <i className="material-symbols-outlined text-gray-400 !text-[64px] mb-4">
          restaurant_menu
        </i>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("notFound")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t("notFoundDescription")}
        </p>
      </div>
    );
  }

  // صفحة الصيانة - إذا كانت القائمة متوقفة (isActive = false)
  if (!menuData.menu.isActive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 !text-[48px]">
              construction
            </i>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {locale === 'ar' ? 'تحت الصيانة' : 'Under Maintenance'}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {locale === 'ar' 
              ? 'نعتذر، القائمة غير متاحة حالياً. نحن نعمل على تحسينها وسنعود قريباً!'
              : 'Sorry, this menu is currently unavailable. We are working on improvements and will be back soon!'}
          </p>

          {menuData.menu.logo && (
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
              <Image
                src={menuData.menu.logo}
                alt={menuData.menu.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {menuData.menu.name}
          </p>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {locale === 'ar' 
                ? 'شكراً لتفهمكم'
                : 'Thank you for your understanding'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const categories = Object.keys(menuData.itemsByCategory);
  const displayItems =
    selectedCategory === "all"
      ? menuData.items
      : menuData.itemsByCategory[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {menuData.menu.logo && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={menuData.menu.logo}
                    alt={menuData.menu.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {menuData.menu.name}
                </h1>
                {menuData.menu.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {menuData.menu.description}
                  </p>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`material-symbols-outlined !text-[20px] ${
                      star <= menuData.rating.average
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    star
                  </i>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {menuData.rating.average.toFixed(1)} ({menuData.rating.total})
              </span>
              <button
                onClick={() => setShowRatingModal(true)}
                className="ltr:ml-2 rtl:mr-2 px-3 py-1 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                {t("rateUs")}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t("allCategories")}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {t(`categories.${category}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {item.image ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <i className="material-symbols-outlined text-gray-400 !text-[64px]">
                    fastfood
                  </i>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-primary-500">
                    ${item.price}
                  </span>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {displayItems.length === 0 && (
          <div className="text-center py-12">
            <i className="material-symbols-outlined text-gray-400 !text-[64px] mb-4">
              restaurant_menu
            </i>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("noItems")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("noItemsInCategory")}
            </p>
          </div>
        )}
      </main>

      {/* Branches */}
      {menuData.branches.length > 0 && (
        <section className="bg-white dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("ourBranches")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuData.branches.map((branch) => (
                <div
                  key={branch.id}
                  className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {branch.name}
                  </h3>
                  {branch.address && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-start gap-2">
                      <i className="material-symbols-outlined !text-[20px]">
                        location_on
                      </i>
                      {branch.address}
                    </p>
                  )}
                  {branch.phone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <i className="material-symbols-outlined !text-[20px]">
                        phone
                      </i>
                      {branch.phone}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <RatingModal
          slug={slug}
          onClose={() => setShowRatingModal(false)}
          onSuccess={() => {
            setShowRatingModal(false);
            fetchMenuData();
          }}
        />
      )}
    </div>
  );
}

interface RatingModalProps {
  slug: string;
  onClose: () => void;
  onSuccess: () => void;
}

function RatingModal({ slug, onClose, onSuccess }: RatingModalProps) {
  const t = useTranslations("PublicMenu.rating");
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (stars === 0) {
      toast.error(t("selectStars"));
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/menu/${slug}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stars,
            comment,
            customerName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || t("submitError"));
      }

      toast.success(t("submitSuccess"));
      onSuccess();
    } catch (error: any) {
      console.error("Error submitting rating:", error);
      toast.error(error.message || t("submitError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t("title")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stars */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("rating")} *
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setStars(star)}
                  className="transition-transform hover:scale-110"
                >
                  <i
                    className={`material-symbols-outlined !text-[40px] ${
                      star <= stars ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    star
                  </i>
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("name")}
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder={t("namePlaceholder")}
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("comment")}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder={t("commentPlaceholder")}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              disabled={submitting}
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? t("submitting") : t("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

