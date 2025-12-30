"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";

interface Ad {
  id: number;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  imageUrl?: string;
  linkUrl?: string;
  position: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  clickCount: number;
  impressionCount: number;
}

export default function AdsManagement() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;

    // Check if user is admin
    if (!user || user.role !== "admin") {
      router.push("/");
      return;
    }

    fetchAds();
  }, [user, authLoading, router]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const token =
        localStorage.getItem("auth_token") ||
        localStorage.getItem("accessToken");

      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/ads`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAds(data.ads || []);
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (adId: number, isActive: boolean) => {
    try {
      const token =
        localStorage.getItem("auth_token") ||
        localStorage.getItem("accessToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/ads/${adId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: !isActive }),
        }
      );

      if (response.ok) {
        fetchAds(); // Refresh list
      }
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  };

  const handleDeleteAd = async (adId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الإعلان؟")) return;

    try {
      const token =
        localStorage.getItem("auth_token") ||
        localStorage.getItem("accessToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/ads/${adId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        fetchAds(); // Refresh list
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
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
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                إدارة الإعلانات
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                عرض وإدارة الإعلانات المعروضة للمستخدمين المجانيين
              </p>
            </div>
            <button
              onClick={() => router.push(`/${locale}/admin`)}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← رجوع
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="trezo-card bg-white dark:bg-[#0c1427] p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              إجمالي الإعلانات
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {ads.length}
            </div>
          </div>
          <div className="trezo-card bg-white dark:bg-[#0c1427] p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              الإعلانات النشطة
            </div>
            <div className="text-2xl font-bold text-green-600">
              {ads.filter((a) => a.isActive).length}
            </div>
          </div>
          <div className="trezo-card bg-white dark:bg-[#0c1427] p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              إجمالي النقرات
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {ads.reduce((sum, a) => sum + a.clickCount, 0)}
            </div>
          </div>
        </div>

        {/* Add New Ad Button */}
        <div className="mb-6">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            + إضافة إعلان جديد
          </button>
        </div>

        {/* Ads List */}
        <div className="space-y-4">
          {ads.length === 0 ? (
            <div className="trezo-card bg-white dark:bg-[#0c1427] p-8 rounded-md text-center">
              <p className="text-gray-600 dark:text-gray-400">
                لا توجد إعلانات بعد
              </p>
            </div>
          ) : (
            ads.map((ad) => (
              <div
                key={ad.id}
                className="trezo-card bg-white dark:bg-[#0c1427] p-6 rounded-md"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image */}
                  {ad.imageUrl && (
                    <div className="w-full md:w-48 h-32 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={ad.imageUrl}
                        alt={ad.titleAr}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {ad.titleAr}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {ad.title}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ad.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {ad.isActive ? "نشط" : "غير نشط"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {ad.contentAr}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-4 mb-3 text-sm">
                      <div className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">المكان:</span>{" "}
                        {ad.position}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">النقرات:</span>{" "}
                        {ad.clickCount}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">المشاهدات:</span>{" "}
                        {ad.impressionCount}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        تعديل
                      </button>
                      <button
                        onClick={() => handleToggleActive(ad.id, ad.isActive)}
                        className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                          ad.isActive
                            ? "bg-yellow-600 text-white hover:bg-yellow-700"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {ad.isActive ? "تعطيل" : "تفعيل"}
                      </button>
                      <button
                        onClick={() => handleDeleteAd(ad.id)}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        حذف
                      </button>
                      {ad.linkUrl && (
                        <a
                          href={ad.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          عرض الرابط
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

