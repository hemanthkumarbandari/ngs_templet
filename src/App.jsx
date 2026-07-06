import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import logoImg from '../logo.png';
 
// ─── Theme tokens ───────────────────────────────────────────────────────────
const theme = {
  bg: '#FBF7F0',          // base warm off-white
  bgAlt: '#F3EBDD',        // soft cream (section bg)
  primary: '#F4791C',      // primary orange (anchor — fixed)
  primaryDark: '#D6650F',  // primary hover/dark
  peach: '#FBC48B',        // accent peach
  tangerine: '#F79A4A',    // accent tangerine dot
  text: '#2A2926',         // charcoal — text primary
  textMuted: '#6B655C',    // muted text
  border: '#E4DACB',       // border/divider
  surface: '#FFFFFF',      // card surface
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
      }
      @media (max-width: 480px) {
        .nav-auth button { padding: 10px 14px !important; font-size: 12px !important; }
      }

      /* ── Hero section ── */
      @media (max-width: 1023px) {
        .hero-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
          min-height: unset !important;
          padding: 40px 20px 60px !important;
        }
        .hero-h1 { font-size: clamp(36px, 7vw, 56px) !important; }
        .hero-corner-circles { display: none !important; }
      }
      @media (max-width: 480px) {
        .hero-h1 { font-size: clamp(32px, 9vw, 44px) !important; letter-spacing: -1px !important; }
        .hero-grid { padding: 28px 16px 48px !important; }
        .hero-stat-cards { grid-template-columns: 1fr !important; }
      }

      /* ── About section ── */
      @media (max-width: 1023px) {
        .about-grid {
          grid-template-columns: 1fr !important;
          gap: 48px !important;
        }
        .about-h2 { font-size: clamp(32px, 5vw, 44px) !important; }
      }
      @media (max-width: 480px) {
        .about-h2 { font-size: 30px !important; }
        .about-stats { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        .stat-number { font-size: 40px !important; }
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
        .prefooter-h2 { font-size: 34px !important; }
        .prefooter-section { padding: 64px 16px !important; }
        .prefooter-form { flex-direction: column !important; border-radius: 14px !important; overflow: visible !important; }
        .prefooter-input { border-radius: 10px !important; }
        .prefooter-btn { border-radius: 10px !important; padding: 16px 24px !important; min-height: 44px; }
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
function Reveal({ children, delay = 0, as: Tag = 'div', style = {} }) {
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
      className={`reveal${visible ? ' reveal-visible' : ''}`}
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
        backgroundColor: 'transparent',
        padding: '14px 16px 8px 16px',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.9)' : theme.surface,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          border: `1px solid ${theme.border}`,
          borderRadius: 16,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          boxShadow: scrolled ? '0 4px 20px rgba(42,41,38,0.06)' : '0 1px 4px rgba(42,41,38,0.03)',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={logoImg} 
            alt="Nexros Logo" 
            style={{ height: 48, width: 'auto', objectFit: 'contain' }} 
          />
        </div>
 
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-links">
          {['Home', 'Pages', 'Projects', 'Services', 'Blog'].map((item) => (
            <div
              key={item}
              style={{ display: 'flex', alignItems: 'center', gap: 3, cursor: 'pointer', fontSize: 14, fontWeight: 500, color: theme.text, transition: 'color 0.2s', userSelect: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.text)}
            >
              {item}
              <ChevronDown size={13} strokeWidth={2.5} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="nav-auth">
          <button
            style={{
              padding: '10px 24px', backgroundColor: theme.text, color: '#fff',
              borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 700, letterSpacing: '0.6px', transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            SIGN IN
          </button>
          <button
            style={{ padding: '9px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '0.6px', color: theme.text, transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            SIGN UP
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
    <div style={{ backgroundColor: theme.surface }}>
      <section
        className="hero-grid"
        style={{ 
          maxWidth: 1440, 
          margin: '0 auto', 
          padding: '40px 24px', 
          display: 'grid', 
          gridTemplateColumns: '1fr 1.15fr', 
          gap: 64, 
          alignItems: 'center',
          minHeight: 'calc(100vh - 76px)',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="hero-h1" style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, color: theme.text, marginBottom: 24, letterSpacing: '-2px', ...fadeStep(0) }}>
            Why We Build<br />Different
          </h1>
          <p style={{ fontSize: 17, color: theme.textMuted, lineHeight: 1.7, marginBottom: 36, maxWidth: 480, fontWeight: 400, ...fadeStep(120) }}>
            We believe that every business deserves a website that works as hard as they do. That's why we've made it our mission to make advanced AI technology accessible, practical, and profitable for our clients.
          </p>
          <div style={fadeStep(240)}>
            <button
              style={{ padding: '14px 28px', backgroundColor: theme.primary, color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '1px', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(244,121,28,0.28)', minHeight: 44 }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.primaryDark; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              GET STARTED
            </button>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, ...fadeStep(180) }}>
          <div style={{ borderRadius: 36, overflow: 'hidden', height: 320, marginBottom: 20, boxShadow: '0 8px 40px rgba(42,41,38,0.1)' }}>
            <img src="/hero_team.png" alt="Team collaborating" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="hero-stat-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 28, padding: '28px 28px', display: 'flex', alignItems: 'center', ...fadeStep(300) }}>
              <p style={{ color: theme.text, fontWeight: 500, fontSize: 18, lineHeight: 1.45 }}>
                "The AI platform revealed insights we never knew existed in our data."
              </p>
            </div>
            <div style={{ backgroundColor: theme.peach, borderRadius: 28, padding: '28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...fadeStep(380) }}>
              <span style={{ fontSize: 60, fontWeight: 700, color: theme.primaryDark, lineHeight: 1, letterSpacing: '-2px' }}>36%</span>
              <p style={{ color: theme.text, fontWeight: 500, fontSize: 18, marginTop: 8 }}>Connection rate</p>
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
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 36,
        fontWeight: 600,
        color: hovered ? theme.text : '#9CA3AF',
        cursor: 'pointer',
        transform: hovered ? 'rotateX(-360deg)' : 'rotateX(0deg)',
        transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      <span style={{ fontSize: 32 }}>{icon}</span>
      {name}
    </div>
  );
}

function LogoMarquee() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const offsetRef  = useRef(0);
  const rafRef     = useRef(null);

  // Target speed driven by cursor; smoothed speed used in the loop
  const targetSpeedRef  = useRef(-0.6);   // negative = RTL (default)
  const smoothSpeedRef  = useRef(-0.6);
  const isHoveringRef   = useRef(false);
  const DEFAULT_SPEED   = -0.6;           // px/frame RTL
  const MAX_SPEED       = 2.0;            // magnitude at edges

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
      // We bias the idle side slightly so center still drifts a little RTL
      const bias = -0.15; // slight leftward bias at dead-center
      targetSpeedRef.current = (norm - 0.5) * MAX_SPEED * 2 + bias;
      isHoveringRef.current  = true;
    };

    const onMouseLeave = () => {
      isHoveringRef.current  = false;
      targetSpeedRef.current = DEFAULT_SPEED; // ease back to default RTL
    };

    section.addEventListener('mousemove', onMouseLeave); // reset on enter to section
    section.addEventListener('mousemove', onMouseMove, { passive: true });
    section.addEventListener('mouseleave', onMouseLeave);

    // ── RAF loop ──────────────────────────────────────────────────────────────
    const timer = setTimeout(() => {
      const loop = () => {
        // Low-pass filter: smooth speed toward target (0.08 = slow ease, feels premium)
        const lerpFactor = isHoveringRef.current ? 0.06 : 0.04;
        smoothSpeedRef.current += (targetSpeedRef.current - smoothSpeedRef.current) * lerpFactor;

        offsetRef.current += smoothSpeedRef.current;

        const halfW = track.scrollWidth / 2;
        if (halfW > 10) {
          // Seamless loop in both directions
          if (offsetRef.current <= -halfW) offsetRef.current += halfW;
          if (offsetRef.current >= halfW)  offsetRef.current -= halfW;
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

  const doubled = [...logos, ...logos];

  return (
    <section
      ref={sectionRef}
      className="marquee-section"
      style={{ backgroundColor: theme.surface, padding: '36px 0', overflow: 'hidden', cursor: 'none' }}
    >
      {/* Marquee strip */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: 72, whiteSpace: 'nowrap', willChange: 'transform', alignItems: 'center' }}>
          {doubled.map((logo, idx) => (<FlipItem key={idx} name={logo.name} icon={logo.icon} />))}
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
      <div style={{ fontSize: 56, fontWeight: 700, color: theme.primary, letterSpacing: '-2px', lineHeight: 1 }}>
        {prefix}{count.toLocaleString()}{sfx}
      </div>
      <p style={{ color: theme.textMuted, fontSize: 15, marginTop: 8, fontWeight: 400 }}>{label}</p>
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
    <section style={{ backgroundColor: theme.bgAlt, padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 100, alignItems: 'start' }}>
          <div className="about-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 12, height: 12, backgroundColor: theme.primary, borderRadius: 2 }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: theme.primary, textTransform: 'uppercase' }}>About Us</span>
            </div>
            <h2 className="about-h2" style={{ fontSize: 48, fontWeight: 700, color: theme.text, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 32 }}>About Nexros</h2>
            <p style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.7, maxWidth: 300 }}>Pioneering intelligent solutions that reshape how humans and AI work together.</p>
          </div>
          <div>
            <Reveal as="p" style={{ fontSize: 21, color: theme.text, fontWeight: 600, lineHeight: 1.6, marginBottom: 32 }}>We help individuals and businesses harness the power of artificial intelligence to automate tasks, boost productivity, and drive growth — from custom AI chatbots to intelligent data analysis.</Reveal>
            <Reveal as="p" delay={80} style={{ fontSize: 16, color: theme.textMuted, lineHeight: 1.8, marginBottom: 24 }}>At Nexros, we create smart platforms that integrate AI into every facet of your organization. Our goal is straightforward: to enable individuals and businesses to utilize advanced AI solutions with ease — enhancing decision-making, and achieving operational excellence.</Reveal>
            <Reveal as="p" delay={160} style={{ fontSize: 16, color: theme.textMuted, lineHeight: 1.8, marginBottom: 72 }}>We believe that AI should enhance human skills rather than replace them. Our solutions connect robust AI technologies with the teams that utilize them, providing value, measurable outcomes, and ongoing growth.</Reveal>
            <Reveal delay={100} className="about-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, paddingTop: 48, borderTop: `1px solid ${theme.border}` }}>
              <StatItem value="20M+" label="Hours saved" />
              <StatItem value="$1B+" label="Saved for customers" />
              <StatItem value="10,000+" label="Nexros customers" />
            </Reveal>
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
          <div style={{ width: 12, height: 12, backgroundColor: theme.primary, borderRadius: 2 }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: theme.primary, textTransform: 'uppercase' }}>Our Mission</span>
        </Reveal>
        <Reveal as="h2" delay={80} className="mission-h2" style={{ fontSize: 60, fontWeight: 700, color: theme.text, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 48, maxWidth: 820 }}>
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
              style={{ padding: '14px 32px', backgroundColor: theme.text, color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '0.8px', transition: 'opacity 0.2s, transform 0.2s', minHeight: 44 }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
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
    bg: '#FFF3E6',
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
    bg: '#FDEBD9',
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
    <section className="prefooter-section" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#2A2926', padding: '100px 24px' }}>
      {/* ── Floating circle decorations (theme-matched, proper visible lite colors with CSS animation) ── */}
      {/* Large light orange circle — top-left */}
      <div className="float-circle-1" style={{ position: 'absolute', top: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(244,121,28,0.25) 0%, rgba(251,196,139,0.1) 100%)', border: '1px solid rgba(251,196,139,0.25)', boxShadow: '0 8px 32px rgba(244,121,28,0.08)', pointerEvents: 'none' }} />
      {/* Medium light peach circle — bottom-right */}
      <div className="float-circle-2" style={{ position: 'absolute', bottom: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(251,196,139,0.2) 0%, rgba(251,247,240,0.08) 100%)', border: '1px solid rgba(251,247,240,0.18)', boxShadow: '0 8px 24px rgba(251,196,139,0.06)', pointerEvents: 'none' }} />
      {/* Small light cream circle — top-right mid */}
      <div className="float-circle-3" style={{ position: 'absolute', top: 30, right: '28%', width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(251,247,240,0.18) 0%, rgba(243,235,221,0.05) 100%)', border: '1px solid rgba(251,247,240,0.15)', boxShadow: '0 6px 20px rgba(251,247,240,0.05)', pointerEvents: 'none' }} />
      {/* Solid-ish peach accent circle — bottom-left mid */}
      <div className="float-circle-4" style={{ position: 'absolute', bottom: 40, left: '20%', width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(251,196,139,0.3) 0%, rgba(244,121,28,0.15) 100%)', border: '1px solid rgba(251,196,139,0.2)', pointerEvents: 'none' }} />
      {/* Solid-ish cream accent circle — top mid */}
      <div className="float-circle-5" style={{ position: 'absolute', top: 25, left: '42%', width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(251,247,240,0.22) 0%, rgba(251,196,139,0.1) 100%)', border: '1px solid rgba(251,247,240,0.15)', pointerEvents: 'none' }} />

      <Reveal className="prefooter-inner" style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 60, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 280px' }}>
          <h2 className="prefooter-h2" style={{ fontSize: 56, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-2px', lineHeight: 1.08, marginBottom: 0 }}>
            Start Now.<br />Get Started<br />For Free
          </h2>
        </div>
        <div className="prefooter-right" style={{ flex: '1 1 360px', maxWidth: 480 }}>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '2px', color: theme.primary, textTransform: 'uppercase', marginBottom: 20 }}>Subscribe to Our Newsletter!</p>
          {submitted ? (
            <div style={{ backgroundColor: 'rgba(244,121,28,0.12)', border: `1px solid rgba(244,121,28,0.3)`, borderRadius: 16, padding: '24px 28px', color: theme.peach, fontSize: 16, fontWeight: 600 }}>🎉 Thank you! You're on the list.</div>
          ) : (
            <form onSubmit={handleSubmit} className="prefooter-form" style={{ display: 'flex', gap: 0, borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" required
                className="prefooter-input"
                style={{ flex: 1, padding: '18px 24px', border: 'none', outline: 'none', fontSize: 15, color: theme.text, backgroundColor: '#FFFFFF', fontFamily: 'inherit', minHeight: 44 }}
              />
              <button
                type="submit"
                className="prefooter-btn"
                style={{ padding: '18px 28px', backgroundColor: theme.text, color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 800, letterSpacing: '1px', whiteSpace: 'nowrap', transition: 'background 0.2s', minHeight: 44 }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.text)}
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

function InvestorRow({ items }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);
  const doubled = [...items, ...items];

  // Default idle speed (negative = RTL)
  const DEFAULT_SPEED = -0.4;
  const targetSpeedRef = useRef(DEFAULT_SPEED);
  const smoothSpeedRef = useRef(DEFAULT_SPEED);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    if (reduceMotion) return;

    // Listen to mousemove event broadcast from section parent
    const onInvestorMouseMove = (e) => {
      isHoveredRef.current = true;
      const deltaX = e.detail.deltaX;
      // deltaX > 0 (moving right) -> positive target speed (LTR)
      // deltaX < 0 (moving left) -> negative target speed (RTL)
      targetSpeedRef.current = deltaX * 0.15; // Sensitivity scale
    };

    const onInvestorMouseLeave = () => {
      isHoveredRef.current = false;
    };

    const onInvestorWheel = (e) => {
      isHoveredRef.current = true;
      // deltaY > 0 (scroll down) -> negative target speed (RTL)
      // deltaY < 0 (scroll up) -> positive target speed (LTR)
      targetSpeedRef.current = -e.detail.deltaY * 0.05;
    };

    container.addEventListener('investor-mousemove', onInvestorMouseMove);
    container.addEventListener('investor-mouseleave', onInvestorMouseLeave);
    container.addEventListener('investor-wheel', onInvestorWheel);

    const loop = () => {
      if (isHoveredRef.current) {
        // Slowly decay back to the default RTL idle drift speed if mouse stops
        targetSpeedRef.current += (DEFAULT_SPEED - targetSpeedRef.current) * 0.06;
      } else {
        targetSpeedRef.current = DEFAULT_SPEED;
      }

      // Smoothly interpolate current speed to target speed
      smoothSpeedRef.current += (targetSpeedRef.current - smoothSpeedRef.current) * 0.08;

      offsetRef.current += smoothSpeedRef.current;

      const halfW = track.scrollWidth / 2;
      if (halfW > 10) {
        // Wrap translation limits to loop infinitely
        if (offsetRef.current <= -halfW) offsetRef.current += halfW;
        if (offsetRef.current >= 0) offsetRef.current -= halfW;
      }

      track.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener('investor-mousemove', onInvestorMouseMove);
      container.removeEventListener('investor-mouseleave', onInvestorMouseLeave);
      container.removeEventListener('investor-wheel', onInvestorWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-investor-row
      style={{ overflow: 'hidden', position: 'relative', marginBottom: 16 }}
    >
      <div
        ref={trackRef}
        style={{ display: 'flex', gap: 16, willChange: 'transform', alignItems: 'stretch' }}
      >
        {doubled.map((inv, idx) => (
          <div
            key={idx}
            className="investor-card"
            style={{ flexShrink: 0, width: 220, backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 20, padding: '36px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'box-shadow 0.25s, transform 0.25s', cursor: 'default' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(42,41,38,0.08)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: 20, color: theme.textMuted, fontWeight: 700 }}>{inv.icon}</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: theme.textMuted, letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>{inv.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvestorsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    let lastX = null;

    const onMouseMove = (e) => {
      if (lastX !== null) {
        const deltaX = e.clientX - lastX;
        section.querySelectorAll('[data-investor-row]').forEach((el) => {
          el.dispatchEvent(new CustomEvent('investor-mousemove', { detail: { deltaX } }));
        });
      }
      lastX = e.clientX;
    };

    const onMouseLeave = () => {
      lastX = null;
      section.querySelectorAll('[data-investor-row]').forEach((el) => {
        el.dispatchEvent(new CustomEvent('investor-mouseleave'));
      });
    };

    const onWheel = (e) => {
      section.querySelectorAll('[data-investor-row]').forEach((el) => {
        el.dispatchEvent(new CustomEvent('investor-wheel', { detail: { deltaY: e.deltaY } }));
      });
    };

    section.addEventListener('mousemove', onMouseMove, { passive: true });
    section.addEventListener('mouseleave', onMouseLeave);
    section.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      section.removeEventListener('wheel', onWheel);
    };
  }, []);

  const row1 = investorsList.slice(0, 5);
  const row2 = investorsList.slice(3, 8);
  const row3 = investorsList.slice(1, 6);

  return (
    <section ref={sectionRef} style={{ backgroundColor: theme.bgAlt, padding: '96px 0 96px' }}>
      <div className="investors-heading" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px' }}>
        <Reveal style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <div style={{ width: 12, height: 12, backgroundColor: theme.primary, borderRadius: 2 }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: theme.primary, textTransform: 'uppercase' }}>Our Investors</span>
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
    color: theme.textMuted,
    fontSize: 14,
    marginBottom: 12,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.2s',
  };
 
  return (
    <footer style={{ backgroundColor: theme.bg, borderTop: `1px solid ${theme.border}` }}>
      <div className="footer-grid" style={{ maxWidth: 1440, margin: '0 auto', padding: '72px 24px 48px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 80 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <img src={logoImg} alt="Logo" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
          </div>
          <p style={{ color: theme.text, fontSize: 18, fontWeight: 700, lineHeight: 1.4, marginBottom: 24, maxWidth: 200 }}>AI Solutions That Deliver Real Business Results</p>
          <p style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.8, marginBottom: 6 }}>475 Cherry Dr, Troy, Michigan<br />48083 United States</p>
          <p style={{ color: theme.textMuted, fontSize: 13, marginBottom: 28 }}>(248) 823-3200</p>
          <div style={{ display: 'flex', gap: 12 }}>
            {['f', 'in', 'X'].map((social) => (
              <div key={social} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMuted, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textMuted; }}
              >{social}</div>
            ))}
          </div>
        </div>
        <div className="footer-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 1.2fr', gap: 32 }}>
          {footerLinks.map((col) => (
            <div key={col.title}>
              <p style={{ color: theme.text, fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', marginBottom: 20 }}>{col.title}</p>
              {col.links.map((link) => (
                <a key={link} href="#" style={linkStyle} onMouseEnter={(e) => (e.currentTarget.style.color = theme.primary)} onMouseLeave={(e) => (e.currentTarget.style.color = theme.textMuted)}>{link}</a>
              ))}
            </div>
          ))}
          <div>
            <p style={{ color: theme.text, fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', marginBottom: 20 }}>GET IN TOUCH</p>
            <a href="mailto:hello@company.com" style={{ ...linkStyle, color: theme.textMuted }} onMouseEnter={(e) => (e.currentTarget.style.color = theme.primary)} onMouseLeave={(e) => (e.currentTarget.style.color = theme.textMuted)}>hello@company.com</a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${theme.border}`, padding: '20px 24px' }}>
        <div className="footer-bottom" style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ color: theme.textMuted, fontSize: 13 }}>©Copyright 2025, All Rights Reserved</p>
          <div className="footer-bottom-links" style={{ display: 'flex', gap: 32 }}>
            {['Terms and conditions', 'Privacy Policy'].map((item) => (
              <a key={item} href="#" style={{ color: theme.textMuted, fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = theme.primary)} onMouseLeave={(e) => (e.currentTarget.style.color = theme.textMuted)}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
 
// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ minHeight: '100vh', overflowX: 'clip' }}>
      <GlobalAnimationStyles />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <LogoMarquee />
      <ValuesSection />
      <InvestorsSection />
      <FooterCTA />
      <Footer />
      <ScrollProgress />
    </div>
  );
}
