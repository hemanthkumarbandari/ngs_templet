import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
import { Footer } from './Footer';
import { Reveal } from './Reveal';
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

const investorsList = [
  { name: 'Sequoia', icon: 'C' },
  { name: 'Andreessen', icon: '≡' },
  { name: 'Lightspeed', icon: '⬡' },
  { name: 'Index', icon: '◎' },
  { name: 'Benchmark', icon: '⬡' },
  { name: 'Founders Fund', icon: '▦' },
  { name: 'Greylock', icon: '◻' },
  { name: 'Accel', icon: '◈' },
  { name: 'Bessemer', icon: '▲' },
];


export function InvestorsSection() {
  // Use more items per row to ensure seamless looping on wider screens
  const row1 = [...investorsList.slice(0, 5), ...investorsList.slice(5, 7)];
  const row2 = [...investorsList.slice(3, 8), ...investorsList.slice(0, 2)];
  const row3 = [...investorsList.slice(1, 6), ...investorsList.slice(7, 9)];

  return (
    <section style={{ backgroundColor: theme.bgAlt, padding: '96px 0 96px', overflow: 'hidden' }}>
      <div className="investors-heading" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px' }}>
        <Reveal style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <div style={{ width: 12, height: 12, backgroundColor: theme.green, borderRadius: 2 }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: theme.green, textTransform: 'uppercase' }}>Our Partners</span>
        </Reveal>
        <Reveal as="h2" delay={80} className="investors-h2" style={{ fontSize: 52, fontWeight: 700, color: theme.text, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 48 }}>Trusted By Visionaries</Reveal>
      </div>
      <InvestorRow items={row1} />
      <InvestorRow items={row2} />
      <InvestorRow items={row3} />
    </section>
  );
}
 
// ─── Footer ───────────────────────────────────────────────────────────────────
