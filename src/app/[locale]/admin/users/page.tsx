"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  planName: string;
  billingCycle: string;
  isSuspended: boolean;
  createdAt: string;
  lastLoginAt: string;
}

export default function UsersManagement() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;

    // Check if user is admin
    if (!user || user.role !== "admin") {
      router.push("/");
      return;
    }

    fetchUsers();
  }, [user, authLoading, router]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token =
        localStorage.getItem("auth_token") ||
        localStorage.getItem("accessToken");

      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users?limit=1000`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuspendToggle = async (userId: number, isSuspended: boolean) => {
    try {
      const token =
        localStorage.getItem("auth_token") ||
        localStorage.getItem("accessToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/suspend`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isSuspended: !isSuspended }),
        }
      );

      if (response.ok) {
        fetchUsers(); // Refresh list
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                إدارة المستخدمين
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                عرض وإدارة جميع المستخدمين في النظام
              </p>
            </div>
            <button
              onClick={() => router.push(`/${locale}/admin`)}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← رجوع
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="بحث بالاسم أو البريد الإلكتروني..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0c1427] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="trezo-card bg-white dark:bg-[#0c1427] p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              إجمالي المستخدمين
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {users.length}
            </div>
          </div>
          <div className="trezo-card bg-white dark:bg-[#0c1427] p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              المستخدمين النشطين
            </div>
            <div className="text-2xl font-bold text-green-600">
              {users.filter((u) => !u.isSuspended).length}
            </div>
          </div>
          <div className="trezo-card bg-white dark:bg-[#0c1427] p-4 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              المستخدمين الموقوفين
            </div>
            <div className="text-2xl font-bold text-red-600">
              {users.filter((u) => u.isSuspended).length}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="trezo-card bg-white dark:bg-[#0c1427] rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-[#15203c]">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    الاسم
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    البريد الإلكتروني
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    الدور
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    الخطة
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    الحالة
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      لا توجد نتائج
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-gray-50 dark:hover:bg-[#15203c] transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {u.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {u.email}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {u.role === "admin" ? "أدمن" : "مستخدم"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            u.planName === "Yearly"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : u.planName === "Monthly"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {u.planName === "Yearly"
                            ? "سنوي"
                            : u.planName === "Monthly"
                            ? "شهري"
                            : u.planName || "مجاني"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            u.isSuspended
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          }`}
                        >
                          {u.isSuspended ? "موقوف" : "نشط"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              router.push(`/${locale}/admin/users/${u.id}`)
                            }
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            عرض
                          </button>
                          {u.role !== "admin" && (
                            <button
                              onClick={() =>
                                handleSuspendToggle(u.id, u.isSuspended)
                              }
                              className={`px-3 py-1 text-xs rounded transition-colors ${
                                u.isSuspended
                                  ? "bg-green-600 text-white hover:bg-green-700"
                                  : "bg-red-600 text-white hover:bg-red-700"
                              }`}
                            >
                              {u.isSuspended ? "تفعيل" : "إيقاف"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

