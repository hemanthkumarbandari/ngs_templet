import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
import { Reveal } from './Reveal';
const footerLinks = [
  { title: 'CRAFT', links: ['Web Apps', 'Digital Products', 'Dashboards', 'E-Commerce'] },
  { title: 'THE PROOF', links: ['Case Studies', 'Testimonials', 'Awards', 'Performance'] },
  { title: 'THE EDGE', links: ['Tech Stack', 'Design System', 'Speed', 'SEO'] },
  { title: 'CONTACT', links: ['Start Project', 'Careers', 'Twitter', 'LinkedIn'] },
];
 

export function Footer() {
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
            <span style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px', textDecoration: 'underline', textDecorationColor: theme.primary, textDecorationThickness: '3px', textUnderlineOffset: '4px' }}>
              BuildHive
            </span>
          </div>
          <p style={{ color: '#C7D2FE', fontSize: 18, fontWeight: 700, lineHeight: 1.4, marginBottom: 24, maxWidth: 220 }}>Professional Websites & High-Performance Apps</p>
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
          <p style={{ color: '#94A3B8', fontSize: 13 }}>© 2024 BuildHive. All Rights Reserved</p>
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
