import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
import { Footer } from './Footer';
import { Reveal } from './Reveal';
import { Navbar } from './Navbar';
export function GlobalAnimationStyles() {
  return (
    <style>{`
      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.7s cubic-bezier(0.22, 0.68, 0.32, 1),
                    transform 0.7s cubic-bezier(0.22, 0.68, 0.32, 1);
      }
      .reveal.reveal-visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* ── Mobile: disable all scroll/fade animations ── */
      @media (max-width: 768px) {
        .reveal,
        .reveal.reveal-visible {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
        }
        /* Also kill hero fade-up animation on mobile */
        [style*="heroFadeUp"] {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }

      /* ── About sticky left column ── */
      .about-left-col {
        position: sticky;
        top: 120px;
        align-self: start;
        height: fit-content;
      }
      @media (max-width: 768px) {
        .about-left-col { position: static !important; top: auto !important; }
      }



      /* ── Prefooter Circle Floating Animations ── */
      @keyframes floatSlow1 {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-48px) translateX(28px); }
      }
      @keyframes floatSlow2 {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(42px) translateX(-36px); }
      }
      @keyframes floatSlow3 {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-30px) translateX(24px); }
      }
      @keyframes floatSlow4 {
        0%, 100% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(36px) translateX(20px); }
      }

      .float-circle-1 { animation: floatSlow1 32s ease-in-out infinite; }
      .float-circle-2 { animation: floatSlow2 38s ease-in-out infinite; }
      .float-circle-3 { animation: floatSlow3 42s ease-in-out infinite; }
      .float-circle-4 { animation: floatSlow4 28s ease-in-out infinite; }
      .float-circle-5 { animation: floatSlow1 48s ease-in-out infinite; }

      /* ============================================================
         RESPONSIVE — max-width (existing project pattern)
         Desktop ≥1024px: untouched.
         Tablet: ≤ 1023px
         Mobile-large: ≤ 767px
         Mobile: ≤ 480px
      ============================================================ */

      /* ── Base: prevent horizontal overflow everywhere ── */
      *, *::before, *::after { box-sizing: border-box; }
      img, video { max-width: 100%; height: auto; }

      /* ── Navbar ── */
      @media (max-width: 1023px) {
        .nav-links { display: none !important; }
        .nav-auth  { gap: 8px !important; }
        .nav-inner { padding: 0 32px !important; }
      }
      @media (max-width: 480px) {
        .nav-inner { padding: 0 16px !important; height: 60px !important; }
        .nav-logo { height: 32px !important; }
        .nav-auth button { padding: 8px 14px !important; font-size: 12px !important; }
      }

      /* ── Hero section ── */
      @media (max-width: 1023px) {
        .hero-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
          min-height: auto !important;
          /* top padding accounts for fixed navbar (64px) + breathing room */
          padding: 100px 24px 80px 24px !important;
        }
        .hero-h1 { font-size: 48px !important; }
        .hero-corner-circles { display: none !important; }
      }
      @media (max-width: 767px) {
        .hero-grid {
          /* 80px = 64px navbar + 16px gap */
          padding: 80px 20px 56px 20px !important;
          gap: 32px !important;
        }
        .hero-h1 { font-size: 40px !important; letter-spacing: -1px !important; }
        .hero-stat-cards { grid-template-columns: 1fr !important; gap: 16px !important; }
      }
      @media (max-width: 480px) {
        .hero-h1 { font-size: 34px !important; }
      }

      /* ── About section ── */
      @media (max-width: 1023px) {
        .about-grid {
          grid-template-columns: 1fr !important;
          gap: 48px !important;
        }
        .about-h2 { font-size: clamp(32px, 5vw, 44px) !important; }
        .about-section { padding: 80px 24px !important; }
      }
      @media (max-width: 767px) {
        .about-left-col { position: static !important; top: auto !important; }
      }
      @media (max-width: 480px) {
        .about-h2 { font-size: 28px !important; }
        .about-stats { grid-template-columns: 1fr !important; gap: 24px !important; }
        .stat-value { font-size: 36px !important; }
        /* NO overflow:hidden here — it would break sticky on wider mobiles */
        .about-section { padding: 64px 20px !important; }
      }

      /* ── Mission section ── */
      @media (max-width: 1023px) {
        .mission-h2 { font-size: clamp(32px, 5.5vw, 52px) !important; margin-bottom: 32px !important; }
        .mission-img { height: 260px !important; }
        .mission-below { flex-direction: column !important; gap: 28px !important; }
      }
      @media (max-width: 480px) {
        .mission-h2 { font-size: 28px !important; letter-spacing: -0.5px !important; }
        .mission-img { height: 200px !important; border-radius: 20px !important; }
        .mission-section { padding: 60px 16px 48px !important; }
      }

      /* ── Logo marquee heading ── */
      @media (max-width: 767px) {
        .marquee-section { padding-top: 20px !important; padding-bottom: 20px !important; }
      }

      /* ── Values section ── */
      @media (max-width: 1023px) {
        .values-grid { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
      }
      @media (max-width: 767px) {
        .values-grid { grid-template-columns: 1fr !important; }
        .values-section { padding: 60px 16px 72px !important; }
      }

      /* ── Investors section ── */
      @media (max-width: 767px) {
        .investors-heading { padding: 0 16px !important; }
        .investors-h2 { font-size: clamp(32px, 6vw, 44px) !important; }
        .investor-card { width: 160px !important; padding: 24px 16px !important; }
        .investor-card span:last-child { font-size: 13px !important; }
      }
      @media (max-width: 480px) {
        .investor-card { width: 140px !important; }
        .investors-h2 { font-size: 28px !important; }
      }

      /* ── Pre-footer CTA (Start Now / newsletter) ── */
      @media (max-width: 1023px) {
        .prefooter-inner {
          flex-direction: column !important;
          gap: 32px !important;
          align-items: flex-start !important;
        }
        .prefooter-h2 { font-size: clamp(32px, 6vw, 48px) !important; }
        .prefooter-right { max-width: 100% !important; width: 100% !important; flex: none !important; }
        .prefooter-section { padding: 56px 24px !important; }
      }
      @media (max-width: 767px) {
        .prefooter-inner { gap: 24px !important; }
        .prefooter-h2 { font-size: 28px !important; letter-spacing: -0.5px !important; }
        .prefooter-section { padding: 48px 20px !important; }
      }
      @media (max-width: 480px) {
        .prefooter-inner { gap: 20px !important; }
        .prefooter-h2 { font-size: 26px !important; }
        .prefooter-section { padding: 40px 16px !important; }
        .prefooter-form {
          flex-direction: column !important;
          border-radius: 16px !important;
          padding: 16px !important;
          gap: 12px !important;
        }
        .prefooter-input {
          width: 100% !important;
          text-align: center !important;
          padding: 8px 0 !important;
        }
        .prefooter-btn {
          width: 100% !important;
          border-radius: 12px !important;
          padding: 16px !important;
        }
      }

      /* ── Footer ── */
      @media (max-width: 1023px) {
        .footer-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
          padding: 48px 20px 40px !important;
        }
        .footer-links-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
      }
      @media (max-width: 480px) {
        .footer-links-grid { grid-template-columns: 1fr !important; }
        .footer-bottom { flex-direction: column !important; gap: 12px !important; text-align: center !important; }
        .footer-bottom-links { flex-direction: column !important; gap: 8px !important; }
      }

      /* ── Scroll-to-top button ── */
      @media (max-width: 480px) {
        .scroll-top-btn { right: 12px !important; bottom: 16px !important; }
      }

      @media (prefers-reduced-motion: reduce) {
        .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
        .flip-face { transition: none !important; }
        * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
      }
    `}</style>
  );
}
 
// ─── Reveal-on-scroll wrapper ──────────────────────────────────────────────────
