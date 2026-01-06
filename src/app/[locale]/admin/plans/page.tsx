"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

interface Plan {
  id: number;
  name: string;
  nameAr: string;
  priceMonthly: number;
  durationInDays: number;
  maxMenus: number;
  maxProductsPerMenu: number;
  hasAds: boolean;
  allowCustomDomain: boolean;
  isActive: boolean;
}

export default function PlansManagement() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("AdminPlans");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;

    // Check if user is admin
    if (!user || user.role !== "admin") {
      router.push("/");
      return;
    }

    fetchPlans();
  }, [user, authLoading, router]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const token =
        localStorage.getItem("auth_token") ||
        localStorage.getItem("accessToken");

      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/plans`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPlans(data.plans || []);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan({ ...plan });
    setShowEditModal(true);
  };

  const handleSavePlan = async () => {
    if (!editingPlan) return;

    try {
      const token =
        localStorage.getItem("auth_token") ||
        localStorage.getItem("accessToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/plans/${editingPlan.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceMonthly: editingPlan.priceMonthly,
            maxMenus: editingPlan.maxMenus,
            maxProductsPerMenu: editingPlan.maxProductsPerMenu,
            allowCustomDomain: editingPlan.allowCustomDomain,
            hasAds: editingPlan.hasAds,
            isActive: editingPlan.isActive,
          }),
        }
      );

      if (response.ok) {
        setShowEditModal(false);
        setEditingPlan(null);
        fetchPlans(); // Refresh list
        alert(t("editModal.updateSuccess"));
      } else {
        const error = await response.json();
        alert(error.error || t("editModal.updateError"));
      }
    } catch (error) {
      console.error("Error updating plan:", error);
      alert(t("editModal.updateError"));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="py-5 px-5 sm:px-5 md:px-5 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-[25px] md:flex items-center justify-between">
          <div>
            <h5 className="!mb-2 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t("title")}
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("subtitle")}
            </p>
          </div>
          <button
            onClick={() => router.push(`/${locale}/admin`)}
            className="mt-4 md:mt-0 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {locale === "ar" ? "← " : "→ "}
            {t("backButton")}
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px] mb-[25px]">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className="trezo-card bg-white dark:bg-[#0c1427] p-[20px] md:p-[25px] rounded-md text-center"
            >
              <div className="trezo-card-content relative md:py-[10px] md:px-[10px]">
                <span className="inline-block text-gray-700 dark:text-gray-300 rounded-md py-[6.5px] px-[17.3px] border border-gray-300 dark:border-[#172036]">
                  {plan.name}
                </span>

                <div className="leading-none text-4xl text-gray-900 dark:text-white my-[15px] md:my-[17px] font-medium -tracking-[1px]">
                  ${plan.priceMonthly}
                  <span className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal">
                    {t("perMonth")}
                  </span>
                </div>

                <p className="font-medium text-gray-700 dark:text-gray-300">
                  {plan.durationInDays}{" "}
                  {plan.durationInDays === 1 ? t("day") : t("days")}
                </p>

                <ul className="mt-[20px] md:mt-[28px] ltr:text-left rtl:text-right">
                  <li className="relative ltr:pl-[30px] ltr:md:pl-[38px] rtl:pr-[30px] rtl:md:pr-[38px] mb-[15px]">
                    <i className="material-symbols-outlined text-success-600 absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2">
                      check
                    </i>
                    {plan.maxMenus === -1
                      ? t("features.unlimitedMenus")
                      : `${plan.maxMenus} ${
                          plan.maxMenus === 1
                            ? t("features.menus")
                            : t("features.menusPlural")
                        }`}
                  </li>
                  <li className="relative ltr:pl-[30px] ltr:md:pl-[38px] rtl:pr-[30px] rtl:md:pr-[38px] mb-[15px]">
                    <i className="material-symbols-outlined text-success-600 absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2">
                      check
                    </i>
                    {plan.maxProductsPerMenu === -1
                      ? t("features.unlimitedProducts")
                      : `${plan.maxProductsPerMenu} ${t(
                          "features.productsPlural"
                        )}`}
                  </li>
                  <li className="relative ltr:pl-[30px] ltr:md:pl-[38px] rtl:pr-[30px] rtl:md:pr-[38px] mb-[15px]">
                    <i
                      className={`material-symbols-outlined ${
                        plan.allowCustomDomain
                          ? "text-success-600"
                          : "text-red-500"
                      } absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2`}
                    >
                      {plan.allowCustomDomain ? "check" : "close"}
                    </i>
                    {t("features.customDomain")}
                  </li>
                  <li className="relative ltr:pl-[30px] ltr:md:pl-[38px] rtl:pr-[30px] rtl:md:pr-[38px] mb-[15px] last:mb-0">
                    <i
                      className={`material-symbols-outlined ${
                        !plan.hasAds ? "text-success-600" : "text-red-500"
                      } absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2`}
                    >
                      {!plan.hasAds ? "check" : "close"}
                    </i>
                    {t("features.noAds")}
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => handleEditPlan(plan)}
                  className="block w-full rounded-md font-medium transition-all md:text-md mt-[20px] md:mt-[20px] py-[12px] px-[20px] text-white bg-primary-500 hover:bg-primary-400"
                >
                  <span className="inline-block relative ltr:pl-[25px] rtl:pr-[25px]">
                    <i className="material-symbols-outlined !text-md absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2">
                      edit
                    </i>
                    {t("actions.edit")}
                  </span>
                </button>

                {/* Status Badge */}
                <div className="absolute -top-[9px] ltr:-right-[17px] rtl:-left-[17px]">
                  {plan.isActive ? (
                    <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {t("status.active")}
                    </div>
                  ) : (
                    <div className="bg-gray-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {t("status.inactive")}
                    </div>
                  )}
                </div>

                {/* Popular Badge for middle plan */}
                {index === 1 && plan.isActive && (
                  <div className="absolute -top-[9px] ltr:left-[10px] rtl:right-[10px]">
                    <Image
                      src="/images/icons/star-popular.svg"
                      alt="popular"
                      width={80}
                      height={80}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Edit Plan Modal */}
        {showEditModal && editingPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#0c1427] rounded-md p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("editModal.title")}:{" "}
                {locale === "ar" ? editingPlan.nameAr : editingPlan.name}
              </h2>

              <div className="space-y-4">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("editModal.price")}
                  </label>
                  <input
                    type="number"
                    value={editingPlan.priceMonthly ?? 0}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        priceMonthly: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0c1427] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Max Menus */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("editModal.maxMenus")}
                  </label>
                  <input
                    type="number"
                    value={editingPlan.maxMenus ?? 0}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        maxMenus: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0c1427] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Max Products Per Menu */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("editModal.maxProducts")}
                  </label>
                  <input
                    type="number"
                    value={editingPlan.maxProductsPerMenu ?? 0}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        maxProductsPerMenu: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0c1427] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Allow Custom Domain */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="allowCustomDomain"
                    checked={editingPlan.allowCustomDomain ?? false}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        allowCustomDomain: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <label
                    htmlFor="allowCustomDomain"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("editModal.allowCustomDomain")}
                  </label>
                </div>

                {/* Has Ads */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="hasAds"
                    checked={editingPlan.hasAds ?? false}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        hasAds: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <label
                    htmlFor="hasAds"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("editModal.hasAds")}
                  </label>
                </div>

                {/* Is Active */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={editingPlan.isActive ?? false}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        isActive: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("editModal.isActive")}
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSavePlan}
                  className="flex-1 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium"
                >
                  {t("editModal.save")}
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingPlan(null);
                  }}
                  className="flex-1 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  {t("editModal.cancel")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
