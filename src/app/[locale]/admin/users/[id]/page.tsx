"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import { use } from "react";

interface Menu {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  itemsCount?: number;
}

interface UserDetails {
  id: number;
  email: string;
  name: string;
  role: string;
  planType: string;
  isSuspended: boolean;
  phoneNumber?: string;
  country?: string;
  createdAt: string;
  lastLoginAt?: string;
  emailVerified: boolean;
  menusCount?: number;
  menus?: Menu[];
}

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;

    // Check if user is admin
    if (!user || user.role !== "admin") {
      router.push("/");
      return;
    }

    fetchUserDetails();
  }, [user, authLoading, router, resolvedParams.id]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const token =
        localStorage.getItem("auth_token") ||
        localStorage.getItem("accessToken");

      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${resolvedParams.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Combine user data with menus
        setUserDetails({
          ...data.user,
          menus: data.menus || [],
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMenuStatus = async (menuId: number, currentStatus: boolean) => {
    try {
      const token =
        localStorage.getItem("auth_token") ||
        localStorage.getItem("accessToken");

      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menus/${menuId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: !currentStatus }),
        }
      );

      if (response.ok) {
        // Update local state
        if (userDetails && userDetails.menus) {
          const updatedMenus = userDetails.menus.map((menu) =>
            menu.id === menuId ? { ...menu, isActive: !currentStatus } : menu
          );
          setUserDetails({ ...userDetails, menus: updatedMenus });
        }
        alert(`تم ${!currentStatus ? "تفعيل" : "إيقاف"} القائمة بنجاح`);
      } else {
        const error = await response.json();
        alert(error.error || "فشل تحديث حالة القائمة");
      }
    } catch (error) {
      console.error("Error toggling menu status:", error);
      alert("حدث خطأ أثناء تحديث حالة القائمة");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="py-5 px-5 sm:px-5 md:px-5 lg:px-8">
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-400">
            المستخدم غير موجود
          </p>
          <button
            onClick={() => router.push(`/${locale}/admin/users`)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            رجوع للقائمة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 px-5 sm:px-5 md:px-5 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                تفاصيل المستخدم
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                عرض معلومات المستخدم التفصيلية
              </p>
            </div>
            <button
              onClick={() => router.push(`/${locale}/admin/users`)}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← رجوع
            </button>
          </div>
        </div>

        {/* User Info Card */}
        <div className="trezo-card bg-white dark:bg-[#0c1427] p-6 rounded-md mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            المعلومات الأساسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                الاسم
              </label>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {userDetails.name}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                البريد الإلكتروني
              </label>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {userDetails.email}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                الدور
              </label>
              <p>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    userDetails.role === "admin"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {userDetails.role === "admin" ? "أدمن" : "مستخدم"}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                الخطة
              </label>
              <p>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    userDetails.planType === "yearly"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : userDetails.planType === "monthly"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {userDetails.planType === "yearly"
                    ? "سنوي"
                    : userDetails.planType === "monthly"
                    ? "شهري"
                    : "مجاني"}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                الحالة
              </label>
              <p>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    userDetails.isSuspended
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}
                >
                  {userDetails.isSuspended ? "موقوف" : "نشط"}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                حالة البريد
              </label>
              <p>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    userDetails.emailVerified
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {userDetails.emailVerified ? "موثق" : "غير موثق"}
                </span>
              </p>
            </div>
            {userDetails.phoneNumber && (
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  رقم الهاتف
                </label>
                <p className="text-base font-medium text-gray-900 dark:text-white">
                  {userDetails.phoneNumber}
                </p>
              </div>
            )}
            {userDetails.country && (
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  الدولة
                </label>
                <p className="text-base font-medium text-gray-900 dark:text-white">
                  {userDetails.country}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                تاريخ التسجيل
              </label>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {new Date(userDetails.createdAt).toLocaleDateString("ar-EG")}
              </p>
            </div>
            {userDetails.lastLoginAt && (
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  آخر تسجيل دخول
                </label>
                <p className="text-base font-medium text-gray-900 dark:text-white">
                  {new Date(userDetails.lastLoginAt).toLocaleDateString(
                    "ar-EG"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Card */}
        <div className="trezo-card bg-white dark:bg-[#0c1427] p-6 rounded-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            الإحصائيات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {userDetails.menus?.length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                عدد القوائم
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {userDetails.emailVerified ? "✓" : "✗"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                توثيق البريد
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {userDetails.planType === "yearly"
                  ? "سنوي"
                  : userDetails.planType === "monthly"
                  ? "شهري"
                  : "مجاني"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                نوع الاشتراك
              </div>
            </div>
          </div>
        </div>

        {/* Menus Card */}
        <div className="trezo-card bg-white dark:bg-[#0c1427] p-6 rounded-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            القوائم ({userDetails.menus?.length || 0})
          </h2>

          {!userDetails.menus || userDetails.menus.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                لا توجد قوائم لهذا المستخدم
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {userDetails.menus.map((menu) => (
                <div
                  key={menu.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#15203c] rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {menu.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          menu.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {menu.isActive ? "نشط" : "موقوف"}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        <strong>الرابط:</strong> {menu.slug}
                      </span>
                      <span>
                        <strong>المنتجات:</strong> {menu.itemsCount || 0}
                      </span>
                      <span>
                        <strong>التاريخ:</strong>{" "}
                        {new Date(menu.createdAt).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => window.open(`/${locale}/menu/${menu.slug}`, "_blank")}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      عرض
                    </button>
                    <button
                      onClick={() => handleToggleMenuStatus(menu.id, menu.isActive)}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                        menu.isActive
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {menu.isActive ? "إيقاف" : "تفعيل"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

