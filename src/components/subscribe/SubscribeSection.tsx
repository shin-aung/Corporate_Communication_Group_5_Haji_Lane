import React from 'react';
import { RevealSection } from '../common/RevealSection';
import { SectionBadge } from '../common/SectionBadge';

export const SubscribeSection: React.FC = () => {

  return (
    <section
      id="subscribe"
      style={{ padding: 'var(--section-padding)', background: 'var(--color-beige)' }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>

        <RevealSection style={{ marginBottom: 48 }}>
          <SectionBadge label="Stay Connected" />
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 900,
              color: 'var(--color-maroon)',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Thank You
            <br />
            <span style={{ color: 'var(--color-copper)', fontStyle: 'italic' }}>
              for Following Along
            </span>
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: 16, lineHeight: 1.8 }}>
            This has been Group 5's outdoor adventure — a story of exploration, connection and
            communication through the vibrant streets of Haji Lane, Singapore.
          </p>
        </RevealSection>
      </div>
    </section>
  );
};
