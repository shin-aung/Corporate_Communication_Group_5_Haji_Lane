import React, { CSSProperties } from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  href?: string;
  style?: CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  href,
  style = {},
}) => {
  const base: CSSProperties = {
    display: 'inline-block',
    padding: '13px 28px',
    background: variant === 'primary' ? '#A44B2A' : 'transparent',
    border: `1.5px solid ${variant === 'primary' ? '#A44B2A' : 'rgba(164,75,42,0.5)'}`,
    borderRadius: 8,
    color: variant === 'primary' ? '#FFFEF8' : 'rgba(246,240,232,0.8)',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.5,
    transition: 'all 0.25s ease',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    textDecoration: 'none',
    ...style,
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(164,75,42,0.35)';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = 'none';
    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={base}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      style={{ ...base, border: base.border as string }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {label}
    </button>
  );
};
