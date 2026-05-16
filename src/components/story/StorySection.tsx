import React, { useState } from 'react';
import { destinations, hajiLaneHighlights } from '../../data/storySections';
import { RevealSection } from '../common/RevealSection';
import { SectionBadge } from '../common/SectionBadge';

export const StorySection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section id="story" style={{ padding: 'var(--section-padding)', background: 'var(--color-beige)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Heading */}
        <RevealSection style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionBadge label="Feature Story" />
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 900,
              color: 'var(--color-maroon)',
              lineHeight: 1,
              marginBottom: 12,
              fontStyle: 'italic',
            }}
          >
            Hip on Haji
          </h2>
          <p style={{ color: 'var(--color-copper)', fontSize: 16, fontWeight: 600, letterSpacing: 0.5 }}>
            The Ultimate Budget-Friendly Student Attraction
          </p>
        </RevealSection>

        {/* Two-column feature area */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 40,
            marginBottom: 60,
            alignItems: 'start',
          }}
        >
          {/* Article block */}
          <RevealSection delay={100}>
            <div
              style={{
                background: 'var(--color-paper)',
                borderRadius: 'var(--radius-lg)',
                padding: 36,
                border: '1px solid rgba(164,75,42,0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="tape" style={{ top: -9, left: 30, transform: 'rotate(-2deg)' }} />
              <p
                className="font-serif"
                style={{
                  fontSize: 22,
                  fontStyle: 'italic',
                  color: 'var(--color-maroon)',
                  lineHeight: 1.5,
                  marginBottom: 20,
                  fontWeight: 400,
                }}
              >
                "A short walk from Sim Lim Square lies one of Singapore's most colourful and creative streets."
              </p>
              <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.8 }}>
                Haji Lane is lined with hand-painted murals, independent boutiques, cosy cafés and the
                unmistakeable energy of a neighbourhood that refuses to be ordinary. Perfect for students on a
                budget — world-class street art, affordable eats, vintage finds and discovery around every corner.
              </p>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(164,75,42,0.1)' }}>
                <p style={{ color: 'var(--color-muted)', fontSize: 15, lineHeight: 1.8 }}>
                  For PGDM Group 5, this outdoor activity became more than a field trip. It was an opportunity
                  to connect across cultures, observe real-world branding and communication, and experience
                  Singapore's living creative heritage together.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Highlight grid */}
          <RevealSection delay={200}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {hajiLaneHighlights.map((item) => (
                <div
                  key={item.label}
                  className="card-hover"
                  style={{
                    background: 'var(--color-paper)',
                    borderRadius: 'var(--radius-md)',
                    padding: 20,
                    border: '1px solid rgba(164,75,42,0.1)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-maroon)', fontSize: 13, marginBottom: 6 }}>
                    {item.label}
                  </div>
                  <div style={{ color: 'var(--color-muted)', fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>

        {/* Destination cards */}
        <RevealSection style={{ textAlign: 'center', marginBottom: 24 }}>
          <h3
            className="font-serif"
            style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-maroon)' }}
          >
            Discover the Neighbourhood
          </h3>
        </RevealSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {destinations.map((dest, i) => (
            <RevealSection key={dest.id} delay={i * 100}>
              <article
                className="card-hover"
                style={{
                  background: 'var(--color-paper)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid rgba(164,75,42,0.12)',
                  cursor: 'pointer',
                }}
                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${dest.color}, ${dest.color}CC)`,
                    padding: '28px 24px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 8 }}>{dest.emoji}</div>
                  <h4
                    className="font-serif"
                    style={{ color: '#FFFEF8', fontSize: 22, fontWeight: 700, marginBottom: 4 }}
                  >
                    {dest.title}
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{dest.subtitle}</p>
                </div>
                <div style={{ padding: 24 }}>
                  <p
                    style={{
                      color: 'var(--color-copper)',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      marginBottom: 10,
                      textTransform: 'uppercase',
                    }}
                  >
                    {dest.tagline}
                  </p>
                  <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.7 }}>
                    {dest.description}
                  </p>
                  {expandedCard === i && (
                    <p
                      style={{
                        color: 'var(--color-ink)',
                        fontSize: 14,
                        lineHeight: 1.7,
                        marginTop: 12,
                        paddingTop: 12,
                        borderTop: '1px solid rgba(164,75,42,0.12)',
                      }}
                    >
                      {dest.detail}
                    </p>
                  )}
                  <div style={{ marginTop: 16, color: 'var(--color-copper)', fontSize: 12, fontWeight: 600 }}>
                    {expandedCard === i ? '↑ Show less' : '↓ Read more'}
                  </div>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};
