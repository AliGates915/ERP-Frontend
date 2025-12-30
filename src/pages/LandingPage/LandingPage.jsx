import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import BenefitsSection from './BenefitsSection';
import CTASection from './CTASection';
import Footer from './Footer';


gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;