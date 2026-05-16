import React from 'react';
import { siteMeta } from '../../data/siteMeta';

export const Footer: React.FC = () => (
  <footer
    style={{
      background: '#3A0F0D',
      borderTop: '1px solid rgba(164,75,42,0.3)',
      padding: '40px 24px',
    }}
  >
    <div
      style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          color: '#FFFEF8',
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 8,
          fontFamily: 'var(--font-serif)',
        }}
      >
        THE LOOP <span style={{ color: '#A44B2A' }}>BY 5</span>
      </p>
      <p style={{ color: 'rgba(246,240,232,0.5)', fontSize: 13, marginBottom: 16 }}>
        {siteMeta.group} · {siteMeta.module} · {siteMeta.college}
      </p>
      <p style={{ color: 'rgba(246,240,232,0.35)', fontSize: 12, marginBottom: 12 }}>
        Documented by: {siteMeta.documentedBy.join(' · ')}
      </p>
      <p style={{ color: 'rgba(246,240,232,0.25)', fontSize: 11 }}>
        © 2026 PGDM Group 5 · AceTek College Singapore · All rights reserved
      </p>
    </div>
  </footer>
);
