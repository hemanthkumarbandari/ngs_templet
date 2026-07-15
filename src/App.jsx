import React, { useEffect, useRef, useState } from 'react';
import { theme } from './theme';

import { GlobalAnimationStyles } from './components/GlobalAnimationStyles';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MissionSection } from './components/MissionSection';
import { LogoMarquee } from './components/LogoMarquee';
import { ValuesSection } from './components/ValuesSection';
import { InvestorsSection } from './components/InvestorsSection';
import { FooterCTA } from './components/FooterCTA';
import { Footer } from './components/Footer';

export default function App() {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <GlobalAnimationStyles />
      {/* Navbar is fixed — lives outside the content flow */}
      <Navbar />
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: theme.surface, marginBottom: footerHeight, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <LogoMarquee />
        <ValuesSection />
        <InvestorsSection />
        <FooterCTA />
      </div>
      <div ref={footerRef} style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}
