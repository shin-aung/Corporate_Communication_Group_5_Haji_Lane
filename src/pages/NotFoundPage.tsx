import React from 'react';

const NotFoundPage: React.FC = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#3A0F0D',
      color: '#FFFEF8',
      textAlign: 'center',
      padding: 24,
    }}
  >
    <p style={{ fontSize: 80, marginBottom: 16 }}>🔍</p>
    <h1
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 48,
        fontWeight: 900,
        color: '#A44B2A',
        marginBottom: 12,
      }}
    >
      404
    </h1>
    <p style={{ fontSize: 18, color: 'rgba(246,240,232,0.7)', marginBottom: 32 }}>
      This page doesn't exist.
    </p>
    <a
      href="/"
      style={{
        background: '#A44B2A',
        color: '#FFFEF8',
        padding: '12px 28px',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 14,
        fontFamily: 'var(--font-sans)',
      }}
    >
      ← Back to The Loop
    </a>
  </div>
);

export default NotFoundPage;
