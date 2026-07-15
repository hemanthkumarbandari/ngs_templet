import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
import { Navbar } from './Navbar';
export function ScrollProgress() {
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
