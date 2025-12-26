"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const ContactSection = () => {
  const t = useTranslations("Landing.contact");
  const { isRTL } = useLanguage();
  
  const [formData, setFormData] = useState({
    restaurantName: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ restaurantName: "", phone: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-3xl animate-spin-slow" />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-float" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400/30 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-400/50 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-up">
                <span suppressHydrationWarning>{t("title1")}</span>
                <br />
                <span className="text-purple-400 animate-pulse" suppressHydrationWarning>{t("title2")}</span>
              </h2>
              <p className="text-lg opacity-80 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }} suppressHydrationWarning>
                {t("description")}
              </p>
              
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/01000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl transition-all duration-300 font-semibold hover:scale-105 shadow-lg hover:shadow-green-500/30 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
                suppressHydrationWarning
              >
                <MessageCircle className="w-5 h-5 animate-bounce" />
                {t("whatsapp")}
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-8 rounded-3xl shadow-2xl animate-scale-in hover:shadow-purple-500/10 transition-shadow duration-500">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" suppressHydrationWarning>{t("successTitle")}</h3>
                  <p className="text-gray-600 dark:text-gray-400" suppressHydrationWarning>{t("successDescription")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" suppressHydrationWarning>
                      {t("restaurantName")} *
                    </label>
                    <input
                      type="text"
                      placeholder={t("restaurantPlaceholder")}
                      value={formData.restaurantName}
                      onChange={(e) =>
                        setFormData({ ...formData, restaurantName: e.target.value })
                      }
                      required
                      className="h-12 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 block w-full outline-0 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-800 dark:text-white"
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" suppressHydrationWarning>
                      {t("phone")} *
                    </label>
                    <input
                      type="tel"
                      placeholder={t("phonePlaceholder")}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="h-12 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 block w-full outline-0 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-800 dark:text-white"
                      dir="ltr"
                      suppressHydrationWarning
                    />
                  </div>

                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="w-full group hover:scale-105 transition-all duration-300 shadow-lg animate-fade-in" 
                    type="submit"
                    style={{ animationDelay: "0.3s" }}
                    suppressHydrationWarning
                  >
                    {t("submit")}
                    <Send className={`w-5 h-5 transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
