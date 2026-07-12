import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Layers, Zap } from 'lucide-react';
import Button from './Button';

const Navbar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    if (activePage !== 'landing') {
      setActivePage('landing');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Features',  id: 'features' },
    { label: 'Preview',   id: 'preview' },
    { label: 'Pricing',   id: 'pricing' },
    { label: 'FAQ',       id: 'faq' },
  ];

  const isWorkspace = activePage === 'workspace';

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(250,247,242,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid #E7E1D7' : '1px solid transparent',
      transition: 'all 280ms cubic-bezier(.25,1,.5,1)',
      padding: '0',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <button
          onClick={() => { setActivePage('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#C9A227',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={16} color="#FAF7F2" fill="#FAF7F2" />
          </div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: '1.2rem', color: '#1C1B1A',
            letterSpacing: '-0.3px',
          }}>SyncFlow</span>
        </button>

        {/* Desktop nav – hide inside workspace */}
        {!isWorkspace && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="sf-desktop-nav">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '7px 14px', borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem', color: '#706C64', fontWeight: 450,
                transition: 'color 200ms',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#1C1B1A'}
                onMouseLeave={e => e.currentTarget.style.color = '#706C64'}
              >{l.label}</button>
            ))}
          </nav>
        )}

        {/* CTA */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {isWorkspace ? (
            <Button variant="secondary"
              onClick={() => { setActivePage('landing'); window.scrollTo({ top: 0 }); }}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >← Back to Site</Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setActivePage('workspace')}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }} className="sf-desktop-nav"
              >Sign In</Button>
              <Button variant="primary" onClick={() => setActivePage('workspace')}
                icon={<ArrowRight size={14} />}
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >Launch App</Button>
            </>
          )}

          {/* Mobile hamburger */}
          {!isWorkspace && (
            <button onClick={() => setIsOpen(v => !v)} style={{
              display: 'none', background: 'none', border: 'none', cursor: 'pointer',
              color: '#1C1B1A',
            }} className="sf-hamburger">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && !isWorkspace && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              background: '#FFFFFF', borderBottom: '1px solid #E7E1D7',
              padding: '16px 24px 24px',
              display: 'flex', flexDirection: 'column', gap: 8,
              boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
            }}
          >
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 16px', borderRadius: 8, textAlign: 'left',
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem', color: '#1C1B1A',
              }}>{l.label}</button>
            ))}
            <Button variant="primary" onClick={() => { setActivePage('workspace'); setIsOpen(false); }}
              icon={<ArrowRight size={14} />} style={{ marginTop: 8 }}
            >Launch App</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .sf-desktop-nav { display: none !important; }
          .sf-hamburger { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
