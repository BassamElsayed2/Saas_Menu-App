"use client";

import React, { useState, useEffect, use } from "react";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "react-hot-toast";
import Image from "next/image";
import MenuItemForm from "@/components/MenuItems/MenuItemForm";

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
  // Unwrap params Promise using React.use()
  const { id } = use(params);
  
  const t = useTranslations("MenuItems");
  const locale = useLocale();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [menuName, setMenuName] = useState("");

  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // تم التصحيح: استخدام accessToken بدلاً من token
      
      // Fetch menu details
      const menuResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menus/${id}?locale=${locale}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (menuResponse.ok) {
        const menuData = await menuResponse.json();
        setMenuName(menuData.data?.menu?.name || "");
      }

      // Fetch menu items
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menus/${id}/items?locale=${locale}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch menu items");

      const data = await response.json();
      setItems(data.data?.items || []);
    } catch (error: any) {
      console.error("Error fetching menu items:", error);
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [id, locale]);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (itemId: number) => {
    if (!confirm(t("deleteConfirm"))) return;

    try {
      const token = localStorage.getItem("accessToken"); // تم التصحيح: استخدام accessToken بدلاً من token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menus/${id}/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete menu item");

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

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      starters: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      main: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      desserts: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      drinks: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    };
    return colors[category] || colors.other;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {menuName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t("subtitle")}
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <i className="material-symbols-outlined">add</i>
            {t("addItem")}
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {editingItem ? t("editItem") : t("addItem")}
            </h2>
            <MenuItemForm
              menuId={parseInt(id)}
              item={editingItem}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      {/* Items Grid */}
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <i className="material-symbols-outlined text-gray-400 !text-[64px]">
              restaurant_menu
            </i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t("noItems")}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t("noItemsDesc")}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <i className="material-symbols-outlined">add</i>
            {t("addFirstItem")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
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

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-primary-500">
                    ${item.price}
                  </span>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(
                      item.category
                    )}`}
                  >
                    {t(`categories.${item.category}`)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.available
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {item.available ? t("available") : t("notAvailable")}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <i className="material-symbols-outlined !text-[18px]">
                      edit
                    </i>
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <i className="material-symbols-outlined !text-[18px]">
                      delete
                    </i>
                    {t("delete")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

