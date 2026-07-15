import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
import { Reveal } from './Reveal';
export function MissionSection() {
  return (
    <section className="mission-section" style={{ backgroundColor: theme.surface, padding: '100px 24px 80px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <Reveal style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <div style={{ width: 12, height: 12, backgroundColor: theme.green, borderRadius: 2 }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: theme.green, textTransform: 'uppercase' }}>Our Focus</span>
        </Reveal>
        <Reveal as="h2" delay={80} className="mission-h2" style={{ fontSize: 60, fontWeight: 700, color: theme.text, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 48, maxWidth: 1000 }}>
          Where Craft Meets Performance.
        </Reveal>
        <Reveal delay={160} className="mission-img" style={{ borderRadius: 32, overflow: 'hidden', width: '100%', height: 380, boxShadow: '0 20px 60px rgba(42,41,38,0.1)' }}>
          <img src="/mission_team.png" alt="Mission team" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        </Reveal>
        <Reveal delay={240} className="mission-below" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48, marginTop: 48, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 16, color: theme.textMuted, lineHeight: 1.8, maxWidth: 680, flex: '1 1 300px' }}>
            At BuildHive, we build bespoke digital experiences. Our goal is straightforward: to deliver professional websites, live dashboards, and high-performance apps that elevate your brand and push the boundaries of what's possible on the web.
          </p>
          <div style={{ flexShrink: 0 }}>
            <button
              style={{ padding: '14px 32px', backgroundColor: theme.primary, color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '0.8px', transition: 'all 0.2s', minHeight: 44 }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.primaryDark; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.transform = 'translateY(0)'; }}
            >START A PROJECT</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
 
// ─── Values Section ───────────────────────────────────────────────────────────
