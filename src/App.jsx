import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import logoImg from '../logo.png';
 
// ─── Theme tokens ───────────────────────────────────────────────────────────
const theme = {
  bg: '#F8FAFC',           // cool crisp slate-50 background
  bgAlt: '#F1F5F9',        // light cool slate-100
  primary: '#2563EB',      // professional blue-600
  primaryDark: '#1D4ED8',  // dark blue-700 hover
  peach: '#93C5FD',        // accent light blue
  tangerine: '#3B82F6',    // accent bright blue
  text: '#0F172A',         // deep cool navy slate-900
  textMuted: '#475569',    // cool muted slate-600
  border: '#E2E8F0',       // cool slate-200 divider
  surface: '#FFFFFF',      // pure white surface
  green: '#22C55E',        // vibrant green matching logo
};
 
// ─── Global keyframes (marquee, fade/slide reveal) ────────────────────────────
function GlobalAnimationStyles() {
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

      /* ── About sticky left column ── */
      .about-left {
        position: sticky;
        top: 100px;
        align-self: start;
        height: fit-content;
      }
      @media (max-width: 768px) {
        .about-left { position: static; }
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
          padding: 60px 24px 80px 24px !important;
        }
        .hero-h1 { font-size: 48px !important; }
        .hero-corner-circles { display: none !important; }
      }
      @media (max-width: 767px) {
        .hero-grid {
          padding: 48px 20px 64px 20px !important;
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
        .about-left-col { position: relative !important; top: auto !important; }
      }
      @media (max-width: 480px) {
        .about-h2 { font-size: 28px !important; }
        .about-stats { grid-template-columns: 1fr !important; gap: 24px !important; }
        .stat-value { font-size: 36px !important; }
        .about-section { padding: 64px 20px !important; overflow: hidden !important; }
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
          gap: 40px !important;
          align-items: flex-start !important;
        }
        .prefooter-h2 { font-size: clamp(36px, 7vw, 52px) !important; }
        .prefooter-right { max-width: 100% !important; width: 100% !important; }
      }
      @media (max-width: 480px) {
        .prefooter-inner { gap: 16px !important; }
        .prefooter-h2 { font-size: 30px !important; }
        .prefooter-section { padding: 40px 16px !important; }
        .prefooter-form { 
          flex-direction: column !important; 
          border-radius: 16px !important; 
          padding: 16px !important; 
          gap: 16px !important; 
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
function Reveal({ children, delay = 0, as: Tag = 'div', style = {}, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
 
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
 
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' reveal-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
 
// ─── Scroll Progress Circle ───────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
 
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  const size = 52;
  const stroke = 3;
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
 
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="scroll-top-btn"
      style={{
        position: 'fixed',
        right: 24,
        bottom: 32,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.6)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        boxShadow: '0 4px 18px rgba(42,41,38,0.12)',
        padding: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme.border}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme.primary}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      <ArrowUp size={18} color={theme.text} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
    </button>
  );
}
 
// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#000000',
        padding: '0',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          backgroundColor: '#000000',
          padding: '0 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            className="nav-logo"
            src={logoImg} 
            alt="Nexros Logo" 
            style={{ height: 48, width: 'auto', objectFit: 'contain' }} 
          />
        </div>
 
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-links">
          {['Home', 'Pages', 'Projects', 'Services', 'Blog'].map((item) => (
            <div
              key={item}
              style={{ display: 'flex', alignItems: 'center', gap: 3, cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#FFFFFF', transition: 'color 0.2s', userSelect: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#CCCCCC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            >
              {item}
              <ChevronDown size={13} strokeWidth={2.5} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="nav-auth">
          <button
            style={{
              padding: '10px 24px', backgroundColor: '#FFFFFF', color: '#000000',
              borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 700, letterSpacing: '0.6px', transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            SIGN IN
          </button>
        </div>
      </div>
    </nav>
  );
}
 
// ─── Hero Section (staggered load-in) ─────────────────────────────────────────
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);
 
  const fadeStep = (delay) => ({
    opacity: mounted ? 1 : 0,
    animation: mounted ? `heroFadeUp 0.8s cubic-bezier(0.22,0.68,0.32,1) ${delay}ms both` : 'none',
  });
 
  return (
    <div style={{ backgroundColor: theme.surface, paddingBottom: 180 }}>
      <section
        className="hero-grid"
        style={{ 
          maxWidth: 1440, 
          margin: '0 auto', 
          padding: '120px 64px 60px 64px', 
          display: 'grid', 
          gridTemplateColumns: '1fr 1.35fr', 
          gap: 56, 
          alignItems: 'start',
          alignContent: 'center',
          minHeight: '75vh',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 580 }}>
          <h1 className="hero-h1" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, color: theme.text, marginBottom: 24, letterSpacing: '-2px', ...fadeStep(0) }}>
            Why We Build<br />Different
          </h1>
          <p style={{ fontSize: 17, color: theme.textMuted, lineHeight: 1.7, marginBottom: 32, maxWidth: 540, fontWeight: 400, ...fadeStep(120) }}>
            We believe that every business deserves a website that works as hard as they do. That's why we've made it our mission to make advanced AI technology accessible, practical, and profitable for our clients.
          </p>
          <div style={fadeStep(240)}>
            <button
              style={{ padding: '14px 28px', backgroundColor: theme.primary, color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '1px', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(37,99,235,0.25)', minHeight: 44 }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.primaryDark; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              GET STARTED
            </button>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', ...fadeStep(180) }}>
          <div style={{ borderRadius: 36, overflow: 'hidden', height: 360, marginBottom: 20, boxShadow: '0 8px 40px rgba(42,41,38,0.1)' }}>
            <img src="/hero_team.png" alt="Team collaborating" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="hero-stat-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ backgroundColor: '#EAEFF6', borderRadius: 24, padding: '24px', display: 'flex', alignItems: 'center', ...fadeStep(300) }}>
              <p style={{ color: '#1E2B58', fontWeight: 500, fontSize: 16, lineHeight: 1.45 }}>
                "The AI platform revealed insights we never knew existed in our data."
              </p>
            </div>
            <div style={{ backgroundColor: '#E1EFEA', borderRadius: 24, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...fadeStep(380) }}>
              <span style={{ fontSize: 48, fontWeight: 700, color: '#115E59', lineHeight: 1, letterSpacing: '-1.5px' }}>36%</span>
              <p style={{ color: '#115E59', fontWeight: 500, fontSize: 16, marginTop: 8 }}>Connection rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
 
// ─── Logo Marquee ─────────────────────────────────────────────────────────────
const logos = [
  { name: 'Scribie', icon: '⊕' },
  { name: 'Streamwork', icon: '⬡' },
  { name: 'Starshift', icon: '▶' },
  { name: 'Snapicker', icon: '◆' },
  { name: 'Syntry.ai', icon: '◈' },
  { name: 'Skybridge', icon: '◇' },
  { name: 'Stackly', icon: '⊞' },
  { name: 'Simvex', icon: '◉' },
];

function FlipItem({ name, icon }) {
  const [hovered, setHovered] = useState(false);
  
  const content = (
    <>
      <span style={{ fontSize: 32 }}>{icon}</span>
      <span>{name}</span>
    </>
  );

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 36,
        fontWeight: 600,
        color: hovered ? theme.text : '#9CA3AF',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        height: 56, // Fixed height to clip sliding animation cleanly
        transition: 'color 0.4s ease',
        whiteSpace: 'nowrap',
        flexShrink: 0
      }}
    >
      <div style={{
        transform: hovered ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        {content}
      </div>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        transform: hovered ? 'translateY(0)' : 'translateY(100%)', // Start below and slide to 0
        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        {content}
      </div>
    </div>
  );
}

function LogoMarquee() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const offsetRef  = useRef(0);
  const rafRef     = useRef(null);
  const initializedRef = useRef(false);

  // Target speed driven by cursor; smoothed speed used in the loop
  const targetSpeedRef  = useRef(-0.8);   // negative = RTL (default)
  const smoothSpeedRef  = useRef(-0.8);
  const isHoveringRef   = useRef(false);
  const MAX_SPEED       = 1.5;            // magnitude at edges

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const track   = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    // ── Mouse move: map cursor X → target speed ──────────────────────────────
    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const relX  = e.clientX - rect.left;          // px from left edge
      const norm  = Math.min(Math.max(relX / rect.width, 0), 1); // 0–1

      // norm 0 → full RTL (−MAX_SPEED), 0.5 → 0, 1 → full LTR (+MAX_SPEED)
      targetSpeedRef.current = (norm - 0.5) * MAX_SPEED * 2;
      isHoveringRef.current  = true;
    };

    const onMouseLeave = () => {
      isHoveringRef.current  = false;
      // We do not reset the target speed here, so it continues in the last direction!
    };

    section.addEventListener('mousemove', onMouseMove, { passive: true });
    section.addEventListener('mouseleave', onMouseLeave);

    // ── RAF loop ──────────────────────────────────────────────────────────────
    const timer = setTimeout(() => {
      const loop = () => {
        // Low-pass filter: smooth speed toward target
        const lerpFactor = isHoveringRef.current ? 0.05 : 0.02;
        smoothSpeedRef.current += (targetSpeedRef.current - smoothSpeedRef.current) * lerpFactor;

        offsetRef.current += smoothSpeedRef.current;

        const loopWidth = track.children[0]?.offsetWidth || 0;
        if (loopWidth > 10) {
          if (!initializedRef.current) {
             offsetRef.current = -loopWidth;
             initializedRef.current = true;
          }
          // Seamless loop in both directions
          if (offsetRef.current <= -loopWidth * 2) offsetRef.current += loopWidth;
          if (offsetRef.current >= 0)  offsetRef.current -= loopWidth;
        }

        track.style.transform = `translateX(${offsetRef.current}px)`;
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }, 120);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="marquee-section"
      style={{ backgroundColor: theme.surface, padding: '36px 0', overflow: 'hidden' }}
    >
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <div ref={trackRef} style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: 'flex', gap: 72, paddingRight: 72, whiteSpace: 'nowrap', alignItems: 'center' }}>
              {logos.map((logo, idx) => (<FlipItem key={idx} name={logo.name} icon={logo.icon} />))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
// ─── About Section (sticky heading + scroll parallax) ─────────────────────────
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
 
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = null;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
 
  return { count, ref };
}
 
function StatItem({ value, label, suffix = '' }) {
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const prefix = value.match(/^\$/) ? '$' : '';
  const sfx = value.match(/[MBk+,]+$/) ? value.replace(/[0-9$]/g, '') : suffix;
  const { count, ref } = useCountUp(numericValue);
 
  return (
    <div ref={ref}>
      <div className="stat-value" style={{ fontSize: 56, fontWeight: 700, color: theme.tangerine, letterSpacing: '-2px', lineHeight: 1 }}>
        {prefix}{count.toLocaleString()}{sfx}
      </div>
      <p className="stat-label" style={{ color: '#CBD5E1', fontSize: 15, marginTop: 8, fontWeight: 400 }}>{label}</p>
    </div>
  );
}
 
// Drifts the sticky heading upward as the user scrolls through the section
function useSectionParallax(range = 120) {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
 
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
 
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const total = rect.height - window.innerHeight;
          const scrolled = -rect.top;
          const progress = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
          setOffset(-progress * range);
        }
        ticking = false;
      });
    };
 
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [range]);
 
  return { sectionRef, offset };
}
 
