"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

// Define the menu items as a dynamic array
const menuItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features/" },
  {
    label: "Dashboard",
    href: "https://trezo-twcss.envytheme.com/",
    isExternal: true,
  },
  { label: "Use Cases", href: "/use-cases/" },
  { label: "Pricing", href: "/pricing/" },
];

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/front-pages/features/" },
  { name: "Our Team", path: "/front-pages/team/" },
  { name: "FAQ's", path: "/front-pages/faq/" },
  { name: "Contact", path: "/front-pages/contact/" },
  { name: "Admin", path: "/dashboard/ecommerce/", isAdmin: true },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const locale = useLocale();

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Add active class to mobile menu
  const [isActiveMobileMenu, setActiveMobileMenu] = useState<boolean>(true);

  const handleToggleMobileMenu = (): void => {
    setActiveMobileMenu(!isActiveMobileMenu);
  };

  // Initialize Dark Mode
  useEffect(() => {
    const storedPreference = localStorage.getItem("theme");
    if (storedPreference === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Update Dark Mode
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (isDarkMode) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (newLocale: string) => {
    // Get pathname without locale prefix
    const pathnameWithoutLocale = pathname.replace(/^\/(ar|en)/, "") || "/";
    // Navigate to the same page with the new locale
    window.location.href = `/${newLocale}${pathnameWithoutLocale}`;
  };

  // Sticky navbar
  useEffect(() => {
    const elementId = document.getElementById("navbar");
    const handleScroll = () => {
      if (window.scrollY > 80) {
        elementId?.classList.add("is-sticky");
      } else {
        elementId?.classList.remove("is-sticky");
      }
    };

    document.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []); // Added empty dependency array to avoid repeated effect calls

  return (
    <>
      <div
        className="saas-navbar fixed top-0 right-0 left-0 transition-all h-auto z-[5] py-[20px] md:py-[30px] lg:py-[40px] xl:py-[60px]"
        id="navbar"
      >
        <div className="container sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1345px] 2xl:max-w-[1705px] mx-auto px-[12px]">
          <div className="inner-navbar bg-white dark:bg-[#1c1c1c] rounded-[15px] py-[15px] md:py-[18px] px-[15px] md:px-[25px] lg:px-[30px] transition-all">
            <div className="flex items-center relative flex-wrap lg:flex-nowrap justify-between lg:justify-start">
              <Link
                href="/"
                className="inline-block w-[150px] ltr:mr-[15px] rtl:ml-[15px]"
              >
                <Image
                  src="/images/ENS-copy.png"
                  alt="logo"
                  className="inline-block "
                  width={109}
                  height={29}
                />
              </Link>

              <button
                type="button"
                className="inline-block relative leading-none lg:hidden"
                onClick={handleToggleMobileMenu}
              >
                <span className="h-[3px] w-[30px] my-[5px] block bg-dark dark:bg-white"></span>
                <span className="h-[3px] w-[30px] my-[5px] block bg-dark dark:bg-white"></span>
                <span className="h-[3px] w-[30px] my-[5px] block bg-dark dark:bg-white"></span>
              </button>

              {/* For Big Devices */}
              <div className="hidden lg:flex items-center grow basis-full">
                <ul className="flex mx-auto flex-row gap-[30px] xl:gap-[40px]">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={`font-medium transition-all hover:text-primary-600 ${
                          pathname === item.path ? "text-primary-600" : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-[15px]">
                  {/* Language Switcher */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        handleLanguageChange(locale === "ar" ? "en" : "ar")
                      }
                      className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      title={
                        locale === "ar"
                          ? "Switch to English"
                          : "التبديل إلى العربية"
                      }
                    >
                      <i className="material-symbols-outlined !text-[20px] md:!text-[22px]">
                        translate
                      </i>
                    </button>
                  </div>

                  {/* Dark Mode Toggle */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleDarkModeToggle}
                      className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-[#fe7a36]"
                      title={
                        isDarkMode
                          ? "Switch to Light Mode"
                          : "Switch to Dark Mode"
                      }
                    >
                      <i className="material-symbols-outlined !text-[20px] md:!text-[22px]">
                        {isDarkMode ? "dark_mode" : "light_mode"}
                      </i>
                    </button>
                  </div>

                  <Link
                    href={`/${locale}/authentication/sign-in`}
                    className="inline-block text-purple-600 lg:text-[15px] xl:text-[16px] py-[11px] px-[17px] rounded-md transition-all font-medium border border-purple-600 hover:text-white hover:bg-purple-500 hover:border-purple-500"
                  >
                    <span className="inline-block relative ltr:pl-[25px] rtl:pr-[25px] ltr:md:pl-[29px] rtl:md:pr-[29px]">
                      <i className="material-symbols-outlined absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2 !text-[20px] md:!text-[24px]">
                        login
                      </i>
                      Login
                    </span>
                  </Link>
                </div>
              </div>

              {/* For Responsive */}
              <div
                className={`bg-white dark:bg-[#0a0e19] rounded-[15px] border border-gray-200 dark:border-[#202c4b] mt-[20px] p-[20px] md:p-[30px] w-full hidden lg:!hidden ${
                  isActiveMobileMenu ? "" : "active"
                }`}
                id="navbar-collapse"
              >
                <ul>
                  {menuItems.map((item) => (
                    <li
                      key={item.href}
                      className="my-[14px] md:my-[16px] first:mt-0 last:mb-0"
                    >
                      {item.isExternal ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-medium transition-all hover:text-primary-600 ${
                            pathname === item.href ? "text-primary-600" : ""
                          }`}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className={`font-medium transition-all hover:text-primary-600 ${
                            pathname === item.href ? "text-primary-600" : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-[15px] mt-[20px]">
                  {/* Language Switcher */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        handleLanguageChange(locale === "ar" ? "en" : "ar")
                      }
                      className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      title={
                        locale === "ar"
                          ? "Switch to English"
                          : "التبديل إلى العربية"
                      }
                    >
                      <i className="material-symbols-outlined !text-[20px] md:!text-[22px]">
                        translate
                      </i>
                    </button>
                  </div>

                  {/* Dark Mode Toggle */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleDarkModeToggle}
                      className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800 text-[#fe7a36]"
                      title={
                        isDarkMode
                          ? "Switch to Light Mode"
                          : "Switch to Dark Mode"
                      }
                    >
                      <i className="material-symbols-outlined !text-[20px] md:!text-[22px]">
                        {isDarkMode ? "dark_mode" : "light_mode"}
                      </i>
                    </button>
                  </div>

                  <Link
                    href={`/${locale}/authentication/sign-in`}
                    className="inline-block text-purple-600 lg:text-[15px] xl:text-[16px] py-[11px] px-[17px] rounded-md transition-all font-medium border border-purple-600 hover:text-white hover:bg-purple-500 hover:border-purple-500"
                  >
                    <span className="inline-block relative ltr:pl-[25px] rtl:pr-[25px] ltr:md:pl-[29px] rtl:md:pr-[29px]">
                      <i className="material-symbols-outlined absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2 !text-[20px] md:!text-[24px]">
                        login
                      </i>
                      Login
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
