"use client";

import React, { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useMenuItems, useDeleteMenuItem } from "@/hooks/useApi";
import { useCategories } from "@/hooks/useApi";
import api from "@/lib/api";
import MenuItemForm from "@/components/MenuItems/MenuItemForm";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category: string;
  categoryId?: number;
  available: boolean;
  translations?: any;
}

export default function ProductsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const menuId = parseInt(id);
  const t = useTranslations("MenuItems");
  const locale = useLocale();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [menuName, setMenuName] = useState("");

  const { data: items = [], isLoading: itemsLoading } = useMenuItems(menuId);
  const { data: categories = [] } = useCategories(menuId);
  const deleteMenuItem = useDeleteMenuItem(menuId);

  // Fetch menu name
  React.useEffect(() => {
    const fetchMenuName = async () => {
      try {
        const result = await api.get(`/menus/${id}?locale=${locale}`);
        if (result.data?.menu) {
          setMenuName(result.data.menu.name || "");
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenuName();
  }, [id, locale]);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item: MenuItem) => {
      // Search filter
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
      
      // Category filter
      const matchesCategory = categoryFilter === "all" || 
                             item.category === categoryFilter ||
                             item.categoryId?.toString() === categoryFilter;
      
      // Availability filter
      const matchesAvailability = availabilityFilter === "all" ||
                                  (availabilityFilter === "available" && item.available) ||
                                  (availabilityFilter === "unavailable" && !item.available);
      
      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [items, searchQuery, categoryFilter, availabilityFilter]);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (itemId: number) => {
    if (!confirm(t("deleteConfirm"))) return;
    await deleteMenuItem.mutateAsync(itemId);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (itemsLoading) {
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <button
              onClick={() => router.push(`/${locale}/dashboard/menus/${id}`)}
              className="mb-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <i className="material-symbols-outlined">arrow_back</i>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {menuName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/dashboard/menus/${id}/products/new`}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <i className="material-symbols-outlined">add</i>
            {t("addItem")}
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <i className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-[20px]">
              search
            </i>
            <input
              type="text"
              placeholder={t("search") || "بحث بالاسم..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">{t("selectCategory") || "جميع التصنيفات"}</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Availability Filter */}
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="available">{t("available")}</option>
            <option value="unavailable">{t("notAvailable")}</option>
          </select>
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
              menuId={menuId}
              item={editingItem}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      {/* Table */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow p-12">
          <i className="material-symbols-outlined text-gray-400 !text-[64px] mb-4">
            restaurant_menu
          </i>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {searchQuery || categoryFilter !== "all" || availabilityFilter !== "all"
              ? "لا توجد نتائج"
              : t("noItems")}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchQuery || categoryFilter !== "all" || availabilityFilter !== "all"
              ? "جرب تغيير معايير البحث"
              : t("noItemsDesc")}
          </p>
          {!searchQuery && categoryFilter === "all" && availabilityFilter === "all" && (
            <Link
              href={`/${locale}/dashboard/menus/${id}/products/new`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <i className="material-symbols-outlined">add</i>
              {t("addFirstItem")}
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    الصورة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    الاسم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    الوصف
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    التصنيف
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    السعر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredItems.map((item: MenuItem) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.image ? (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <i className="material-symbols-outlined text-gray-400 !text-[24px]">
                            fastfood
                          </i>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                        {item.description || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-primary-500">
                        ${item.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.available
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {item.available ? t("available") : t("notAvailable")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 flex items-center gap-1"
                        >
                          <i className="material-symbols-outlined !text-[18px]">edit</i>
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 flex items-center gap-1"
                        >
                          <i className="material-symbols-outlined !text-[18px]">delete</i>
                          {t("delete")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

