import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
import { Footer } from './Footer';
import { Reveal } from './Reveal';
export function FooterCTA() {
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
            Elevate Your<br />Digital Presence.
          </h2>
        </div>
        <div className="prefooter-right" style={{ flex: '1 1 400px', maxWidth: 520 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: theme.text, marginBottom: 16 }}>Join our newsletter for the latest on web performance and digital products.</p>
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
