import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const HERO_THRESHOLD = 80; // px — below this, never hide

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY.current;

      setScrolled(currentY > 20);

      if (currentY <= HERO_THRESHOLD) {
        // Always visible at top of page
        setHidden(false);
      } else if (scrollingDown) {
        // Scrolling down past hero → hide
        setHidden(true);
      } else {
        // Scrolling up → show
        setHidden(false);
      }

      lastY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: '#000000',
        padding: '0',
        /* Slide up on hide, slide down on show */
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px', textDecoration: 'underline', textDecorationColor: theme.primary, textDecorationThickness: '3px', textUnderlineOffset: '4px' }}>
            BuildHive
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-links">
          {['Craft', 'The Proof', 'The Edge', 'Contact'].map((item) => (
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
