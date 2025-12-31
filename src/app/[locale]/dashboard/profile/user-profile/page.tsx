"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSubscription } from "@/hooks/useApi";
import UserAvatar from "@/components/UserAvatar";

interface Subscription {
  plan: string;
  status: string;
  startDate: string;
  endDate: string | null;
  billingCycle: string;
}

export default function UserProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Profile.view");
  const tCommon = useTranslations("Common");

  // React Query hook
  const { data: subscription, isLoading: loadingSubscription } =
    useSubscription();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/authentication/sign-in`);
    }
  }, [user, loading, router, locale]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const planInfo = {
    free: { name: t("freePlan"), color: "gray", price: "$0/month" },
    starter: { name: t("starterPlan"), color: "blue", price: "$9/month" },
    professional: {
      name: t("professionalPlan"),
      color: "purple",
      price: "$29/month",
    },
  };

  const currentPlan = subscription?.plan?.toLowerCase() || "free";
  const plan = planInfo[currentPlan as keyof typeof planInfo] || planInfo.free;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] relative overflow-hidden transition-colors duration-300">
 
      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl relative z-10">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {t("title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {t("subtitle")}
            </p>
          </div>
          <button
            onClick={() => router.push(`/${locale}/dashboard/profile/edit`)}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all flex items-center gap-2 font-semibold"
          >
            <i className="material-symbols-outlined !text-[20px]">edit</i>
            {t("editProfile")}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-xl dark:shadow-primary-500/5 overflow-hidden mb-8">
          {/* Cover with Avatar */}
          <div className="h-48 md:h-56 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-600 relative">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
            
            {/* Avatar & Name on Cover */}
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-6 flex justify-center items-center">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl  flex items-center justify-center overflow-hidden  backdrop-blur-sm">
                  <UserAvatar
                    src={user.profileImage}
                    name={user.name}
                    size="xl"
                    className="!w-full !h-full"
                  />
                </div>
                <div className="text-center sm:text-start sm:mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{user.name}</h2>
                  <p className="text-white/80">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 md:px-8 py-6">

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Left Column - Contact & Personal Info */}
              <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-5 border border-gray-100 dark:border-gray-700/50">
                <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-4 flex items-center gap-2">
                  <i className="material-symbols-outlined !text-[18px]">person</i>
                  {t("personalInfo")}
                </h3>
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <i className="material-symbols-outlined text-primary-600 dark:text-primary-400 !text-[20px]">mail</i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 !mb-0">
                        {t("email")}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <i className="material-symbols-outlined text-green-600 dark:text-green-400 !text-[20px]">phone</i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 !mb-0">
                        {t("phone")}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.phoneNumber || t("notProvided")}
                      </p>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <i className="material-symbols-outlined text-blue-600 dark:text-blue-400 !text-[20px]">public</i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 !mb-0">
                        {t("country")}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.country || t("notProvided")}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <i className="material-symbols-outlined text-orange-600 dark:text-orange-400 !text-[20px]">location_on</i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 !mb-0">
                        {t("address")}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.address || t("notProvided")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Account & Demographics Info */}
              <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-5 border border-gray-100 dark:border-gray-700/50">
                <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-4 flex items-center gap-2">
                  <i className="material-symbols-outlined !text-[18px]">verified_user</i>
                  {t("accountStatus")}
                </h3>
                <div className="space-y-4">
                  {/* Role */}
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <i className="material-symbols-outlined text-purple-600 dark:text-purple-400 !text-[20px]">shield</i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 !mb-0">
                        {t("role")}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <i className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 !text-[20px]">calendar_month</i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 !mb-0">
                        {t("memberSince")}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(
                          user.createdAt || Date.now()
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                      <i className="material-symbols-outlined text-pink-600 dark:text-pink-400 !text-[20px]">cake</i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 !mb-0">
                        {t("dateOfBirth")}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.dateOfBirth
                          ? new Date(user.dateOfBirth).toLocaleDateString()
                          : t("notProvided")}
                      </p>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <i className="material-symbols-outlined text-teal-600 dark:text-teal-400 !text-[20px]">wc</i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400 !mb-0">
                        {t("gender")}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {user.gender ? t(user.gender) : t("notProvided")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Status Badges */}
            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              {/* Email Verification */}
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200/50 dark:border-green-700/30">
                <i className="material-symbols-outlined text-green-600 dark:text-green-400 !text-[18px]">verified</i>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  {t("emailVerification")}: {t("verified")}
                </span>
              </div>

              {/* Account Active */}
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/30">
                <i className="material-symbols-outlined text-blue-600 dark:text-blue-400 !text-[18px]">check_circle</i>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  {t("accountActive")}: {t("active")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-xl dark:shadow-primary-500/5 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="material-symbols-outlined text-white !text-[24px]">workspace_premium</i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t("subscription")}
              </h3>
            </div>
            <button
              onClick={() =>
                router.push(`/${locale}/dashboard/profile/edit#subscription`)
              }
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold flex items-center gap-1 transition-colors"
            >
              {t("manageSubscription")}
              <i className="material-symbols-outlined !text-[18px]">arrow_forward</i>
            </button>
          </div>

          {loadingSubscription ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500 mx-auto"></div>
            </div>
          ) : (
            <div>
              {/* Current Plan */}
              <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border border-primary-200/50 dark:border-primary-500/20 rounded-xl p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 mt-1 text-lg font-semibold">
                      {plan.price}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold text-sm shadow-lg shadow-primary-500/30">
                    {t("currentPlan")}
                  </div>
                </div>

                {subscription && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-4 pt-4 border-t border-primary-200/50 dark:border-primary-500/20">
                    <div className="flex items-center gap-2">
                      <i className="material-symbols-outlined text-primary-500 !text-[18px]">info</i>
                      <span className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">{t("status")}:</span>{" "}
                        <span className="capitalize text-green-600 dark:text-green-400">{subscription.status}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="material-symbols-outlined text-primary-500 !text-[18px]">sync</i>
                      <span className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">{t("billingCycle")}:</span>{" "}
                        <span className="capitalize">{subscription.billingCycle}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="material-symbols-outlined text-primary-500 !text-[18px]">event</i>
                      <span className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">{t("started")}:</span>{" "}
                        {new Date(subscription.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    {subscription.endDate && (
                      <div className="flex items-center gap-2">
                        <i className="material-symbols-outlined text-primary-500 !text-[18px]">update</i>
                        <span className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">{t("renews")}:</span>{" "}
                          {new Date(subscription.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Upgrade Options */}
              {currentPlan === "free" && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <i className="material-symbols-outlined text-white !text-[24px]">rocket_launch</i>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {t("upgradeTitle")}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t("upgradeDescription")}
                      </p>
                      <button
                        onClick={() =>
                          router.push(
                            `/${locale}/dashboard/profile/edit#subscription`
                          )
                        }
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all font-semibold"
                      >
                        {t("viewPlans")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
