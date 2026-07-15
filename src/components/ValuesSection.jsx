import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
import { Footer } from './Footer';
import { Reveal } from './Reveal';
const values = [
  {
    icon: ShieldCheck,
    title: 'Obsessive Craftsmanship',
    desc: 'We believe that every pixel and line of code matters. We meticulously craft high-performance apps that look stunning and feel instantaneous.',
    bg: '#EFF6FF',   // soft blue-50
  },
  {
    icon: Award,
    title: 'Performance Without Compromise',
    desc: 'As we push the boundaries of modern web development, we never sacrifice speed. We build live dashboards and digital products that run flawlessly across devices.',
    bg: '#FFFFFF',   // white
  },
  {
    icon: Database,
    title: 'Partnering for Impact',
    desc: 'We act as an extension of your team. We work side by side with you to elevate your brand through exceptional digital experiences.',
    bg: '#EFF6FF',   // soft blue-50 (matching card 1)
  },
];
 

export function ValuesSection() {
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
