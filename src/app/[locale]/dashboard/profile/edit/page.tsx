"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useUpdateProfile, useChangePassword } from "@/hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";
import UserAvatar from "@/components/UserAvatar";
import toast from "react-hot-toast";

export default function EditProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Profile.edit");
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    country: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [selectedPlan, setSelectedPlan] = useState<string>("free");
  const [upgradingPlan, setUpgradingPlan] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // React Query hooks
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/authentication/sign-in`);
    }
  }, [user, loading, router, locale]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        country: user.country || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        gender: user.gender || "",
        address: user.address || "",
      });

      // Try to load profile image from localStorage (temporary solution)
      const savedImage = localStorage.getItem(`profileImage_${user.id}`);
      setProfileImage(savedImage || user.profileImage || null);
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const processImageFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error(t("imageTypeError"));
      return;
    }

    // Validate file size (max 1MB)
    if (file.size > 1 * 1024 * 1024) {
      toast.error(t("imageSizeError"));
      return;
    }

    setUploadingImage(true);

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append("image", file);

      // TODO: Replace with actual API call
      // const response = await api.post("/user/profile/image", formData);
      // const newImageUrl = response.data.imageUrl;

      // Temporary: Create local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        setProfileImage(newImageUrl);

        // Save to localStorage (temporary until backend integration)
        if (user?.id) {
          localStorage.setItem(`profileImage_${user.id}`, newImageUrl);
        }

        // Update the user in React Query cache
        queryClient.setQueryData(["currentUser"], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            profileImage: newImageUrl,
          };
        });

        toast.success(t("imageUploadSuccess"));
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      toast.error(error.message || t("imageUploadError"));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processImageFile(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await processImageFile(file);
  };

  const handleRemoveImage = () => {
    setProfileImage(null);

    // Remove from localStorage
    if (user?.id) {
      localStorage.removeItem(`profileImage_${user.id}`);
    }

    // Update the user in React Query cache
    queryClient.setQueryData(["currentUser"], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        profileImage: null,
      };
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success(t("imageRemoveSuccess"));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send updated data to backend
    await updateProfile.mutateAsync({
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      country: formData.country,
      dateOfBirth: formData.dateOfBirth || null,
      gender: formData.gender || null,
      address: formData.address,
    });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }

    if (passwordData.newPassword.length < 8) {
      return;
    }

    await changePassword.mutateAsync({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    // Reset form on success
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleChangePlan = async () => {
    if (selectedPlan === "free") {
      return;
    }

    setUpgradingPlan(true);

    try {
      // TODO: Integrate with payment gateway
      // await api.post("/user/subscription/change", { plan: selectedPlan });
    } catch (error: any) {
      // Error handling
    } finally {
      setUpgradingPlan(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "1 Menu",
        "Up to 20 items",
        "Basic customization",
        "Ads supported",
      ],
    },
    {
      id: "starter",
      name: "Starter",
      price: "$9",
      period: "/month",
      features: [
        "3 Menus",
        "Unlimited items",
        "Advanced customization",
        "No ads",
        "Analytics",
      ],
      popular: true,
    },
    {
      id: "professional",
      name: "Professional",
      price: "$29",
      period: "/month",
      features: [
        "Unlimited menus",
        "Full customization",
        "Priority support",
        "Advanced analytics",
        "Custom domain",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] relative overflow-hidden transition-colors duration-500">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 ltr:right-10 rtl:left-10 w-72 h-72 bg-gradient-to-tr from-primary-400/20 to-primary-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 ltr:left-10 rtl:right-10 w-96 h-96 bg-gradient-to-tr from-primary-500/5 to-primary-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
    </div>
  
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl relative z-10 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div className="text-center sm:text-start w-full sm:w-auto">
          <h1 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-white tracking-tight">{t("title")}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">{t("subtitle")}</p>
        </div>
        <button
          onClick={() => router.push(`/${locale}/dashboard/profile/user-profile`)}
          className="group px-5 py-3 bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] text-gray-600 dark:text-gray-300 rounded-xl hover:border-primary-500 dark:hover:border-primary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-all flex items-center gap-2 font-medium text-sm shadow-sm hover:shadow-md"
        >
          <i className="material-symbols-outlined !text-[20px] group-hover:ltr:-translate-x-1 group-hover:rtl:translate-x-1 transition-transform">arrow_back</i>
          {t("backToProfile")}
        </button>
      </div>
  
      {/* Profile Image Card */}
      <div className="bg-white/90 dark:bg-[#0c1427]/90 backdrop-blur-2xl border border-gray-200/40 dark:border-primary-500/10 rounded-3xl shadow-xl dark:shadow-primary-500/10 p-8 transition-all hover:scale-[1.01]">
        <div className="flex items-center gap-4 mb-6">
          <i className="ri-camera-line text-2xl text-primary-500 dark:text-primary-400"></i>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t("profilePicture")}</h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-[#1e293b] shadow-lg transition-all hover:shadow-xl">
              <UserAvatar
                src={profileImage}
                name={user.name}
                size="xl"
                onClick={handleImageClick}
                className="cursor-pointer hover:opacity-80 transition-opacity !w-full !h-full"
              />
            </div>
            {uploadingImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                <i className="ri-loader-4-line animate-spin text-white text-3xl"></i>
              </div>
            )}
            {!uploadingImage && profileImage && (
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 ltr:-right-2 rtl:-left-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            )}
          </div>
  
          <div className="flex-1 w-full">
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleImageClick}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-200 dark:border-[#1e293b] hover:border-primary-400 dark:hover:border-primary-500 bg-gray-50 dark:bg-[#0a0e19]"
              } ${uploadingImage ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex flex-col items-center">
                {uploadingImage ? (
                  <>
                    <i className="ri-loader-4-line animate-spin text-primary-500 text-3xl mb-2"></i>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t("uploading")}...</p>
                  </>
                ) : (
                  <>
                    <i className="ri-upload-cloud-2-line text-3xl text-gray-400 dark:text-gray-500 mb-2"></i>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{isDragging ? t("dropImageHere") : t("dragDropOrClick")}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{t("supportedFormats")} (Max: 1MB)</p>
                  </>
                )}
              </div>
            </div>
  
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={uploadingImage} />
  
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-gray-400 dark:text-gray-500">{t("recommendedSize")}</p>
              <button
                type="button"
                onClick={handleImageClick}
                disabled={uploadingImage}
                className="px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="ri-upload-line"></i>
                {uploadingImage ? t("uploading") : t("uploadPhoto")}
              </button>
            </div>
          </div>
        </div>
      </div>
  
      {/* Profile Information */}
      <div className="bg-white/90 dark:bg-[#0c1427]/90 backdrop-blur-2xl border border-gray-200/40 dark:border-primary-500/10 rounded-3xl shadow-xl dark:shadow-primary-500/10 p-8 transition-all hover:scale-[1.01]">
        <div className="flex items-center gap-4 mb-6">
          <i className="ri-user-line text-2xl text-primary-500 dark:text-primary-400"></i>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t("personalInformation")}</h2>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200"><i className="ri-user-3-line text-primary-500 dark:text-primary-400"></i>{t("fullName")}</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all" required />
            </div>
            <div className="space-y-2">
              <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200"><i className="ri-mail-line text-primary-500 dark:text-primary-400"></i>{t("emailAddress")}</label>
              <div className="relative">
                <input type="email" value={user.email} className="h-12 w-full rounded-lg bg-gray-100 dark:bg-[#0a0e19]/50 border border-gray-200 dark:border-[#1e293b] px-4 ltr:pr-10 rtl:pl-10 text-gray-500 dark:text-gray-400 cursor-not-allowed" disabled />
                <i className="ri-lock-line absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">{t("emailCannotBeChanged")}</p>
            </div>
          </div>
  
          <div className="space-y-2">
            <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200"><i className="ri-phone-line text-primary-500 dark:text-primary-400"></i>{t("phoneNumber")}</label>
            <input type="tel" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all" placeholder="+966 50 123 4567" />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200"><i className="ri-map-pin-line text-primary-500 dark:text-primary-400"></i>{t("country")}</label>
              <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all" placeholder={t("countryPlaceholder")} />
            </div>
            <div className="space-y-2">
              <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200"><i className="ri-calendar-line text-primary-500 dark:text-primary-400"></i>{t("dateOfBirth")}</label>
              <input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all" />
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200"><i className="ri-user-smile-line text-primary-500 dark:text-primary-400"></i>{t("gender")}</label>
              <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all">
                <option value="">{t("selectGender")}</option>
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
                <option value="other">{t("other")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200"><i className="ri-home-line text-primary-500 dark:text-primary-400"></i>{t("address")}</label>
              <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all" placeholder={t("addressPlaceholder")} />
            </div>
          </div>
  
          <button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/25 dark:shadow-primary-400/30 hover:shadow-xl hover:shadow-primary-500/30 dark:hover:shadow-primary-400/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? <><i className="ri-loader-4-line animate-spin text-xl"></i>{t("saving")}</> : <><i className="ri-save-line text-xl"></i>{t("saveChanges")}</>}
          </button>
        </form>
      </div>
  
      {/* Change Password */}
      <div className="bg-white/90 dark:bg-[#0c1427]/90 backdrop-blur-2xl border border-gray-200/40 dark:border-primary-500/10 rounded-3xl shadow-xl dark:shadow-primary-500/10 p-8 transition-all hover:scale-[1.01]">
        <div className="flex items-center gap-4 mb-6">
          <i className="ri-lock-password-line text-2xl text-primary-500 dark:text-primary-400"></i>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t("changePassword")}</h2>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div className="space-y-2">
            <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200"><i className="ri-key-line text-primary-500 dark:text-primary-400"></i>{t("currentPassword")}</label>
            <input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200"><i className="ri-lock-line text-primary-500 dark:text-primary-400"></i>{t("newPassword")}</label>
              <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all" required />
            </div>
            <div className="space-y-2">
              <label className="flex gap-2 items-center text-sm font-medium text-gray-700 dark:text-gray-200"><i className="ri-lock-line text-primary-500 dark:text-primary-400"></i>{t("confirmPassword")}</label>
              <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="h-12 w-full rounded-lg bg-gray-50 dark:bg-[#0a0e19] border border-gray-200 dark:border-[#1e293b] px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 outline-none transition-all" required />
            </div>
          </div>
  
          <button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/25 dark:shadow-primary-400/30 hover:shadow-xl hover:shadow-primary-500/30 dark:hover:shadow-primary-400/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <i className="ri-lock-line text-xl"></i>{t("changePasswordButton")}
          </button>
        </form>
      </div>

      {/* Subscription Management */}
      <div
        id="subscription"
        className="bg-white/90 dark:bg-[#0c1427]/90 backdrop-blur-2xl border border-gray-200/40 dark:border-primary-500/10 rounded-3xl shadow-xl dark:shadow-primary-500/10 p-8 transition-all hover:scale-[1.01]"
      >
        <div className="flex items-center gap-4 mb-6">
          <i className="ri-vip-crown-line text-2xl text-primary-500 dark:text-primary-400"></i>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t("manageSubscription")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedPlan === plan.id
                  ? "border-primary-500 dark:border-primary-400 bg-primary-50/50 dark:bg-primary-900/20 shadow-xl shadow-primary-500/15"
                  : "border-gray-200 dark:border-[#1e293b] hover:border-primary-300 dark:hover:border-primary-600 bg-gray-50 dark:bg-[#0a0e19]"
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white text-xs px-4 py-1 rounded-full font-medium shadow-lg">
                  {t("mostPopular")}
                </span>
              )}

              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {t(`plans.${plan.id}.name`)}
                </h3>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedPlan === plan.id
                    ? "border-primary-500 dark:border-primary-400 bg-primary-500 dark:bg-primary-400"
                    : "border-gray-300 dark:border-gray-600"
                }`}>
                  {selectedPlan === plan.id && (
                    <i className="ri-check-line text-white text-sm"></i>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{t(`plans.${plan.id}.period`)}</span>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <i className="ri-check-line text-green-500 text-lg ltr:mr-2 rtl:ml-2 flex-shrink-0"></i>
                    {t(`plans.${plan.id}.features.${index}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200/50 dark:border-[#1e293b]">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-start">
            {selectedPlan === "free" ? t("onFreePlan") : t("paymentConfirmation")}
          </p>
          <button
            onClick={handleChangePlan}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 dark:shadow-primary-400/30 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.03] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            disabled={upgradingPlan || selectedPlan === "free"}
          >
            {upgradingPlan ? (
              <>
                <i className="ri-loader-4-line animate-spin text-xl"></i>
                {t("processing")}
              </>
            ) : (
              <>
                <i className="ri-rocket-line text-xl"></i>
                {t("upgradePlan")}
              </>
            )}
          </button>
        </div>

        <div className="mt-5 p-4 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-700/30 rounded-xl flex items-start gap-3">
          <i className="ri-information-line text-amber-500 dark:text-amber-400 text-xl flex-shrink-0 mt-0.5"></i>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            <strong>{t("note")}:</strong> {t("paymentGatewayNote")}
          </p>
        </div>
      </div>
    </main>
  </div>
  
  );
}
