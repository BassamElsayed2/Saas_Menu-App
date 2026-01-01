"use client";

import { useEffect, useState } from "react";
import ContactSection from "@/components/FrontPage/ContactSection";
import PricingSection from "@/components/FrontPage/PricingSection";
import WhyUsSection from "@/components/FrontPage/WhyUsSection";
import Footer from "@/components/FrontPage/Footer";
import HeroBanner from "@/components/FrontPage/HeroBanner";

import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/FrontPage/HowItWorks";
import FeaturesSection from "@/components/FrontPage/FeaturesSection";
import TrustedBy from "@/components/FrontPage/TrustedBy";
import WhatsAppButton from "@/components/FrontPage/WhatsAppButton";
import SignInModal from "@/components/Authentication/SignInModal";

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    setIsReady(true);
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
    <>
        <main className="min-h-screen">
      <Navbar onOpenSignIn={() => setIsSignInModalOpen(true)} />
      

        <HeroBanner />

        <WhyUsSection />

        <TrustedBy />

        <FeaturesSection />

        <HowItWorks />

        <PricingSection />

        <ContactSection />

        <Footer />
        <WhatsAppButton />
      
      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
    </main>
    </>
  );
}
