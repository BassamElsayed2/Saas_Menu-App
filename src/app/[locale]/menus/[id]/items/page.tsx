"use client";

import React, { useState, useEffect, use } from "react";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import MenuItemForm from "@/components/MenuItems/MenuItemForm";
import { useAuth } from "@/contexts/AuthContext";
import { useMenu } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  translations?: any;
}

export default function MenuItemsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const t = useTranslations("MenuItems");
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === "ar";
  const { user, loading: authLoading } = useAuth();
  const { data: menu, isLoading: menuLoading } = useMenu(parseInt(id));
  
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [menuName, setMenuName] = useState("");

  const fetchMenuItems = async () => {
    try {
      // Set menu name from the menu hook data
      if (menu?.name) {
        setMenuName(menu.name);
      }

      // Use API client which handles token automatically
      const result = await api.getMenuItems(parseInt(id), locale);
      
      if (result.error) {
        // Handle unauthorized silently - auth check will redirect
        if (result.error.includes("401") || result.error.includes("403") || result.error.includes("token")) {
          setLoading(false);
          return;
        }
        throw new Error(result.error);
      }

      const data = result.data as any;
      const itemsList = data?.items || [];
      setItems(itemsList);
    } catch (error: any) {
      console.error("Error fetching menu items:", error);
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !menuLoading) {
      if (!user) {
        toast.error(t("loginRequired"));
        router.push(`/${locale}/authentication/sign-in`);
        return;
      }

      if (menu && menu.userId !== user.id) {
        toast.error(t("noPermission"));
        router.push(`/${locale}/menus`);
        return;
      }

      // Only fetch menu items after auth is confirmed
      fetchMenuItems();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, menu, authLoading, menuLoading, router, locale, id]);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (itemId: number) => {
    if (!confirm(t("deleteConfirm"))) return;

    try {
      const result = await api.deleteMenuItem(parseInt(id), itemId);

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success(t("deleteSuccess"));
      fetchMenuItems();
    } catch (error: any) {
      console.error("Error deleting menu item:", error);
      toast.error(t("deleteError"));
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchMenuItems();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  // Hide sidebar and header when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showForm]);

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      starters: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      main: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      desserts: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
      drinks: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    };
    return colors[category] || colors.other;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 animate-pulse">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 ltr:right-10 rtl:left-10 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 ltr:left-10 rtl:right-10 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push(`/${locale}/menus/${id}`)}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition group"
          >
            <i className={`ri-arrow-${isRTL ? 'right' : 'left'}-line text-xl transition-transform ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}></i>
            {t("backToDashboard")}
          </button>
        </div>

        {/* Header Card */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-xl dark:shadow-primary-500/5 p-6 md:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {menuName}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {t("subtitle")}
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all flex items-center gap-2 font-semibold"
            >
              <i className="ri-add-line text-xl"></i>
              {t("addItem")}
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={handleFormCancel}
          >
            <div 
              className="bg-white/95 dark:bg-[#0c1427]/95 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white/95 dark:bg-[#0c1427]/95 backdrop-blur-xl z-10 px-6 py-4 border-b border-gray-200/50 dark:border-primary-500/10 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <i className="ri-restaurant-line text-white text-lg"></i>
                  </div>
                  {editingItem ? t("editItem") : t("addItem")}
                </h2>
                <button
                  onClick={handleFormCancel}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              <div className="p-6">
                <MenuItemForm
                  menuId={parseInt(id)}
                  item={editingItem}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </div>
            </div>
          </div>
        )}

        {/* Items Grid */}
        {items.length === 0 ? (
          <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-xl dark:shadow-primary-500/5 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
              <i className="ri-restaurant-line text-5xl text-primary-500 dark:text-primary-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t("noItems")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {t("noItemsDesc")}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all font-semibold inline-flex items-center gap-2"
            >
              <i className="ri-add-line text-xl"></i>
              {t("addFirstItem")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
              >
                {/* Image */}
                {item.image ? (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    <i className="ri-image-line text-6xl text-gray-300 dark:text-gray-600"></i>
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-500 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-primary-500 dark:text-primary-400">
                      ${item.price}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.available
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {item.available ? t("available") : t("notAvailable")}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all font-medium"
                    >
                      <i className="ri-edit-line text-lg"></i>
                      {t("edit")}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all font-medium"
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
                      {t("delete")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
