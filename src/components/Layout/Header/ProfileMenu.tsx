"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/contexts/AuthContext";
import UserAvatar from "@/components/UserAvatar";

const ProfileMenu: React.FC = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Header");
  const { user, logout } = useAuth();

  const [active, setActive] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  const handleDropdownToggle = () => {
    setActive((prevState) => !prevState);
  };

  const handleLogout = async () => {
    setActive(false);
    logout();
    // Wait a bit before redirecting to allow logout to complete
    setTimeout(() => {
      router.push(`/${locale}/authentication/sign-in`);
    }, 100);
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActive(false); // Close the dropdown if clicked outside
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative profile-menu mx-[8px] md:mx-[10px] lg:mx-[12px] ltr:first:ml-0 ltr:last:mr-0 rtl:first:mr-0 rtl:last:ml-0"
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={handleDropdownToggle}
        className={`flex items-center -mx-[5px] relative ltr:pr-[14px] rtl:pl-[14px] text-black dark:text-white ${
          active ? "active" : ""
        }`}
      >
        <UserAvatar
          src={user?.profileImage}
          name={user?.name || "User"}
          size="md"
          showBorder
          className="ltr:md:mr-[2px] ltr:lg:mr-[8px] rtl:md:ml-[2px] rtl:lg:ml-[8px]"
        />
        <span className="block font-semibold text-[0px] lg:text-base">
          {user?.name || "User"}
        </span>
        <i className="ri-arrow-down-s-line text-[15px] absolute ltr:-right-[3px] rtl:-left-[3px] top-1/2 -translate-y-1/2 mt-px"></i>
      </button>

      {active && (
        <div className="profile-menu-dropdown bg-white dark:bg-[#0c1427] transition-all shadow-3xl dark:shadow-none py-[22px] absolute mt-[13px] md:mt-[14px] w-[220px] z-[1] top-full ltr:right-0 rtl:left-0 rounded-md">
          <div className="flex items-center border-b border-gray-100 dark:border-[#172036] pb-[12px] mx-[20px] mb-[10px]">
            <UserAvatar
              src={user?.profileImage}
              name={user?.name || "User"}
              size="sm"
              showBorder
              className="ltr:mr-[9px] rtl:ml-[9px]"
            />
            <div className="flex-1 min-w-0">
              <span className="block text-black dark:text-white font-medium truncate">
                {user?.name || "User"}
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || ""}
              </span>
            </div>
          </div>

          <ul>
            <li>
              <Link
                href={`/${locale}/dashboard/profile/user-profile`}
                className={`block relative py-[7px] ltr:pl-[50px] ltr:pr-[20px] rtl:pr-[50px] rtl:pl-[20px] text-black dark:text-white transition-all hover:text-primary-500 ${
                  pathname.includes("/dashboard/profile")
                    ? "text-primary-500"
                    : ""
                }`}
                onClick={() => setActive(false)}
              >
                <i className="material-symbols-outlined top-1/2 -translate-y-1/2 !text-[22px] absolute ltr:left-[20px] rtl:right-[20px]">
                  account_circle
                </i>
                {t("myProfile")}
              </Link>
            </li>

            <li>
              <Link
                href={`/${locale}/dashboard/profile/edit`}
                className={`block relative py-[7px] ltr:pl-[50px] ltr:pr-[20px] rtl:pr-[50px] rtl:pl-[20px] text-black dark:text-white transition-all hover:text-primary-500 ${
                  pathname.includes("/profile/edit") ? "text-primary-500" : ""
                }`}
                onClick={() => setActive(false)}
              >
                <i className="material-symbols-outlined top-1/2 -translate-y-1/2 !text-[22px] absolute ltr:left-[20px] rtl:right-[20px]">
                  credit_card
                </i>
                {t("billing")}
              </Link>
            </li>
          </ul>

          <div className="border-t border-gray-100 dark:border-[#172036] mx-[20px] my-[9px]"></div>

          <ul>
            <li>
              <Link
                href={`/${locale}/menus`}
                className="w-full text-left block relative py-[7px] ltr:pl-[50px] ltr:pr-[20px] rtl:pr-[50px] rtl:pl-[20px] text-black dark:text-white transition-all hover:text-primary-500  "
                onClick={() => setActive(false)}
              >
                <i className="material-symbols-outlined top-1/2 -translate-y-1/2 !text-[22px] absolute ltr:left-[20px] rtl:right-[20px]">
                  restaurant_menu
                </i>
                {t("manageMenus")}
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left block relative py-[7px] ltr:pl-[50px] ltr:pr-[20px] rtl:pr-[50px] rtl:pl-[20px] text-black dark:text-white transition-all hover:text-primary-500"
              >
                <i className="material-symbols-outlined top-1/2 -translate-y-1/2 !text-[22px] absolute ltr:left-[20px] rtl:right-[20px]">
                  logout
                </i>
                {t("logout")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
