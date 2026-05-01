import React from 'react';
import Navbar from '../../components/layout/Navbar'; // Adjust path if needed
import Footer from '../../components/layout/Footer'; // Adjust path if needed
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorks from './HowItWorks';
import CTASection from './CTASection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white">
      {/* Assuming you have a Navbar component. If not, comment this out for now */}
      <Navbar isPublic /> 
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <CTASection />
      </main>

      {/* Assuming you have a Footer component. If not, comment this out for now */}
      <Footer />
    </div>
  );
}