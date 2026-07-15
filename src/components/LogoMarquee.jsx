import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';

const logos = [
  { name: 'Acme Corp', icon: '⊕' },
  { name: 'TechFlow', icon: '⬡' },
  { name: 'Nexus', icon: '▶' },
  { name: 'Vanguard', icon: '◆' },
  { name: 'Synergy', icon: '◈' },
  { name: 'Zenith', icon: '◇' },
  { name: 'Apex', icon: '⊞' },
  { name: 'Quantum', icon: '◉' },
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

export function LogoMarquee() {
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
