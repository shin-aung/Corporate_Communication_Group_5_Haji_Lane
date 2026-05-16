import React, { useEffect, useState } from 'react';

export const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        width: 44,
        height: 44,
        background: '#A44B2A',
        border: 'none',
        borderRadius: '50%',
        color: '#FFFEF8',
        fontSize: 18,
        cursor: 'pointer',
        zIndex: 99,
        boxShadow: '0 4px 20px rgba(164,75,42,0.5)',
        transition: 'transform 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'none';
      }}
    >
      ↑
    </button>
  );
};
