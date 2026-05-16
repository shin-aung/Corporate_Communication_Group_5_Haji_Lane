import React from 'react';

interface SectionBadgeProps {
  label: string;
  dark?: boolean;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ label, dark = false }) => (
  <div
    style={{
      display: 'inline-block',
      background: dark ? 'rgba(164,75,42,0.2)' : 'rgba(164,75,42,0.1)',
      border: `1px solid ${dark ? 'rgba(164,75,42,0.5)' : 'rgba(164,75,42,0.35)'}`,
      borderRadius: 100,
      padding: '4px 16px',
      marginBottom: 16,
    }}
  >
    <span
      style={{
        color: dark ? '#C96A3A' : '#A44B2A',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: 'uppercase' as const,
        fontFamily: 'var(--font-sans)',
      }}
    >
      {label}
    </span>
  </div>
);
