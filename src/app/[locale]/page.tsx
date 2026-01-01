import ContactUs from "@/components/FrontPage/ContactUs";
import Cta from "@/components/FrontPage/Cta";
import Faq from "@/components/FrontPage/Faq";
import WhyUsSection from "@/components/FrontPage/WhyUsSection";
import Footer from "@/components/FrontPage/Footer";
import HeroBanner from "@/components/FrontPage/HeroBanner";

import Navbar from "@/components/Navbar";
import OurTeam from "@/components/FrontPage/OurTeam";
import Testimonials from "@/components/FrontPage/Testimonials";
import TrustedBy from "@/components/FrontPage/TrustedBy";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Home() {
  return (
    <>
      <div className="front-page-body overflow-hidden">
        <Navbar />

        <HeroBanner />

        <WhyUsSection />

        <TrustedBy />

        <Testimonials />

        <OurTeam />

        <Faq />

        <ContactUs />

        <Cta />

        <Footer />
      </div>
    </>
  );
}
