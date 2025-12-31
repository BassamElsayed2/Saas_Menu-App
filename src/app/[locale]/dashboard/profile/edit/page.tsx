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
  const isRTL = locale === "ar";
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

  const [passwordErrors, setPasswordErrors] = useState({
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
  const changePassword = useChangePassword((field, message) => {
    if (field === 'currentPassword' || field === 'newPassword') {
      setPasswordErrors(prev => ({ ...prev, [field]: message }));
    }
  });

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

      const savedImage = localStorage.getItem(`profileImage_${user.id}`);
      setProfileImage(savedImage || user.profileImage || null);
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const processImageFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error(t("imageTypeError"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("imageSizeError"));
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        setProfileImage(newImageUrl);

        if (user?.id) {
          localStorage.setItem(`profileImage_${user.id}`, newImageUrl);
        }

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

    if (user?.id) {
      localStorage.removeItem(`profileImage_${user.id}`);
    }

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

    await updateProfile.mutateAsync({
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      country: formData.country,
      dateOfBirth: formData.dateOfBirth || null,
      gender: formData.gender || null,
      address: formData.address,
    });
  };

  const validateCurrentPassword = () => {
    if (!passwordData.currentPassword) {
      setPasswordErrors(prev => ({ ...prev, currentPassword: "" }));
      return true;
    }
    if (passwordData.currentPassword.length < 1) {
      setPasswordErrors(prev => ({ ...prev, currentPassword: t("currentPasswordRequired") }));
      return false;
    }
    setPasswordErrors(prev => ({ ...prev, currentPassword: "" }));
    return true;
  };

  const validateNewPassword = () => {
    if (!passwordData.newPassword) {
      setPasswordErrors(prev => ({ ...prev, newPassword: "" }));
      return true;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordErrors(prev => ({ ...prev, newPassword: t("passwordMinLength") }));
      return false;
    }

    const hasUpperCase = /[A-Z]/.test(passwordData.newPassword);
    const hasLowerCase = /[a-z]/.test(passwordData.newPassword);
    const hasNumber = /\d/.test(passwordData.newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setPasswordErrors(prev => ({ ...prev, newPassword: t("passwordRequirements") }));
      return false;
    }

    setPasswordErrors(prev => ({ ...prev, newPassword: "" }));
    return true;
  };

  const validateConfirmPassword = () => {
    if (!passwordData.confirmPassword) {
      setPasswordErrors(prev => ({ ...prev, confirmPassword: "" }));
      return true;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrors(prev => ({ ...prev, confirmPassword: t("passwordMismatch") }));
      return false;
    }

    setPasswordErrors(prev => ({ ...prev, confirmPassword: "" }));
    return true;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const isCurrentValid = validateCurrentPassword();
    const isNewValid = validateNewPassword();
    const isConfirmValid = validateConfirmPassword();

    if (!isCurrentValid || !isNewValid || !isConfirmValid) {
      return;
    }

    try {
      await changePassword.mutateAsync({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log('Password change error:', error);
    }
  };

  const handleChangePlan = async () => {
    if (selectedPlan === "free") {
      return;
    }

    setUpgradingPlan(true);

    try {
      // TODO: Integrate with payment gateway
    } catch (error: any) {
      // Error handling
    } finally {
      setUpgradingPlan(false);
    }
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

  if (!user) {
    return null;
  }

  const plans = [
    {
      id: "free",
      name: t("plans.free.name"),
      price: "$0",
      period: t("plans.free.period"),
      features: [
        t("plans.free.features.0"),
        t("plans.free.features.1"),
        t("plans.free.features.2"),
        t("plans.free.features.3"),
      ],
      gradient: "from-gray-500 to-gray-600",
    },
    {
      id: "starter",
      name: t("plans.starter.name"),
      price: "$9",
      period: t("plans.starter.period"),
      features: [
        t("plans.starter.features.0"),
        t("plans.starter.features.1"),
        t("plans.starter.features.2"),
        t("plans.starter.features.3"),
        t("plans.starter.features.4"),
      ],
      popular: true,
      gradient: "from-primary-500 to-primary-600",
    },
    {
      id: "professional",
      name: t("plans.professional.name"),
      price: "$29",
      period: t("plans.professional.period"),
      features: [
        t("plans.professional.features.0"),
        t("plans.professional.features.1"),
        t("plans.professional.features.2"),
        t("plans.professional.features.3"),
        t("plans.professional.features.4"),
      ],
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-[#0a0e19] dark:via-[#0c1427] dark:to-[#0a0e19] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 ltr:right-10 rtl:left-10 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 ltr:left-10 rtl:right-10 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-xl dark:shadow-primary-500/5 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <i className="ri-user-settings-line text-white text-2xl"></i>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {t("title")}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("subtitle")}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/${locale}/dashboard/profile/user-profile`)}
              className="group px-5 py-2.5 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all font-medium flex items-center gap-2"
            >
              <i className={`ri-arrow-${isRTL ? 'right' : 'left'}-line text-lg transition-transform ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}></i>
              {t("backToProfile")}
            </button>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <i className="ri-image-line text-white text-lg"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("profilePicture")}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar Preview */}
            <div className="relative">
              <div className="ring-4 ring-primary-500/20 rounded-full">
                <UserAvatar
                  src={profileImage}
                  name={user.name}
                  size="xl"
                  showBorder
                  onClick={handleImageClick}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
              {uploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                  <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Upload Area */}
            <div className="flex-1 w-full">
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleImageClick}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500"
                } ${uploadingImage ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex flex-col items-center">
                  {uploadingImage ? (
                    <>
                      <div className="w-12 h-12 border-3 border-primary-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t("uploading")}...</p>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-xl flex items-center justify-center mb-3">
                        <i className="ri-upload-cloud-2-line text-primary-500 text-2xl"></i>
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {isDragging ? t("dropImageHere") : t("dragDropOrClick")}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t("supportedFormats")}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={uploadingImage}
              />

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleImageClick}
                  disabled={uploadingImage}
                  className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-medium shadow-lg shadow-primary-500/25 flex items-center gap-2"
                >
                  <i className="ri-upload-2-line"></i>
                  {uploadingImage ? t("uploading") : t("uploadPhoto")}
                </button>

                {profileImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={uploadingImage}
                    className="px-5 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all font-medium flex items-center gap-2"
                  >
                    <i className="ri-delete-bin-line"></i>
                    {t("remove")}
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                {t("recommendedSize")}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <i className="ri-user-line text-white text-lg"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("personalInformation")}
            </h2>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("fullName")}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("emailAddress")}
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  disabled
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t("emailCannotBeChanged")}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("phoneNumber")}
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                placeholder="+966 50 123 4567"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("country")}
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                  placeholder={t("countryPlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("dateOfBirth")}
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("gender")}
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                >
                  <option value="">{t("selectGender")}</option>
                  <option value="male">{t("male")}</option>
                  <option value="female">{t("female")}</option>
                  <option value="other">{t("other")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("address")}
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-white"
                  placeholder={t("addressPlaceholder")}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-medium shadow-lg shadow-primary-500/25 flex items-center gap-2"
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t("saving")}
                  </>
                ) : (
                  <>
                    <i className="ri-save-line"></i>
                    {t("saveChanges")}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <i className="ri-lock-password-line text-white text-lg"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("changePassword")}
            </h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("currentPassword")}
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => {
                  setPasswordData({ ...passwordData, currentPassword: e.target.value });
                  if (passwordErrors.currentPassword) {
                    setPasswordErrors(prev => ({ ...prev, currentPassword: "" }));
                  }
                }}
                onBlur={validateCurrentPassword}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                  passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                }`}
                required
              />
              {passwordErrors.currentPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i className="ri-error-warning-line"></i>
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("newPassword")}
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => {
                  setPasswordData({ ...passwordData, newPassword: e.target.value });
                  if (passwordErrors.newPassword) {
                    setPasswordErrors(prev => ({ ...prev, newPassword: "" }));
                  }
                }}
                onBlur={validateNewPassword}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                  passwordErrors.newPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                }`}
                minLength={8}
                required
              />
              {passwordErrors.newPassword ? (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i className="ri-error-warning-line"></i>
                  {passwordErrors.newPassword}
                </p>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t("passwordMinLength")}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("confirmNewPassword")}
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => {
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value });
                  if (passwordErrors.confirmPassword) {
                    setPasswordErrors(prev => ({ ...prev, confirmPassword: "" }));
                  }
                }}
                onBlur={validateConfirmPassword}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                  passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                }`}
                minLength={8}
                required
              />
              {passwordErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i className="ri-error-warning-line"></i>
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all font-medium shadow-lg shadow-orange-500/25 flex items-center gap-2"
                disabled={changePassword.isPending}
              >
                {changePassword.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t("changing")}
                  </>
                ) : (
                  <>
                    <i className="ri-lock-line"></i>
                    {t("changePasswordButton")}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Subscription Management */}
        <div className="bg-white/80 dark:bg-[#0c1427]/80 backdrop-blur-xl border border-gray-200/50 dark:border-primary-500/10 rounded-2xl shadow-lg dark:shadow-primary-500/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <i className="ri-vip-crown-line text-white text-lg"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("manageSubscription")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative group cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                  selectedPlan === plan.id
                    ? "border-primary-500 bg-primary-50/50 dark:bg-primary-900/20 ring-2 ring-primary-500/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-500/50"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 ltr:right-4 rtl:left-4 px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-medium rounded-full shadow-lg">
                    {t("mostPopular")}
                  </span>
                )}
                
                <div className={`w-12 h-12 bg-gradient-to-br ${plan.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <i className={`text-white text-xl ${plan.id === 'free' ? 'ri-gift-line' : plan.id === 'starter' ? 'ri-rocket-line' : 'ri-vip-diamond-line'}`}></i>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <i className="ri-check-line text-green-500"></i>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id
                    ? "border-primary-500 bg-primary-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}>
                  {selectedPlan === plan.id && (
                    <i className="ri-check-line text-white text-xs"></i>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={handleChangePlan}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-purple-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={upgradingPlan || selectedPlan === "free"}
            >
              {upgradingPlan ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("processing")}
                </>
              ) : (
                <>
                  <i className="ri-arrow-up-circle-line"></i>
                  {t("upgradePlan")}
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedPlan === "free" ? t("onFreePlan") : t("paymentConfirmation")}
            </p>
          </div>

          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 rounded-xl">
            <p className="text-sm text-amber-700 dark:text-amber-300 flex items-center gap-2">
              <i className="ri-information-line text-lg"></i>
              <span><strong>{t("note")}:</strong> {t("paymentGatewayNote")}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
