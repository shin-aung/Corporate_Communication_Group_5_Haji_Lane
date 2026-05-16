import React, { CSSProperties } from 'react';
import { useScrollReveal } from '../../utils/useScrollReveal';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  delay = 0,
  style = {},
}) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
