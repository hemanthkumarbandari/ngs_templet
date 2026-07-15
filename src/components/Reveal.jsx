import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ShieldCheck, Award, Database, ArrowUp } from 'lucide-react';
import { theme } from '../theme';
import logoImg from '../../logo.png';
export function Reveal({ children, delay = 0, as: Tag = 'div', style = {}, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
 
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
 
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' reveal-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
 
// ─── Scroll Progress Circle ───────────────────────────────────────────────────