function AboutSection() {
  return (
    <section className="about-section" style={{ backgroundColor: '#111827', padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 100, alignItems: 'start' }}>
          <div className="about-left-col" style={{ position: 'sticky', top: 120, alignSelf: 'start', height: 'fit-content' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 12, height: 12, backgroundColor: '#F97316', borderRadius: 2 }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: '#F97316', textTransform: 'uppercase' }}>About Us</span>
            </div>
            <h2 className="about-h2" style={{ fontSize: 48, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 32 }}>About NGS</h2>
            <p style={{ fontSize: 15, color: '#9CA3AF', lineHeight: 1.7, maxWidth: 300 }}>Pioneering intelligent solutions that reshape how humans and AI work together.</p>
          </div>
          <div className="about-right-col">
            <p style={{ fontSize: 21, color: '#FFFFFF', fontWeight: 600, lineHeight: 1.6, marginBottom: 32 }}>We help individuals and businesses harness the power of artificial intelligence to automate tasks, boost productivity, and drive growth — from custom AI chatbots to intelligent data analysis.</p>
            <p style={{ fontSize: 16, color: '#9CA3AF', lineHeight: 1.8, marginBottom: 24 }}>At NGS, we create smart platforms that integrate AI into every facet of your organization. Our goal is straightforward: to enable individuals and businesses to utilize advanced AI solutions with ease — enhancing decision-making, and achieving operational excellence.</p>
            <p style={{ fontSize: 16, color: '#9CA3AF', lineHeight: 1.8, marginBottom: 72 }}>We believe that AI should enhance human skills rather than replace them. Our solutions connect robust AI technologies with the teams that utilize them, providing value, measurable outcomes, and ongoing growth.</p>
            <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, paddingTop: 48, borderTop: `1px solid rgba(255,255,255,0.1)` }}>
              <StatItem value="20M+" label="Hours saved" />
              <StatItem value="$1B+" label="Saved for customers" />
              <StatItem value="10,000+" label="Customers" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
