import React, { useEffect, useState } from 'react';

interface NavLink {
  id: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Story' },
  { id: 'programme', label: 'Programme' },
  { id: 'about', label: 'Team' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'videos', label: 'Videos' },
  { id: 'links', label: 'Links' },
  { id: 'subscribe', label: 'Subscribe' },
];

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(58,15,13,0.95)' : '#3A0F0D',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(164,75,42,0.3)',
        transition: 'background 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          style={{ background: 'none', border: 'none', padding: 0 }}
          aria-label="Go to top"
        >
          <span
            style={{
              color: '#FFFEF8',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 1,
              fontFamily: 'var(--font-serif)',
            }}
          >
            THE LOOP{' '}
            <span style={{ color: '#A44B2A' }}>BY 5</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          style={{ display: 'flex', gap: 4, alignItems: 'center' }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              aria-current={active === link.id ? 'page' : undefined}
              style={{
                background: active === link.id ? 'rgba(164,75,42,0.25)' : 'none',
                border: 'none',
                color:
                  active === link.id ? '#C96A3A' : 'rgba(246,240,232,0.75)',
                fontSize: 13,
                fontWeight: 500,
                padding: '6px 14px',
                borderRadius: 6,
                letterSpacing: 0.3,
                transition: 'all 0.2s',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFEF8',
            padding: 8,
            display: 'none',
          }}
          className="hamburger-btn"
        >
          <div style={{ width: 22, height: 2, background: 'currentColor', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 16, height: 2, background: 'currentColor', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: 'currentColor', borderRadius: 2 }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            background: '#3A0F0D',
            borderTop: '1px solid rgba(164,75,42,0.2)',
            padding: '12px 24px 20px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: 'rgba(246,240,232,0.85)',
                fontSize: 15,
                padding: '10px 0',
                borderBottom: '1px solid rgba(164,75,42,0.15)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
};
