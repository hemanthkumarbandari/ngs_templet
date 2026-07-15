import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
export function HeroSection() {
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
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 580 }}>
          <h1 className="hero-h1" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, color: theme.text, marginBottom: 24, letterSpacing: '-2px', ...fadeStep(0) }}>
            High-End Apps<br />& Websites
          </h1>
          <p style={{ fontSize: 17, color: theme.textMuted, lineHeight: 1.7, marginBottom: 32, maxWidth: 540, fontWeight: 400, ...fadeStep(120) }}>
            We build professional websites, live dashboards, and high-performance apps that elevate your brand. We are a freelance studio obsessed with craft, speed, and pushing the web to its limits.
          </p>
          <div style={fadeStep(240)}>
            <button
              style={{ padding: '14px 28px', backgroundColor: theme.primary, color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '1px', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(37,99,235,0.25)', minHeight: 44 }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.primaryDark; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              START A PROJECT
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
                "BuildHive delivered our analytics dashboard flawlessly, exceeding all performance expectations."
              </p>
            </div>
            <div style={{ backgroundColor: '#E1EFEA', borderRadius: 24, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...fadeStep(380) }}>
              <span style={{ fontSize: 48, fontWeight: 700, color: '#115E59', lineHeight: 1, letterSpacing: '-1.5px' }}>45%</span>
              <p style={{ color: '#115E59', fontWeight: 500, fontSize: 16, marginTop: 8 }}>Increase in conversions</p>
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

