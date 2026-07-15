import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
import { GlobalAnimationStyles } from './GlobalAnimationStyles';
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
 
// (useSectionParallax removed — sticky left column uses CSS position:sticky,
// no JS parallax needed. See .about-left-col in GlobalAnimationStyles.)
 
export function AboutSection() {
  return (
    /*
     * STICKY LEFT COLUMN — CSS position:sticky (no JS needed)
     * Phase 1: Left col scrolls normally until top:120px from viewport top
     * Phase 2: Left col locks in place while right col scrolls past (paragraphs → stats)
     * Phase 3: When section bottom reaches sticky col bottom, it releases and scrolls away
     * Mobile (<768px): sticky disabled, columns stack normally
     */
    <section
      className="about-section"
      style={{
        backgroundColor: '#0D2830',
        /* Generous vertical padding creates the scroll distance for sticky to be visible.
           Top padding = section entry breathing room.
           Bottom padding = keeps sticky alive until stats row passes the heading. */
        padding: '140px 24px 160px',
        position: 'relative',
        /* NO overflow:hidden — would break position:sticky on children */
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: 100,
            /* alignItems:start is REQUIRED for sticky to work — do not use 'center' or 'stretch' */
            alignItems: 'start',
          }}
        >
          {/* ── LEFT COLUMN — sticky via CSS class .about-left-col ── */}
          <div className="about-left-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 12, height: 12, backgroundColor: theme.green, borderRadius: 2 }} />
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '2px',
                color: theme.green,
                textTransform: 'uppercase',
              }}>Our Studio</span>
            </div>
            <h2
              className="about-h2"
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-1.5px',
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >About BuildHive</h2>
          </div>

          {/* ── RIGHT COLUMN — naturally taller → drives the sticky effect ── */}
          <div className="about-right-col">
            {/* Intro paragraph — larger type */}
            <p style={{
              fontSize: 21,
              color: '#FFFFFF',
              fontWeight: 600,
              lineHeight: 1.65,
              marginBottom: 48,
            }}>
              We build professional websites, live dashboards, and high-performance apps that elevate your brand. We are a freelance studio obsessed with craft, speed, and pushing the web to its limits.
            </p>

            {/* Body paragraph 1 */}
            <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7, marginBottom: 24, fontWeight: 400 }}>
              At BuildHive, we engineer bespoke digital experiences that don't just look stunning, but perform flawlessly.
            </p>

            {/* Body paragraph 2 */}
            <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7, marginBottom: 80, fontWeight: 400 }}>
              As a dedicated freelance studio, we obsess over craft, speed, and producing measurable results for our clients.
            </p>

            {/* Stats row — scrolls into view while heading stays locked */}
            <div
              className="about-stats"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 40,
                paddingTop: 52,
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <StatItem value="50+" label="Projects completed" />
              <StatItem value="$12M" label="Client revenue generated" />
              <StatItem value="2,500" label="Hours saved" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
// ─── Mission Section ──────────────────────────────────────────────────────────