// ─── Mission Section ──────────────────────────────────────────────────────────
function MissionSection() {
  return (
    <section className="mission-section" style={{ backgroundColor: theme.surface, padding: '100px 24px 80px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <Reveal style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <div style={{ width: 12, height: 12, backgroundColor: theme.green, borderRadius: 2 }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: theme.green, textTransform: 'uppercase' }}>Our Mission</span>
        </Reveal>
        <Reveal as="h2" delay={80} className="mission-h2" style={{ fontSize: 60, fontWeight: 700, color: theme.text, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 48, maxWidth: 1000 }}>
          Where AI Meets Action. The Team Turning Ideas Into Agents.
        </Reveal>
        <Reveal delay={160} className="mission-img" style={{ borderRadius: 32, overflow: 'hidden', width: '100%', height: 380, boxShadow: '0 20px 60px rgba(42,41,38,0.1)' }}>
          <img src="/mission_team.png" alt="Mission team" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        </Reveal>
        <Reveal delay={240} className="mission-below" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48, marginTop: 48, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 16, color: theme.textMuted, lineHeight: 1.8, maxWidth: 680, flex: '1 1 300px' }}>
            At Nexros, we create smart platforms that integrate AI into every facet of your organization. Our goal is straightforward: to enable individuals and businesses to utilize advanced AI solutions with ease — enhancing decision-making, and achieving operational excellence.
          </p>
          <div style={{ flexShrink: 0 }}>
            <button
              style={{ padding: '14px 32px', backgroundColor: theme.primary, color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '0.8px', transition: 'all 0.2s', minHeight: 44 }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.primaryDark; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.transform = 'translateY(0)'; }}
            >GET STARTED</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
 
// ─── Values Section ───────────────────────────────────────────────────────────
const values = [
  {
    icon: ShieldCheck,
    title: 'Transparency & Trust',
    desc: 'We believe in open, honest about our AI capabilities and limitations. Our users deserve to understand how our technology works, what data we use, and how we protect their privacy.',
    bg: '#FFFDE7',
  },
  {
    icon: Award,
    title: 'Human-Centered Innovation',
    desc: 'Technology should serve humanity. We design our AI solutions with real human needs at the center, ensuring our innovations enhance human capabilities rather than replace human judgment.',
    bg: theme.surface,
  },
  {
    icon: Database,
    title: 'Responsible AI Development',
    desc: "We're committed to developing AI that is safe, fair, and beneficial for all. This means rigorous testing, ethical guidelines in our development process, and ongoing monitoring of our systems' impact.",
    bg: '#FFF9C4',
  },
];
 
function ValuesSection() {
  return (
    <section className="values-section" style={{ backgroundColor: theme.surface, padding: '80px 24px 100px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {values.map(({ icon: Icon, title, desc, bg }, idx) => (
            <Reveal
              key={title}
              delay={idx * 120}
              style={{
                backgroundColor: bg,
                border: `1px solid ${theme.border}`,
                borderRadius: 28,
                padding: '48px 36px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.25s, box-shadow 0.25s, opacity 0.7s, transform 0.7s',
                cursor: 'default',
              }}
            >
              <div
                style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, boxShadow: '0 2px 12px rgba(42,41,38,0.06)', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08) rotate(-4deg)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
              >
                <Icon size={26} strokeWidth={1.5} color={theme.primary} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: theme.text, marginBottom: 16, lineHeight: 1.3 }}>{title}</h3>
              <p style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.7, fontWeight: 400 }}>{desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
 
// ─── Pre-Footer CTA ── "Start Now" with newsletter subscribe ─────────────────
function FooterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="prefooter-section" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#EBEBF2', padding: '100px 24px' }}>
      {/* ── Geometric mosaic decorations ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '25%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.03)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '15%', width: '20%', height: '60%', backgroundColor: 'rgba(15, 23, 42, 0.03)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '0', right: '10%', width: '30%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.02)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', right: '0', width: '15%', height: '60%', backgroundColor: 'rgba(15, 23, 42, 0.04)', pointerEvents: 'none' }} />

      <Reveal className="prefooter-inner" style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 60, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 280px' }}>
          <h2 className="prefooter-h2" style={{ fontSize: 52, fontWeight: 500, color: theme.text, letterSpacing: '-1.5px', lineHeight: 1.15, marginBottom: 0 }}>
            Start Now. Get Started<br />For Free
          </h2>
        </div>
        <div className="prefooter-right" style={{ flex: '1 1 400px', maxWidth: 520 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: theme.text, marginBottom: 16 }}>Subscribe to Our Newsletter!</p>
          {submitted ? (
            <div style={{ backgroundColor: '#FFFFFF', border: `1px solid ${theme.border}`, borderRadius: 16, padding: '24px 28px', color: theme.primary, fontSize: 16, fontWeight: 600 }}>🎉 Thank you! You're on the list.</div>
          ) : (
            <form onSubmit={handleSubmit} className="prefooter-form" style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: 16, padding: '8px 8px 8px 24px', boxShadow: '0 4px 20px rgba(15,23,42,0.05)' }}>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" required
                className="prefooter-input"
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, color: theme.text, backgroundColor: 'transparent', fontFamily: 'inherit', minHeight: 44 }}
              />
              <button
                type="submit"
                className="prefooter-btn"
                style={{ padding: '16px 32px', backgroundColor: theme.primary, color: '#FFFFFF', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '0.5px', whiteSpace: 'nowrap', transition: 'background 0.2s', minHeight: 44 }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.primaryDark)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.primary)}
              >SUBSCRIBE</button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
 
// ─── Investors Section — scroll-driven horizontal drift ──────────────────────
const investorsList = [
  { name: 'Contentful', icon: 'C' },
  { name: 'exabeam', icon: '≡' },
  { name: 'Airtable', icon: '⬡' },
  { name: 'mailchimp', icon: '◎' },
  { name: 'databricks', icon: '⬡' },
  { name: 'INTERCOM', icon: '▦' },
  { name: 'Notion', icon: '◻' },
  { name: 'Linear', icon: '◈' },
  { name: 'Vercel', icon: '▲' },
];

function InvestorRow({ items, reverse = false }) {
  const doubled = [...items, ...items];

  return (
    <div style={{ overflow: 'hidden', position: 'relative', marginBottom: 24, display: 'flex' }}>
      <div
        className="animate-marquee"
        style={{
          display: 'flex',
          gap: 24,
          width: 'max-content',
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((inv, idx) => (
          <div
            key={idx}
            className="investor-card"
            style={{
              flexShrink: 0,
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              filter: 'grayscale(100%)',
              opacity: 0.6,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'grayscale(0%)';
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'grayscale(100%)';
              e.currentTarget.style.opacity = '0.6';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span className="investor-icon" style={{ color: theme.textMuted, fontWeight: 700 }}>{inv.icon}</span>
            <span className="investor-name" style={{ fontWeight: 600, color: theme.textMuted, letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>{inv.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvestorsSection() {
  // Use more items per row to ensure seamless looping on wider screens
  const row1 = [...investorsList.slice(0, 5), ...investorsList.slice(5, 7)];
  const row2 = [...investorsList.slice(3, 8), ...investorsList.slice(0, 2)];
  const row3 = [...investorsList.slice(1, 6), ...investorsList.slice(7, 9)];

  return (
    <section style={{ backgroundColor: theme.bgAlt, padding: '96px 0 96px', overflow: 'hidden' }}>
      <div className="investors-heading" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px' }}>
        <Reveal style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <div style={{ width: 12, height: 12, backgroundColor: theme.green, borderRadius: 2 }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: theme.green, textTransform: 'uppercase' }}>Our Investors</span>
        </Reveal>
        <Reveal as="h2" delay={80} className="investors-h2" style={{ fontSize: 52, fontWeight: 700, color: theme.text, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 48 }}>Backed By The Best</Reveal>
      </div>
      <InvestorRow items={row1} />
      <InvestorRow items={row2} />
      <InvestorRow items={row3} />
    </section>
  );
}
 
// ─── Footer ───────────────────────────────────────────────────────────────────
const footerLinks = [
  { title: 'PRODUCT', links: ['How it works', 'Pricing', 'Integrations', 'Features'] },
  { title: 'RESOURCES', links: ['Blog', 'Events & Webinars', 'Partnerships', 'Press'] },
  { title: 'HELP & SUPPORT', links: ['Support', 'Sales', 'Security', 'Legal', 'Open Source'] },
  { title: 'COMPANY', links: ['About', 'Careers', 'Support', 'Partners', 'Contact Us'] },
];
 
function Footer() {
  const linkStyle = {
    display: 'block',
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 12,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.2s',
  };
 
  return (
    <footer style={{ background: 'linear-gradient(135deg, #102128 0%, #15323C 100%)', borderTop: 'none' }}>
      <div className="footer-grid" style={{ maxWidth: 1440, margin: '0 auto', padding: '72px 24px 48px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 80 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <img src={logoImg} alt="Logo" style={{ height: 44, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          </div>
          <p style={{ color: '#C7D2FE', fontSize: 18, fontWeight: 700, lineHeight: 1.4, marginBottom: 24, maxWidth: 200 }}>AI Solutions That Deliver Real Business Results</p>
          <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.8, marginBottom: 6 }}>475 Cherry Dr, Troy, Michigan<br />48083 United States</p>
          <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 28 }}>(248) 823-3200</p>
          <div style={{ display: 'flex', gap: 16 }}>
            {['𝕏', 'in', 'ig'].map((social) => (
              <div key={social} style={{ color: '#94A3B8', fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >{social}</div>
            ))}
          </div>
        </div>
        <div className="footer-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 1.2fr', gap: 32 }}>
          {footerLinks.map((col) => (
            <div key={col.title}>
              <p style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 700, letterSpacing: '1px', marginBottom: 20 }}>{col.title}</p>
              {col.links.map((link) => (
                <a key={link} href="#" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}>{link}</a>
              ))}
            </div>
          ))}
          <div>
            <p style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 700, letterSpacing: '1px', marginBottom: 20 }}>GET IN TOUCH</p>
            <a href="mailto:hello@company.com" style={{ ...linkStyle, color: '#94A3B8' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}>hello@company.com</a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px 24px' }}>
        <div className="footer-bottom" style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>©Copyright 2025, All Rights Reserved</p>
          <div className="footer-bottom-links" style={{ display: 'flex', gap: 32 }}>
            {['Terms and conditions', 'Privacy Policy'].map((item) => (
              <a key={item} href="#" style={{ color: '#94A3B8', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
 
// ─── App ──────────────────────────────────────────────────────────────────────
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
      <div style={{ position: 'relative', zIndex: 10, backgroundColor: theme.surface, marginBottom: footerHeight, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <Navbar />
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
