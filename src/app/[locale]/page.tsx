"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/FrontPage/HeroSection";
import WhyUsSection from "@/components/FrontPage/WhyUsSection";
import TrustedBy from "@/components/FrontPage/TrustedBy";
import FeaturesSection from "@/components/FrontPage/FeaturesSection";
import HowItWorks from "@/components/FrontPage/HowItWorks";
import PricingSection from "@/components/FrontPage/PricingSection";
import ContactSection from "@/components/FrontPage/ContactSection";
import FooterSection from "@/components/FrontPage/FooterSection";
import WhatsAppButton from "@/components/FrontPage/WhatsAppButton";
import SignInModal from "@/components/Authentication/SignInModal";

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    setIsReady(true);
    // فتح الـ Modal تلقائياً عند تحميل الصفحة
    setIsSignInModalOpen(true);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar onOpenSignIn={() => setIsSignInModalOpen(true)} />
      <HeroSection />
      <WhyUsSection />
      <TrustedBy />
      <FeaturesSection />
      <HowItWorks />
      <PricingSection />
      <ContactSection />
      <FooterSection />
      <WhatsAppButton />
      
      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
    </main>
  );
}
