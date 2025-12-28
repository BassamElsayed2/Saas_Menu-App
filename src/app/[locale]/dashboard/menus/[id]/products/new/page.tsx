"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import MenuItemForm from "@/components/MenuItems/MenuItemForm";
import api from "@/lib/api";
import { useState, useEffect } from "react";

export default function NewProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const menuId = parseInt(id);
  const t = useTranslations("MenuItems");
  const locale = useLocale();
  const router = useRouter();
  const [menuName, setMenuName] = useState("");

  useEffect(() => {
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

  const handleSuccess = () => {
    router.push(`/${locale}/dashboard/menus/${id}/products`);
  };

  const handleCancel = () => {
    router.push(`/${locale}/dashboard/menus/${id}/products`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.push(`/${locale}/dashboard/menus/${id}/products`)}
          className="mb-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <i className="material-symbols-outlined">arrow_back</i>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {menuName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t("addItem")}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <MenuItemForm
          menuId={menuId}
          item={null}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

